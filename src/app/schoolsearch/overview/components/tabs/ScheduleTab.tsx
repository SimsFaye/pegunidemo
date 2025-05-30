'use client';

import { ScheduleTabLayout } from './ScheduleTabLayout';
import { 
  Table, 
  TableRoot, 
  TableHead, 
  TableHeaderCell, 
  TableBody, 
  TableRow, 
  TableCell 
} from '@/components/Table';

interface ScheduleTabProps {
  result: any;
  activeScheduleTab: number;
  setActiveTabForIndex: (resultIndex: number, tabIndex: number) => void;
  resultIndex: number;
  formatDate: (dateString: string) => string;
}

export function ScheduleTab({ 
  result, 
  activeScheduleTab, 
  setActiveTabForIndex, 
  resultIndex,
  formatDate 
}: ScheduleTabProps) {
  if (!result.common_schedule || result.common_schedule.length === 0) {
    return <p className="text-gray-500 dark:text-gray-400">无入学日程信息</p>;
  }

  // 渲染每个选项卡的内容
  const renderTabContent = (schedule: any) => {
    // 准备时间线数据
    const timelineEvents = [];
    
    // 添加申请期间
    if (schedule.application_period) {
      timelineEvents.push({
        title: '申请期间',
        date: `${formatDate(schedule.application_period.start_date)} 至 ${formatDate(schedule.application_period.end_date)}`,
        description: '提交申请材料的时间范围'
      });
    }
    
    // 添加书类审查结果
    if (schedule.document_screening_results_date && schedule.document_screening_results_date.length > 0) {
      schedule.document_screening_results_date.forEach((item: any, index: number) => {
        timelineEvents.push({
          title: '书审结果' + (schedule.document_screening_results_date.length > 1 ? ` (${index + 1})` : ''),
          date: formatDate(item.date),
          description: item.description || '书面材料审查结果公布'
        });
      });
    }
    
    // 添加笔试日程
    if (schedule.written_exam_schedule && schedule.written_exam_schedule.length > 0) {
      schedule.written_exam_schedule.forEach((item: any, index: number) => {
        timelineEvents.push({
          title: '笔试日程' + (schedule.written_exam_schedule.length > 1 ? ` (${index + 1})` : ''),
          date: formatDate(item.date),
          description: item.description || '笔试考试日期'
        });
      });
    }
    
    // 添加笔试结果
    if (schedule.written_exam_results_date && schedule.written_exam_results_date.length > 0) {
      schedule.written_exam_results_date.forEach((item: any, index: number) => {
        timelineEvents.push({
          title: '笔试结果' + (schedule.written_exam_results_date.length > 1 ? ` (${index + 1})` : ''),
          date: formatDate(item.date),
          description: item.description || '笔试成绩公布'
        });
      });
    }
    
    // 添加面试安排
    if (schedule.interview_schedule && schedule.interview_schedule.length > 0) {
      schedule.interview_schedule.forEach((item: any, index: number) => {
        timelineEvents.push({
          title: '面试日程' + (schedule.interview_schedule.length > 1 ? ` (${index + 1})` : ''),
          date: formatDate(item.date),
          description: item.description || '面试日期'
        });
      });
    }
    
    // 添加二次面试
    if (schedule.second_interview_schedule && schedule.second_interview_schedule.length > 0) {
      schedule.second_interview_schedule.forEach((item: any, index: number) => {
        timelineEvents.push({
          title: '二次面试' + (schedule.second_interview_schedule.length > 1 ? ` (${index + 1})` : ''),
          date: formatDate(item.date),
          description: item.description || '二次面试日期'
        });
      });
    }
    
    // 添加最终结果
    if (schedule.final_results_date && schedule.final_results_date.length > 0) {
      schedule.final_results_date.forEach((item: any, index: number) => {
        timelineEvents.push({
          title: '最终结果' + (schedule.final_results_date.length > 1 ? ` (${index + 1})` : ''),
          date: formatDate(item.date),
          description: item.description || '最终录取结果公布'
        });
      });
    }
    
    // 按日期排序
    timelineEvents.sort((a: any, b: any) => {
      const dateA = new Date(a.date.split(' 至 ')[0]);
      const dateB = new Date(b.date.split(' 至 ')[0]);
      return dateA.getTime() - dateB.getTime();
    });

    return (
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="font-medium text-gray-700 dark:text-gray-300 mb-1">基本信息</p>
            <div className="space-y-1 pl-2 border-l-2 border-blue-200 dark:border-blue-500">
              <p>
                <span className="text-gray-500 dark:text-gray-400">申请季节：</span>
                <span className="text-gray-900 dark:text-gray-100">{schedule.admission_season.year}年 {schedule.admission_season.term}季</span>
              </p>
              <p>
                <span className="text-gray-500 dark:text-gray-400">申请类型：</span>
                <span className="text-gray-900 dark:text-gray-100">{schedule.exam_category.course} ({schedule.exam_category.specialization})</span>
              </p>
              {schedule.enrollment_month && schedule.enrollment_month.length > 0 && (
                <p>
                  <span className="text-gray-500 dark:text-gray-400">入学时间：</span>
                  <span className="text-gray-900 dark:text-gray-100">
                    {schedule.enrollment_month.map((month: any, i: number) => (
                      <span key={i}>{month.year}年{month.month}月{i < schedule.enrollment_month.length - 1 ? '、' : ''}</span>
                    ))}
                  </span>
                </p>
              )}
              {schedule.exam_format && schedule.exam_format.length > 0 && (
                <p>
                  <span className="text-gray-500 dark:text-gray-400">考试形式：</span>
                  <span className="text-gray-900 dark:text-gray-100">{schedule.exam_format.join('、')}</span>
                </p>
              )}
            </div>
          </div>
          
          <div>
            <p className="font-medium text-gray-700 dark:text-gray-300 mb-1">费用信息</p>
            <div className="space-y-1 pl-2 border-l-2 border-green-200 dark:border-green-500">
              {schedule.application_fee_amount && (
                <p>
                  <span className="text-gray-500 dark:text-gray-400">申请费用：</span>
                  <span className="text-gray-900 dark:text-gray-100">{schedule.application_fee_amount} {schedule.application_fee_currency}</span>
                </p>
              )}
              {schedule.application_fee_notes && (
                <p>
                  <span className="text-gray-500 dark:text-gray-400">费用备注：</span>
                  <span className="text-sm text-gray-900 dark:text-gray-100">{schedule.application_fee_notes}</span>
                </p>
              )}
            </div>
          </div>
        </div>
        
        {/* 申请时间安排 - 使用表格替代时间线 */}
        <div className="mt-4">
          <p className="font-medium text-gray-700 dark:text-gray-300 mb-1">申请时间安排</p>
          <div className="pl-2 border-l-2 border-blue-200 dark:border-blue-500">
            <TableRoot>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>事项</TableHeaderCell>
                    <TableHeaderCell>日期</TableHeaderCell>
                    <TableHeaderCell>说明</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* 申请期间 */}
                  {schedule.application_period && (
                    <TableRow>
                      <TableCell className="font-medium">申请期间</TableCell>
                      <TableCell>{formatDate(schedule.application_period.start_date)} 至 {formatDate(schedule.application_period.end_date)}</TableCell>
                      <TableCell>提交申请材料的时间范围</TableCell>
                    </TableRow>
                  )}
                  
                  {/* 书类审查结果 */}
                  {schedule.document_screening_results_date && schedule.document_screening_results_date.map((item: any, index: number) => (
                    <TableRow key={`doc-${index}`}>
                      <TableCell className="font-medium">
                        书审结果{schedule.document_screening_results_date.length > 1 ? ` (${index + 1})` : ''}
                      </TableCell>
                      <TableCell>{formatDate(item.date)}</TableCell>
                      <TableCell>{item.description || '书面材料审查结果公布'}</TableCell>
                    </TableRow>
                  ))}
                  
                  {/* 笔试日程 */}
                  {schedule.written_exam_schedule && schedule.written_exam_schedule.map((item: any, index: number) => (
                    <TableRow key={`written-exam-${index}`}>
                      <TableCell className="font-medium">
                        笔试日程{schedule.written_exam_schedule.length > 1 ? ` (${index + 1})` : ''}
                      </TableCell>
                      <TableCell>{formatDate(item.date)}</TableCell>
                      <TableCell>{item.description || '笔试考试日期'}</TableCell>
                    </TableRow>
                  ))}
                  
                  {/* 笔试结果 */}
                  {schedule.written_exam_results_date && schedule.written_exam_results_date.map((item: any, index: number) => (
                    <TableRow key={`written-result-${index}`}>
                      <TableCell className="font-medium">
                        笔试结果{schedule.written_exam_results_date.length > 1 ? ` (${index + 1})` : ''}
                      </TableCell>
                      <TableCell>{formatDate(item.date)}</TableCell>
                      <TableCell>{item.description || '笔试成绩公布'}</TableCell>
                    </TableRow>
                  ))}
                  
                  {/* 面试安排 */}
                  {schedule.interview_schedule && schedule.interview_schedule.map((item: any, index: number) => (
                    <TableRow key={`interview-${index}`}>
                      <TableCell className="font-medium">
                        面试日程{schedule.interview_schedule.length > 1 ? ` (${index + 1})` : ''}
                      </TableCell>
                      <TableCell>{formatDate(item.date)}</TableCell>
                      <TableCell>{item.description || '面试日期'}</TableCell>
                    </TableRow>
                  ))}
                  
                  {/* 二次面试 */}
                  {schedule.second_interview_schedule && schedule.second_interview_schedule.map((item: any, index: number) => (
                    <TableRow key={`second-interview-${index}`}>
                      <TableCell className="font-medium">
                        二次面试{schedule.second_interview_schedule.length > 1 ? ` (${index + 1})` : ''}
                      </TableCell>
                      <TableCell>{formatDate(item.date)}</TableCell>
                      <TableCell>{item.description || '二次面试日期'}</TableCell>
                    </TableRow>
                  ))}
                  
                  {/* 最终结果 */}
                  {schedule.final_results_date && schedule.final_results_date.map((item: any, index: number) => (
                    <TableRow key={`final-result-${index}`}>
                      <TableCell className="font-medium">
                        最终结果{schedule.final_results_date.length > 1 ? ` (${index + 1})` : ''}
                      </TableCell>
                      <TableCell>{formatDate(item.date)}</TableCell>
                      <TableCell>{item.description || '最终录取结果公布'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableRoot>
          </div>
        </div>
      </div>
    );
  };

  return (
    <ScheduleTabLayout
      scheduleData={result.common_schedule}
      activeTab={activeScheduleTab}
      onTabChange={(newValue) => setActiveTabForIndex(resultIndex, newValue)}
      formatDate={formatDate}
      renderTabContent={renderTabContent}
    />
  );
} 