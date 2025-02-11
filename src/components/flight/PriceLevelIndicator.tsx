
import { TrendingDown, TrendingUp, Minus } from "lucide-react";

interface PriceLevelIndicatorProps {
  priceLevel: 'low' | 'normal' | 'high';
}

export const PriceLevelIndicator = ({ priceLevel }: PriceLevelIndicatorProps) => {
  switch (priceLevel) {
    case 'low':
      return <TrendingDown className="text-green-500 inline-block ml-1" size={16} />;
    case 'high':
      return <TrendingUp className="text-red-500 inline-block ml-1" size={16} />;
    default:
      return <Minus className="text-gray-500 inline-block ml-1" size={16} />;
  }
};
