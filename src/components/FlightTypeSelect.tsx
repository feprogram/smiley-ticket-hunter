import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

interface FlightTypeSelectProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const FlightTypeSelect = ({
  value,
  onChange,
  className,
}: FlightTypeSelectProps) => {
  return (
    <div className={cn("space-y-2", className)}>
      <Label>Tipo de Vuelo</Label>
      <RadioGroup
        value={value}
        onValueChange={onChange}
        className="flex flex-wrap gap-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="roundtrip" id="roundtrip" />
          <Label htmlFor="roundtrip" className="cursor-pointer">
            Ida y Vuelta
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="oneway" id="oneway" />
          <Label htmlFor="oneway" className="cursor-pointer">
            Solo Ida
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="multicity" id="multicity" />
          <Label htmlFor="multicity" className="cursor-pointer">
            Multidestino
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};