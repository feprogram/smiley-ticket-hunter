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

interface FlightResultsProps {
  flights: Flight[];
}

export const FlightResults = ({ flights }: FlightResultsProps) => {
  if (!flights.length) return null;

  return (
    <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Vuelos Disponibles</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Origen - Destino</TableHead>
            <TableHead>Fecha y Hora</TableHead>
            <TableHead>Duración</TableHead>
            <TableHead>Paradas</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Millas</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {flights.map((flight) => (
            <TableRow key={flight.id}>
              <TableCell>
                {flight.origin} → {flight.destination}
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
              <TableCell className="font-medium">
                {formatCurrency(flight.price)}
              </TableCell>
              <TableCell>{flight.miles.toLocaleString()} millas</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};