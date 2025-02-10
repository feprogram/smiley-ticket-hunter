
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { airports } from "@/data/airports";

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
  const [predictions, setPredictions] = useState<typeof airports>([]);
  const [showPredictions, setShowPredictions] = useState(false);

  useEffect(() => {
    if (value.length >= 2) {
      const filtered = airports.filter((airport) =>
        airport.code.toLowerCase().includes(value.toLowerCase()) ||
        airport.city.toLowerCase().includes(value.toLowerCase()) ||
        airport.name.toLowerCase().includes(value.toLowerCase())
      );
      setPredictions(filtered);
      setShowPredictions(true);
    } else {
      setPredictions([]);
      setShowPredictions(false);
    }
  }, [value]);

  const handleSelect = (airport: typeof airports[0]) => {
    onChange(airport.code);
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
      {showPredictions && predictions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
          {predictions.map((airport) => (
            <button
              key={airport.code}
              className="w-full text-left px-4 py-2 text-sm hover:bg-secondary"
              onClick={() => handleSelect(airport)}
            >
              <span className="font-semibold">{airport.code}</span> - {airport.city}
              <br />
              <span className="text-xs text-gray-500">{airport.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
