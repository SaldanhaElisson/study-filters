import { Input } from '@/components/ui/input'


interface CutOffProps {
    handleCutOff: (cutOffValue: number) => void;
}

export const CutOffInput = ({ handleCutOff }: CutOffProps) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = event.target.value;
        const numericValue = parseFloat(rawValue) || 0;

        handleCutOff(numericValue);
    };
    return (
        <Input placeholder="Escolha um valor para o CutOff" className="w-max" type="number" onChange={handleChange} />
    )
}
