import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

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

  return (
    <div className={cn("space-y-2", className)}>
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
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className="h-12 bg-white/50 backdrop-blur-sm border-gray-200 hover:border-primary focus:border-primary transition-colors duration-200"
      />
    </div>
  );
};