
export interface Airline {
  code: string;
  name: string;
  logo: string;
}

export interface Flight {
  id: string;
  origin: string;
  destination: string;
  departureDate: string;
  arrivalDate: string;
  price: number;
  miles: number;
  stops: number;
  duration: string;
  airline: Airline;
}
