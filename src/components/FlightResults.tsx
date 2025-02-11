import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Flight } from "@/types/flight";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ExternalLink, ArrowUpDown, TrendingDown, TrendingUp, Minus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FlightResultsProps {
  flights: Flight[];
}

type SortField = 'departureDate' | 'airline' | 'price';

export const FlightResults = ({ flights: initialFlights }: FlightResultsProps) => {
  const [flights, setFlights] = useState(initialFlights);
  const [stopFilter, setStopFilter] = useState<'all' | 'direct' | 'with-stops'>('all');
  const [sortConfig, setSortConfig] = useState<{
    field: SortField;
    direction: 'asc' | 'desc';
  } | null>(null);

  if (!flights.length) return null;

  const handleSort = (field: SortField) => {
    let direction: 'asc' | 'desc' = 'asc';

    if (sortConfig?.field === field && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    const sortedFlights = [...flights].sort((a, b) => {
      if (field === 'departureDate') {
        return direction === 'asc' 
          ? new Date(a.departureDate).getTime() - new Date(b.departureDate).getTime()
          : new Date(b.departureDate).getTime() - new Date(a.departureDate).getTime();
      }
      if (field === 'airline') {
        return direction === 'asc'
          ? a.airline.name.localeCompare(b.airline.name)
          : b.airline.name.localeCompare(a.airline.name);
      }
      if (field === 'price') {
        return direction === 'asc'
          ? a.price - b.price
          : b.price - a.price;
      }
      return 0;
    });

    setFlights(sortedFlights);
    setSortConfig({ field, direction });
  };

  const handleStopFilterChange = (value: string) => {
    setStopFilter(value as 'all' | 'direct' | 'with-stops');
    
    let filteredFlights = [...initialFlights];
    if (value === 'direct') {
      filteredFlights = filteredFlights.filter(flight => flight.stops === 0);
    } else if (value === 'with-stops') {
      filteredFlights = filteredFlights.filter(flight => flight.stops > 0);
    }
    
    setFlights(filteredFlights);
  };

  const handleRedirectToSmiles = (flight: Flight) => {
    const formattedDate = flight.departureDate.split(' ')[0];
    const baseUrl = "https://www.smiles.com.ar/emission";
    const params = new URLSearchParams({
      originAirportCode: flight.origin,
      destinationAirportCode: flight.destination,
      departureDate: formattedDate,
      adults: '1',
      children: '0',
      infants: '0',
      cabinType: 'all',
      tripType: 'oneWay'
    });
    window.open(`${baseUrl}?${params.toString()}`, '_blank');
  };

  const calculateTax = (price: number) => price * 0.75;

  const getPriceLevelIcon = (priceLevel: 'low' | 'normal' | 'high') => {
    switch (priceLevel) {
      case 'low':
        return <TrendingDown className="text-green-500 inline-block ml-1" size={16} />;
      case 'high':
        return <TrendingUp className="text-red-500 inline-block ml-1" size={16} />;
      default:
        return <Minus className="text-gray-500 inline-block ml-1" size={16} />;
    }
  };

  const formatUSD = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Vuelos Disponibles ({flights.length})</h2>
        <Select value={stopFilter} onValueChange={handleStopFilterChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por paradas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los vuelos</SelectItem>
            <SelectItem value="direct">Solo vuelos directos</SelectItem>
            <SelectItem value="with-stops">Vuelos con escalas</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Aerolínea</TableHead>
            <TableHead>
              <button 
                onClick={() => handleSort('departureDate')}
                className="flex items-center space-x-2"
              >
                <span>Fecha y Hora</span>
                <ArrowUpDown className="h-4 w-4" />
              </button>
            </TableHead>
            <TableHead>Duración</TableHead>
            <TableHead>Paradas</TableHead>
            <TableHead className="text-right">
              <button 
                onClick={() => handleSort('price')}
                className="flex items-center space-x-2 ml-auto"
              >
                <span>Precio</span>
                <ArrowUpDown className="h-4 w-4" />
              </button>
            </TableHead>
            <TableHead>Acción</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {flights.map((flight) => (
            <TableRow key={flight.id}>
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
                    {getPriceLevelIcon(flight.priceLevel)}
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
                  onClick={() => handleRedirectToSmiles(flight)}
                  className="w-full"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Ver en Smiles
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
