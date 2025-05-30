import React from 'react';
import { Chrono } from 'react-chrono';

interface TimelineItem {
  title: string;
  cardTitle?: string;
  cardSubtitle?: string;
  cardDetailedText?: string | string[];
  url?: string;
  media?: {
    name?: string;
    source: {
      url: string;
    };
    type: 'IMAGE' | 'VIDEO';
  };
}

interface VerticalTimelineProps {
  items: TimelineItem[];
  className?: string;
  hideControls?: boolean;
  theme?: {
    primary: string;
    secondary: string;
    cardBgColor: string;
    cardForeColor: string;
    titleColor: string;
    titleColorActive: string;
  };
}

export function VerticalTimeline({
  items,
  className = '',
  hideControls = true,
  theme = {
    primary: '#0066cc',
    secondary: '#4d94ff',
    cardBgColor: 'white',
    cardForeColor: 'black',
    titleColor: '#4d94ff',
    titleColorActive: '#0066cc'
  }
}: VerticalTimelineProps) {
  if (!items || items.length === 0) {
    return <div className="text-gray-500">无时间线数据</div>;
  }

  return (
    <div className={`vertical-timeline-container ${className}`}>
      <Chrono
        items={items}
        mode="VERTICAL"
        cardHeight={100}
        theme={theme}
        hideControls={hideControls}
        scrollable={{ scrollbar: true }}
        useReadMore={false}
        classNames={{
          card: 'timeline-card',
          cardTitle: 'timeline-card-title',
          cardSubTitle: 'timeline-card-subtitle',
          cardText: 'timeline-card-text',
          title: 'timeline-title',
        }}
      />
      <style jsx global>{`
        .vertical-timeline-container {
          width: 100%;
          height: 100%;
        }
        .timeline-card {
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .timeline-card-title {
          font-size: 1rem !important;
          font-weight: 600 !important;
        }
        .timeline-card-subtitle {
          font-size: 0.9rem !important;
          color: #666 !important;
        }
        .timeline-card-text {
          font-size: 0.85rem !important;
        }
        .timeline-title {
          font-size: 0.85rem !important;
          font-weight: 500 !important;
        }
      `}</style>
    </div>
  );
} 