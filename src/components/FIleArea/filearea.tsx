import React, { useEffect, useRef, useState } from "react";

import { Upload } from "lucide-react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

import { FileAreaTypeProps } from "./types";

import LoadingComponent from "../LoadingComponent/loading";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp"
];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const FileArea = ({
  handleFileChange,
  className,
  error,
  defaultFileName,
  loading
}: FileAreaTypeProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string | undefined>();
  const [preview, setPreview] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  useEffect(() => {
    if (defaultFileName) {
      if (typeof defaultFileName === "string") {
        setFileName(defaultFileName.split("/").pop() || "image");
        setPreview(defaultFileName);
      } else if (defaultFileName instanceof File) {
        setFileName(defaultFileName.name);
        setPreview(URL.createObjectURL(defaultFileName));
      }
    }
  }, [defaultFileName]);

  const validateAndHandleFile = (file: File) => {
    setFileError(null);

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      setFileError("Apenas imagens JPG, PNG ou WEBP são aceitas");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setFileError("Imagem deve ter no máximo 5MB");
      return;
    }

    setFileName(file.name);
    setPreview(URL.createObjectURL(file));
    handleFileChange(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) validateAndHandleFile(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) validateAndHandleFile(file);
  };

  const openFileExplorer = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <div
        className={twMerge(
          "cursor-pointer rounded-[10px] border border-[#AD4C24] px-12 py-4 text-center transition-all hover:bg-[#AD4C24]/5",
          className
        )}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={openFileExplorer}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <LoadingComponent className="h-8 w-8" />
          </div>
        ) : preview ? (
          <div className="flex flex-col items-center gap-2">
            <div className="relative h-32 w-32">
              <Image
                src={preview}
                alt="Preview"
                fill
                className="rounded-lg object-cover"
              />
            </div>
            <span className="text-intense-purple line-clamp-2 max-w-44 text-sm">
              {fileName}
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Upload color="#AD4C24" className="h-10 w-10" />
            <span className="text-intense-purple font-medium">
              Clique aqui e adicione uma foto
            </span>
            <span className="text-xs text-gray-500">
              JPG, PNG ou WEBP (máx. 5MB)
            </span>
          </div>
        )}
        <input
          type="file"
          className="hidden"
          onChange={handleInputChange}
          ref={fileInputRef}
          accept={ACCEPTED_IMAGE_TYPES.join(",")}
        />
      </div>
      {(error || fileError) && (
        <p className="mt-2 text-center text-xs text-[#EB473D]">
          {error || fileError}
        </p>
      )}
    </div>
  );
};
