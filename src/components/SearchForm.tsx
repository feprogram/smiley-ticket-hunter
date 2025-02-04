import { useState } from "react";
import { LocationInput } from "./LocationInput";
import { DatePicker } from "./DatePicker";
import { PassengerSelect } from "./PassengerSelect";
import { ClassSelect } from "./ClassSelect";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { LoadingState } from "./LoadingState";

export const SearchForm = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    departureDate: undefined as Date | undefined,
    returnDate: undefined as Date | undefined,
    passengers: "1",
    class: "economy",
  });

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Here we'll implement the actual search logic
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulated delay
      
      toast({
        title: "Search initiated",
        description: "Searching for flights...",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to search flights. Please try again.",
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
    <form onSubmit={handleSearch} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <LocationInput
          label="From"
          value={formData.origin}
          onChange={(value) => setFormData({ ...formData, origin: value })}
          placeholder="Enter origin city"
        />
        <LocationInput
          label="To"
          value={formData.destination}
          onChange={(value) => setFormData({ ...formData, destination: value })}
          placeholder="Enter destination city"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DatePicker
          label="Departure Date"
          date={formData.departureDate}
          onSelect={(date) => setFormData({ ...formData, departureDate: date })}
        />
        <DatePicker
          label="Return Date"
          date={formData.returnDate}
          onSelect={(date) => setFormData({ ...formData, returnDate: date })}
        />
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
        Search Flights
      </Button>
    </form>
  );
};