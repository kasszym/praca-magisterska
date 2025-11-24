import { ref } from 'vue';

interface Intent {
  id: number;
  name: string;
  keywords: string[];
  response_template: string;
  requires_data: boolean;
}

const intents = ref<Intent[]>([
  {
    id: 1,
    name: 'greeting',
    keywords: ['cześć', 'witaj', 'hej', 'dzień dobry', 'siema', 'hello', 'hi'],
    response_template: 'Witaj! Jestem konsultantem Aureon Motors. Jak mogę Ci pomóc?',
    requires_data: false,
  },
  {
    id: 2,
    name: 'ask_price',
    keywords: ['cena', 'koszt', 'ile kosztuje', 'jaka cena', 'cennik', 'price'],
    response_template: 'Sprawdzam cenę dla Ciebie...',
    requires_data: true,
  },
  {
    id: 3,
    name: 'ask_range',
    keywords: ['zasięg', 'kilometry', 'km', 'dystans', 'range'],
    response_template: 'Sprawdzam zasięg dla Ciebie...',
    requires_data: true,
  },
  {
    id: 4,
    name: 'ask_delivery',
    keywords: ['dostawa', 'wysyłka', 'jak długo', 'kiedy', 'termin', 'delivery'],
    response_template: 'Oferujemy następujące opcje dostawy: InPost (1-2 dni, 12.99 zł), FedEx (2-3 dni, 19.99 zł), Poczta Polska (3-5 dni, 9.99 zł).',
    requires_data: false,
  },
  {
    id: 5,
    name: 'ask_colors',
    keywords: ['kolor', 'kolory', 'jakie kolory', 'dostępne kolory', 'colors'],
    response_template: 'Sprawdzam dostępne kolory...',
    requires_data: true,
  },
  {
    id: 6,
    name: 'ask_specs',
    keywords: ['specyfikacja', 'parametry', 'dane techniczne', 'specs', 'moc', 'bateria'],
    response_template: 'Sprawdzam specyfikację dla Ciebie...',
    requires_data: true,
  },
  {
    id: 7,
    name: 'ask_availability',
    keywords: ['dostępność', 'czy dostępny', 'na stanie', 'available'],
    response_template: 'Wszystkie nasze modele są dostępne od ręki. Mogę pomóc Ci w wyborze odpowiedniego modelu?',
    requires_data: false,
  },
  {
    id: 8,
    name: 'goodbye',
    keywords: ['papa', 'do widzenia', 'żegnaj', 'bye', 'goodbye'],
    response_template: 'Do widzenia! Miłego dnia!',
    requires_data: false,
  },
  {
    id: 9,
    name: 'thanks',
    keywords: ['dzięki', 'dziękuję', 'thank you', 'thanks', 'thx'],
    response_template: 'Cała przyjemność po mojej stronie! Czy mogę jeszcze w czymś pomóc?',
    requires_data: false,
  },
  {
    id: 10,
    name: 'help',
    keywords: ['pomoc', 'help', 'nie wiem', 'jak', 'co mogę'],
    response_template: 'Mogę pomóc Ci z informacjami o: cenach, zasięgu, dostępnych kolorach, specyfikacji technicznej i dostępności naszych samochodów. O co chciałbyś zapytać?',
    requires_data: false,
  },
]);

export const useIntentMatcher = () => {
  const matchIntent = (message: string): Intent | null => {
    const lowerMessage = message.toLowerCase();
    
    for (const intent of intents.value) {
      const hasKeyword = intent.keywords.some(keyword => 
        lowerMessage.includes(keyword.toLowerCase())
      );
      
      if (hasKeyword) {
        return intent;
      }
    }
    
    return null;
  };

  const extractCarName = (message: string): string | null => {
    const lowerMessage = message.toLowerCase();
    const carNames = ['aureon px', 'aureon sx', 'aureon gt', 'aureon lux', 'px', 'sx', 'gt', 'lux', 'e-city', 'sport'];
    
    for (const name of carNames) {
      if (lowerMessage.includes(name)) {
        if (name === 'px') return 'Aureon PX';
        if (name === 'sx') return 'Aureon SX';
        if (name === 'gt') return 'Aureon GT';
        if (name === 'lux') return 'Aureon Lux';
        if (name === 'e-city') return 'Aureon E-City';
        if (name === 'sport') return 'Aureon GT Sport';
        return name;
      }
    }
    
    return null;
  };

  return {
    matchIntent,
    extractCarName,
    intents,
  };
};