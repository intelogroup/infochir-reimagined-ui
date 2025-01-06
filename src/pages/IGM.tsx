import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { LayoutGrid, List, BookOpen, Users, MessageCircle, Check } from "lucide-react";
import { MainLayout } from "@/components/layouts/MainLayout";
import { IssuesGrid } from "@/components/igm/IssuesGrid";

const IGM = () => {
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#F1F0FB]">
        <div className="container max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-6 py-4 lg:py-8 pt-20">
          <Link to="/" className="inline-block mb-4 sm:mb-6">
            <Button variant="ghost" size="sm" className="gap-2 text-primary hover:text-primary-light">
              <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
              Retour
            </Button>
          </Link>

          <div className="text-center mb-8 sm:mb-12 animate-fade-up">
            <img 
              src="/lovable-uploads/990cb3a8-bdd0-46d9-8fe7-b258ccd9c691.png"
              alt="IGM Logo"
              className="h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 mx-auto mb-4 sm:mb-6 object-contain"
            />
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-3 sm:mb-4">
              Info Gazette Médicale
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto mb-8 sm:mb-12 px-2">
              Votre source d'information médicale de référence en Haïti.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr,400px] gap-4 sm:gap-6 lg:gap-8">
            <div>
              <div className="flex justify-end mb-4 sm:mb-6">
                <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value as "grid" | "table")}>
                  <ToggleGroupItem value="grid" size="sm" className="px-2 sm:px-3">
                    <LayoutGrid className="h-3 w-3 sm:h-4 sm:w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="table" size="sm" className="px-2 sm:px-3">
                    <List className="h-3 w-3 sm:h-4 sm:w-4" />
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
              <div className="bg-white rounded-lg p-3 sm:p-4 lg:p-6 shadow-sm">
                <IssuesGrid viewMode={viewMode} />
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4 sm:gap-6 content-start">
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-primary mb-3 sm:mb-4 flex items-center gap-2">
                  <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />
                  Soumission d'articles
                </h2>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                  Nous accueillons les articles originaux, les revues systématiques, les cas cliniques et les lettres à l'éditeur.
                </p>
                <Button className="w-full bg-ocean hover:bg-ocean-hover text-white text-sm sm:text-base">
                  Soumettre un manuscrit
                </Button>
              </div>

              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <h2 className="text-xl sm:text-2xl font-semibold text-primary mb-4 flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Instructions aux auteurs
                </h2>
                <p className="text-gray-600 mb-6">
                  Consultez nos directives détaillées pour la préparation et la soumission de votre manuscrit.
                </p>
                <Button variant="outline" className="w-full text-ocean hover:bg-ocean hover:text-white border-ocean">
                  Voir les directives
                </Button>
              </div>

              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <h2 className="text-xl sm:text-2xl font-semibold text-primary mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Comité éditorial
                </h2>
                <p className="text-gray-600 mb-6">
                  Notre comité éditorial est composé d'experts reconnus dans leurs domaines respectifs.
                </p>
                <Link to="/igm/editorial-committee" className="block">
                  <Button variant="outline" className="w-full text-ocean hover:bg-ocean hover:text-white border-ocean">
                    Découvrir l'équipe
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12 lg:mt-16 bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-gray-100 max-w-3xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-semibold text-primary mb-4 flex items-center gap-2">
              <Check className="h-5 w-5" />
              Notre Mission
            </h2>
            <p className="text-gray-600 mb-6">
              L'Info Gazette Médicale (IGM) est une publication périodique dédiée à l'information médicale en Haïti. Notre mission est de fournir des informations actualisées et pertinentes sur les avancées médicales et les pratiques cliniques.
            </p>
            <div className="grid sm:grid-cols-2 gap-6 text-left">
              <div>
                <h3 className="font-semibold text-primary mb-2">Objectifs</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Diffuser l'information médicale</li>
                  <li>Promouvoir la recherche locale</li>
                  <li>Améliorer les pratiques cliniques</li>
                  <li>Faciliter le partage des connaissances</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-primary mb-2">Impact</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Publication mensuelle</li>
                  <li>Réseau national de contributeurs</li>
                  <li>Actualités médicales vérifiées</li>
                  <li>Formation continue</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default IGM;
