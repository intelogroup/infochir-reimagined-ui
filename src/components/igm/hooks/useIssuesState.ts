
import { useMemo, useCallback } from "react";
import type { Issue, SortOption } from "../types";
import { DateRange } from "react-day-picker";
import { isValidDate } from "../types";

interface IssuesStateOptions {
  searchTerm: string;
  sortBy: string;
  dateRange?: DateRange;
  selectedCategories: string[];
}

interface IssuesStateResult {
  sortedIssues: Issue[];
  issuesByYear: Record<number, Issue[]>;
  sortedYears: number[];
  availableCategories: string[];
}

export const useIssuesState = ({
  issues,
  searchTerm,
  sortBy,
  dateRange,
  selectedCategories
}: {
  issues: Issue[];
  searchTerm: string;
  sortBy: string;
  dateRange?: DateRange;
  selectedCategories: string[];
}): IssuesStateResult => {
  // Debug: Log years in issues
  console.log("Issues in useIssuesState:", issues?.length, 
    "Years:", issues?.map(i => new Date(i.date).getFullYear()).sort().filter((v, i, a) => a.indexOf(v) === i)
  );

  // Extract all unique categories
  const availableCategories = useMemo(() => {
    const categories = new Set<string>();
    issues.forEach(issue => {
      issue.categories?.forEach(category => {
        categories.add(category);
      });
    });
    return Array.from(categories).sort();
  }, [issues]);

  // Memoize the search filter function
  const filterBySearch = useCallback((issue: Issue): boolean => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    const searchTerms = searchLower.split(' ').filter(Boolean);
    
    const mainFieldsMatch = 
      issue.title.toLowerCase().includes(searchLower) ||
      issue.abstract.toLowerCase().includes(searchLower);
    
    if (mainFieldsMatch) return true;
    
    return issue.articles.some(article => 
      searchTerms.every(term => 
        article.title.toLowerCase().includes(term) ||
        article.authors.some(author => author.toLowerCase().includes(term)) ||
        article.abstract?.toLowerCase().includes(term)
      )
    );
  }, [searchTerm]);

  // Memoize date filtering
  const filterByDate = useCallback((issue: Issue): boolean => {
    if (!dateRange?.from && !dateRange?.to) return true;
    
    const issueDate = new Date(issue.date);
    
    // Debug: Log date filtering
    console.log("Date filtering:", {
      issue: issue.title,
      date: issue.date, 
      dateObj: issueDate,
      isValid: isValidDate(issueDate),
      year: issueDate.getFullYear(),
      range: dateRange
    });
    
    if (!isValidDate(issueDate)) {
      console.warn("Invalid date in issue:", issue);
      return false;
    }

    const isAfterStart = !dateRange.from || issueDate >= dateRange.from;
    const isBeforeEnd = !dateRange.to || issueDate <= dateRange.to;
    
    return isAfterStart && isBeforeEnd;
  }, [dateRange]);

  // Filter by categories
  const filterByCategories = useCallback((issue: Issue): boolean => {
    if (!selectedCategories?.length) return true;
    return selectedCategories.every(category => 
      issue.categories?.includes(category)
    );
  }, [selectedCategories]);

  // Apply filters in sequence
  const filteredIssues = useMemo(() => {
    return issues.filter(issue => 
      filterByDate(issue) && 
      filterBySearch(issue) &&
      filterByCategories(issue)
    );
  }, [issues, filterByDate, filterBySearch, filterByCategories]);

  // Memoize sorting
  const sortedIssues = useMemo(() => {
    const sorted = [...filteredIssues];
    
    const sortFunctions: Record<string, (a: Issue, b: Issue) => number> = {
      latest: (a: Issue, b: Issue) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      year: (a: Issue, b: Issue) => {
        const yearDiff = new Date(b.date).getFullYear() - new Date(a.date).getFullYear();
        return yearDiff || new Date(b.date).getMonth() - new Date(a.date).getMonth();
      },
      downloads: (a: Issue, b: Issue) => (b.downloads || 0) - (a.downloads || 0),
      shares: (a: Issue, b: Issue) => (b.shares || 0) - (a.shares || 0),
    };

    sorted.sort(sortFunctions[sortBy] || sortFunctions.latest);
    return sorted;
  }, [filteredIssues, sortBy]);

  // Group by year with optimization
  const { issuesByYear, sortedYears } = useMemo(() => {
    const byYear: Record<number, Issue[]> = {};
    const years = new Set<number>();
    
    for (const issue of sortedIssues) {
      const date = new Date(issue.date);
      if (!isValidDate(date)) {
        console.error(`Invalid date for issue ${issue.id}: ${issue.date}`);
        continue;
      }
      
      const year = date.getFullYear();
      years.add(year);
      
      if (!byYear[year]) {
        byYear[year] = [];
      }
      byYear[year].push(issue);
    }
    
    // Debug: Log years
    console.log("Years in sorted issues:", Array.from(years).sort());
    
    return {
      issuesByYear: byYear,
      sortedYears: Array.from(years).sort((a, b) => b - a)
    };
  }, [sortedIssues]);

  return {
    sortedIssues,
    issuesByYear,
    sortedYears,
    availableCategories,
  };
};
