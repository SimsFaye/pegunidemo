import React from 'react';
import { Chrono } from 'react-chrono';

interface TimelineEvent {
  title: string;
  date: string;
  description?: string;
}

interface SimplifiedTimelineProps {
  events: TimelineEvent[];
  className?: string;
  primaryColor?: string;
  secondaryColor?: string;
  backgroundColor?: string;
}

export function SimplifiedTimeline({
  events,
  className = '',
  primaryColor = '#3b82f6',
  secondaryColor = '#60a5fa',
  backgroundColor = 'rgba(255, 255, 255, 0.7)'
}: SimplifiedTimelineProps) {
  if (!events || events.length === 0) {
    return <div className="text-gray-500">无时间线数据</div>;
  }

  // 转换数据格式为react-chrono所需格式
  const items = events.map(event => ({
    title: '', // 设置为空字符串，但保留字段，因为它是必需的
    cardTitle: event.title,
    cardSubtitle: event.date,
    cardDetailedText: event.description || ''
  }));

  return (
    <div className={`simplified-timeline ${className}`}>
      <Chrono
        items={items}
        mode="VERTICAL"
        cardHeight={100}
        hideControls={true}
        disableAutoScrollOnClick={true}
        fontSizes={{
          cardSubtitle: '0.85rem',
          cardText: '0.85rem',
          cardTitle: '0.95rem',
          title: '0.85rem'
        }}
        theme={{
          primary: primaryColor,
          secondary: secondaryColor,
          cardBgColor: backgroundColor,
          cardForeColor: '#1f2937',
          titleColor: '#6b7280',
          titleColorActive: primaryColor
        }}
        timelinePointShape="circle"
        timelinePointDimension={16}
        lineWidth={2}
      />

      <style jsx global>{`
        /* 目标控制面板的根元素 */
        .ToolbarWrapper-sc-exupb5-0 {
          display: none !important;
        }
        
        /* 针对控制面板内的各个元素 */
        .ToolbarListItem-sc-exupb5-1,
        .ContentWrapper-sc-exupb5-3,
        .TimelineControlContainer-sc-1apb8f9-4,
        .TimelineNavWrapper-sc-1apb8f9-1,
        .SearchWrapper-sc-cif21b-9,
        .ExtraControls-sc-cif21b-7 {
          display: none !important;
        }
        
        /* 隐藏搜索框 */
        input[placeholder="Search Timeline"] {
          display: none !important;
        }
        
        /* 移除控制面板占用的空间 */
        .timeline-main-wrapper > div:first-child {
          display: none !important;
          height: 0 !important;
          width: 0 !important;
          overflow: hidden !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        
        /* 确保时间线靠上显示，不留空白 */
        .timeline-main-wrapper {
          padding-top: 0 !important;
          margin-top: 0 !important;
        }
        
        /* 时间线样式微调 */
        .timeline-card-content {
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(0, 0, 0, 0.05);
          margin-bottom: 12px !important; /* 增加卡片之间的间距 */
          padding: 12px !important; /* 确保内部内容有合适的内边距 */
        }
        
        /* 时间线点样式 */
        .timeline-vertical-circle {
          cursor: pointer !important;
        }
        
        /* 强制隐藏任何可能显示的控制面板 */
        div[role="toolbar"] {
          display: none !important;
          visibility: hidden !important;
          position: absolute !important;
          left: -9999px !important;
          top: -9999px !important;
        }
        
        /* 针对跳转、布局和密度按钮 */
        [title="Jump to"],
        [title="Change layout"],
        [title="Change density"] {
          display: none !important;
        }

        /* 隐藏左侧事件标题 */
        .TimelineTitleWrapper-sc-1427v1d-3 {
          display: none !important;
          width: 0 !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        
        /* 隐藏标题文本 */
        .TitleWrapper-sc-13izrht-0 {
          display: none !important;
          width: 0 !important;
        }
        
        /* 调整时间线垂直间距和布局 */
        .TimelineVerticalWrapper-sc-1427v1d-0 {
          margin: 0 !important;
          padding: 0 !important;
          padding-left: 0 !important; /* 移除左侧内边距 */
          padding-bottom: 10px !important; /* 确保底部有足够空间 */
        }
        
        /* 调整每个时间线项的间距 */
        .VerticalItemWrapper-sc-1427v1d-1 {
          padding: 0 !important;
          margin: 0 !important;
          margin-bottom: 14px !important; /* 增加项目之间的间距 */
        }
        
        /* 最后一个时间线项不需要底部间距 */
        .VerticalItemWrapper-sc-1427v1d-1:last-child {
          margin-bottom: 0 !important;
        }
        
        /* 调整时间线点与标题的对齐 */
        .TimelinePointWrapper-sc-12rz3g8-0 {
          margin: 0 !important;
          padding: 0 !important;
          left: 0 !important; /* 将时间线点移到最左侧 */
        }
        
        /* 减少时间线与容器左侧边距 */
        .timeline-main-wrapper {
          padding-left: 0 !important;
          margin-left: 0 !important;
        }
        
        /* 调整整个时间线容器 */
        .Nv3RVx {
          padding-left: 0 !important;
          margin-left: 0 !important;
        }
        
        /* 调整垂直时间线包装器 */
        .sc-1427v1d-0 {
          padding-left: 0 !important;
          margin-left: 0 !important;
        }
        
        /* 时间线项左侧间距调整 */
        .efxKff {
          padding-left: 0 !important;
        }
        
        /* 减少左侧所有可能的边距 */
        [class*="TimelineVerticalWrapper"],
        [class*="VerticalItemWrapper"],
        .timeline-container,
        .timeline-wrapper {
          padding-left: 0 !important;
          margin-left: 0 !important;
        }

        /* 调整内容区域的位置 - 让内容区域占据整个宽度 */
        .TimelineCardContentWrapper-sc-1427v1d-2 {
          width: 100% !important;
          max-width: 100% !important;
          left: 0 !important;
          margin-left: 24px !important; /* 为时间线点留出更小的空间 */
        }

        /* 调整时间线布局，确保点居左 */
        .timeline-vertical-circle {
          left: 0 !important;
        }

        /* 调整时间线垂直线的高度，确保覆盖整个时间线 */
        .timeline-vertical-line {
          left: 7px !important; /* 调整垂直线位置，与时间线点居中对齐 */
          width: 2px !important; /* 调细时间线 */
          height: calc(100% - 10px) !important; /* 调整线条高度 */
        }
        
        /* 增加第一个时间点的顶部间距，与文字标题错开 */
        .TimelineVerticalWrapper-sc-1427v1d-0 > li:first-child {
          margin-top: 8px !important;
        }

        /* 优化卡片标题样式 */
        .card-title {
          font-weight: 600 !important;
          margin-bottom: 4px !important;
          color: #2563eb !important;
        }
        
        /* 优化卡片日期样式 */
        .card-subtitle {
          color: #4b5563 !important;
          margin-bottom: 6px !important;
        }
        
        /* 优化卡片描述文本样式 */
        .card-text {
          color: #6b7280 !important;
          line-height: 1.4 !important;
        }
      `}</style>
    </div>
  );
} 