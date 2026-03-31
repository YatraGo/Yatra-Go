import { GoogleGenAI } from '@google/genai';
import { ALL_PACKAGES } from '../data/packages';

export const itineraryBuilderConfig = {
    apiKey: import.meta.env.VITE_ITINERARY_BUILDER_API_KEY,
    model: import.meta.env.VITE_ITINERARY_BUILDER_MODEL || 'gemini-2.5-flash',
};

const DESTINATION_IMAGES = [
    { match: /(rishikesh|haridwar|kedarnath|badrinath|auli|mussoorie|nainital|jim corbett|chardham|devprayag|gangotri|yamunotri|tehri|uttarakhand)/i, image: 'public/assets/Haridwar 2.png' },
    { match: /(manali|shimla|kasol|spiti|dalhousie|dharamshala|khajjiar|himachal|bir billing|kullu)/i, image: 'public/assets/Manali.jpg' },
    { match: /(goa|kovalam|varkala|kanyakumari|andaman|alappuzha|kochi)/i, image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80' },
    { match: /(jaipur|udaipur|jaisalmer|jodhpur|pushkar|ajmer|rajasthan)/i, image: 'https://images.unsplash.com/photo-1599661046827-dacde6976548?w=1200&q=80' },
    { match: /(varanasi|ayodhya|prayagraj|mathura|vrindavan|dwarka|amritsar|shirdi|ujjain)/i, image: 'https://images.unsplash.com/photo-1561361058-c24cecae35ca?w=1200&q=80' },
    { match: /(darjeeling|gangtok|sikkim|tawang|shillong|cherrapunji|kaziranga)/i, image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=1200&q=80' },
];

const fallbackGallery = [
    'public/assets/Kedarnath 1.png',
    'public/assets/Rishikesh 3.jpg',
    'public/assets/Haridwar 4.jpg',
    'public/assets/Mussoorie 4.png',
];

// Helicopter-eligible Uttarakhand destinations
export const HELICOPTER_ELIGIBLE_DESTINATIONS = [
    'kedarnath', 'badrinath', 'chardham', 'char dham', 'gangotri',
    'yamunotri', 'hemkund sahib', 'hemkund', 'uttarakhand', 'do dham',
];

export const isHelicopterEligible = (destination = '') => {
    const d = destination.toLowerCase().trim();
    return HELICOPTER_ELIGIBLE_DESTINATIONS.some((key) => d.includes(key));
};

const extractJson = (rawText = '') => {
    const fencedMatch = rawText.match(/```json\s*([\s\S]*?)```/i);
    if (fencedMatch?.[1]) return fencedMatch[1];

    const plainMatch = rawText.match(/\{[\s\S]*\}/);
    return plainMatch?.[0] || rawText;
};

const sanitizeDays = (days) => {
    const parsed = Number(days);
    if (Number.isNaN(parsed)) return 3;
    return Math.min(12, Math.max(2, parsed));
};

const buildKnowledge = (destination) => {
    const matches = ALL_PACKAGES.filter((pkg) => {
        const haystack = `${pkg.title} ${pkg.location} ${pkg.region} ${pkg.desc}`.toLowerCase();
        return haystack.includes(destination.toLowerCase());
    }).slice(0, 4);

    if (!matches.length) {
        return 'No exact Yatra Go package match found. Build a realistic India itinerary with practical travel pacing and premium formatting.';
    }

    return matches.map((pkg) => (
        `Package: ${pkg.title}\nLocation: ${pkg.location}\nDuration: ${pkg.days}\nDescription: ${pkg.desc}\nHighlights: ${(pkg.highlights || []).join(', ')}\nInclusions: ${(pkg.includes || []).join(', ')}`
    )).join('\n\n');
};

export const getDestinationImage = (text = '') => {
    const match = DESTINATION_IMAGES.find((item) => item.match.test(text));
    return match?.image || 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80';
};

export const buildPhotoGallery = (destination, itineraryDays = []) => {
    const images = [];

    const destImg = getDestinationImage(destination);
    if (destImg && !destImg.includes('unsplash.com/photo-1500530855697-b586d89ba3ee')) {
        images.push(destImg);
    }

    const cities = [...new Set(itineraryDays.map(d => d.city).filter(Boolean))];
    cities.forEach(city => {
        const img = getDestinationImage(city);
        if (img && !img.includes('unsplash.com/photo-1500530855697-b586d89ba3ee') && !images.includes(img)) {
            images.push(img);
        }
    });

    if (images.length < 3) {
        while (images.length < 4) {
            const fallback = fallbackGallery[images.length % fallbackGallery.length];
            if (!images.includes(fallback)) {
                images.push(fallback);
            } else {
                break;
            }
        }
    }

    return images.slice(0, 6);
};

const buildHelicopterInstructions = (destination, tripDays) => `
HELICOPTER MODE INSTRUCTIONS (VERY IMPORTANT):
- This is a HELICOPTER-based pilgrimage itinerary to ${destination}.
- Day transfers to the shrine (Kedarnath/Badrinath/etc.) must specify HELICOPTER from the nearest helipad (e.g., Phata, Sersi, Sitapur for Kedarnath; Badrinath has road access primarily).
- Include specific details: helipad names, flight duration (~8-12 mins Kedarnath), morning departure slots (typically 6:30-7:30 AM).
- The "mode" field in route legs should say "Helicopter" for shrine-approach legs.
- Do NOT include long trekking distances for the main shrine visit leg.
- Do include: check-in at helipad base camp, early morning helicopter boarding, VIP darshan upon arrival, return helicopter in afternoon.
- travelMode field in JSON must be "By Helicopter ✈️".
`;

const buildRoadInstructions = (destination, tripDays) => `
ROAD + TREK MODE INSTRUCTIONS (VERY IMPORTANT):
- This is a BY ROAD + TREK itinerary to ${destination}.
- Day transfers to the shrine use private vehicles (AC Sedan/SUV) to the road-head, then proceed on foot/pony/palki.
- Include specific trekking distances: Kedarnath = 16km trek from Gaurikund; Yamunotri = 6km trek from Janki Chatti; Gangotri is road-accessible.
- The "mode" field in route legs should say "Road + Trek" or "AC Vehicle" as appropriate.
- Include practical road-head location names, pony/palki cost notes, and trek preparation tips.
- travelMode field in JSON must be "By Road & Trek 🚗".
`;

export const generateItinerary = async ({ destination, origin, days, travelMode = 'road' }) => {
    if (!itineraryBuilderConfig.apiKey) {
        throw new Error('Missing itinerary builder API key.');
    }

    const tripDays = sanitizeDays(days);
    const ai = new GoogleGenAI({ apiKey: itineraryBuilderConfig.apiKey });
    const isHelicopter = travelMode === 'helicopter' && isHelicopterEligible(destination);

    const modeInstructions = isHelicopter
        ? buildHelicopterInstructions(destination, tripDays)
        : buildRoadInstructions(destination, tripDays);

    const prompt = `
You are Yatra Go's lead travel strategist. Your goal is to create a professional, spacious, and premium travel itinerary.

Trip details:
- Destination: ${destination}
- Starting Location: ${origin}
- Number of days: ${tripDays}
- Travel Mode Selected: ${isHelicopter ? 'By Helicopter' : 'By Road & Trek'}

${modeInstructions}

General Instructions:
1. PROFESSIONALISM: Use clear, punchy, and high-impact language. Avoid long-winded paragraphs.
2. SPACING: Ensure summaries and activity lists are concise (max 2-3 items per slot).
3. ROUTE LOGISTICS: Provide a clear transfer flow from the origin to the destination and back, and between cities.
4. JSON FORMAT ONLY: No markdown, no extra text.

JSON shape:
{
  "title": "A premium and engaging title (mention helicopter if applicable)",
  "subtitle": "Short 1-line tag line",
  "overview": "Professional 2-3 sentence overview of the journey",
  "bestTime": "string",
  "travelMode": "string — must reflect helicopter or road as instructed above",
  "hotelStyle": "string (e.g., Premium Boutiques & Luxury Resorts)",
  "highlights": ["3-4 concise high-impact points — include helicopter advantage if applicable"],
  "essentialNotes": ["3-4 critical travel tips specific to the mode of travel"],
  "route": [
    {"day": 1, "from": "string", "to": "string", "mode": "string (Helicopter / AC Vehicle / Road + Trek)", "distance": "string (e.g., 250km or 16km trek or 12-min flight)"}
  ],
  "days": [
    {
      "dayNumber": 1,
      "title": "Engaging day title",
      "city": "Current city/stop",
      "summary": "1-2 sentence focus for the day",
      "morning": ["Point 1", "Point 2"],
      "afternoon": ["Point 1", "Point 2"],
      "evening": ["Point 1", "Point 2"],
      "stay": "Premium Stay Name/Type",
      "mealPlan": "Breakfast & Dinner typically",
      "travelNotes": "Concise logistics tip relevant to the travel mode"
    }
  ]
}

Context for the region:
${buildKnowledge(destination)}
`.trim();

    const response = await ai.models.generateContent({
        model: itineraryBuilderConfig.model,
        config: {
            temperature: 0.8,
            topP: 0.95,
        },
        contents: prompt,
    });

    const parsed = JSON.parse(extractJson(response.text || ''));
    const gallery = buildPhotoGallery(destination, parsed.days || []);

    return {
        ...parsed,
        destination,
        origin,
        daysCount: tripDays,
        travelModeSelected: isHelicopter ? 'helicopter' : 'road',
        gallery,
        heroImage: gallery[0] || getDestinationImage(destination),
        brand: {
            name: 'Yatra Go',
            tagline: 'Premium journeys, planned with precision',
            phone: '+91 89799 31256',
            email: 'sales.yatrago@gmail.com',
        },
        createdAt: new Date().toISOString(),
    };
};
