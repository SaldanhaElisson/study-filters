export interface FileData {
    id: string;
    name: string;
    url: string;
    file: File;
}

export interface UseFileUploaderReturn {
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface UseFileUploaderProps {
    setFile: React.Dispatch<React.SetStateAction<FileData | undefined>>;
}