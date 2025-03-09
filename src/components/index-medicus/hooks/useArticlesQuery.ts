
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Article } from "@/components/index-medicus/types";
import { toast } from "sonner";
import { createLogger } from "@/lib/error-logger";

const logger = createLogger('useArticlesQuery');
const PAGE_SIZE = 10;

export const useArticlesQuery = (page = 0) => {
  return useQuery({
    queryKey: ["articles", page],
    queryFn: async () => {
      logger.log('Starting articles fetch for page:', page);
      
      const start = page * PAGE_SIZE;
      const end = start + PAGE_SIZE - 1;

      logger.log('Executing Supabase query with range:', { start, end });

      try {
        // Create a timeout for the request
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout
        
        const { data, error, count } = await supabase
          .from("articles")
          .select("*", { count: 'exact' })
          .order("publication_date", { ascending: false })
          .range(start, end)
          .abortSignal(controller.signal);
        
        // Clear the timeout
        clearTimeout(timeoutId);

        logger.log('Supabase response:', { dataCount: data?.length, error, count });

        if (error) {
          logger.error("Supabase query error:", error);
          toast.error("Erreur lors du chargement des articles", {
            description: error.message
          });
          throw error;
        }

        if (!data || data.length === 0) {
          logger.log('No data returned from query');
          return { articles: [], totalPages: 0 };
        }

        const articles: Article[] = data.map((item) => ({
          id: item.id,
          title: item.title,
          abstract: item.abstract,
          date: item.publication_date,
          publicationDate: item.publication_date,
          source: item.source as Article['source'],
          category: item.category,
          authors: Array.isArray(item.authors) ? item.authors : [],
          tags: Array.isArray(item.tags) ? item.tags : [],
          imageUrl: item.image_url,
          views: item.views || 0,
          citations: item.citations || 0,
          pdfUrl: item.pdf_url,
          downloads: item.downloads || 0,
          institution: item.institution,
          status: (item.status === 'published' || item.status === 'pending' || item.status === 'draft') 
            ? item.status as 'published' | 'pending' | 'draft'
            : 'published',
          shares: item.shares || 0,
          volume: item.volume,
          issue: item.issue,
          pageNumber: item.page_number,
          specialty: item.specialty,
          articleType: item.source as Article['source']
        }));

        const totalPages = Math.ceil((count || 0) / PAGE_SIZE);
        logger.log('Processed articles:', { count: articles.length, totalPages });

        return { articles, totalPages };
      } catch (err) {
        logger.error('Error fetching articles:', err);
        const errorMessage = err instanceof Error ? err.message : String(err);
        
        // Don't show toast for aborted requests
        if (errorMessage !== 'AbortError: The operation was aborted' && 
            !errorMessage.includes('aborted')) {
          toast.error("Erreur lors du chargement des articles", {
            description: errorMessage
          });
        }
        
        // Return empty state for network errors instead of failing completely
        if (errorMessage.includes('NetworkError') || errorMessage.includes('CORS') || 
            errorMessage.includes('AbortError')) {
          logger.warn('Returning empty state due to network/CORS error');
          return { articles: [], totalPages: 0 };
        }
        
        throw err;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: (failureCount, error) => {
      // Only retry network/timeout errors, not data errors
      if (error instanceof Error && 
         (error.message.includes('network') || 
          error.message.includes('timeout') ||
          error.message.includes('CORS'))) {
        return failureCount < 3;
      }
      return false;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};
