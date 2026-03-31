import { ALL_ACTIVITIES } from '../data/activities';
import { ALL_PACKAGES, formatPrice } from '../data/packages';

const SERVICE_CATALOG = [
  {
    slug: 'hotel',
    title: 'Hotel Booking',
    summary: 'Luxury resorts, heritage hotels, riverside camps, and budget stays across Uttarakhand and Himachal.',
    details: [
      'Verified properties, best price support, 24/7 booking assistance, and flexible cancellation on many stays.',
      'Popular options include luxury resorts, heritage hotels, riverside camps, and budget stays.',
    ],
  },
  {
    slug: 'car-rental',
    title: 'Car & Coach Rental',
    summary: 'Verified AC cars, SUVs, tempo travellers, and coaches with hill-trained drivers.',
    details: [
      'Vehicles include Innova Crysta, Tempo Traveller, Toyota Fortuner, and Swift Dzire.',
      'Useful for Haridwar to Badrinath, Manali to Spiti, and Shimla to Manali routes.',
    ],
  },
  {
    slug: 'railway-booking',
    title: 'Railway Booking',
    summary: 'Sleeper, AC, Tatkal, and group railway reservations with PNR support.',
    details: [
      'Handles Tatkal, group bookings, all major classes, and PNR monitoring.',
      'Useful connections include Haridwar to Delhi, Char Dham access, Chandigarh for Himachal, and Kathgodam for Nainital.',
    ],
  },
  {
    slug: 'air-ticket',
    title: 'Air Ticket Booking',
    summary: 'Domestic and international flight booking with itinerary coordination.',
    details: [
      'Covers domestic and international tickets, corporate deals, and web check-in help.',
      'Useful routes include Delhi to Chandigarh, Dehradun, Kullu, and international sectors.',
    ],
  },
  {
    slug: 'bike-rental',
    title: 'Bike Rental',
    summary: 'Royal Enfield, Himalayan, Thunderbird, and scooter rentals for mountain routes.',
    details: [
      'Popular bikes include Royal Enfield Himalayan, Thunderbird 500, Classic 350, and Honda Activa.',
      'Good for Manali-Leh, Rishikesh-Badrinath, and Spiti Valley routes.',
    ],
  },
];

const CONTACT_DETAILS = {
  phones: ['+91 89799 31256', '+91 89792 20256'],
  email: 'sales.yatrago@gmail.com',
  address: 'Ganesh Vihar, Sitapur, Jwalapur, Haridwar, Uttarakhand - 249407',
  whatsapp: 'https://wa.me/918979931256',
};

const COMPANY_FACTS = [
  'Yatra Go is a Haridwar-based travel company founded in 2014.',
  'The brand serves pilgrimage, leisure, honeymoon, family, and adventure travelers.',
  'Core regions are Uttarakhand and Himachal Pradesh, with curated travel services and activities.',
  'The website includes tour packages, activity booking, destination discovery, service booking, contact, privacy policy, and terms pages.',
];

const BOOKING_STEPS = [
  'Choose a package, activity, destination, or service that matches your plan.',
  'Open the relevant page and review highlights, itinerary, pricing, and inclusions.',
  'Share your details such as name, phone, email, travel dates, travelers, and custom needs.',
  'Send the enquiry through the page form, contact form, WhatsApp, or direct call.',
  'Yatra Go reviews the request and replies with availability, customization, and final assistance.',
];

export const CHAT_SUGGESTIONS = [
  'Best packages for Uttarakhand',
  'How can I book a tour?',
  'Suggest adventure activities',
  'What services does Yatra Go offer?',
  'How do I contact Yatra Go?',
  'Plan a honeymoon trip',
];

const normalize = (text = '') => text.toLowerCase();
const GREETING_PATTERN = /^(hi|hello|hey|hii|heyy|hola|namaste|good morning|good afternoon|good evening)\b/i;

const buildPackageContext = (pkg) => [
  `Package: ${pkg.title}`,
  `Location: ${pkg.location}`,
  `Region: ${pkg.region}`,
  `Duration: ${pkg.days}`,
  `Price: ${formatPrice(pkg.price)}`,
  `Tag: ${pkg.tag}`,
  `Description: ${pkg.desc}`,
  `Highlights: ${(pkg.highlights || []).join(', ')}`,
  `Includes: ${(pkg.includes || []).join(', ')}`,
  `Excludes: ${(pkg.excludes || []).join(', ')}`,
].join('\n');

