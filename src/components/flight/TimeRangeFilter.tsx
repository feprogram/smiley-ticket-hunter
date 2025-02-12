
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type TimeRange = 'all' | 'morning' | 'afternoon' | 'evening' | 'night';

interface TimeRangeFilterProps {
  value: TimeRange;
  onValueChange: (value: TimeRange) => void;
}

export const TimeRangeFilter = ({ value, onValueChange }: TimeRangeFilterProps) => {
  return (
    <Select value={value} onValueChange={(val) => onValueChange(val as TimeRange)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filtrar por horario" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Todos los horarios</SelectItem>
        <SelectItem value="morning">Mañana (6:00 - 11:59)</SelectItem>
        <SelectItem value="afternoon">Tarde (12:00 - 17:59)</SelectItem>
        <SelectItem value="evening">Noche (18:00 - 23:59)</SelectItem>
        <SelectItem value="night">Madrugada (00:00 - 5:59)</SelectItem>
      </SelectContent>
    </Select>
  );
};
