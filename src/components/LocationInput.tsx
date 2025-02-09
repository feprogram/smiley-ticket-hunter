
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { CityPredictions } from "./CityPredictions";

// Lista de ciudades expandida incluyendo ciudades de Estados Unidos
const CITIES = [
  // Argentina
  "Buenos Aires, Argentina",
  "Córdoba, Argentina",
  "Rosario, Argentina",
  "Mendoza, Argentina",
  "Mar del Plata, Argentina",
  "Salta, Argentina",
  "San Carlos de Bariloche, Argentina",
  "Tucumán, Argentina",
  "Ushuaia, Argentina",
  "Puerto Iguazú, Argentina",
  // Estados Unidos
  "New York, Estados Unidos",
  "Los Angeles, Estados Unidos",
  "Chicago, Estados Unidos",
  "Houston, Estados Unidos",
  "Phoenix, Estados Unidos",
  "Philadelphia, Estados Unidos",
  "San Antonio, Estados Unidos",
  "San Diego, Estados Unidos",
  "Dallas, Estados Unidos",
  "San Francisco, Estados Unidos",
  "Miami, Estados Unidos",
  "Las Vegas, Estados Unidos",
  "Orlando, Estados Unidos",
  "Washington DC, Estados Unidos",
  "Boston, Estados Unidos"
];

interface LocationInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  className?: string;
}

export const LocationInput = ({
  label,
  value,
  onChange,
  placeholder,
  className,
}: LocationInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [predictions, setPredictions] = useState<string[]>([]);
  const [showPredictions, setShowPredictions] = useState(false);

  useEffect(() => {
    if (value.length >= 2) {
      const filtered = CITIES.filter((city) =>
        city.toLowerCase().includes(value.toLowerCase())
      );
      setPredictions(filtered);
      setShowPredictions(true);
    } else {
      setPredictions([]);
      setShowPredictions(false);
    }
  }, [value]);

  const handleSelect = (city: string) => {
    onChange(city);
    setShowPredictions(false);
  };

  return (
    <div className={cn("space-y-2 relative", className)}>
      <Label
        className={cn(
          "transition-colors duration-200",
          isFocused ? "text-primary" : "text-foreground"
        )}
      >
        {label}
      </Label>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => {
          setIsFocused(true);
          setShowPredictions(true);
        }}
        onBlur={() => {
          setIsFocused(false);
          setTimeout(() => setShowPredictions(false), 200);
        }}
        placeholder={placeholder}
        className="h-12 bg-white/50 backdrop-blur-sm border-gray-200 hover:border-primary focus:border-primary transition-colors duration-200"
      />
      <CityPredictions
        predictions={predictions}
        onSelect={handleSelect}
        visible={showPredictions}
      />
    </div>
  );
};
