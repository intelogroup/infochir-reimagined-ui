import { useState } from "react";
import { useArticles } from "@/hooks/use-articles";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { IssuesList } from "../issues/IssuesList";
import { IssuesSearch } from "../issues/IssuesSearch";

export const RHCAArticlesGrid = () => {
  const { isLoading, error, filteredIssues, setFilteredIssues, refreshArticles } = useArticles();
  const [searchTerm, setSearchTerm] = useState("");

  const handleRefresh = async () => {
    try {
      await refreshArticles();
      toast.success("Articles rafraîchis avec succès");
    } catch (error) {
      console.error("Error refreshing articles:", error);
      toast.error("Erreur lors du rafraîchissement des articles");
    }
  };

  if (error) {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription className="flex items-center justify-between">
          <span>Une erreur est survenue lors du chargement des articles.</span>
          <button 
            onClick={handleRefresh}
            className="text-primary hover:underline flex items-center gap-2"
          >
            <Loader2 className="h-4 w-4 animate-spin" />
            Réessayer
          </button>
        </AlertDescription>
      </Alert>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!Array.isArray(filteredIssues)) {
    console.error("filteredIssues must be an array");
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Une erreur est survenue lors du traitement des données.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <IssuesSearch
          onSearch={setSearchTerm}
          filteredIssues={filteredIssues}
          setFilteredIssues={setFilteredIssues}
        />
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <IssuesList issues={filteredIssues} />
      </div>
    </div>
  );
};