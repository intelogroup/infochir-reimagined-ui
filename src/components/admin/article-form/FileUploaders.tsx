
import { MultiFileUploader } from "@/components/pdf/MultiFileUploader";
import { Dispatch, SetStateAction } from "react";

export interface FileUploadersProps {
  setArticleFilesUrls: Dispatch<SetStateAction<string[]>>;
  setImageAnnexesUrls: Dispatch<SetStateAction<string[]>>;
  errors?: { [key: string]: string };
}

export const FileUploaders = ({
  setArticleFilesUrls,
  setImageAnnexesUrls,
  errors
}: FileUploadersProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Fichiers de l'article</h3>
        <MultiFileUploader
          bucket="article_files"
          acceptedFileTypes={{
            'application/pdf': ['.pdf'],
            'application/msword': ['.doc'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
          }}
          maxFileSize={30}
          maxFiles={3}
          onUploadComplete={setArticleFilesUrls}
          helperText="Formats acceptés: DOC, DOCX, PDF. Taille max: 30MB"
        />
        {errors?.files && (
          <p className="mt-1 text-sm text-red-500">{errors.files}</p>
        )}
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Images et annexes</h3>
        <MultiFileUploader
          bucket="article_annexes"
          acceptedFileTypes={{
            'image/*': ['.png', '.jpg', '.jpeg', '.gif']
          }}
          maxFileSize={30}
          maxFiles={5}
          onUploadComplete={setImageAnnexesUrls}
          helperText="Formats acceptés: PNG, JPEG, GIF. Taille max: 30MB"
          type="image"
        />
      </div>
    </div>
  );
};
