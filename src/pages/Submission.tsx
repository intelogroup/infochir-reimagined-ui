
import React, { useState } from "react";
import { MainLayout } from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save, Send, AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

import { SubmissionHeader } from "@/components/submission/SubmissionHeader";
import { PublicationTypeField } from "@/components/submission/PublicationTypeField";
import { ArticleDetailsFields } from "@/components/submission/ArticleDetailsFields";
import { CorrespondingAuthorFields } from "@/components/submission/CorrespondingAuthorFields";
import { AbstractField } from "@/components/submission/AbstractField";
import { DeclarationsFields } from "@/components/submission/DeclarationsFields";
import { MultiFileUploader } from "@/components/pdf/MultiFileUploader";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

const formSchema = z.object({
  publicationType: z.enum(["RHCA", "IGM"], {
    required_error: "Veuillez sélectionner un type de publication",
  }),
  title: z.string().min(1, "Le titre est requis").max(200, "Le titre ne doit pas dépasser 200 caractères"),
  authors: z.string().min(1, "Les auteurs sont requis"),
  institution: z.string().min(1, "L'institution est requise"),
  keywords: z.string()
    .min(1, "Les mots clés sont requis")
    .refine(
      (val) => val.split(",").length >= 3 && val.split(",").length <= 5,
      "Veuillez fournir entre 3 et 5 mots clés"
    ),
  correspondingAuthor: z.object({
    name: z.string().min(1, "Le nom est requis"),
    email: z.string().email("Email invalide"),
    phone: z.string().min(1, "Le téléphone est requis"),
    address: z.string().min(1, "L'adresse est requise"),
  }),
  abstract: z.string()
    .min(50, "Le résumé doit contenir au moins 50 mots")
    .max(250, "Le résumé ne doit pas dépasser 250 mots"),
  ethicsApproval: z.boolean(),
  noConflict: z.boolean(),
  originalWork: z.boolean(),
});

const Submission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [articleFiles, setArticleFiles] = useState<string[]>([]);
  const [imageAnnexes, setImageAnnexes] = useState<string[]>([]);
  const [formError, setFormError] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ethicsApproval: false,
      noConflict: false,
      originalWork: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Reset error state
    setFormError(null);

    if (articleFiles.length === 0) {
      setFormError("Veuillez uploader au moins un fichier d'article");
      toast.error("Veuillez uploader au moins un fichier d'article");
      return;
    }

    try {
      setIsSubmitting(true);
      const toastId = toast.loading("Soumission en cours...");

      const { data: userSession } = await supabase.auth.getSession();
      
      const { data, error } = await supabase
        .from('article_submissions')
        .insert({
          publication_type: values.publicationType,
          title: values.title,
          authors: values.authors,
          institution: values.institution,
          keywords: values.keywords,
          abstract: values.abstract,
          corresponding_author_name: values.correspondingAuthor.name,
          corresponding_author_email: values.correspondingAuthor.email,
          corresponding_author_phone: values.correspondingAuthor.phone,
          corresponding_author_address: values.correspondingAuthor.address,
          ethics_approval: values.ethicsApproval,
          no_conflict: values.noConflict,
          original_work: values.originalWork,
          article_files_urls: articleFiles,
          image_annexes_urls: imageAnnexes,
          user_id: userSession?.session?.user?.id,
          status: 'pending'
        })
        .select()
        .single();

      if (error) {
        console.error("Submission error:", error);
        setFormError(`Erreur lors de la soumission: ${error.message}`);
        toast.error("Une erreur est survenue lors de l'envoi", { id: toastId });
        throw error;
      }

      toast.success("Votre soumission a été envoyée avec succès!", { id: toastId });
      
      // Short delay before redirecting to show success message
      setTimeout(() => {
        // Redirect based on publication type
        if (values.publicationType === 'RHCA') {
          navigate('/rhca');
        } else {
          navigate('/igm');
        }
      }, 1500);
    } catch (error: any) {
      console.error('Submission error:', error);
      setFormError(error.message || "Une erreur est survenue lors de l'envoi de votre soumission");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <div className="relative min-h-screen">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)]" />
        
        <div className="relative max-w-4xl mx-auto px-4 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <SubmissionHeader />

            {formError && (
              <Alert variant="destructive" className="animate-in fade-in slide-in-from-top">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Erreur</AlertTitle>
                <AlertDescription>{formError}</AlertDescription>
              </Alert>
            )}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-8 bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-gray-100">
                  <PublicationTypeField form={form} disabled={isSubmitting} />
                  <ArticleDetailsFields form={form} disabled={isSubmitting} />
                  <CorrespondingAuthorFields form={form} disabled={isSubmitting} />
                  <AbstractField form={form} disabled={isSubmitting} />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Fichiers de l'article</h3>
                    <MultiFileUploader
                      bucket="article_files"
                      acceptedFileTypes={{
                        'application/pdf': ['.pdf'],
                        'application/msword': ['.doc'],
                        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
                      }}
                      maxFileSize={10}
                      maxFiles={20}
                      onUploadComplete={setArticleFiles}
                      helperText="Formats acceptés: DOC, DOCX, PDF. Taille max: 10MB. Maximum 20 fichiers"
                    />
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Images et annexes</h3>
                    <MultiFileUploader
                      bucket="article_annexes"
                      acceptedFileTypes={{
                        'image/*': ['.png', '.jpg', '.jpeg', '.gif']
                      }}
                      maxFileSize={5}
                      maxFiles={20}
                      onUploadComplete={setImageAnnexes}
                      helperText="Formats acceptés: PNG, JPEG, GIF. Taille max: 5MB. Maximum 20 fichiers"
                      type="image"
                    />
                  </div>

                  <DeclarationsFields form={form} disabled={isSubmitting} />
                </div>

                <div className="flex justify-end space-x-4">
                  <Button 
                    type="button" 
                    variant="outline"
                    className="gap-2"
                    disabled={isSubmitting}
                  >
                    <Save className="h-4 w-4" />
                    Sauvegarder comme brouillon
                  </Button>
                  <Button 
                    type="submit"
                    className="gap-2 relative"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin h-4 w-4 mr-1 border-2 border-r-transparent rounded-full border-white"></div>
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Soumettre l'article
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>

            {isSubmitting && (
              <div className="fixed inset-0 bg-black/5 backdrop-blur-sm flex items-center justify-center z-50 pointer-events-none">
                <div className="bg-white rounded-lg p-6 shadow-lg animate-in fade-in duration-300 max-w-md w-full mx-4">
                  <LoadingSpinner size="md" variant="medical" text="Soumission en cours" />
                  <p className="text-center text-sm text-gray-500 mt-4">Veuillez patienter pendant le traitement de votre soumission...</p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Submission;
