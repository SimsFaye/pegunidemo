import React from 'react';
import VerticalTabs from '@/components/VerticalTabs';

interface ScheduleData {
  admission_season: {
    year: number | string;
    term: string;
  };
  exam_category: {
    course: string;
    specialization: string;
  };
  enrollment_month?: Array<{
    year: number | string;
    month: number | string;
  }>;
  exam_format?: string[];
  application_fee_amount?: string | number;
  application_fee_currency?: string;
  application_fee_notes?: string;
  application_period?: {
    start_date: string;
    end_date: string;
  };
  document_screening_results_date?: Array<{
    date: string;
    description?: string;
  }>;
  written_exam_schedule?: Array<{
    date: string;
    description?: string;
  }>;
  written_exam_results_date?: Array<{
    date: string;
    description?: string;
  }>;
  interview_schedule?: Array<{
    date: string;
    description?: string;
  }>;
  second_interview_schedule?: Array<{
    date: string;
    description?: string;
  }>;
  final_results_date?: Array<{
    date: string;
    description?: string;
  }>;
}

interface ScheduleTabLayoutProps {
  scheduleData: ScheduleData[];
  activeTab: number;
  onTabChange: (newValue: number) => void;
  formatDate: (dateString: string) => string;
  renderTabContent: (schedule: ScheduleData) => React.ReactNode;
}

export function ScheduleTabLayout({
  scheduleData,
  activeTab,
  onTabChange,
  formatDate,
  renderTabContent
}: ScheduleTabLayoutProps) {
  if (!scheduleData || scheduleData.length === 0) {
    return <p className="text-gray-500">无入学日程信息</p>;
  }

  // 格式化年份，只显示后两位数字
  const formatYear = (year: number | string) => {
    const yearStr = year.toString();
    return yearStr.length > 2 ? yearStr.slice(-2) : yearStr;
  };

  // 为垂直选项卡准备数据
  const tabs = scheduleData.map((schedule, index) => ({
    label: `${formatYear(schedule.admission_season.year)}年${schedule.admission_season.term}季${schedule.exam_category.specialization}`,
    content: renderTabContent(schedule)
  }));

  return (
    <div className="schedule-tab-container w-full pl-0">
      {/* 垂直标签布局 */}
      <div className="w-full pl-0">
        <VerticalTabs 
          tabs={tabs} 
          defaultValue={activeTab} 
          onChange={onTabChange}
          height="auto"
          className="rounded-md shadow-sm w-full pl-0"
        />
      </div>
      
      {/* 响应式处理 - 如果垂直标签太窄，提供最小宽度保证 */}
      <style jsx global>{`
        .MuiTabs-root.MuiTabs-vertical {
          min-width: 120px;
          width: 25%;
          max-width: 200px;
          background-color: rgba(255, 255, 255, 0);
          border-radius: 4px 0 0 4px;
        }
        .MuiBox-root {
          width: 100%;
          overflow: hidden;
          background-color: transparent !important;
        }
        /* 确保内容区域能够自适应 */
        [role="tabpanel"] {
          width: 100%;
          min-width: 0;
          overflow: auto;
          background-color: rgba(255, 255, 255, 0);
          border-radius: 0 4px 4px 0;
          padding: 0 16px 16px 16px !important;
          min-height: 300px;
        }
        
        /* 确保垂直选项卡高度自适应内容 */
        .MuiBox-root > div {
          min-height: 0 !important;
          height: auto !important;
        }

        /* 统一内容区域内边距 */
        [role="tabpanel"] > div {
          padding-left: 0 !important;
        }
        
        /* 表格样式优化 */
        table {
          table-layout: fixed;
          font-size: 0.875rem;
        }
        
        /* 设置列宽比例 */
        table th:nth-child(1),
        table td:nth-child(1) {
          width: 25%;
        }
        
        table th:nth-child(2),
        table td:nth-child(2) {
          width: 30%;
        }
        
        table th:nth-child(3),
        table td:nth-child(3) {
          width: 45%;
        }
        
        /* 单元格内容过长时处理 */
        table td {
          word-wrap: break-word;
          white-space: normal !important;
        }
        
        /* 确保表格不会溢出容器 */
        .TableRoot {
          overflow-x: auto;
          max-width: 100%;
        }
        
        /* 表格行的悬停效果 */
        table tr:hover {
          background-color: rgba(59, 130, 246, 0.05);
        }
        
        /* 表格内容与基本信息的样式一致性 */
        .border-l-2.border-blue-200 {
          padding-left: 0.5rem;
        }
        
        /* 保持表格和其他内容的垂直间距一致 */
        .mt-4 {
          margin-top: 1rem;
        }
      `}</style>
    </div>
  );
} 