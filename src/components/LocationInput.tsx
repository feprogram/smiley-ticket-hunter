
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

interface GroupedAirports {
  city: string;
  country: string;
  airports: typeof airports;
}

export const LocationInput = ({
  label,
  value,
  onChange,
  placeholder,
  className,
}: LocationInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [predictions, setPredictions] = useState<GroupedAirports[]>([]);
  const [showPredictions, setShowPredictions] = useState(false);

  useEffect(() => {
    if (value.length >= 2) {
      const filtered = airports.filter((airport) =>
        airport.code.toLowerCase().includes(value.toLowerCase()) ||
        airport.city.toLowerCase().includes(value.toLowerCase()) ||
        airport.name.toLowerCase().includes(value.toLowerCase())
      );

      // Agrupar aeropuertos por ciudad
      const groupedByCity = filtered.reduce((acc: GroupedAirports[], airport) => {
        const existingCity = acc.find(group => group.city === airport.city);
        if (existingCity) {
          existingCity.airports.push(airport);
        } else {
          acc.push({
            city: airport.city,
            country: airport.country,
            airports: [airport]
          });
        }
        return acc;
      }, []);

      setPredictions(groupedByCity);
      setShowPredictions(true);
    } else {
      setPredictions([]);
      setShowPredictions(false);
    }
  }, [value]);

  const handleSelect = (value: string) => {
    onChange(value);
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
          {predictions.map((group) => (
            <div key={group.city} className="border-b border-gray-100 last:border-b-0">
              <button
                className="w-full text-left px-4 py-2 text-sm hover:bg-secondary font-medium"
                onClick={() => handleSelect(group.airports[0].code)}
              >
                {group.city}, {group.country}
              </button>
              {group.airports.map((airport) => (
                <button
                  key={airport.code}
                  className="w-full text-left px-8 py-2 text-sm hover:bg-secondary"
                  onClick={() => handleSelect(airport.code)}
                >
                  <span className="font-semibold">{airport.code}</span> - {airport.name}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
