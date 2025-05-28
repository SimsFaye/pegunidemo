"use client"

import { SearchInterface } from './components/SearchInterface';
import { SearchResults } from './components/SearchResults';
import { SearchProvider } from './context/SearchContext';

export default function QuotesOverviewPage() {
  return (
    <div className="container mx-auto py-6">
      <SearchProvider>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <SearchInterface />
          </div>
          <div className="lg:col-span-2">
            <SearchResults />
          </div>
        </div>
      </SearchProvider>
    </div>
  );
}