const buildActivityContext = (activity) => {
  const base = [
    `Activity: ${activity.name}`,
    `Location: ${activity.location}`,
    `Category: ${activity.category}`,
    `Price: ${formatPrice(activity.price)}`,
    `Duration: ${activity.duration}`,
    `Difficulty: ${activity.difficulty}`,
    `Minimum age: ${activity.minAge}`,
    `Group size: ${activity.groupSize}`,
    `Description: ${activity.desc}`,
    `Highlights: ${(activity.highlights || []).join(', ')}`,
    `Includes: ${(activity.includes || []).join(', ')}`,
  ];

  if (activity.raftingRoutes?.length) {
    base.push(
      `Rafting routes:\n${activity.raftingRoutes
        .map((route) => `- ${route.name}: ${formatPrice(route.price)}, ${route.duration}, ${route.grade}, best for ${route.bestFor}. ${route.desc}`)
        .join('\n')}`
    );
  }

  if (activity.thrillOptions?.length) {
    base.push(
      `Related options:\n${activity.thrillOptions
        .map((option) => `- ${option.name}: ${formatPrice(option.price)}, ${option.duration}, min age ${option.minAge}. ${option.desc}`)
        .join('\n')}`
    );
  }

  return base.join('\n');
};

const buildServiceContext = (service) => [
  `Service: ${service.title}`,
  `Summary: ${service.summary}`,
  ...service.details,
].join('\n');

export const SITE_KNOWLEDGE = `
Brand facts:
${COMPANY_FACTS.join('\n')}

Contact details:
Phones: ${CONTACT_DETAILS.phones.join(', ')}
Email: ${CONTACT_DETAILS.email}
Address: ${CONTACT_DETAILS.address}
WhatsApp: ${CONTACT_DETAILS.whatsapp}

Booking process:
${BOOKING_STEPS.map((step, index) => `${index + 1}. ${step}`).join('\n')}

Services:
${SERVICE_CATALOG.map((service) => buildServiceContext(service)).join('\n\n')}

Packages:
${ALL_PACKAGES.map((pkg) => buildPackageContext(pkg)).join('\n\n')}

Activities:
${ALL_ACTIVITIES.map((activity) => buildActivityContext(activity)).join('\n\n')}
`.trim();

const findMatchingActivities = (message) => {
  const text = normalize(message);
  return ALL_ACTIVITIES.filter((activity) => {
    const haystack = `${activity.id} ${activity.name} ${activity.category} ${activity.location} ${activity.desc} ${(activity.highlights || []).join(' ')}`.toLowerCase();
    return haystack.includes(text) || text.split(/\s+/).some((word) => word.length > 2 && haystack.includes(word));
  }).slice(0, 3);
};

const findMatchingPackages = (message) => {
  const text = normalize(message);
  return ALL_PACKAGES.filter((pkg) => {
    const haystack = `${pkg.slug} ${pkg.title} ${pkg.location} ${pkg.region} ${pkg.tag} ${pkg.desc}`.toLowerCase();
    return haystack.includes(text) || text.split(/\s+/).some((word) => word.length > 2 && haystack.includes(word));
  }).slice(0, 3);
};

const findMatchingServices = (message) => {
  const text = normalize(message);
  return SERVICE_CATALOG.filter((service) => {
    const haystack = `${service.slug} ${service.title} ${service.summary} ${service.details.join(' ')}`.toLowerCase();
    return haystack.includes(text) || text.split(/\s+/).some((word) => word.length > 2 && haystack.includes(word));
  }).slice(0, 2);
};

export const buildRelevantKnowledge = (message) => {
  const matchedActivities = findMatchingActivities(message);
  const matchedPackages = findMatchingPackages(message);
  const matchedServices = findMatchingServices(message);

  if (matchedActivities.length || matchedPackages.length || matchedServices.length) {
    return [
      matchedActivities.length ? `Relevant activities:\n${matchedActivities.map(buildActivityContext).join('\n\n')}` : '',
      matchedPackages.length ? `Relevant packages:\n${matchedPackages.map(buildPackageContext).join('\n\n')}` : '',
      matchedServices.length ? `Relevant services:\n${matchedServices.map(buildServiceContext).join('\n\n')}` : '',
    ].filter(Boolean).join('\n\n');
  }

  return `Use this general website context:\n${SITE_KNOWLEDGE}`;
};

