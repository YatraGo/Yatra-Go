import { ALL_PACKAGES } from '../data/packages';

export const itineraryBuilderConfig = {
    model: import.meta.env.VITE_ITINERARY_BUILDER_MODEL || 'gemini-3.1-flash-lite',
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
        return 'No exact Yatra Go package match found. Keep plan practical and region-realistic.';
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

    const cities = [...new Set(itineraryDays.map((d) => d.city).filter(Boolean))];
    cities.forEach((city) => {
        const img = getDestinationImage(city);
        if (img && !img.includes('unsplash.com/photo-1500530855697-b586d89ba3ee') && !images.includes(img)) {
            images.push(img);
        }
    });

    while (images.length < 4) {
        const fallback = fallbackGallery[images.length % fallbackGallery.length];
        if (!images.includes(fallback)) images.push(fallback);
        else break;
    }

    return images.slice(0, 6);
};

const TEMPLATE_LIBRARY = {
    kedarnath: {
        matcher: /(kedarnath|kedar|gaurikund|sonprayag|phata)/i,
        title: 'Kedarnath Spiritual Expedition',
        subtitle: 'Sacred Himalayan darshan with premium support',
        bestTime: 'May to June and September to October',
        hotelStyle: 'Pilgrimage Comfort Hotels and Riverside Stays',
        highlights: [
            'Balanced darshan and rest cadence',
            'Reliable road-head planning with buffers',
            'Senior-friendly operational pacing',
            'Flexible comfort and budget tiers',
        ],
        notes: [
            'Start early to avoid weather disruptions.',
            'Carry rain and cold layers in all seasons.',
            'Keep ID and registration documents ready.',
            'Hydrate and pace activity at altitude.',
        ],
        dayThemes: ['Arrival and briefing', 'Transfer and preparation', 'Darshan focus day', 'Return and recovery', 'Departure transfer'],
    },
    rishikesh: {
        matcher: /(rishikesh|shivpuri|ganga rafting|laxman jhula|neelkanth)/i,
        title: 'Rishikesh Adventure and Wellness Escape',
        subtitle: 'Thrill, spirituality, and riverside leisure',
        bestTime: 'September to April',
        hotelStyle: 'Riverside Resorts and Boutique Retreats',
        highlights: [
            'Adventure blocks with safe time slots',
            'Balanced yoga and sightseeing windows',
            'Family and couple friendly pacing',
            'Low-fatigue transfer flow',
        ],
        notes: [
            'Book rafting slots early during peak days.',
            'Use quick-dry clothing for activities.',
            'Keep one lighter day between thrill activities.',
            'Confirm weather before river activities.',
        ],
        dayThemes: ['Arrival and Ganga aarti', 'Adventure and rafting day', 'Wellness and cafe circuit', 'Leisure and departure'],
    },
    chardham: {
        matcher: /(char dham|chardham|yamunotri|gangotri|kedarnath|badrinath)/i,
        title: 'Char Dham Grand Pilgrimage Circuit',
        subtitle: 'Structured four-shrine journey with disciplined operations',
        bestTime: 'May to June and September to October',
        hotelStyle: 'Route-Optimized Pilgrimage Hotels and Camps',
        highlights: [
            'Logical shrine sequence to save travel strain',
            'Buffer-based mountain transfer planning',
            'Temple windows aligned with route operations',
            'Flexible support for senior travelers',
        ],
        notes: [
            'Road and weather may affect daily timings.',
            'Carry altitude-safe essentials and medicines.',
            'Start transfers early for each sector.',
            'Keep permit and ID documents accessible.',
        ],
        dayThemes: ['Arrival and yatra briefing', 'Yamunotri sector', 'Gangotri sector', 'Kedarnath base sector', 'Kedarnath darshan sector', 'Badrinath sector', 'Return sector'],
    },
};

const DEFAULT_TEMPLATE = {
    title: 'Premium Himalayan Discovery',
    subtitle: 'Curated journey with practical and polished execution',
    bestTime: 'Year-round (destination dependent)',
    hotelStyle: 'Premium Boutiques and Verified Comfort Stays',
    highlights: [
        'Template-first planning for consistency',
        'Personalized activity and comfort options',
        'Balanced sightseeing and rest windows',
        'Professional route sequencing',
    ],
    notes: [
        'Keep weather-appropriate layers ready.',
        'Carry valid IDs and booking confirmations.',
        'Confirm activity windows one day before.',
        'Maintain hydration in long travel sectors.',
    ],
    dayThemes: ['Arrival and orientation', 'Core sightseeing day', 'Activity and culture day', 'Return and departure'],
};

