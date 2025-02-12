
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
  const taxAmount = calculateTax(flight.price);
  const totalAmount = flight.price + taxAmount;

  const getAirlineUrl = (flight: Flight) => {
    const [datePart] = flight.departureDate.split(' ');
    const formattedDate = datePart.split('-').join('');
    
    const airlineUrls: { [key: string]: string } = {
      'UA': `https://www.united.com/ual/es/us/flight-search/book-a-flight/results/rev?f=${flight.origin}&t=${flight.destination}&d=${formattedDate}&tt=1&sc=7&px=1&taxng=1&idx=1`,
      'AA': `https://www.aa.com/booking/finds/${flight.origin}-${flight.destination}?locale=es_AR&numberOfAdults=1&departureDate=${datePart}`,
      'DL': `https://www.delta.com/flight-search/book-a-flight?cacheKeySuffix=SB&f=${flight.origin}&t=${flight.destination}&d=${datePart}&selectingFare=1&meetingEventCode=&refundableFlightsOnly=false&returnFromFlex=1&returnToFlex=1`
    };

    return airlineUrls[flight.airline.code] || '#';
  };

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
        <div className="space-y-2 text-right">
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="text-lg font-medium text-blue-900">
              Opción Smiles Club
              <PriceLevelIndicator priceLevel={flight.priceLevel} />
            </div>
            <div className="text-blue-600 font-bold">
              {flight.miles.toLocaleString()} millas
            </div>
            <div className="text-sm text-gray-600">
              + {formatCurrency(flight.price)} ARS
            </div>
            <div className="text-xs text-gray-500">
              Impuestos: {formatCurrency(taxAmount)} ARS
            </div>
            <div className="text-sm font-medium text-gray-900 mt-1 border-t border-blue-100 pt-1">
              Total: {formatCurrency(totalAmount)} ARS
            </div>
          </div>
          <div className="flex items-center justify-end space-x-2">
            <div className="text-sm font-medium text-gray-600">
              Precio en web: {formatUSD(flight.directPrice)}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.open(getAirlineUrl(flight), '_blank', 'noopener,noreferrer')}
              className="px-2"
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
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
