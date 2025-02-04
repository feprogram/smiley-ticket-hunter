import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface PassengerSelectProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const PassengerSelect = ({
  value,
  onChange,
  className,
}: PassengerSelectProps) => {
  return (
    <div className={cn("space-y-2", className)}>
      <Label>Passengers</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="h-12 bg-white/50 backdrop-blur-sm">
          <SelectValue placeholder="Select passengers" />
        </SelectTrigger>
        <SelectContent>
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <SelectItem key={num} value={num.toString()}>
              {num} {num === 1 ? "passenger" : "passengers"}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};