import { Input } from "@/components/ui/input"

interface UploadImgProps {
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function UploadImg({ handleFileChange }: UploadImgProps) {
    return (
        <Input type="file" placeholder="Escolha uma imagem" className="w-max" onChange={handleFileChange} />
    )
}

export default UploadImg