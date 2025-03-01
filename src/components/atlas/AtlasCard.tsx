import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, Eye, Share2, Download, BookOpen } from "lucide-react";
import { AtlasChapter } from "./types";
import { toast } from "sonner";
import { useState, memo } from "react";
import { AtlasModal } from "./AtlasModal";
import { motion } from "framer-motion";
import { AtlasCategory } from "./data/atlasCategories";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface AtlasCardProps {
  chapter: AtlasChapter;
  category?: AtlasCategory;
}

const AtlasCard = memo(({ chapter, category }: AtlasCardProps) => {
  const [showModal, setShowModal] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/adc/chapters/${chapter.id}`;
    navigator.clipboard.writeText(shareUrl);
    toast.success("Lien copié dans le presse-papier");
  };

  const handleDownload = () => {
    toast.error("Le téléchargement n'est pas encore disponible");
  };

  const defaultCoverImages = {
    "0": "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=800&fit=crop",
    "1": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&fit=crop",
    "2": "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?q=80&w=800&fit=crop",
    "3": "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=800&fit=crop",
    "4": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&fit=crop",
  };

  const coverImage = chapter.coverImage || defaultCoverImages[chapter.id as keyof typeof defaultCoverImages] || defaultCoverImages["0"];

  return (
    <>
      <motion.div
        initial={false}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="h-full"
      >
        <Card className="group h-full flex flex-col overflow-hidden border-transparent hover:border-secondary/30 transition-all duration-300">
          <div className="relative h-32 overflow-hidden">
            {!imageLoaded && (
              <Skeleton className="absolute inset-0 w-full h-full" />
            )}
            <img
              src={coverImage}
              alt={chapter.title}
              className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${
                !imageLoaded ? 'opacity-0' : 'opacity-100'
              }`}
              onLoad={() => setImageLoaded(true)}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/20" />
          </div>
          
          <CardHeader className="space-y-2 p-4 flex-grow">
            {category && (
              <Badge variant="secondary" className="w-fit">
                <BookOpen className="h-3 w-3 mr-1" />
                {category.title}
              </Badge>
            )}
            <CardTitle className="text-sm font-bold group-hover:text-primary transition-colors line-clamp-2">
              {chapter.title}
            </CardTitle>
            <div className="flex flex-wrap gap-2 text-xs text-gray-500">
              {chapter.lastUpdate && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>MàJ: {chapter.lastUpdate}</span>
                </div>
              )}
              {chapter.author && (
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  <span>{chapter.author}</span>
                </div>
              )}
            </div>
          </CardHeader>
          
          <CardContent className="p-4 pt-0">
            {chapter.description && (
              <p className="text-xs text-gray-600 line-clamp-2 mb-3">
                {chapter.description}
              </p>
            )}
            <div className="flex justify-between items-center">
              <div className="flex gap-1.5">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="h-7 px-2 text-xs hover:bg-secondary/10 hover:text-secondary transition-colors"
                  onClick={() => setShowModal(true)}
                >
                  <Eye className="h-3 w-3 mr-1" />
                  <span className="hidden sm:inline">Consulter</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                  className="h-7 px-2 text-xs hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <Share2 className="h-3 w-3 mr-1" />
                  <span className="hidden sm:inline">Partager</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownload}
                  className="h-7 px-2 text-xs hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <Download className="h-3 w-3 mr-1" />
                  <span className="hidden sm:inline">PDF</span>
                </Button>
              </div>
              {chapter.status === "coming" && (
                <span className="text-xs text-gray-500 italic">À venir</span>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
      <AtlasModal 
        chapter={chapter}
        category={category}
        open={showModal}
        onOpenChange={setShowModal}
      />
    </>
  );
});

AtlasCard.displayName = 'AtlasCard';

export { AtlasCard };