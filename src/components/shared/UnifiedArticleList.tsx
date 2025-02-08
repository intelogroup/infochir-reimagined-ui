
import { ArticleCard } from "@/components/index-medicus/ArticleCard";
import { ArticleTable } from "@/components/index-medicus/ArticleTable";
import { RhcaCard } from "@/components/rhca/RhcaCard";
import { RhcaTable } from "@/components/rhca/RhcaTable";
import type { Article } from "@/types/article";
import type { RhcaArticle } from "@/components/rhca/types";
import { motion, AnimatePresence } from "framer-motion";

type ViewMode = "grid" | "table";

interface UnifiedArticleListProps {
  viewMode: ViewMode;
  articles: (Article | RhcaArticle)[];
  variant: "index-medicus" | "rhca";
  onTagClick?: (tag: string) => void;
  selectedTags?: string[];
  isLoading?: boolean;
}

export const UnifiedArticleList = ({
  viewMode,
  articles,
  variant,
  onTagClick,
  selectedTags,
  isLoading = false
}: UnifiedArticleListProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-primary/20 rounded-full animate-bounce" />
          <div className="w-3 h-3 bg-primary/40 rounded-full animate-bounce [animation-delay:-.3s]" />
          <div className="w-3 h-3 bg-primary/60 rounded-full animate-bounce [animation-delay:-.5s]" />
        </div>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-12 text-center"
      >
        <p className="text-lg text-gray-500 mb-2">
          Aucun article trouvé
        </p>
        <p className="text-sm text-gray-400">
          Essayez de modifier vos critères de recherche
        </p>
      </motion.div>
    );
  }

  if (variant === "index-medicus") {
    if (viewMode === "grid") {
      return (
        <AnimatePresence mode="wait">
          <motion.div 
            className="grid grid-cols-1 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {articles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ArticleCard
                  article={article as Article}
                  onTagClick={onTagClick}
                  selectedTags={selectedTags}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      );
    }
    return <ArticleTable articles={articles as Article[]} />;
  }

  // RHCA variant
  if (viewMode === "grid") {
    return (
      <AnimatePresence mode="wait">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {articles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <RhcaCard article={article as RhcaArticle} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    );
  }
  return <RhcaTable articles={articles as RhcaArticle[]} />;
};
