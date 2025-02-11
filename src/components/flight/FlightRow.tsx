
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { Flight } from "@/types/flight";
import { formatCurrency } from "@/lib/utils";
import { formatUSD, calculateTax } from "@/utils/flightUtils";
import { PriceLevelIndicator } from "./PriceLevelIndicator";

interface FlightRowProps {
  flight: Flight;
  onRedirect: (flight: Flight) => void;
}

export const FlightRow = ({ flight, onRedirect }: FlightRowProps) => {
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center space-x-2">
          <img 
            src={flight.airline.logo} 
            alt={flight.airline.name}
            className="w-6 h-6 object-contain"
          />
          <div>
            <div className="font-medium">{flight.airline.name}</div>
            <div className="text-sm text-gray-500">{flight.origin} → {flight.destination}</div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="space-y-1">
          <div className="font-medium">{flight.departureDate}</div>
          <div className="text-sm text-gray-500">{flight.arrivalDate}</div>
        </div>
      </TableCell>
      <TableCell>{flight.duration}</TableCell>
      <TableCell>
        {flight.stops === 0 ? (
          <span className="text-green-600">Directo</span>
        ) : (
          <span>{flight.stops} parada(s)</span>
        )}
      </TableCell>
      <TableCell>
        <div className="space-y-1 text-right">
          <div className="font-medium">
            Precio con millas: {formatCurrency(flight.price)}
            <PriceLevelIndicator priceLevel={flight.priceLevel} />
          </div>
          <div className="text-sm text-gray-500">
            Precio en web: {formatUSD(flight.directPrice)}
          </div>
          <div className="text-sm text-gray-500">
            Impuestos: {formatCurrency(calculateTax(flight.price))}
          </div>
          <div className="text-sm font-medium text-gray-900">
            Total: {formatCurrency(flight.price + calculateTax(flight.price))}
          </div>
          <div className="text-sm text-blue-600">
            {flight.miles.toLocaleString()} millas
          </div>
        </div>
      </TableCell>
      <TableCell>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onRedirect(flight)}
          className="w-full"
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          Ver en Smiles
        </Button>
      </TableCell>
    </TableRow>
  );
};