export const getRelevantLinks = (message) => {
  const text = normalize(message);
  
  // CRITICAL: Avoid showing suggestions for generic greetings or very short, non-specific messages
  if (text.length < 4 || GREETING_PATTERN.test(text.trim())) {
    return [];
  }

  const links = [];
  const matchedActivities = findMatchingActivities(message);
  const matchedPackages = findMatchingPackages(message);
  const matchedServices = findMatchingServices(message);

  // If it's a very broad search ("packages", "tours"), only show top-level category links if possible
  // but let's stick to the specific matches for now for premium precision
  
  matchedActivities.forEach((activity) => {
    links.push({
      label: `${activity.name} Page`,
      path: `/activity/${activity.id}`,
    });
  });

  matchedPackages.forEach((pkg) => {
    links.push({
      label: `${pkg.title} Page`,
      path: `/tour/${pkg.slug}`,
    });
  });

  matchedServices.forEach((service) => {
    links.push({
      label: `${service.title} Page`,
      path: `/services/${service.slug}`,
    });
  });

  // Only show contact if they ask for booking or support specifically
  if (/book|booking|steps|process|contact|call|phone|email|whatsapp|enquiry|support|help/i.test(text)) {
    links.push({
      label: 'Contact Page',
      path: '/contact',
    });
  }

  const seen = new Set();
  return links.filter((link) => {
    const key = `${link.label}-${link.path}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0, 3); // Reduced max to 3 for a cleaner look
};

export const getBookingGuide = () =>
  `Booking process:\n${BOOKING_STEPS.map((step, index) => `${index + 1}. ${step}`).join('\n')}\n\nIf you want faster help, use WhatsApp on ${CONTACT_DETAILS.phones[0]} or open the Contact page form.`;

export const getHeuristicAnswer = (message) => {
  const text = normalize(message);

  if (!text.trim()) {
    return 'Ask me about packages, activities, services, booking steps, pricing, or contact details for Yatra Go.';
  }

  if (GREETING_PATTERN.test(message.trim())) {
    return 'Hello! Welcome to Yatra Go. How would you like me to assist you today?';
  }

  if (text.includes('contact') || text.includes('call') || text.includes('phone') || text.includes('email') || text.includes('address') || text.includes('whatsapp')) {
    return `You can contact Yatra Go at ${CONTACT_DETAILS.phones.join(' / ')}. Email: ${CONTACT_DETAILS.email}. Office: ${CONTACT_DETAILS.address}. WhatsApp support is available on ${CONTACT_DETAILS.phones[0]}.`;
  }

  if (text.includes('book') || text.includes('booking') || text.includes('steps') || text.includes('process') || text.includes('how can i book')) {
    return getBookingGuide();
  }

  const matchedActivities = findMatchingActivities(message);
  if (matchedActivities.length > 0) {
    return `Relevant activity details:\n${matchedActivities
      .map((activity, index) => `${index + 1}. ${activity.name} - ${activity.location}, ${activity.duration}, starts at ${formatPrice(activity.price)}.`)
      .join('\n')}\n\nI can explain any one of these in full detail.`;
  }

  const matchedServices = findMatchingServices(message);
  if (matchedServices.length > 0) {
    return `Relevant service details:\n${matchedServices
      .map((service, index) => `${index + 1}. ${service.title} - ${service.summary}`)
      .join('\n')}\n\nTell me which service you want in detail.`;
  }

  const matchedPackages = findMatchingPackages(message);
  if (matchedPackages.length > 0) {
    return `Relevant package options:\n${matchedPackages
      .map((pkg, index) => `${index + 1}. ${pkg.title} - ${pkg.location}, ${pkg.days}, starts at ${formatPrice(pkg.price)}.`)
      .join('\n')}\n\nIf you want, I can compare them point by point.`;
  }

  return 'I can help with Yatra Go packages, activities, services, contact details, and booking guidance. Ask about any specific thing and I will answer that exact topic.';
};

export const buildGeminiSystemPrompt = (visitorName) => `
You are Yatra Go's premium website concierge.

Rules:
- Behave like a real professional chatbot, not a rigid FAQ bot.
- Answer the exact thing the user asked. If they ask about rafting, answer rafting, not packages unless the user asks for packages.
- Prefer point-to-point, structured, direct answers for details, comparisons, steps, and recommendations.
- Avoid vague generic replies.
- Prioritize Yatra Go website information for travel-related questions.
- If the user asks something outside travel business context, you may answer briefly and naturally as a helpful AI assistant.
- Never invent unavailable Yatra Go policies, prices, packages, activities, or destinations.
- Mention contact channels only when useful.
- If the user is logged in and their name is available, you may greet them by name when appropriate. Current user name: ${visitorName || 'Guest'}.
`.trim();

export const geminiConfig = {
  model: import.meta.env.VITE_GEMINI_MODEL || 'gemini-3-flash-preview',
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
};
