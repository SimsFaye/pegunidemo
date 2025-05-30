import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useTheme } from 'next-themes';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

interface VerticalTabsProps {
  tabs: {
    label: string;
    content: React.ReactNode;
  }[];
  defaultValue?: number;
  onChange?: (value: number) => void;
  height?: number | string;
  className?: string;
}

export default function VerticalTabs({ 
  tabs, 
  defaultValue = 0, 
  onChange,
  height = 224,
  className = ''
}: VerticalTabsProps) {
  const [value, setValue] = React.useState(defaultValue);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <Box
      sx={{ 
        flexGrow: 1, 
        bgcolor: 'background.paper', 
        display: 'flex', 
        height: height,
        backgroundColor: isDark ? '#1f2937' : '#ffffff'
      }}
      className={className}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="垂直选项卡"
        sx={{ 
          borderRight: 1, 
          borderColor: isDark ? '#4b5563' : '#e5e7eb',
          '& .MuiTab-root': {
            color: isDark ? '#d1d5db' : '#374151',
            '&.Mui-selected': {
              color: isDark ? '#3b82f6' : '#2563eb',
            },
            '&:hover': {
              color: isDark ? '#f3f4f6' : '#1f2937',
            }
          },
          '& .MuiTabs-indicator': {
            backgroundColor: isDark ? '#3b82f6' : '#2563eb',
          }
        }}
      >
        {tabs.map((tab, index) => (
          <Tab key={index} label={tab.label} {...a11yProps(index)} />
        ))}
      </Tabs>
      {tabs.map((tab, index) => (
        <TabPanel key={index} value={value} index={index}>
          {tab.content}
        </TabPanel>
      ))}
    </Box>
  );
}

export { TabPanel, a11yProps }; 