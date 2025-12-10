import type { UseFileUploaderProps, UseFileUploaderReturn, FileData } from "./type";

export const useFileUploader = ({ setFile }: UseFileUploaderProps): UseFileUploaderReturn => {


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (files && files.length > 0) {
            const file = files[0];
            const reader = new FileReader();

            reader.onload = () => {
                if (typeof reader.result === "string") {
                    const newFileItem: FileData = {
                        id: `${file.name}-${Date.now()}-${Math.random()}`,
                        name: file.name,
                        url: reader.result,
                        file: file,
                    };

                    setFile(newFileItem);
                }
            }

            reader.readAsDataURL(file);
        }

        event.target.value = '';
    }

    return {
        handleFileChange,
    }

}