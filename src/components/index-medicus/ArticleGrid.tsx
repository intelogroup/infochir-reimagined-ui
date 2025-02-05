
import { SearchBar } from "./SearchBar";
import { ArticleContent } from "./ArticleContent";
import { useArticlesState } from "./hooks/useArticlesState";
import { useArticlesQuery } from "./hooks/useArticlesQuery";
import { VirtualizedArticleList } from "./VirtualizedArticleList";
import { memo, useState, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ArticleGridProps {
  viewMode?: "grid" | "table";
}

const LoadingSkeleton = () => (
  <div className="space-y-4">
    {Array.from({ length: 5 }).map((_, i) => (
      <Skeleton key={i} className="w-full h-32" />
    ))}
  </div>
);

const ErrorDisplay = ({ error }: { error: Error }) => (
  <Alert variant="destructive">
    <AlertCircle className="h-4 w-4" />
    <AlertTitle>Erreur</AlertTitle>
    <AlertDescription>
      Une erreur est survenue lors du chargement des articles. 
      {error.message}
    </AlertDescription>
  </Alert>
);

const ArticleGrid = memo(({ viewMode = "table" }: ArticleGridProps) => {
  console.log('ArticleGrid rendering with viewMode:', viewMode);
  
  const [currentPage, setCurrentPage] = useState(0);
  const { data, isLoading, error } = useArticlesQuery(currentPage);
  
  console.log('ArticleGrid query state:', { isLoading, error, hasData: !!data });
  
  const articles = data?.articles || [];
  const totalPages = data?.totalPages || 0;

  const {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedSource,
    setSelectedSource,
    selectedTags,
    setSelectedTags,
    selectedAuthors,
    setSelectedAuthors,
    titleFilter,
    setTitleFilter,
    date,
    setDate,
    filteredArticles,
    categories,
    sources,
    availableTags,
    availableAuthors,
    articleStats
  } = useArticlesState(articles);

  const handleSearch = () => {
    console.time('Search Operation');
    console.log("Searching with filters:", { 
      searchTerm, 
      selectedCategory, 
      selectedSource, 
      selectedTags,
      selectedAuthors,
      titleFilter,
      date 
    });
    setCurrentPage(0); // Reset to first page when searching
    console.timeEnd('Search Operation');
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  if (error) {
    return (
      <div className="space-y-4">
        <ErrorDisplay error={error as Error} />
        <Button 
          onClick={() => window.location.reload()}
          variant="outline"
          className="mx-auto block"
        >
          Réessayer
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-center gap-2 text-primary">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Chargement des articles...</span>
        </div>
        <LoadingSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedSource={selectedSource}
        setSelectedSource={setSelectedSource}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        selectedAuthors={selectedAuthors}
        setSelectedAuthors={setSelectedAuthors}
        titleFilter={titleFilter}
        setTitleFilter={setTitleFilter}
        date={date}
        setDate={setDate}
        onSearch={handleSearch}
        categories={categories}
        sources={sources}
        availableTags={availableTags}
        availableAuthors={availableAuthors}
        articleStats={articleStats}
      />
      
      <Suspense fallback={<LoadingSkeleton />}>
        {viewMode === "grid" ? (
          <VirtualizedArticleList
            articles={filteredArticles}
            onTagClick={(tag) => {
              if (!selectedTags.includes(tag)) {
                setSelectedTags([...selectedTags, tag]);
              }
            }}
            selectedTags={selectedTags}
          />
        ) : (
          <ArticleContent
            viewMode={viewMode}
            articles={filteredArticles}
            isLoading={isLoading}
            onTagClick={(tag) => {
              if (!selectedTags.includes(tag)) {
                setSelectedTags([...selectedTags, tag]);
              }
            }}
            selectedTags={selectedTags}
          />
        )}
      </Suspense>

      {totalPages > 1 && (
        <div className="flex justify-center gap-4 mt-6">
          <Button
            variant="outline"
            onClick={handlePreviousPage}
            disabled={currentPage === 0}
            className="gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <span className="flex items-center">
            Page {currentPage + 1} of {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={handleNextPage}
            disabled={currentPage >= totalPages - 1}
            className="gap-2"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
});

ArticleGrid.displayName = 'ArticleGrid';

export { ArticleGrid };
