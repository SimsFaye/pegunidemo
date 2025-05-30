declare module 'react-chrono' {
  import React from 'react';

  export interface ChronoProps {
    items: Array<{
      title?: string;
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
    }>;
    mode?: 'HORIZONTAL' | 'VERTICAL' | 'VERTICAL_ALTERNATING';
    theme?: {
      primary: string;
      secondary: string;
      cardBgColor: string;
      cardForeColor: string;
      titleColor: string;
      titleColorActive: string;
    };
    fontSizes?: {
      cardSubtitle?: string;
      cardText?: string;
      cardTitle?: string;
      title?: string;
    };
    cardHeight?: number;
    hideControls?: boolean;
    disableNavOnKey?: boolean;
    disableClickOnCircle?: boolean;
    disableAutoScrollOnClick?: boolean;
    useReadMore?: boolean;
    scrollable?: boolean | { scrollbar: boolean };
    verticalHeight?: string;
    lineWidth?: number;
    borderRadius?: string;
    timelinePointShape?: 'circle' | 'square';
    timelinePointDimension?: number;
    classNames?: {
      card?: string;
      cardMedia?: string;
      cardSubTitle?: string;
      cardText?: string;
      cardTitle?: string;
      controls?: string;
      title?: string;
    };
  }

  export const Chrono: React.FC<ChronoProps>;
} 