'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

// 根据API文档定义类型
interface LanguageTestRequirement {
  test_type: string;
  minimum_score?: string | null;
  score_validity_period_months?: number | null;
  notes?: string | null;
}

interface LanguageRequirementDetails {
  required: boolean;
  tests: LanguageTestRequirement[];
  exemption_conditions?: string | null;
  notes?: string | null;
}

interface DateRange {
  start_date?: string | null;
  end_date?: string | null;
}

interface ScheduleItem {
  date: string;
  description?: string | null;
}

interface AdmissionSeason {
  year: number;
  term: string;
}

interface ExamCategory {
  course: string;
  specialization: string;
}

interface EnrollmentMonth {
  year: number;
  month: number;
}

interface AdmissionSchedule {
  admission_season: AdmissionSeason;
  enrollment_month: EnrollmentMonth[];
  exam_category: ExamCategory;
  exam_format?: string[];
  application_period?: DateRange;
  document_screening_results_date?: ScheduleItem[];
  written_exam_schedule?: ScheduleItem[];
  written_exam_results_date?: ScheduleItem[];
  interview_schedule?: ScheduleItem[];
  second_interview_schedule?: ScheduleItem[];
  final_results_date?: ScheduleItem[];
  application_fee_amount?: number | null;
  application_fee_currency?: string | null;
  application_fee_notes?: string | null;
}

interface LengthRequirement {
  value?: number | null;
  unit?: string | null;
  format_notes?: string | null;
}

interface RecommendationLetterRequirement {
  required_count?: number | null;
  recommender_qualifications?: string | null;
  submission_method?: string | null;
  notes?: string | null;
}

interface Details {
  eligibility_requirements?: string | null;
  required_documents?: string[] | null;
  english_requirements?: LanguageRequirementDetails | null;
  japanese_requirements?: LanguageRequirementDetails | null;
  alternative_exam_languages?: string[] | null;
  language_notes?: string | null;
  online_interview_available?: boolean | null;
  online_interview_details?: string | null;
  research_plan_length_japanese?: LengthRequirement | null;
  research_plan_length_english?: LengthRequirement | null;
  capacity_number?: number | null;
  capacity_text?: string | null;
  recommendation_letter_details?: RecommendationLetterRequirement | null;
  professor_contact_required?: boolean | null;
  professor_contact_details?: string | null;
  work_history_requirement_status?: string | null;
  work_history_details?: string | null;
  reference_works_required?: boolean | null;
  reference_works_details?: string | null;
}

interface AdmissionStatistics {
  applicants?: number | null;
  accepted?: number | null;
  enrolled?: number | null;
  year: number;
}

interface DepartmentCourseOutput {
  name: string;
}

// 搜索结果类型定义
interface SearchResult {
  university_name: string;
  department_name: string;
  common_schedule: AdmissionSchedule[];
  common_requirements: Details;
  overall_admission_stats: AdmissionStatistics[];
  courses: DepartmentCourseOutput[];
}

interface PaginationResponse {
  total: number;
  page: number;
  page_size: number;
  data: SearchResult[];
}

interface SearchParams {
  // 基础搜索参数
  basicParams: {
    school_name: string;
    location: string;
    type: string;
    department_name: string;
  };
  
  // 高级搜索参数
  advancedParams: {
    university_establishment_type: string;
    professor_contact_required: boolean | null;
    work_history_requirement_status: string;
    online_interview_available: boolean | null;
    reference_works_required: boolean | null;
    english_required: boolean | null;
    english_test_type: string;
    japanese_required: boolean | null;
    japanese_test_type: string;
    page: number;
    page_size: number;
  };
}

