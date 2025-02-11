
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FlightFilterProps {
  value: 'all' | 'direct' | 'with-stops';
  onValueChange: (value: string) => void;
}

export const FlightFilter = ({ value, onValueChange }: FlightFilterProps) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filtrar por paradas" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Todos los vuelos</SelectItem>
        <SelectItem value="direct">Solo vuelos directos</SelectItem>
        <SelectItem value="with-stops">Vuelos con escalas</SelectItem>
      </SelectContent>
    </Select>
  );
};
