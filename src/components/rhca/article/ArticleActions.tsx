
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface ArticleActionsProps {
  id: string;
  volume: string;
  date: string;
  pdfFileName?: string;
}

export const ArticleActions: React.FC<ArticleActionsProps> = ({ 
  id,
  pdfFileName
}) => {
  const [isDownloading, setIsDownloading] = React.useState(false);

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!pdfFileName) {
      toast.error("PDF non disponible");
      return;
    }

    setIsDownloading(true);

    try {
      // First get the article from database to ensure it exists
      const { data: article, error: articleError } = await supabase
        .from('articles')
        .select('id, pdf_url')
        .eq('id', id)
        .single();

      if (articleError || !article) {
        console.error('Article not found:', articleError);
        toast.error("Article non trouvé dans la base de données");
        return;
      }

      // Then check if the file exists in storage
      const { data: fileExists } = await supabase
        .storage
        .from('rhca-pdfs')
        .list('', {
          search: pdfFileName
        });

      if (!fileExists || fileExists.length === 0) {
        console.error(`File ${pdfFileName} not found in bucket`);
        toast.error("Ce PDF n'est pas encore disponible dans notre système");
        return;
      }

      // Download the file
      const { data, error } = await supabase
        .storage
        .from('rhca-pdfs')
        .download(pdfFileName);

      if (error) {
        console.error('Download error:', error);
        toast.error("Erreur lors du téléchargement du fichier");
        return;
      }

      if (!data) {
        toast.error("Le fichier PDF n'existe pas");
        return;
      }

      // Create URL and trigger download
      const url = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.download = pdfFileName;
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
      
      // Update download count in the database
      const { error: updateError } = await supabase
        .from('articles')
        .update({ 
          downloads: article.downloads ? article.downloads + 1 : 1,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (updateError) {
        console.error('Error updating download count:', updateError);
      }

      toast.success("Téléchargement réussi");
    } catch (error) {
      console.error('Download error:', error);
      toast.error("Une erreur est survenue lors du téléchargement");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="flex-1 lg:flex-none gap-2 bg-white hover:bg-gray-50"
      onClick={handleDownload}
      disabled={isDownloading}
      aria-label={pdfFileName ? "Télécharger le PDF" : "PDF non disponible"}
    >
      <Download className="h-4 w-4" aria-hidden="true" />
      <span>{isDownloading ? "Chargement..." : "PDF"}</span>
    </Button>
  );
};
