import { useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Flight } from "@/types/flight";
import { ArrowUpDown } from "lucide-react";
import { FlightFilter } from "./flight/FlightFilter";
import { FlightRow } from "./flight/FlightRow";
import { TimeRangeFilter, TimeRange } from "./flight/TimeRangeFilter";
import { format, parse } from "date-fns";

interface FlightResultsProps {
  flights: Flight[];
  onRedirectClick: (url: string) => void;
}

type SortField = 'departureDate' | 'airline' | 'price';

export const FlightResults = ({ flights: initialFlights, onRedirectClick }: FlightResultsProps) => {
  const [flights, setFlights] = useState(initialFlights);
  const [stopFilter, setStopFilter] = useState<'all' | 'direct' | 'with-stops'>('all');
  const [timeRange, setTimeRange] = useState<TimeRange>('all');
  const [sortConfig, setSortConfig] = useState<{
    field: SortField;
    direction: 'asc' | 'desc';
  } | null>(null);

  const applyFilters = (flights: Flight[]) => {
    let filteredFlights = [...flights];

    // Aplicar filtro de paradas
    if (stopFilter === 'direct') {
      filteredFlights = filteredFlights.filter(flight => flight.stops === 0);
    } else if (stopFilter === 'with-stops') {
      filteredFlights = filteredFlights.filter(flight => flight.stops > 0);
    }

    // Aplicar filtro de horario
    if (timeRange !== 'all') {
      filteredFlights = filteredFlights.filter(flight => {
        const hour = parseInt(flight.departureDate.split(' ')[1].split(':')[0]);
        switch (timeRange) {
          case 'morning':
            return hour >= 6 && hour < 12;
          case 'afternoon':
            return hour >= 12 && hour < 18;
          case 'evening':
            return hour >= 18 && hour < 24;
          case 'night':
            return hour >= 0 && hour < 6;
          default:
            return true;
        }
      });
    }

    return filteredFlights;
  };

  const handleStopFilterChange = (value: string) => {
    setStopFilter(value as 'all' | 'direct' | 'with-stops');
    const filteredFlights = applyFilters(initialFlights);
    setFlights(filteredFlights);
  };

  const handleTimeRangeChange = (value: TimeRange) => {
    setTimeRange(value);
    const filteredFlights = applyFilters(initialFlights);
    setFlights(filteredFlights);
  };

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

  const handleRedirectToSmiles = (flight: Flight) => {
    // Primero parseamos la fecha del string que viene en el formato "YYYY-MM-DD HH:mm"
    const [datePart] = flight.departureDate.split(' ');
    const dateObj = parse(datePart, 'yyyy-MM-dd', new Date());
    
    // Luego la formateamos al formato que espera Smiles (dd-MM-yyyy)
    const formattedDate = format(dateObj, 'dd-MM-yyyy');
    
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
    const url = `${baseUrl}?${params.toString()}`;
    onRedirectClick(url);
  };

  return (
    <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <h2 className="text-2xl font-semibold">Vuelos Disponibles ({flights.length})</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <TimeRangeFilter value={timeRange} onValueChange={handleTimeRangeChange} />
          <FlightFilter value={stopFilter} onValueChange={handleStopFilterChange} />
        </div>
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
            <FlightRow 
              key={flight.id} 
              flight={flight} 
              onRedirect={handleRedirectToSmiles}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
