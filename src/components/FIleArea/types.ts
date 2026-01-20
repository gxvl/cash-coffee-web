export interface FileAreaTypeProps {
  handleFileChange: (file: File) => void;
  className?: string;
  error?: string;
  defaultFileName?: File | string;
  internalText?: string;
  loading?: boolean;
  acceptedFileTypes?: string[];
}
