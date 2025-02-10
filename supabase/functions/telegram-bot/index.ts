
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const TELEGRAM_BOT_TOKEN = Deno.env.get('TELEGRAM_BOT_TOKEN');
const BOT_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

interface Flight {
  id: string;
  origin: string;
  destination: string;
  departureDate: string;
  arrivalDate: string;
  price: number;
  miles: number;
  stops: number;
  duration: string;
}

const formatFlightMessage = (flight: Flight) => {
  const tax = flight.price * 0.75;
  const total = flight.price + tax;
  
  return `
✈️ Vuelo encontrado:
🛫 ${flight.origin} → ${flight.destination}
📅 Salida: ${flight.departureDate}
🕒 Llegada: ${flight.arrivalDate}
⏱️ Duración: ${flight.duration}
💺 Paradas: ${flight.stops === 0 ? 'Directo' : `${flight.stops} parada(s)`}

💰 Precios:
Base: $${flight.price.toLocaleString()}
Impuestos: $${tax.toLocaleString()}
Total: $${total.toLocaleString()}

✨ Millas necesarias: ${flight.miles.toLocaleString()}

🔍 Ver en Smiles: ${generateSmilesUrl(flight)}
`;
};

const generateSmilesUrl = (flight: Flight) => {
  const formattedDate = flight.departureDate.split(' ')[0];
  const baseUrl = "https://www.smiles.com.ar/emissao-com-milhas";
  
  const params = new URLSearchParams({
    tripType: '1',
    originAirportCode: flight.origin,
    destinationAirportCode: flight.destination,
    departureDate: formattedDate,
    adults: '1',
    children: '0',
    infants: '0',
    cabinType: 'ec',
    highlightedBox: 'smiles'
  });

  return `${baseUrl}?${params.toString()}`;
};

const handleTelegramUpdate = async (update: any) => {
  if (!update.message) return;

  const chatId = update.message.chat.id;
  const messageText = update.message.text;

  // Ejemplo de respuesta básica
  let responseText = "Lo siento, no entiendo ese comando. Por favor, usa /buscar seguido del origen y destino (ej: /buscar EZE MIA)";

  if (messageText.startsWith('/start')) {
    responseText = `¡Bienvenido al bot de búsqueda de vuelos! 
    
Para buscar vuelos, usa el comando /buscar seguido del origen y destino.
Ejemplo: /buscar EZE MIA`;
  }
  else if (messageText.startsWith('/buscar')) {
    const [_, ...args] = messageText.split(' ');
    if (args.length >= 2) {
      const [origin, destination] = args;
      // Aquí deberías implementar la lógica real de búsqueda de vuelos
      // Por ahora solo mostramos un ejemplo
      const exampleFlight: Flight = {
        id: "1",
        origin,
        destination,
        departureDate: "2024-04-01 10:00",
        arrivalDate: "2024-04-01 18:00",
        price: 150000,
        miles: 30000,
        stops: 1,
        duration: "8h 00m"
      };
      
      responseText = formatFlightMessage(exampleFlight);
    } else {
      responseText = "Por favor, especifica el origen y destino. Ejemplo: /buscar EZE MIA";
    }
  }

  // Enviar respuesta
  await fetch(`${BOT_API_URL}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: responseText,
      parse_mode: 'HTML'
    }),
  });
};

serve(async (req) => {
  try {
    const update = await req.json();
    await handleTelegramUpdate(update);
    return new Response('OK', { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return new Response('Error', { status: 500 });
  }
});
