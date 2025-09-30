import React, { useCallback, useEffect, useRef, useState } from "react";

import { File, Upload } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { FileAreaTypeProps } from "./types";
import LoadingComponent from "../LoadingComponent/loading";

export const FileArea = ({
  handleFileChange,
  className,
  error,
  defaultFileName,
  internalText,
  loading
}: FileAreaTypeProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isUploadSuccess, setIsUploadSuccess] = useState(false);
  const [fileName, setFileName] = useState<string | undefined>();
  const [fileTypeError, setFileTypeError] = useState(false);

  const acceptedFileTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ];

  useEffect(() => {
    if (defaultFileName) {
      setFileName(defaultFileName.name);
      setIsUploadSuccess(true);
    }
  }, [defaultFileName]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setFileTypeError(false);
    const files = e.dataTransfer.files;
    handleFiles(files);
  }, []);

  const handleFiles = (files: FileList | null) => {
    if (files) {
      for (const file of Array.from(files)) {
        if (!acceptedFileTypes.includes(file.type)) {
          setFileTypeError(true);
          return;
        }
        setFileName(file.name);
        handleFileChange(file);
        setIsUploadSuccess(true);
      }
    }
  };

  const openFileExplorer = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <div
        className={twMerge(
          "cursor-pointer rounded-[10px] border border-[#AD4C24] px-12 py-4 text-center transition-all",
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
        ) : isUploadSuccess && !fileTypeError ? (
          <div className="flex flex-col items-center justify-between gap-2">
            <File color="#AD4C24 " size={12} />
            <span className="line-clamp-2 text-intense-purple">{fileName}</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Upload color="#AD4C24 " className="h-10 w-10" />
            <span className="font-medium text-intense-purple">
              Clique aqui e adicione fotos
            </span>
          </div>
        )}
        <input
          type="file"
          className="hidden"
          multiple
          onChange={(e) => {
            setFileTypeError(false);
            handleFiles(e.target.files);
          }}
          ref={fileInputRef}
          accept={acceptedFileTypes.join(",")}
        />
      </div>
      <p className="mt-2 text-center text-[#EB473D]">
        {error || (fileTypeError && "Tipo de arquivo não suportado")}
      </p>
    </div>
  );
};
