import { Button } from "@/components/ui/button";

interface CityPredictionsProps {
  predictions: string[];
  onSelect: (city: string) => void;
  visible: boolean;
}

export const CityPredictions = ({
  predictions,
  onSelect,
  visible,
}: CityPredictionsProps) => {
  if (!visible || predictions.length === 0) return null;

  return (
    <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
      {predictions.map((city) => (
        <Button
          key={city}
          variant="ghost"
          className="w-full justify-start px-4 py-2 text-sm hover:bg-secondary"
          onClick={() => onSelect(city)}
        >
          {city}
        </Button>
      ))}
    </div>
  );
};