interface SearchContextType {
  searchParams: SearchParams;
  updateBasicParams: (params: Partial<SearchParams['basicParams']>) => void;
  updateAdvancedParams: (params: Partial<SearchParams['advancedParams']>) => void;
  resetSearch: () => void;
  isAdvancedSearchOpen: boolean;
  toggleAdvancedSearch: () => void;
  searchResults: SearchResult[];
  totalResults: number;
  currentPage: number;
  pageSize: number;
  isSearching: boolean;
  hasSearched: boolean;
  executeSearch: () => Promise<void>;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

const defaultSearchParams: SearchParams = {
  basicParams: {
    school_name: '',
    location: '',
    type: '',
    department_name: '',
  },
  advancedParams: {
    university_establishment_type: '',
    professor_contact_required: null,
    work_history_requirement_status: '',
    online_interview_available: null,
    reference_works_required: null,
    english_required: null,
    english_test_type: '',
    japanese_required: null,
    japanese_test_type: '',
    page: 1,
    page_size: 10,
  },
};

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchParams, setSearchParams] = useState<SearchParams>(defaultSearchParams);
  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const updateBasicParams = (params: Partial<SearchParams['basicParams']>) => {
    setSearchParams(prev => ({
      ...prev,
      basicParams: { ...prev.basicParams, ...params },
    }));
  };

  const updateAdvancedParams = (params: Partial<SearchParams['advancedParams']>) => {
    setSearchParams(prev => ({
      ...prev,
      advancedParams: { ...prev.advancedParams, ...params },
    }));
  };

  const resetSearch = () => {
    setSearchParams(defaultSearchParams);
    setSearchResults([]);
    setHasSearched(false);
    setTotalResults(0);
    setCurrentPage(1);
    setPageSize(10);
  };

  const toggleAdvancedSearch = () => {
    setIsAdvancedSearchOpen(prev => !prev);
  };

  // 实际的API调用
  const executeSearch = async () => {
    setIsSearching(true);
    setHasSearched(true);
    
    try {
      // 构建查询参数
      const params = new URLSearchParams();
      
      // 添加基础参数
      if (searchParams.basicParams.school_name) {
        params.append('school_name', searchParams.basicParams.school_name);
      }
      
      if (searchParams.basicParams.location) {
        params.append('location', searchParams.basicParams.location);
      }
      
      if (searchParams.basicParams.type) {
        params.append('type', searchParams.basicParams.type);
      }
      
      if (searchParams.basicParams.department_name) {
        params.append('department_name', searchParams.basicParams.department_name);
      }
      
      // 添加高级参数
      if (searchParams.advancedParams.university_establishment_type) {
        params.append('university_establishment_type', searchParams.advancedParams.university_establishment_type);
      }
      
      if (searchParams.advancedParams.professor_contact_required !== null) {
        params.append('professor_contact_required', searchParams.advancedParams.professor_contact_required.toString());
      }
      
      if (searchParams.advancedParams.work_history_requirement_status) {
        params.append('work_history_requirement_status', searchParams.advancedParams.work_history_requirement_status);
      }
      
      if (searchParams.advancedParams.online_interview_available !== null) {
        params.append('online_interview_available', searchParams.advancedParams.online_interview_available.toString());
      }
      
      if (searchParams.advancedParams.reference_works_required !== null) {
        params.append('reference_works_required', searchParams.advancedParams.reference_works_required.toString());
      }
      
      if (searchParams.advancedParams.english_required !== null) {
        params.append('english_required', searchParams.advancedParams.english_required.toString());
      }
      
      if (searchParams.advancedParams.english_test_type) {
        params.append('english_test_type', searchParams.advancedParams.english_test_type);
      }
      
      if (searchParams.advancedParams.japanese_required !== null) {
        params.append('japanese_required', searchParams.advancedParams.japanese_required.toString());
      }
      
      if (searchParams.advancedParams.japanese_test_type) {
        params.append('japanese_test_type', searchParams.advancedParams.japanese_test_type);
      }
      
      // 分页参数
      params.append('page', searchParams.advancedParams.page.toString());
      params.append('page_size', searchParams.advancedParams.page_size.toString());
      
      // 发送请求
      const response = await fetch(`https://college-demo.peguni.com/api/info/search?${params.toString()}`, {
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error(`API请求失败: ${response.status}`);
      }
      
      const data: PaginationResponse = await response.json();
      
      // 更新状态
      setSearchResults(data.data);
      setTotalResults(data.total);
      setCurrentPage(data.page);
      setPageSize(data.page_size);
      
    } catch (error) {
      console.error('搜索出错:', error);
      setSearchResults([]);
      setTotalResults(0);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <SearchContext.Provider value={{
      searchParams,
      updateBasicParams,
      updateAdvancedParams,
      resetSearch,
      isAdvancedSearchOpen,
      toggleAdvancedSearch,
      searchResults,
      totalResults,
      currentPage,
      pageSize,
      isSearching,
      hasSearched,
      executeSearch
    }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
} 