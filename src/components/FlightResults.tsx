
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
import { ExternalLink } from "lucide-react";

interface FlightResultsProps {
  flights: Flight[];
}

export const FlightResults = ({ flights }: FlightResultsProps) => {
  if (!flights.length) return null;

  const handleRedirectToSmiles = (flight: Flight) => {
    // Convertir la fecha al formato requerido por Smiles (YYYY-MM-DD)
    const formattedDate = flight.departureDate.split(' ')[0];

    // Crear la URL base de Smiles para búsqueda de vuelos
    const baseUrl = "https://www.smiles.com.ar/emissao-com-milhas";
    
    // Construir los parámetros de la URL
    const params = new URLSearchParams({
      tripType: '1', // 1 = ida
      originAirportCode: flight.origin,
      destinationAirportCode: flight.destination,
      departureDate: formattedDate,
      adults: '1',
      children: '0',
      infants: '0',
      cabinType: 'ec', // económica
      highlightedBox: 'smiles'
    });

    // Abrir la URL en una nueva pestaña
    window.open(`${baseUrl}?${params.toString()}`, '_blank');
  };

  const calculateTax = (price: number) => price * 0.75;

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
            <TableHead className="text-right">Precio</TableHead>
            <TableHead>Acción</TableHead>
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
              <TableCell>
                <div className="space-y-1 text-right">
                  <div className="font-medium">
                    Precio Base: {formatCurrency(flight.price)}
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
