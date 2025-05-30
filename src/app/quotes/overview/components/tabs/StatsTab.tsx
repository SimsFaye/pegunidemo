'use client';

import { LineChart } from '@/components/LineChart';
import { Callout } from '@/components/Callout';

interface StatsTabProps {
  result: any;
}

export function StatsTab({ result }: StatsTabProps) {
  if (!result.overall_admission_stats || result.overall_admission_stats.length === 0) {
    return <p className="text-gray-500">无招生统计信息</p>;
  }

  return (
    <div>
      <h4 className="text-md font-medium border-b pb-1 mb-2 pl-[0.5cm]">招生统计</h4>
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
      
      {/* 招生容量信息 - 使用Callout组件 */}
      {(result.common_requirements.capacity_number !== null || result.common_requirements.capacity_text) && (
        <div className="mt-6">
          <Callout 
            title="招生容量信息" 
            variant="default"
          >
            {result.common_requirements.capacity_number !== null && (
              <p>
                <span className="text-gray-500 dark:text-gray-400">计划招生人数：</span>
                <span className="font-medium">{result.common_requirements.capacity_number}人</span>
              </p>
            )}
            {result.common_requirements.capacity_text && (
              <p className="mt-1">
                <span className="text-gray-500 dark:text-gray-400">备注：</span>
                <span>{result.common_requirements.capacity_text}</span>
              </p>
            )}
          </Callout>
        </div>
      )}
    </div>
  );
} 