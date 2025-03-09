
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { AtlasChapter } from "../types";
import { createLogger } from "@/lib/error-logger";

const logger = createLogger('useAtlasArticles');

export const useAtlasArticles = () => {
  return useQuery({
    queryKey: ["atlas-chapters"],
    queryFn: async () => {
      logger.log('Fetching Atlas chapters from articles table');
      
      try {
        const { data, error } = await supabase
          .from("articles")  // Using the articles table for ADC content
          .select("*")
          .eq('source', 'ADC')
          .order("publication_date", { ascending: false });

        if (error) {
          logger.error("Error fetching atlas chapters:", error);
          throw error;
        }

        if (!data || data.length === 0) {
          logger.log('No ADC articles found in the articles table');
          return [];
        }

        logger.log(`Found ${data.length} ADC articles in the articles table`);

        const chapters: AtlasChapter[] = data?.map(item => ({
          id: item.id,
          title: item.title,
          description: item.abstract || undefined,
          abstract: item.abstract,
          content: item.abstract,
          lastUpdate: item.updated_at,
          publicationDate: item.publication_date,
          author: Array.isArray(item.authors) ? item.authors[0] : undefined,
          authors: Array.isArray(item.authors) ? item.authors : [],
          status: item.status === 'draft' ? 'coming' : 'available',
          coverImage: item.image_url,
          stats: {
            views: item.views || 0,
            shares: item.shares || 0,
            downloads: item.downloads || 0
          },
          tags: item.tags || [],
          volume: item.volume,
          specialty: item.specialty,
          category: item.category,
          source: "ADC",
          pdfUrl: item.pdf_url,
          imageUrls: [],
          institution: item.institution,
          userId: item.user_id
        })) || [];

        return chapters;
      } catch (error) {
        // Log the error with more details
        const errorMessage = error instanceof Error ? error.message : String(error);
        logger.error(`Error fetching atlas chapters: ${errorMessage}`, error);
        
        // For CORS errors or network failures, we return an empty array instead of throwing
        if (errorMessage.includes('NetworkError') || errorMessage.includes('CORS')) {
          logger.warn('Returning empty array due to network/CORS error');
          return [];
        }
        
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: 2,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
  });
};
