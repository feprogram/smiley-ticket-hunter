import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface ClassSelectProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const ClassSelect = ({ value, onChange, className }: ClassSelectProps) => {
  return (
    <div className={cn("space-y-2", className)}>
      <Label>Cabin Class</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="h-12 bg-white/50 backdrop-blur-sm">
          <SelectValue placeholder="Select class" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="economy">Economy</SelectItem>
          <SelectItem value="premium">Premium Economy</SelectItem>
          <SelectItem value="business">Business</SelectItem>
          <SelectItem value="first">First Class</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};