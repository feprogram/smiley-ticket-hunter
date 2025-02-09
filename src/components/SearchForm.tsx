
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

const generateMockFlights = (origin: string, destination: string, date?: Date): Flight[] => {
  if (!origin || !destination || !date) return [];

  return [
    {
      id: "1",
      origin,
      destination,
      departureDate: `${date.toISOString().split('T')[0]} 08:00`,
      arrivalDate: `${date.toISOString().split('T')[0]} 09:30`,
      price: 50000,
      miles: 15000,
      stops: 0,
      duration: "1h 30m"
    },
    {
      id: "2",
      origin,
      destination,
      departureDate: `${date.toISOString().split('T')[0]} 14:00`,
      arrivalDate: `${date.toISOString().split('T')[0]} 16:30`,
      price: 45000,
      miles: 12000,
      stops: 1,
      duration: "2h 30m"
    },
    {
      id: "3",
      origin,
      destination,
      departureDate: `${date.toISOString().split('T')[0]} 19:00`,
      arrivalDate: `${date.toISOString().split('T')[0]} 20:30`,
      price: 55000,
      miles: 18000,
      stops: 0,
      duration: "1h 30m"
    }
  ];
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
