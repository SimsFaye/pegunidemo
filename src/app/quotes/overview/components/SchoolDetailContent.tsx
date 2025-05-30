'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/Tab';
import { ScheduleTab } from './tabs/ScheduleTab';
import { ApplicationTab } from './tabs/ApplicationTab';
import { DocumentsTab } from './tabs/DocumentsTab';
import { LanguageTab } from './tabs/LanguageTab';
import { StatsTab } from './tabs/StatsTab';
import { Badge } from '@/components/Badge';

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

interface SchoolDetailContentProps {
  result: any;
  resultIndex: number;
}

export function SchoolDetailContent({ result, resultIndex }: SchoolDetailContentProps) {
  // 为每个结果创建一个状态
  const [activeScheduleTab, setActiveScheduleTab] = useState(0);
  
  // 设置特定索引结果的活动选项卡
  const setActiveTabForIndex = (_resultIndex: number, tabIndex: number) => {
    setActiveScheduleTab(tabIndex);
  };
  
  // Badge变体类型数组
  const badgeVariants = ["default", "success", "error", "warning", "neutral"];
  
  return (
    <>
      {/* 专业/课程列表 */}
      {result.courses && result.courses.length > 0 && (
        <div className="mt-2 mb-4">
          <span className="text-gray-500 font-medium">专业/课程：</span>
          <div className="flex flex-wrap gap-2 mt-1">
            {result.courses.map((course: any, i: number) => {
              // 循环使用Badge的变体类型
              const variant = badgeVariants[i % badgeVariants.length] as any;
              
              return (
                <Badge 
                  key={i}
                  variant={variant}
                >
                  {course.name}
                </Badge>
              );
            })}
          </div>
        </div>
      )}

      {/* 各种要求和统计 - 使用Tabs */}
      <div className="mt-6">
        <Tabs defaultValue="schedule" className="w-full">
          <TabsList className="mb-4 w-full">
            <TabsTrigger value="schedule" className="flex-1">入学日程</TabsTrigger>
            <TabsTrigger value="application" className="flex-1">申请要求</TabsTrigger>
            <TabsTrigger value="documents" className="flex-1">书类要求</TabsTrigger>
            <TabsTrigger value="language" className="flex-1">语言要求</TabsTrigger>
            <TabsTrigger value="stats" className="flex-1">招生统计</TabsTrigger>
          </TabsList>
          
          {/* 入学日程标签页 */}
          <TabsContent value="schedule" className="space-y-4">
            <ScheduleTab 
              result={result} 
              activeScheduleTab={activeScheduleTab}
              setActiveTabForIndex={setActiveTabForIndex}
              resultIndex={resultIndex}
              formatDate={formatDate}
            />
          </TabsContent>

          {/* 申请要求标签页 */}
          <TabsContent value="application" className="space-y-4">
            <ApplicationTab result={result} />
          </TabsContent>
          
          {/* 书类要求标签页 */}
          <TabsContent value="documents" className="space-y-4">
            <DocumentsTab result={result} />
          </TabsContent>
          
          {/* 语言要求标签页 */}
          <TabsContent value="language" className="space-y-4">
            <LanguageTab result={result} />
          </TabsContent>
          
          {/* 招生统计标签页 */}
          <TabsContent value="stats" className="space-y-4">
            <StatsTab result={result} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
} 