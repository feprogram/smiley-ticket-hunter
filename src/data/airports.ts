
export interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
}

export const airports: Airport[] = [
  { code: 'EZE', name: 'Ministro Pistarini International Airport', city: 'Buenos Aires', country: 'Argentina' },
  { code: 'AEP', name: 'Jorge Newbery Airpark', city: 'Buenos Aires', country: 'Argentina' },
  { code: 'COR', name: 'Ingeniero Aeronáutico Ambrosio L.V. Taravella International Airport', city: 'Córdoba', country: 'Argentina' },
  { code: 'MDZ', name: 'El Plumerillo Airport', city: 'Mendoza', country: 'Argentina' },
  { code: 'MIA', name: 'Miami International Airport', city: 'Miami', country: 'United States' },
  { code: 'JFK', name: 'John F. Kennedy International Airport', city: 'New York', country: 'United States' },
  { code: 'EWR', name: 'Newark Liberty International Airport', city: 'Newark', country: 'United States' },
  { code: 'LGA', name: 'LaGuardia Airport', city: 'New York', country: 'United States' },
  { code: 'LAX', name: 'Los Angeles International Airport', city: 'Los Angeles', country: 'United States' },
  { code: 'ORD', name: "O'Hare International Airport", city: 'Chicago', country: 'United States' },
  { code: 'DFW', name: 'Dallas/Fort Worth International Airport', city: 'Dallas', country: 'United States' },
  { code: 'IAH', name: 'George Bush Intercontinental Airport', city: 'Houston', country: 'United States' },
  { code: 'ATL', name: 'Hartsfield-Jackson Atlanta International Airport', city: 'Atlanta', country: 'United States' },
  { code: 'MAD', name: 'Adolfo Suárez Madrid–Barajas Airport', city: 'Madrid', country: 'Spain' },
  { code: 'BCN', name: 'Josep Tarradellas Barcelona-El Prat Airport', city: 'Barcelona', country: 'Spain' },
  { code: 'GRU', name: 'São Paulo/Guarulhos International Airport', city: 'São Paulo', country: 'Brazil' },
  { code: 'MEX', name: 'Benito Juárez International Airport', city: 'Mexico City', country: 'Mexico' },
  { code: 'CUN', name: 'Cancún International Airport', city: 'Cancún', country: 'Mexico' },
  { code: 'BOG', name: 'El Dorado International Airport', city: 'Bogotá', country: 'Colombia' },
  { code: 'LIM', name: 'Jorge Chávez International Airport', city: 'Lima', country: 'Peru' },
  { code: 'SCL', name: 'Arturo Merino Benítez International Airport', city: 'Santiago', country: 'Chile' },
];
