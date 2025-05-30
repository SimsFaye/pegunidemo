'use client';

import { useSearch } from '../context/SearchContext';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/Accordion';
import { SchoolDetailContent } from './SchoolDetailContent';

export function SearchResults() {
  const { searchResults, isSearching, hasSearched, totalResults, currentPage, pageSize } = useSearch();
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">搜索结果<span className="text-xs text-gray-400 align-top">*</span></h2>
        <p className="text-xs text-gray-400">*当前demo仅显示部分结果</p>
      </div>
      
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
                    <SchoolDetailContent result={result} resultIndex={index} />
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