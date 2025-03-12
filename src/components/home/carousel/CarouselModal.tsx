
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ExternalLink, ChevronLeft, ChevronRight, FileText } from "lucide-react";
import { ImageOptimizer } from "@/components/shared/ImageOptimizer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { createLogger } from "@/lib/error-logger";
import { formatDate } from "@/lib/utils";
import { CarouselItem } from "./types";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const logger = createLogger('CarouselModal');

interface CarouselModalProps {
  item: CarouselItem;
  isOpen: boolean;
  onClose: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  hasNext?: boolean;
  hasPrevious?: boolean;
}

export const CarouselModal = ({ 
  item, 
  isOpen, 
  onClose,
  onNext,
  onPrevious,
  hasNext = false,
  hasPrevious = false
}: CarouselModalProps) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  
  // Focus on close button when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);
    }
  }, [isOpen, item]);

  const handleViewArticle = () => {
    if (item.id) {
      navigate(`/articles/${item.id}`);
    } else {
      // If there's no ID but there's an external link, open that instead
      window.open(item.link, '_blank');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent 
        className="sm:max-w-lg md:max-w-2xl p-0 overflow-hidden max-h-[90vh] flex flex-col"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        {/* Header with close button */}
        <DialogHeader className="px-4 py-3 border-b sticky top-0 bg-white z-10 flex flex-row items-center justify-between">
          <DialogTitle className="text-xl font-bold text-primary truncate pr-2" id="modal-title">
            {item.title}
          </DialogTitle>
          <Button 
            ref={closeButtonRef}
            variant="ghost" 
            size="sm"
            className="h-8 w-8 rounded-full p-0 flex items-center justify-center" 
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        {/* Scrollable content area */}
        <ScrollArea className="flex-grow">
          <div className="p-4">
            {/* Article metadata */}
            <div className="mb-4 flex flex-wrap gap-2">
              {item.category && (
                <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                  {item.category}
                </span>
              )}
              {item.date && <span className="text-gray-500 text-sm">{item.date}</span>}
            </div>
            
            {item.author && (
              <div className="mt-1 mb-3 text-sm text-gray-600 font-medium">
                Par {item.author}
              </div>
            )}
            
            {/* Featured image */}
            <div className="relative rounded-lg overflow-hidden aspect-video mb-4 bg-gray-100">
              <ImageOptimizer
                src={item.image}
                alt={item.title}
                width={600}
                height={340}
                className="w-full h-full object-cover"
                priority={true}
              />
            </div>
            
            {/* Article description */}
            <div className="prose prose-sm max-w-none mb-4">
              <p className="text-gray-700 whitespace-pre-line">
                {item.description}
              </p>
            </div>
          </div>
        </ScrollArea>
        
        {/* Footer with navigation and article link */}
        <DialogFooter className="p-4 border-t bg-gray-50 flex justify-between items-center flex-wrap gap-2">
          {/* Navigation buttons */}
          <div className="flex space-x-2">
            {hasPrevious && onPrevious && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onPrevious}
                className="flex items-center gap-1"
                aria-label="Previous article"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only md:not-sr-only">Précédent</span>
              </Button>
            )}
            {hasNext && onNext && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onNext}
                className="flex items-center gap-1"
                aria-label="Next article"
              >
                <span className="sr-only md:not-sr-only">Suivant</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>
          
          {/* Link to article */}
          <Button
            className="flex items-center gap-2"
            onClick={handleViewArticle}
            aria-label={`View full article: ${item.title}`}
          >
            {item.id ? <FileText className="h-4 w-4" /> : <ExternalLink className="h-4 w-4" />}
            Consulter l'article
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