const pickTemplate = (destination = '') => {
    if (TEMPLATE_LIBRARY.kedarnath.matcher.test(destination)) return TEMPLATE_LIBRARY.kedarnath;
    if (TEMPLATE_LIBRARY.chardham.matcher.test(destination)) return TEMPLATE_LIBRARY.chardham;
    if (TEMPLATE_LIBRARY.rishikesh.matcher.test(destination)) return TEMPLATE_LIBRARY.rishikesh;
    return DEFAULT_TEMPLATE;
};

const buildTemplateItinerary = ({ destination, origin, tripDays, isHelicopter }) => {
    const template = pickTemplate(destination);
    const travelMode = isHelicopter ? 'By Helicopter' : 'By Road & Trek';

    const days = Array.from({ length: tripDays }, (_, idx) => {
        const dayNumber = idx + 1;
        const theme = template.dayThemes[idx % template.dayThemes.length];
        return {
            dayNumber,
            title: `Day ${dayNumber}: ${theme}`,
            city: destination,
            summary: `${theme} for ${destination} with practical pacing and premium support approach.`,
            morning: ['Breakfast and briefing', 'Primary experience segment'],
            afternoon: ['Sightseeing or activity block', 'Transit and rest alignment'],
            evening: ['Leisure and local exploration', 'Dinner and next-day prep'],
            stay: dayNumber === tripDays ? 'Departure day' : template.hotelStyle,
            mealPlan: 'Breakfast & Dinner',
            travelNotes: isHelicopter
                ? 'Maintain reporting buffer for helipad operations and weather checks.'
                : 'Start early for road sectors and maintain mountain travel buffer.',
        };
    });

    const route = Array.from({ length: tripDays }, (_, idx) => ({
        day: idx + 1,
        from: idx === 0 ? (origin || destination) : destination,
        to: destination,
        mode: isHelicopter ? 'Helicopter + Ground Support' : 'AC Vehicle',
        distance: isHelicopter && idx === 1 ? 'Flight sector where applicable' : 'Road sector as per route',
    }));

    return {
        title: template.title,
        subtitle: template.subtitle,
        overview: `${destination} itinerary built on a professional template, then refined for your days, mode, and comfort profile.`,
        bestTime: template.bestTime,
        travelMode,
        hotelStyle: template.hotelStyle,
        highlights: template.highlights,
        essentialNotes: template.notes,
        route,
        days,
    };
};

export const generateItinerary = async ({ destination, origin, days, travelMode = 'road' }) => {
    const tripDays = sanitizeDays(days);
    const isHelicopter = travelMode === 'helicopter' && isHelicopterEligible(destination);
    const baseTemplate = buildTemplateItinerary({ destination, origin, tripDays, isHelicopter });

    const prompt = `
You are Yatra Go's itinerary personalizer.
Do not create from scratch. Refine the given template only.

Trip details:
- Destination: ${destination}
- Starting Location: ${origin}
- Number of days: ${tripDays}
- Travel Mode: ${isHelicopter ? 'By Helicopter' : 'By Road & Trek'}

Personalization goals:
- optimize day pacing and date-sensitivity
- personalize activity mix and comfort level
- adjust plan to be budget-practical
- reduce hallucinations and keep route realistic

Return strict JSON only with same shape.

Base template JSON:
${JSON.stringify(baseTemplate, null, 2)}

Context:
${buildKnowledge(destination)}
`.trim();

    const response = await fetch('http://localhost:3001/api/itinerary', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
    });

    let finalItinerary = baseTemplate;
    if (response.ok) {
        try {
            const data = await response.json();
            const parsed = JSON.parse(extractJson(data.text || ''));
            finalItinerary = {
                ...baseTemplate,
                ...parsed,
                route: Array.isArray(parsed.route) && parsed.route.length ? parsed.route : baseTemplate.route,
                days: Array.isArray(parsed.days) && parsed.days.length ? parsed.days : baseTemplate.days,
            };
        } catch {
            finalItinerary = baseTemplate;
        }
    }

    const gallery = buildPhotoGallery(destination, finalItinerary.days || []);

    return {
        ...finalItinerary,
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
