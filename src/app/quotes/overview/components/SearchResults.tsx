'use client';

import { useSearch } from '../context/SearchContext';
import { TabNavigation, TabNavigationLink } from '@/components/TabNavigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/Tab';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/Accordion';
import { useState } from 'react';
import { 
  Table, 
  TableRoot, 
  TableHead, 
  TableHeaderCell, 
  TableBody, 
  TableRow, 
  TableCell 
} from '@/components/Table';
import { LineChart } from '@/components/LineChart';

// 格式化日期函数
const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }).replace(/上午|下午/g, '');
};

export function SearchResults() {
  const { searchResults, isSearching, hasSearched, totalResults, currentPage, pageSize } = useSearch();
  // 为每个结果创建一个状态数组
  const [activeScheduleTabs, setActiveScheduleTabs] = useState<number[]>([]);
  
  // 设置特定索引结果的活动选项卡
  const setActiveTabForIndex = (resultIndex: number, tabIndex: number) => {
    setActiveScheduleTabs(prev => {
      const newTabs = [...prev];
      newTabs[resultIndex] = tabIndex;
      return newTabs;
    });
  };
  
  // 获取特定索引结果的活动选项卡
  const getActiveTabForIndex = (resultIndex: number) => {
    return activeScheduleTabs[resultIndex] || 0;
  };
  
  // 渲染学校详细信息内容
  const renderSchoolDetailContent = (result: any, resultIndex: number) => {
    const activeScheduleTab = getActiveTabForIndex(resultIndex);
    
    return (
      <>
        {/* 招生容量信息 */}
        {(result.common_requirements.capacity_number !== null || result.common_requirements.capacity_text) && (
          <div className="mt-2 mb-4">
            <span className="text-gray-500 font-medium">招生容量：</span>
            {result.common_requirements.capacity_number !== null && (
              <span>{result.common_requirements.capacity_number}人 </span>
            )}
            {result.common_requirements.capacity_text && (
              <span className="text-sm text-gray-600">({result.common_requirements.capacity_text})</span>
            )}
          </div>
        )}

        {/* 入学日程信息 - 使用TabNavigation */}
        {result.common_schedule && result.common_schedule.length > 0 && (
          <div className="mt-4">
            <h4 className="text-md font-medium border-b pb-1 mb-2">入学日程信息</h4>
            
            {/* 季节选项卡 */}
            <TabNavigation className="mt-2">
              {result.common_schedule.map((schedule: any, index: number) => (
                <TabNavigationLink 
                  key={index}
                  active={activeScheduleTab === index}
                  onClick={() => setActiveTabForIndex(resultIndex, index)}
                >
                  {schedule.admission_season.year}年 {schedule.admission_season.term}季
                </TabNavigationLink>
              ))}
            </TabNavigation>
            
            {/* 当前选中季节的详细内容 */}
            <div className="mt-4 p-4 bg-gray-50 rounded-md">
              {result.common_schedule[activeScheduleTab] && (
                <div>
                  <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium text-gray-700 mb-1">基本信息</p>
                      <div className="space-y-1 pl-2 border-l-2 border-blue-200">
                        <p>
                          <span className="text-gray-500">入学季节：</span>
                          <span>{result.common_schedule[activeScheduleTab].admission_season.year}年 {result.common_schedule[activeScheduleTab].admission_season.term}季</span>
                        </p>
                        <p>
                          <span className="text-gray-500">课程类型：</span>
                          <span>{result.common_schedule[activeScheduleTab].exam_category.course} ({result.common_schedule[activeScheduleTab].exam_category.specialization})</span>
                        </p>
                        {result.common_schedule[activeScheduleTab].enrollment_month && result.common_schedule[activeScheduleTab].enrollment_month.length > 0 && (
                          <p>
                            <span className="text-gray-500">入学时间：</span>
                            <span>
                              {result.common_schedule[activeScheduleTab].enrollment_month.map((month: any, i: number) => (
                                <span key={i}>{month.year}年{month.month}月{i < result.common_schedule[activeScheduleTab].enrollment_month.length - 1 ? '、' : ''}</span>
                              ))}
                            </span>
                          </p>
                        )}
                        {result.common_schedule[activeScheduleTab].exam_format && result.common_schedule[activeScheduleTab].exam_format.length > 0 && (
                          <p>
                            <span className="text-gray-500">考试形式：</span>
                            <span>{result.common_schedule[activeScheduleTab].exam_format.join('、')}</span>
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <p className="font-medium text-gray-700 mb-1">费用信息</p>
                      <div className="space-y-1 pl-2 border-l-2 border-green-200">
                        {result.common_schedule[activeScheduleTab].application_fee_amount && (
                          <p>
                            <span className="text-gray-500">申请费用：</span>
                            <span>{result.common_schedule[activeScheduleTab].application_fee_amount} {result.common_schedule[activeScheduleTab].application_fee_currency}</span>
                          </p>
                        )}
                        {result.common_schedule[activeScheduleTab].application_fee_notes && (
                          <p>
                            <span className="text-gray-500">费用备注：</span>
                            <span className="text-sm">{result.common_schedule[activeScheduleTab].application_fee_notes}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* 申请时间安排 - 使用Table组件 */}
                  <div className="mt-4">
                    <p className="font-medium text-gray-700 mb-1">申请与考试时间安排</p>
                    <TableRoot>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableHeaderCell>阶段</TableHeaderCell>
                            <TableHeaderCell>日期</TableHeaderCell>
                            <TableHeaderCell>备注</TableHeaderCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {/* 申请期间 */}
                          {result.common_schedule[activeScheduleTab].application_period && (
                            <TableRow>
                              <TableCell className="font-medium">申请期间</TableCell>
                              <TableCell>
                                {formatDate(result.common_schedule[activeScheduleTab].application_period.start_date)} 至 {formatDate(result.common_schedule[activeScheduleTab].application_period.end_date)}
                              </TableCell>
                              <TableCell>-</TableCell>
                            </TableRow>
                          )}
                          
                          {/* 文件审核结果 */}
                          {result.common_schedule[activeScheduleTab].document_screening_results_date && 
                           result.common_schedule[activeScheduleTab].document_screening_results_date.length > 0 && 
                           result.common_schedule[activeScheduleTab].document_screening_results_date.map((item: any, i: number) => (
                            <TableRow key={`doc-${i}`}>
                              <TableCell className="font-medium">
                                {i === 0 ? '文件审核结果' : ''}
                              </TableCell>
                              <TableCell>
                                {formatDate(item.date)}
                              </TableCell>
                              <TableCell>
                                {item.description || '-'}
                              </TableCell>
                            </TableRow>
                          ))}
                          
                          {/* 笔试安排 */}
                          {result.common_schedule[activeScheduleTab].written_exam_schedule && 
                           result.common_schedule[activeScheduleTab].written_exam_schedule.length > 0 && 
                           result.common_schedule[activeScheduleTab].written_exam_schedule.map((item: any, i: number) => (
                            <TableRow key={`written-${i}`}>
                              <TableCell className="font-medium">
                                {i === 0 ? '笔试安排' : ''}
                              </TableCell>
                              <TableCell>
                                {formatDate(item.date)}
                              </TableCell>
                              <TableCell>
                                {item.description || '-'}
                              </TableCell>
                            </TableRow>
                          ))}
                          
                          {/* 笔试结果 */}
                          {result.common_schedule[activeScheduleTab].written_exam_results_date && 
                           result.common_schedule[activeScheduleTab].written_exam_results_date.length > 0 && 
                           result.common_schedule[activeScheduleTab].written_exam_results_date.map((item: any, i: number) => (
                            <TableRow key={`written-result-${i}`}>
                              <TableCell className="font-medium">
                                {i === 0 ? '笔试结果' : ''}
                              </TableCell>
                              <TableCell>
                                {formatDate(item.date)}
                              </TableCell>
                              <TableCell>
                                {item.description || '-'}
                              </TableCell>
                            </TableRow>
                          ))}
                          
                          {/* 面试安排 */}
                          {result.common_schedule[activeScheduleTab].interview_schedule && 
                           result.common_schedule[activeScheduleTab].interview_schedule.length > 0 && 
                           result.common_schedule[activeScheduleTab].interview_schedule.map((item: any, i: number) => (
                            <TableRow key={`interview-${i}`}>
                              <TableCell className="font-medium">
                                {i === 0 ? '面试安排' : ''}
                              </TableCell>
                              <TableCell>
                                {formatDate(item.date)}
                              </TableCell>
                              <TableCell>
                                {item.description || '-'}
                              </TableCell>
                            </TableRow>
                          ))}
                          
                          {/* 二次面试 */}
                          {result.common_schedule[activeScheduleTab].second_interview_schedule && 
                           result.common_schedule[activeScheduleTab].second_interview_schedule.length > 0 && 
                           result.common_schedule[activeScheduleTab].second_interview_schedule.map((item: any, i: number) => (
                            <TableRow key={`second-interview-${i}`}>
                              <TableCell className="font-medium">
                                {i === 0 ? '二次面试' : ''}
                              </TableCell>
                              <TableCell>
                                {formatDate(item.date)}
                              </TableCell>
                              <TableCell>
                                {item.description || '-'}
                              </TableCell>
                            </TableRow>
                          ))}
                          
                          {/* 最终结果 */}
                          {result.common_schedule[activeScheduleTab].final_results_date && 
                           result.common_schedule[activeScheduleTab].final_results_date.length > 0 && 
                           result.common_schedule[activeScheduleTab].final_results_date.map((item: any, i: number) => (
                            <TableRow key={`final-result-${i}`}>
                              <TableCell className="font-medium">
                                {i === 0 ? '最终结果' : ''}
                              </TableCell>
                              <TableCell>
                                {formatDate(item.date)}
                              </TableCell>
                              <TableCell>
                                {item.description || '-'}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableRoot>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 申请要求、书类要求、语言要求 - 使用Tabs */}
        <div className="mt-6">
          <Tabs defaultValue="application" className="w-full">
            <TabsList className="mb-4 w-full">
              <TabsTrigger value="application" className="flex-1">申请要求</TabsTrigger>
              <TabsTrigger value="documents" className="flex-1">书类要求</TabsTrigger>
              <TabsTrigger value="language" className="flex-1">语言要求</TabsTrigger>
            </TabsList>
            
            {/* 申请要求标签页 */}
            <TabsContent value="application" className="space-y-4">
              <div className="pl-2 border-l-2 border-green-200">
                {result.common_requirements.eligibility_requirements && (
                  <p>
                    <span className="text-gray-500 font-medium">资格要求：</span>
                    <span className="whitespace-pre-line">
                      {result.common_requirements.eligibility_requirements.split(/(?=\d+\.)/).map((item: string, index: number) => (
                        <span key={index}>
                          {item.trim()}
                          {index < result.common_requirements.eligibility_requirements.split(/(?=\d+\.)/).length - 1 && <br />}
                        </span>
                      ))}
                    </span>
                  </p>
                )}
                
                {result.common_requirements.required_documents && result.common_requirements.required_documents.length > 0 && (
                  <div className="mt-3">
                    <span className="text-gray-500 font-medium">所需文件：</span>
                    <ul className="list-disc pl-5">
                      {result.common_requirements.required_documents.map((doc: string, i: number) => (
                        <li key={i}>{doc}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* 课程列表 */}
                {result.courses && result.courses.length > 0 && (
                  <div className="mt-4">
                    <p className="text-gray-500 font-medium mb-2">专业/课程：</p>
                    <div className="flex flex-wrap gap-2">
                      {result.courses.map((course: any, i: number) => (
                        <span key={i} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          {course.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
            
            {/* 书类要求标签页 */}
            <TabsContent value="documents" className="space-y-4">
              <div className="pl-2 border-l-2 border-blue-200">
                {/* 研究计划书要求 */}
                {(result.common_requirements.research_plan_length_japanese || result.common_requirements.research_plan_length_english) && (
                  <div className="mb-4">
                    <p className="text-gray-500 font-medium mb-2">研究计划书要求：</p>
                    <div className="ml-3 space-y-3">
                      {result.common_requirements.research_plan_length_japanese && (
                        <div className="mb-2">
                          {(result.common_requirements.research_plan_length_japanese.value || 
                            result.common_requirements.research_plan_length_japanese.format_notes) && (
                            <>
                              <p className="text-sm">
                                <span className="text-gray-500">语言：</span>
                                <span>日语</span>
                              </p>
                              {result.common_requirements.research_plan_length_japanese.value && result.common_requirements.research_plan_length_japanese.unit && (
                                <p className="text-sm">
                                  <span className="text-gray-500">长度要求：</span>
                                  <span>{result.common_requirements.research_plan_length_japanese.value} {result.common_requirements.research_plan_length_japanese.unit === 'words' ? '字' : '页'}</span>
                                </p>
                              )}
                              {result.common_requirements.research_plan_length_japanese.format_notes && (
                                <p className="text-sm">
                                  <span className="text-gray-500">格式说明：</span>
                                  <span>{result.common_requirements.research_plan_length_japanese.format_notes}</span>
                                </p>
                              )}
                            </>
                          )}
                        </div>
                      )}
                      
                      {result.common_requirements.research_plan_length_english && (
                        <div>
                          {(result.common_requirements.research_plan_length_english.value || 
                            result.common_requirements.research_plan_length_english.format_notes) && (
                            <>
                              <p className="text-sm">
                                <span className="text-gray-500">语言：</span>
                                <span>英语</span>
                              </p>
                              {result.common_requirements.research_plan_length_english.value && result.common_requirements.research_plan_length_english.unit && (
                                <p className="text-sm">
                                  <span className="text-gray-500">长度要求：</span>
                                  <span>{result.common_requirements.research_plan_length_english.value} {result.common_requirements.research_plan_length_english.unit === 'words' ? 'words' : 'pages'}</span>
                                </p>
                              )}
                              {result.common_requirements.research_plan_length_english.format_notes && (
                                <p className="text-sm">
                                  <span className="text-gray-500">格式说明：</span>
                                  <span>{result.common_requirements.research_plan_length_english.format_notes}</span>
                                </p>
                              )}
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {/* 推荐信要求 */}
                {result.common_requirements.recommendation_letter_details && (
                  <div className="mb-4">
                    <p className="text-gray-500 font-medium mb-2">推荐信要求：</p>
                    <div className="ml-3">
                      {result.common_requirements.recommendation_letter_details.required_count !== null && (
                        <p className="text-sm">
                          <span className="text-gray-500">所需数量：</span>
                          <span>{result.common_requirements.recommendation_letter_details.required_count} 份</span>
                        </p>
                      )}
                      {result.common_requirements.recommendation_letter_details.recommender_qualifications && (
                        <p className="text-sm">
                          <span className="text-gray-500">推荐人资格：</span>
                          <span>{result.common_requirements.recommendation_letter_details.recommender_qualifications}</span>
                        </p>
                      )}
                      {result.common_requirements.recommendation_letter_details.submission_method && (
                        <p className="text-sm">
                          <span className="text-gray-500">提交方式：</span>
                          <span>{result.common_requirements.recommendation_letter_details.submission_method}</span>
                        </p>
                      )}
                      {result.common_requirements.recommendation_letter_details.notes && (
                        <p className="text-sm">
                          <span className="text-gray-500">备注：</span>
                          <span>{result.common_requirements.recommendation_letter_details.notes}</span>
                        </p>
                      )}
                    </div>
                  </div>
                )}
                
                {/* 教授联系要求 */}
                {result.common_requirements.professor_contact_required !== null && (
                  <div className="mb-4">
                    <p className="text-gray-500 font-medium mb-2">教授联系要求：</p>
                    <div className="ml-3">
                      <p className="text-sm">
                        <span className="text-gray-500">是否需要联系：</span>
                        <span>{result.common_requirements.professor_contact_required ? '是' : '否'}</span>
                      </p>
                      {result.common_requirements.professor_contact_details && (
                        <p className="text-sm mt-1">
                          <span className="text-gray-500">详细说明：</span>
                          <span>{result.common_requirements.professor_contact_details}</span>
                        </p>
                      )}
                    </div>
                  </div>
                )}
                
                {/* 工作经历要求 */}
                {result.common_requirements.work_history_requirement_status && (
                  <div className="mb-4">
                    <p className="text-gray-500 font-medium mb-2">工作经历要求：</p>
                    <div className="ml-3">
                      <p className="text-sm">
                        <span className="text-gray-500">要求状态：</span>
                        <span>{result.common_requirements.work_history_requirement_status}</span>
                      </p>
                      {result.common_requirements.work_history_details && (
                        <p className="text-sm mt-1">
                          <span className="text-gray-500">详细说明：</span>
                          <span>{result.common_requirements.work_history_details}</span>
                        </p>
                      )}
                    </div>
                  </div>
                )}
                
                {/* 参考作品要求 */}
                {result.common_requirements.reference_works_required !== null && (
                  <div className="mb-4">
                    <p className="text-gray-500 font-medium mb-2">参考作品要求：</p>
                    <div className="ml-3">
                      <p className="text-sm">
                        <span className="text-gray-500">是否需要提交：</span>
                        <span>{result.common_requirements.reference_works_required ? '是' : '否'}</span>
                      </p>
                      {result.common_requirements.reference_works_details && (
                        <p className="text-sm mt-1">
                          <span className="text-gray-500">详细说明：</span>
                          <span>{result.common_requirements.reference_works_details}</span>
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
            
            {/* 语言要求标签页 */}
            <TabsContent value="language" className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                {/* 英语要求 */}
                {result.common_requirements.english_requirements && (
                  <div className="pl-2 border-l-2 border-yellow-200">
                    <p className="text-gray-500 font-medium mb-2">英语要求：</p>
                    <div className="ml-3">
                      <p className="text-sm">
                        <span className="text-gray-500">是否必须：</span>
                        <span>{result.common_requirements.english_requirements.required ? '是' : '否'}</span>
                      </p>
                      {result.common_requirements.english_requirements.tests && result.common_requirements.english_requirements.tests.length > 0 && (
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">接受的考试：</p>
                          <ul className="list-disc pl-5">
                            {result.common_requirements.english_requirements.tests.map((test: any, i: number) => (
                              <li key={i} className="text-sm">
                                {test.test_type} 
                                {test.minimum_score && <span> (最低分数: {test.minimum_score})</span>}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {result.common_requirements.english_requirements.exemption_conditions && (
                        <p className="text-sm mt-2">
                          <span className="text-gray-500">豁免条件：</span>
                          <span>{result.common_requirements.english_requirements.exemption_conditions}</span>
                        </p>
                      )}
                      {result.common_requirements.english_requirements.notes && (
                        <p className="text-sm mt-2">
                          <span className="text-gray-500">备注：</span>
                          <span>{result.common_requirements.english_requirements.notes}</span>
                        </p>
                      )}
                    </div>
                  </div>
                )}
                
                {/* 日语要求 */}
                {result.common_requirements.japanese_requirements && (
                  <div className="pl-2 border-l-2 border-red-200">
                    <p className="text-gray-500 font-medium mb-2">日语要求：</p>
                    <div className="ml-3">
                      <p className="text-sm">
                        <span className="text-gray-500">是否必须：</span>
                        <span>{result.common_requirements.japanese_requirements.required ? '是' : '否'}</span>
                      </p>
                      {result.common_requirements.japanese_requirements.tests && result.common_requirements.japanese_requirements.tests.length > 0 && (
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">接受的考试：</p>
                          <ul className="list-disc pl-5">
                            {result.common_requirements.japanese_requirements.tests.map((test: any, i: number) => (
                              <li key={i} className="text-sm">
                                {test.test_type} 
                                {test.minimum_score && <span> (最低分数: {test.minimum_score})</span>}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {result.common_requirements.japanese_requirements.exemption_conditions && (
                        <p className="text-sm mt-2">
                          <span className="text-gray-500">豁免条件：</span>
                          <span>{result.common_requirements.japanese_requirements.exemption_conditions}</span>
                        </p>
                      )}
                      {result.common_requirements.japanese_requirements.notes && (
                        <p className="text-sm mt-2">
                          <span className="text-gray-500">备注：</span>
                          <span>{result.common_requirements.japanese_requirements.notes}</span>
                        </p>
                      )}
                    </div>
                  </div>
                )}
                
                {/* 一般语言备注 */}
                {result.common_requirements.language_notes && (
                  <div className="pl-2 border-l-2 border-purple-200">
                    <p className="text-gray-500 font-medium mb-2">语言备注：</p>
                    <p className="text-sm ml-3">{result.common_requirements.language_notes}</p>
                  </div>
                )}
                
                {/* 其他可选语言 */}
                {result.common_requirements.alternative_exam_languages && result.common_requirements.alternative_exam_languages.length > 0 && (
                  <div className="pl-2 border-l-2 border-blue-200">
                    <p className="text-gray-500 font-medium mb-2">其他可选语言：</p>
                    <div className="ml-3 flex flex-wrap gap-2">
                      {result.common_requirements.alternative_exam_languages.map((lang: string, i: number) => (
                        <span key={i} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* 招生统计 */}
        {result.overall_admission_stats && result.overall_admission_stats.length > 0 && (
          <div className="mt-6">
            <h4 className="text-md font-medium border-b pb-1 mb-2">招生统计</h4>
            <LineChart
              className="h-80"
              data={result.overall_admission_stats.map((stat: any) => ({
                year: stat.year.toString(),
                申请人数: stat.applicants !== null ? stat.applicants : undefined,
                录取人数: stat.accepted !== null ? stat.accepted : undefined,
                入学人数: stat.enrolled !== null ? stat.enrolled : undefined
              }))}
              index="year"
              categories={["申请人数", "录取人数", "入学人数"]}
              colors={["blue", "emerald", "violet"]}
              valueFormatter={(value: number) => value.toString()}
              showLegend={true}
              showGridLines={true}
              showTooltip={true}
              autoMinValue={true}
              connectNulls={false}
              onValueChange={(value) => {
                if (value) {
                  console.log(`选中: ${value.categoryClicked}, 年份: ${value.year}, 数值: ${value[value.categoryClicked]}`)
                }
              }}
            />
          </div>
        )}
      </>
    );
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-full">
      <h2 className="text-xl font-semibold mb-4">搜索结果</h2>
      
      {isSearching && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-2 text-gray-600">搜索中...</span>
        </div>
      )}
      
      {!isSearching && !hasSearched && (
        <div className="text-gray-500 py-8 text-center">
          <p>使用左侧搜索面板查找学校信息</p>
          <p className="mt-2 text-sm">搜索结果将在此处显示</p>
        </div>
      )}
      
      {!isSearching && hasSearched && searchResults.length === 0 && (
        <div className="text-gray-500 py-8 text-center">
          <p>未找到匹配的结果</p>
          <p className="mt-2 text-sm">请尝试调整搜索条件</p>
        </div>
      )}
      
      {!isSearching && searchResults.length > 0 && (
        <div className="mt-4">
          <p className="text-sm text-gray-500 mb-4">找到 {totalResults} 条结果，当前显示第 {currentPage} 页，每页 {pageSize} 条</p>
          
          <div className="space-y-2">
            <Accordion type="single" collapsible className="w-full">
              {searchResults.map((result, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg mb-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50">
                  <AccordionTrigger className="px-4 py-3">
                    <div className="flex flex-col w-full text-left">
                      <span className="font-medium text-blue-600">{result.university_name}</span>
                      <span className="text-sm text-gray-600 mt-1">{result.department_name}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4">
                    {renderSchoolDetailContent(result, index)}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      )}
    </div>
  );
} 