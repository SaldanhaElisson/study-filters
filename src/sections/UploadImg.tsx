import { Input } from "@/components/ui/input"

interface UploadImgProps {
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    fileName: string | undefined
}

function UploadImg({ handleFileChange, fileName }: UploadImgProps) {
    const hasFile = !!fileName;
    return (
        <>
            <Input type="file" placeholder="Escolha uma imagem" className="w-max" onChange={handleFileChange} />
            {
                hasFile ? (
                    <div className="text-sm font-medium text-green-600 dark:text-green-400">
                        ✅ Arquivo selecionado: **{fileName}**
                    </div>
                ) : (
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        Nenhum arquivo escolhido
                    </div>
                )
            }
        </>
    )
}

export default UploadImg