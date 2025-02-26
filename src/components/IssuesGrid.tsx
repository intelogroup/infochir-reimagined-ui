
import * as React from "react";
import { IssuesContent } from "./issues/IssuesContent";
import { useIssuesState } from "./issues/hooks/useIssuesState";
import { mockIssues } from "./igm/data/mockIssues";
import { SORT_OPTIONS } from "@/types/sortOptions";
import type { SortOption } from "@/types/sortOptions";

interface IssuesGridProps {
  viewMode?: "grid" | "table";
}

export const IssuesGrid: React.FC<IssuesGridProps> = ({ viewMode = "grid" }) => {
  const {
    sortBy,
    setSortBy,
    isLoading,
    sortedIssues,
    issuesByYear,
    sortedYears,
  } = useIssuesState(mockIssues);

  const handleSortChange = (value: SortOption) => {
    setSortBy(value);
  };

  return (
    <div className="space-y-4 px-4">      
      <IssuesContent
        viewMode={viewMode}
        sortedIssues={sortedIssues}
        issuesByYear={issuesByYear}
        sortedYears={sortedYears}
        isLoading={isLoading}
      />
    </div>
  );
};

