
import { Button } from "@/components/ui/button";
import { Download, Share2, ExternalLink, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface TableActionsProps {
  articleId: string;
  pdfUrl?: string;
}

export const TableActions = ({ articleId, pdfUrl }: TableActionsProps) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/index-medicus/articles/${articleId}`;
    navigator.clipboard.writeText(shareUrl);
    toast.success("Lien copié dans le presse-papier");
  };

  const handleDownload = async () => {
    if (!pdfUrl) {
      toast.error("Le PDF n'est pas encore disponible");
      return;
    }

    setIsDownloading(true);
    try {
      if (pdfUrl.includes('article-pdfs')) {
        const { data: signedUrl, error } = await supabase
          .storage
          .from('article-pdfs')
          .createSignedUrl(pdfUrl, 60);

        if (error) throw error;
        window.open(signedUrl.signedUrl, '_blank');
      } else {
        window.open(pdfUrl, '_blank');
      }
      toast.success("Ouverture du PDF...");
    } catch (error) {
      console.error('Download error:', error);
      toast.error("Erreur lors du téléchargement du PDF");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex justify-end items-center space-x-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={handleShare}
        className="hover:bg-muted"
      >
        <Share2 className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleDownload}
        className="hover:bg-muted"
        disabled={isDownloading}
      >
        {isDownloading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Download className="h-4 w-4" />
        )}
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => window.open(`/index-medicus/articles/${articleId}`, '_blank')}
        className="hover:bg-muted"
      >
        <ExternalLink className="h-4 w-4" />
      </Button>
    </div>
  );
};
