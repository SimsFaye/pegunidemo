'use client';

import { useSearch } from '../context/SearchContext';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/Select';
import { Checkbox } from '@/components/Checkbox';
import { Label } from '@/components/Label';

export function SearchInterface() {
  const { 
    searchParams, 
    updateBasicParams, 
    updateAdvancedParams, 
    resetSearch, 
    isAdvancedSearchOpen, 
    toggleAdvancedSearch,
    executeSearch,
    isSearching
  } = useSearch();

  const { basicParams, advancedParams } = searchParams;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submitting search with params:', {
      ...basicParams,
      ...advancedParams
    });
    // 执行搜索
    await executeSearch();
  };

  const renderBasicFields = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="school_name">学校名称</Label>
        <Input
          id="school_name"
          value={basicParams.school_name}
          onChange={(e) => updateBasicParams({ school_name: e.target.value })}
          placeholder="输入学校名称"
          className="w-full"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="type">类型</Label>
          <Select
            value={basicParams.type}
            onValueChange={(value) => updateBasicParams({ type: value })}
          >
            <SelectTrigger id="type">
              <SelectValue placeholder="选择类型" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="学部">学部</SelectItem>
              <SelectItem value="研究科">研究科</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="department_name">专业名称</Label>
          <Input
            id="department_name"
            value={basicParams.department_name}
            onChange={(e) => updateBasicParams({ department_name: e.target.value })}
            placeholder="仅支持日文查询"
          />
        </div>
      </div>
    </div>
  );

  const renderAdvancedFields = () => (
    <div className="space-y-6 pt-4 border-t border-gray-200 mt-4">
      
      {/* 基础筛选 */}
      <div className="space-y-4">
        <h4 className="text-md font-medium">基础筛选</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="location">地区</Label>
            <Input
              id="location"
              value={basicParams.location}
              onChange={(e) => updateBasicParams({ location: e.target.value })}
              placeholder="输入地区"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="university_type">大学设立类型</Label>
            <Select 
              value={advancedParams.university_establishment_type}
              onValueChange={(value) => updateAdvancedParams({ university_establishment_type: value })}
            >
              <SelectTrigger id="university_type">
                <SelectValue placeholder="选择大学类型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">公立</SelectItem>
                <SelectItem value="private">私立</SelectItem>
                <SelectItem value="national">国立</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      {/* 语言要求筛选 */}
      <div className="space-y-4">
        <h4 className="text-md font-medium">语言要求</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="english_required"
                checked={advancedParams.english_required === true}
                onCheckedChange={(checked) => 
                  updateAdvancedParams({ english_required: checked ? true : null })
                }
              />
              <Label htmlFor="english_required">英语要求</Label>
            </div>
            
            {advancedParams.english_required && (
              <div className="mt-2 pl-6">
                <Label htmlFor="english_test">英语考试类型</Label>
                <Select 
                  value={advancedParams.english_test_type}
                  onValueChange={(value) => updateAdvancedParams({ english_test_type: value })}
                >
                  <SelectTrigger id="english_test">
                    <SelectValue placeholder="选择考试类型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="toefl_ibt">TOEFL iBT</SelectItem>
                    <SelectItem value="ielts_academic">IELTS Academic</SelectItem>
                    <SelectItem value="toeic">TOEIC L&R</SelectItem>
                    <SelectItem value="other">其他</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="japanese_required"
                checked={advancedParams.japanese_required === true}
                onCheckedChange={(checked) => 
                  updateAdvancedParams({ japanese_required: checked ? true : null })
                }
              />
              <Label htmlFor="japanese_required">日语要求</Label>
            </div>
            
            {advancedParams.japanese_required && (
              <div className="mt-2 pl-6">
                <Label htmlFor="japanese_test">日语考试类型</Label>
                <Select 
                  value={advancedParams.japanese_test_type}
                  onValueChange={(value) => updateAdvancedParams({ japanese_test_type: value })}
                >
                  <SelectTrigger id="japanese_test">
                    <SelectValue placeholder="选择考试类型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jlpt">JLPT</SelectItem>
                    <SelectItem value="jtest">J.TEST</SelectItem>
                    <SelectItem value="eju">EJU</SelectItem>
                    <SelectItem value="other">其他</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </div>
      </div>
      
      
      {/* 申请要求筛选 */}
      <div className="space-y-4">
        <h4 className="text-md font-medium">申请要求</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="professor_contact"
              checked={advancedParams.professor_contact_required === true}
              onCheckedChange={(checked) => 
                updateAdvancedParams({ professor_contact_required: checked ? true : null })
              }
            />
            <Label htmlFor="professor_contact">需要教授联系</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="online_interview"
              checked={advancedParams.online_interview_available === true}
              onCheckedChange={(checked) => 
                updateAdvancedParams({ online_interview_available: checked ? true : null })
              }
            />
            <Label htmlFor="online_interview">提供在线面试</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="reference_works"
              checked={advancedParams.reference_works_required === true}
              onCheckedChange={(checked) => 
                updateAdvancedParams({ reference_works_required: checked ? true : null })
              }
            />
            <Label htmlFor="reference_works">需要参考作品</Label>
          </div>
        </div>
      </div>

            {/* 工作经历要求 */}
            <div className="space-y-4">
        <h4 className="text-md font-medium">工作经历要求</h4>
        <div className="space-y-2">
          <Label htmlFor="work_history">职务履历书</Label>
          <Select 
            value={advancedParams.work_history_requirement_status}
            onValueChange={(value) => updateAdvancedParams({ work_history_requirement_status: value })}
          >
            <SelectTrigger id="work_history">
              <SelectValue placeholder="选择要求" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="必須">必須</SelectItem>
              <SelectItem value="任意">任意</SelectItem>
              <SelectItem value="条件付き必須">条件付き必須</SelectItem>
              <SelectItem value="該当なし">該当なし</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {renderBasicFields()}
          
          <div className="flex items-center justify-between pt-4">
            <button
              type="button"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              onClick={toggleAdvancedSearch}
            >
              {isAdvancedSearchOpen ? '隐藏高级搜索' : '显示高级搜索'}
            </button>
          </div>
          
          {isAdvancedSearchOpen && renderAdvancedFields()}
          
          <div className="flex justify-end space-x-4 pt-4 border-t mt-4">
            <Button 
              type="button" 
              variant="light" 
              onClick={resetSearch}
              disabled={isSearching}
            >
              重置
            </Button>
            <Button 
              type="submit"
              disabled={isSearching}
            >
              {isSearching ? '搜索中...' : '搜索'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
} 