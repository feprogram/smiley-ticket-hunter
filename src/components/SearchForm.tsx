import { useState } from "react";
import { LocationInput } from "./LocationInput";
import { DatePicker } from "./DatePicker";
import { PassengerSelect } from "./PassengerSelect";
import { ClassSelect } from "./ClassSelect";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { LoadingState } from "./LoadingState";
import { FlightResults } from "./FlightResults";
import { Flight } from "@/types/flight";
import { FlightTypeSelect } from "./FlightTypeSelect";

const airlines: Airline[] = [
  { 
    code: 'AR', 
    name: 'Aerolíneas Argentinas',
    logo: 'https://www.aerolineas.com.ar/favicon.ico'
  },
  { 
    code: 'LA', 
    name: 'LATAM Airlines',
    logo: 'https://www.latamairlines.com/favicon.ico'
  },
  { 
    code: 'G3', 
    name: 'GOL Linhas Aéreas',
    logo: 'https://www.voegol.com.br/favicon.ico'
  }
];

const generateMockFlights = (origin: string, destination: string, date?: Date): Flight[] => {
  if (!origin || !destination || !date) return [];

  const numFlights = Math.floor(Math.random() * 6) + 5;
  const flights: Flight[] = [];

  for (let i = 0; i < numFlights; i++) {
    const baseHour = Math.floor(Math.random() * 24);
    const durationHours = Math.floor(Math.random() * 8) + 1;
    const airline = airlines[Math.floor(Math.random() * airlines.length)];
    
    flights.push({
      id: String(i + 1),
      origin,
      destination,
      departureDate: `${date.toISOString().split('T')[0]} ${String(baseHour).padStart(2, '0')}:00`,
      arrivalDate: `${date.toISOString().split('T')[0]} ${String((baseHour + durationHours) % 24).padStart(2, '0')}:00`,
      price: Math.floor(Math.random() * 100000) + 30000,
      miles: Math.floor(Math.random() * 20000) + 10000,
      stops: Math.floor(Math.random() * 2),
      duration: `${durationHours}h 00m`,
      airline
    });
  }

  return flights;
};

export const SearchForm = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [formData, setFormData] = useState({
    flightType: "roundtrip",
    origin: "",
    destination: "",
    departureDate: undefined as Date | undefined,
    returnDate: undefined as Date | undefined,
    passengers: "1",
    class: "economy",
  });

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.origin || !formData.destination || !formData.departureDate) {
      toast({
        title: "Error",
        description: "Por favor complete todos los campos requeridos",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simulamos una llamada a la API
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const mockFlights = generateMockFlights(
        formData.origin,
        formData.destination,
        formData.departureDate
      );
      setFlights(mockFlights);
      
      toast({
        title: "Búsqueda completada",
        description: "Se encontraron vuelos disponibles",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron buscar los vuelos. Por favor, intente nuevamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div>
      <form onSubmit={handleSearch} className="space-y-6">
        <FlightTypeSelect
          value={formData.flightType}
          onChange={(value) => setFormData({ ...formData, flightType: value })}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <LocationInput
            label="Desde"
            value={formData.origin}
            onChange={(value) => setFormData({ ...formData, origin: value })}
            placeholder="Ciudad de origen"
          />
          <LocationInput
            label="Hasta"
            value={formData.destination}
            onChange={(value) => setFormData({ ...formData, destination: value })}
            placeholder="Ciudad de destino"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DatePicker
            label="Fecha de Ida"
            date={formData.departureDate}
            onSelect={(date) => setFormData({ ...formData, departureDate: date })}
          />
          {formData.flightType === "roundtrip" && (
            <DatePicker
              label="Fecha de Vuelta"
              date={formData.returnDate}
              onSelect={(date) => setFormData({ ...formData, returnDate: date })}
            />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PassengerSelect
            value={formData.passengers}
            onChange={(value) => setFormData({ ...formData, passengers: value })}
          />
          <ClassSelect
            value={formData.class}
            onChange={(value) => setFormData({ ...formData, class: value })}
          />
        </div>

        <Button
          type="submit"
          className="w-full h-12 bg-primary hover:bg-primary/90 text-white transition-colors duration-200"
        >
          Buscar Vuelos
        </Button>
      </form>

      <FlightResults flights={flights} />
    </div>
  );
};
