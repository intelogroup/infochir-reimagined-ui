import { SearchAndSort } from "@/components/issues/SearchAndSort";
import { IssuesGridContent } from "./IssuesGridContent";
import { useIssuesState } from "../hooks/useIssuesState";
import { mockIssues } from "../data/mockIssues";
import { SORT_OPTIONS } from "../constants/sortOptions";
import { useState, useEffect } from "react";
import { DateRange } from "react-day-picker";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import type { SortOption } from "@/types/sortOptions";

interface IssuesGridLayoutProps {
  viewMode?: "grid" | "table";
}

export const IssuesGridLayout = ({ viewMode = "grid" }: IssuesGridLayoutProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("latest");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [displayCount, setDisplayCount] = useState(6);
  const isMobile = useIsMobile();

  const {
    sortedIssues,
    issuesByYear,
    sortedYears,
    availableCategories,
  } = useIssuesState(mockIssues, {
    searchTerm,
    sortBy,
    dateRange,
    selectedCategories,
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const loadMore = () => {
    setDisplayCount(prev => prev + (isMobile ? 3 : 6));
  };

  const handleSortChange = (value: SortOption) => {
    setSortBy(value);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <motion.div 
        className="bg-white rounded-lg sm:rounded-xl border-b border-gray-100 p-4 sm:p-6 shadow-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <SearchAndSort
          searchTerm={searchTerm}
          sortBy={sortBy}
          onSearch={setSearchTerm}
          onSort={handleSortChange}
          sortOptions={SORT_OPTIONS}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          selectedCategories={selectedCategories}
          onCategoryChange={setSelectedCategories}
          availableCategories={availableCategories}
          disabled={isLoading}
        />
      </motion.div>
      
      <div className="px-2 sm:px-4">
        <AnimatePresence mode="wait">
          <IssuesGridContent
            viewMode={viewMode}
            sortedIssues={sortedIssues.slice(0, displayCount)}
            issuesByYear={issuesByYear}
            sortedYears={sortedYears}
            isLoading={isLoading}
            onLoadMore={loadMore}
            hasMore={displayCount < sortedIssues.length}
          />
        </AnimatePresence>
      </div>
    </div>
  );
};