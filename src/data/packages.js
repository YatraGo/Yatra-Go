import { normalizeAssetFields } from '../lib/assets';

// ─── Central Packages Data — sourced from yatrago.com ───

export const formatPrice = (price) =>
    '₹' + price.toLocaleString('en-IN');

// ─── UTTARAKHAND PACKAGES ───
export const UTTARAKHAND_PACKAGES = [
    {
        slug: 'char-dham-yatra',
        title: 'Char Dham Yatra',
        region: 'Uttarakhand',
        location: 'Chardham',
        days: '10N/11D',
        price: 24999,
        originalPrice: 32000,
        rating: 4.9,
        reviews: 412,
        tag: 'BESTSELLER',
        img: 'https://thedptours.com/wp-content/uploads/2025/04/chardham.jpg', 
        gallery: [
            'public/assets/Yamunotri.jpg',
            'public/assets/Gangotri.webp',
            'public/assets/Kedar.png',
            'public/assets/Badrinath.jpg',
        ],
        desc: 'Embark on a sacred pilgrimage to all four holy shrines — Yamunotri, Gangotri, Kedarnath and Badrinath — seeking divine blessings amidst the majestic Himalayas.',
        highlights: ['Yamunotri & Gangotri Temple Darshan', 'Helicopter option available for Kedarnath', 'Badrinath Aarti & VIP Darshan', 'AC accommodations en route', 'Experienced local guide throughout'],
        includes: ['All transfers by AC vehicle (Non-AC in hilly areas)', 'Hotel accommodation (twin sharing)', 'Breakfast & Dinner daily', 'Expert guide (Extra)', 'All permits & entry fees'],
        excludes: ['Personal expenses', 'Helicopter charges', 'Lunch', 'Travel insurance'],
        itinerary: [
            { 
                day: 'Day 1', 
                title: 'Haridwar → Barkot', 
                desc: 'Pickup from Haridwar railway station / hotel. Scenic drive via Mussoorie & Kempty Falls. Reach Barkot (Yamunotri base camp), check-in hotel, dinner & overnight stay.' 
            },
            { 
                day: 'Day 2', 
                title: 'Yamunotri Darshan', 
                desc: 'Early morning drive to Janki Chatti. Trek/pony/palki (6 km) to Yamunotri Temple. Take holy dip in Surya Kund & perform darshan. Return to Barkot for dinner & overnight stay.' 
            },
            { 
                day: 'Day 3', 
                title: 'Barkot → Uttarkashi', 
                desc: 'After breakfast drive to Uttarkashi (Gangotri base). Visit Kashi Vishwanath Temple & enjoy views of Bhagirathi river. Check-in hotel, dinner & overnight stay.' 
            },
            { 
                day: 'Day 4', 
                title: 'Gangotri Darshan', 
                desc: 'Early morning drive to Gangotri Temple. Take holy dip in River Ganga at Gangotri Ghat & perform darshan. Optional visit to Gaumukh viewpoint. Return to Uttarkashi for overnight stay.' 
            },
            { 
                day: 'Day 5', 
                title: 'Uttarkashi → Guptkashi', 
                desc: 'Long scenic drive via Tehri Dam & Devprayag (Alaknanda & Bhagirathi Sangam). Reach Guptkashi, visit Ardh Narishwar Temple. Check-in hotel, dinner & overnight stay.' 
            },
            { 
                day: 'Day 6', 
                title: 'Kedarnath Darshan', 
                desc: 'Early morning drive to Sonprayag → Gaurikund. Trek (16 km) or helicopter to Kedarnath Temple. Darshan of Lord Shiva at one of the 12 Jyotirlingas. Overnight stay at Kedarnath / nearby camps.' 
            },
            { 
                day: 'Day 7', 
                title: 'Return Kedarnath → Badrinath', 
                desc: 'Morning darshan (optional), trek back to Gaurikund. Drive to Badrinath via Joshimath. Check-in hotel, evening aarti at Badrinath Temple. Overnight stay.' 
            },
            { 
                day: 'Day 8', 
                title: 'Badrinath Darshan', 
                desc: 'Early morning Maha Abhishek & temple darshan. Visit Mana Village (India’s last village), Vyas Gufa & Bhim Pul. Return to hotel, dinner & overnight stay.' 
            },
            { 
                day: 'Day 9', 
                title: 'Badrinath → Rishikesh', 
                desc: 'After breakfast drive to Rishikesh via Rudraprayag & Devprayag. Visit Ram Jhula, Laxman Jhula & Ganga Aarti at Triveni Ghat. Overnight stay in Rishikesh.' 
            },
            { 
                day: 'Day 10', 
                title: 'Rishikesh → Haridwar Departure', 
                desc: 'After breakfast drop at Haridwar railway station / hotel. Tour ends with divine blessings of Char Dham Yatra.' 
            }
        ],
    },

    // Do Dham Yatra (Kedarnath & Badrinath)
    {
        slug: 'do-dham-yatra',
        title: 'Do Dham Yatra (Kedarnath & Badrinath)',
        region: 'Uttarakhand',
        location: 'Kedarnath & Badrinath',
        days: '5N/6D',
        price: 18999,
        originalPrice: 24000,
        rating: 4.9,
        reviews: 242,
        tag: 'BESTSELLER',
        img: 'public/assets/Badrinath.jpg',
        gallery: [
            'public/assets/Kedar.png',
            'public/assets/Badrinath.jpg',
        ],
        desc: 'Seek blessings at two of the most sacred Himalayan shrines — Kedarnath (the seat of Lord Shiva) and Badrinath (the abode of Lord Vishnu).',
        highlights: ['Kedarnath Temple Darshan', 'Badrinath Temple VIP entry', 'Scenic drive through Sangams', 'Comfortable हिमालयन stays', 'Expert pilgrimage guide'],
        includes: ['Hotels (5 nights)', 'Breakfast & Dinner', 'Transfers by private vehicle', 'All permits'],
        excludes: ['Helicopter charges', 'Personal expenses', 'Lunch'],
        itinerary: [
            { day: 'Day 1', title: 'Haridwar → Guptkashi', desc: 'Drive via Devprayag & Rudraprayag to Guptkashi.' },
            { day: 'Day 2', title: 'Kedarnath Darshan', desc: 'Trek or helicopter to Kedarnath, overnight stay.' },
            { day: 'Day 3', title: 'Return to Guptkashi', desc: 'Trek back to Gaurikund, drive to Guptkashi.' },
            { day: 'Day 4', title: 'Guptkashi → Badrinath', desc: 'Scenic mountain drive to Badrinath, evening aarti.' },
            { day: 'Day 5', title: 'Badrinath → Rudraprayag', desc: 'Morning darshan, visit Mana village, drive to Rudraprayag.' },
            { day: 'Day 6', title: 'Departure', desc: 'Drive back to Haridwar via Rishikesh.' },
        ],
    },

    // Rishikesh Adventure Tour
    {
        slug: 'rishikesh-adventure-tour',
        title: 'Rishikesh Adventure Tour',
        region: 'Uttarakhand',
        location: 'Rishikesh',
        days: '2N/3D',
        price: 4999,
        originalPrice: 7000,
        rating: 4.8,
        reviews: 286,
        tag: 'TRENDING',
        img: 'public/assets/Rishikesh.jpg',
        gallery: [
            'public/assets/Rishikesh 4.jpg',
            'public/assets/Rishikesh 2.jpg',
            'public/assets/Rishikesh 3.jpg',
            'public/assets/Rishikesh.jpg',
        ],
        desc: 'Experience the adventure capital of India — river rafting on the Ganga, bungee jumping, yoga sessions, and the iconic Ganga Aarti ceremony at Laxman Jhula.',
        highlights: ['16km River Rafting on the Ganga', 'Bungee Jumping (83m)', 'Evening Ganga Aarti at Triveni Ghat', 'Lakshman Jhula & Ram Jhula visit', 'Yoga & meditation session'],
        includes: ['Hotel (2 nights, twin sharing)', 'Breakfast & Dinner', 'Rafting with gear', 'Local sightseeing transfers'],
        excludes: ['Bungee charges (extra ₹3500)', 'Lunch', 'Personal expenses'],
        itinerary: [
            { day: 'Day 1', title: 'Arrival in Rishikesh', desc: 'Check-in, evening Ganga Aarti at Triveni Ghat.' },
            { day: 'Day 2', title: 'Adventure Day', desc: 'Morning river rafting, afternoon bungee/zip-lining, evening yoga.' },
            { day: 'Day 3', title: 'Ashrams & Departure', desc: 'Visit Beatles Ashram, Ram & Lakshman Jhula, then depart.' },
        ],
    },

    // Nainital Lake Tour
    {
        slug: 'nainital-lake-tour',
        title: 'Nainital Lake Tour',
        region: 'Uttarakhand',
        location: 'Nainital',
        days: '2N/3D',
        price: 9999,
        originalPrice: 13000,
        rating: 4.7,
        reviews: 198,
        tag: 'POPULAR',
        img: 'public/assets/Nainital 1.png',
        gallery: [
            'public/assets/Nainital 1.png',
            'public/assets/Nainital 2.png',
            'public/assets/Nainital 3.jpg',
            'public/assets/Nainital 4.png',
        ],
        desc: 'Relax by the shimmering Naini Lake, wander through charming colonial lanes, ride the ropeway to Snow View, and enjoy peaceful boat rides in this hill station gem.',
        highlights: ['Naini Lake boating & ropeway ride', 'Snow View Point & Tiffin Top', 'Naina Devi Temple visit', 'Mall Road shopping', 'Jim Corbett day excursion available'],
        includes: ['Hotel (2 nights)', 'Breakfast', 'Local sightseeing transfers', 'Boat ride'],
        excludes: ['Ropeway charges', 'Lunch & Dinner', 'Personal expenses'],
        itinerary: [
            { day: 'Day 1', title: 'Arrival & Evening Lake', desc: 'Check-in, evening stroll on Mall Road, lakeside dinner.' },
            { day: 'Day 2', title: 'Full Day Sightseeing', desc: 'Naina Devi Temple, Snow View Point ropeway, boating.' },
            { day: 'Day 3', title: 'Departure', desc: 'Morning Tiffin Top visit, then depart.' },
        ],
    },

    // Mussoorie Hill Escape
    {
        slug: 'mussoorie-hill-escape',
        title: 'Mussoorie Hill Escape',
        region: 'Uttarakhand',
        location: 'Mussoorie',
        days: '2N/3D',
        price: 5999,
        originalPrice: 8000,
        rating: 4.6,
        reviews: 156,
        tag: 'WEEKEND',
        img: 'public/assets/Mussoorie 1.png',
        gallery: [
            'public/assets/Mussoorie 1.png',
            'public/assets/Mussoorie 3.png',
            'public/assets/Mussoorie 2.png',
            'public/assets/Mussoorie 4.png',
        ],
        desc: 'Escape to the "Queen of Hills" — wander through misty mountains, visit the iconic Kempty Falls, Gun Hill cable car, Camel\'s Back Road, and enjoy Himalayan sunrise views.',
        highlights: ['Kempty Falls visit', 'Gun Hill cable car ride', 'Camel\'s Back Road sunset', 'Lal Tibba viewpoint', 'Mall Road local market'],
        includes: ['Hotel (1 night)', 'Breakfast', 'Local sightseeing transfers'],
        excludes: ['Lunch & Dinner', 'Cable car charges', 'Personal expenses'],
        itinerary: [
            { day: 'Day 1', title: 'Arrival & Sightseeing', desc: 'Arrive, visit Kempty Falls, Gun Hill, Mall Road, check-in.' },
            { day: 'Day 2', title: 'Camel\'s Back & Departure', desc: 'Morning Lal Tibba, Camel\'s Back Road, then rest in the Hotel, Overnight stay at Mussoorie.' },
            { day: 'Day 3', title: 'Departure', desc: 'After breakfast depart for your home with sweet memories of Mussoorie.' },
        ],
    },

    // Jim Corbett Wildlife Safari
    {
        slug: 'jim-corbett-wildlife-safari',
        title: 'Jim Corbett Wildlife Safari',
        region: 'Uttarakhand',
        location: 'Jim Corbett',
        days: '1N/2D',
        price: 8999,
        originalPrice: 12000,
        rating: 4.7,
        reviews: 142,
        tag: 'WILDLIFE',
        img: 'https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&q=80',
        ],
        desc: 'Spot Bengal tigers, Asian elephants, leopards, and exotic birds on a thrilling jeep safari in India\'s oldest and most famous national park.',
        highlights: ['Morning & evening jeep safari', 'Tiger, elephant & leopard sightings', 'Corbett Museum visit', 'Nature walk with naturalist', 'Luxury jungle resort stay'],
        includes: ['Jungle resort (1 night)', 'All meals', 'Jeep safari with naturalist', 'Park entry fee'],
        excludes: ['Elephant safari (extra charge)', 'Personal expenses'],
        itinerary: [
            { day: 'Day 1', title: 'Arrival & Evening Safari', desc: 'Check-in at jungle resort, evening jeep safari, overnight stay at Jim Corbett.' },
            { day: 'Day 2', title: 'Morning Safari & Departure', desc: 'Early morning safari, breakfast, museum visit, depart for your home with sweet memories of Jim Corbett.' },
        ],
    },

    // Auli Snow Adventure
    {
        slug: 'auli-snow-adventure',
        title: 'Auli Snow Adventure',
        region: 'Uttarakhand',
        location: 'Auli',
        days: '2N/3D',
        price: 15999,
        originalPrice: 20000,
        rating: 4.8,
        reviews: 178,
        tag: 'SNOW',
        img: 'public/assets/auli.jpg',
        gallery: [
            'public/assets/auli.jpg',
            'https://images.unsplash.com/photo-1418985991508-e47386d96a71?w=800&q=80',
            'public/assets/Auli.png',
        ],
        desc: 'Glide down pristine snow-carpeted slopes at Auli — India\'s premier ski destination at 2500m — with breathtaking views of the Nanda Devi and other Himalayan peaks.',
        highlights: ['Skiing lessons (beginner to advanced)', 'Cable car (gondola) ride — Asia\'s longest', 'Nanda Devi & Mana Peak views', 'Snow trekking tour', 'Joshimath monastery visit'],
        includes: ['Hotel (2 nights)', 'Breakfast & Dinner', 'Cable car', 'Skiing equipment'],
        excludes: ['Advanced skiing coaching', 'Personal expenses'],
        itinerary: [
            { day: 'Day 1', title: 'Haridwar → Auli', desc: 'Drive via Devprayag and Joshimath. Check-in, evening snow walk.' },
            { day: 'Day 2', title: 'Skiing & Cable Car', desc: 'Full day skiing lessons, gondola ride, snow activities.' },
            { day: 'Day 3', title: 'Joshimath & Departure', desc: 'Visit Shankaracharya Math, return to Haridwar.' },
        ],
    },

    // Haridwar Spiritual Sojourn
    {
        slug: 'haridwar-spiritual-sojourn',
        title: 'Haridwar Spiritual Sojourn',
        region: 'Uttarakhand',
        location: 'Haridwar',
        days: '1N/2D',
        price: 7499,
        originalPrice: 10000,
        rating: 4.9,
        reviews: 334,
        tag: 'PILGRIMAGE',
        img: 'public/assets/Haridwar 1.png',
        gallery: [
            'public/assets/Haridwar 1.png',
            'public/assets/Haridwar 2.png',
            'public/assets/Haridwar 3.jpg',
            'public/assets/Haridwar 4.jpg',
        ],
        desc: 'Immerse in divine rituals, witness the mesmerizing Ganga Aarti at Har Ki Pauri, visit ancient temples, and find spiritual serenity in the gateway city of the gods.',
        highlights: ['Ganga Aarti at Har Ki Pauri', 'Mansa Devi & Chandi Devi temple visits', 'Holy dip in the Ganga', 'Rishikesh day excursion', 'Meditation session'],
        includes: ['Hotel (1 night)', 'Breakfast', 'Local sightseeing transfers', 'Guide'],
        excludes: ['Lunch & Dinner', 'Rope way charges', 'Personal expenses'],
        itinerary: [
            { day: 'Day 1', title: 'Arrival & Ganga Aarti', desc: 'Check-in, Har Ki Pauri, evening Ganga Aarti.' },
            { day: 'Day 2', title: 'Temples & Departure', desc: 'Mansa Devi ropeway, Chandi Devi, Rishikesh quick visit, depart.' },
        ],
    },

    // Kedarnath Yatra
    {
        slug: 'kedarnath-yatra',
        title: 'Kedarnath Yatra',
        region: 'Uttarakhand',
        location: 'Kedarnath',
        days: '4N/5D',
        price: 14999,
        originalPrice: 18000,
        rating: 4.9,
        reviews: 286,
        tag: 'PILGRIMAGE',
        img: 'public/assets/Kedarnath 1.png',
        gallery: [
            'public/assets/Kedarnath 1.png',
            'public/assets/Kedarnath 2.png',
        ],
        desc: 'Embark on a sacred pilgrimage to Kedarnath, one of the twelve Jyotirlingas, and seek divine blessings amidst the majestic Himalayas.',
        highlights: ['Kedarnath Temple Darshan', 'Maha Abhishek & temple darshan', 'Holy dip in the Ganga', 'Rishikesh day excursion', 'Meditation session'],
        includes: ['Hotel (1 night)', 'Breakfast & Dinner', 'Local sightseeing transfers'],
        excludes: ['Lunch', 'Rope way charges', 'Personal expenses', 'Guide'],
        itinerary: [
            { 
                day: 'Day 1', 
                title: 'Haridwar → Guptkashi', 
                desc: 'Pickup from Haridwar, drive via Devprayag & Rudraprayag. Reach Guptkashi, check-in & rest.' 
            },
            { 
                day: 'Day 2', 
                title: 'Guptkashi → Kedarnath', 
                desc: 'Drive to Sonprayag → Gaurikund. Then proceed to Kedarnath by Trekking (16km) or by Helicopter (on direct payment basis). After reaching Kedarnath, check in to your accommodation and proceed to darshan of shri Kedarnath Temple & overnight stay at Kedarnath.' 
            },
            { 
                day: 'Day 3', 
                title: 'Kedarnath → Guptkashi', 
                desc: 'Morning after darshan of shri Kedarnath Temple, trek back to Gaurikund. Drive to Guptkashi, check-in & overnight stay at Guptkashi.' 
            },
            { 
                day: 'Day 4', 
                title: 'Guptkashi → Rishikesh', 
                desc: 'Drive to Rishikesh via Rudraprayag. Visit Ram Jhula & Ganga Aarti in the evening. Overnight stay at Rishikesh.' 
            },
            { 
                day: 'Day 5', 
                title: 'Rishikesh → Haridwar Departure', 
                desc: 'After breakfast drop at Haridwar. Tour ends.' 
            },
        ],
    },

    // Chopta (Mini Switzerland)
    {
        slug: 'chopta-tungnath-trek',
        title: 'Chopta & Tungnath Trek',
        region: 'Uttarakhand',
        location: 'Chopta, Rudraprayag',
        days: '3N/4D',
        price: 8499,
        originalPrice: 11000,
        rating: 4.8,
        reviews: 156,
        tag: 'TREKKING',
        img: 'public/assets/Chopta.png',
        gallery: [
            'public/assets/Chopta.png',
        ],
        desc: 'Trek to the world\'s highest Shiva temple at Tungnath and witness 360-degree Himalayan views from Chandrashila peak in "Mini Switzerland".',
        highlights: ['Tungnath Temple Trek (3.5km)', 'Chandrashila Peak Sunrise', 'Camping in lush meadows', 'Bird watching in Kedarnath Wildlife Sanctuary'],
        includes: ['Camps/Hotels (3 nights)', 'Meals (MAP)', 'Transfers', 'Guide'],
        excludes: ['Personal gear', 'Lunch'],
        itinerary: [
            { day: 'Day 1', title: 'Haridwar → Chopta', desc: 'Scenic drive to Chopta base.' },
            { day: 'Day 2', title: 'Tungnath & Chandrashila', desc: 'Morning trek to Tungnath temple and Chandrashila peak.' },
            { day: 'Day 3', title: 'Deoriatal Lake', desc: 'Short trek to Deoriatal for reflection views of Chaukhamba.' },
            { day: 'Day 4', title: 'Departure', desc: 'Return drive to Haridwar.' },
        ],
    },

    // Harsil Package
    {
        slug: 'harsil-valley-escape',
        title: 'Harsil Valley Escape',
        region: 'Uttarakhand',
        location: 'Harsil, Uttarkashi',
        days: '3N/4D',
        price: 11999,
        originalPrice: 15000,
        rating: 4.7,
        reviews: 92,
        tag: 'SCENIC',
        img: 'public/assets/Uttarakhand.jpg',
        gallery: [
            'public/assets/Uttarakhand.jpg',
        ],
        desc: 'Discover the hidden apple valley of Uttarakhand — crystal clear Bhagirathi river, cedar forests, and the nearby Gartang Gali heritage bridge.',
        highlights: ['Apple Orchard walks', 'Gartang Gali wooden bridge', 'Gangotri Temple day trip', 'Wilson Cottage history'],
        includes: ['Stay (3 nights)', 'Breakfast & Dinner', 'Private Cab'],
        excludes: ['Entry fees', 'Lunch'],
        itinerary: [
            { day: 'Day 1', title: 'Uttarkashi → Harsil', desc: 'Reach Harsil from Haridwar/Uttarkashi.' },
            { day: 'Day 2', title: 'Gangotri & Gaumukh Check', desc: 'Day trip to Gangotri temple.' },
            { day: 'Day 3', title: 'Gartang Gali & Local', desc: 'Walk on historical sky bridge, local village tour.' },
            { day: 'Day 4', title: 'Departure', desc: 'Drive back via scenic routes.' },
        ],
    },

    // Binsar Package
    {
        slug: 'binsar-wildlife-retreat',
        title: 'Binsar Wildlife Retreat',
        region: 'Uttarakhand',
        location: 'Binsar, Almora',
        days: '3N/4D',
        price: 13999,
        originalPrice: 18000,
        rating: 4.8,
        reviews: 114,
        tag: 'WILDLIFE',
        img: 'https://www.binsarforestretreat.com/wp-content/uploads/Binsar-Forest-Retreat-Patio-1038x487.jpg',
        gallery: [
            'https://www.binsarforestretreat.com/wp-content/uploads/Binsar-Forest-Retreat-Patio-1038x487.jpg',
        ],
        desc: 'Unplug in the heart of Binsar Wildlife Sanctuary — panoramic Zero Point views of Kedarnath, Nanda Devi and Trishul peaks.',
        highlights: ['Zero Point Himalayan View', 'Binsar Wildlife Sanctuary safari', 'Ancient Kasar Devi Temple', 'Stargazing experiences'],
        includes: ['Eco-resort stay', 'Meals', 'Sanctuary permits'],
        excludes: ['Safari charges', 'Personal items'],
        itinerary: [
            { day: 'Day 1', title: 'Nainital → Binsar', desc: 'Drive to Binsar wildlife sanctuary.' },
            { day: 'Day 2', title: 'Zero Point & Wildlife', desc: 'Morning walk to Zero Point for 300km peak views.' },
            { day: 'Day 3', title: 'Kasar Devi & Jageshwar', desc: 'Visit Magnetically active Kasar Devi, Jageshwar Temples.' },
            { day: 'Day 4', title: 'Departure', desc: 'Return drive to Kathgodam/Nainital.' },
        ],
    },
];

// ─── HIMACHAL PACKAGES ───
export const HIMACHAL_PACKAGES = [
    {
        slug: 'shimla-manali-tour',
        title: 'Shimla & Manali Tour',
        region: 'Himachal Pradesh',
        location: 'Shimla & Manali',
        days: '6N/7D',
        price: 29999,
        originalPrice: 38000,
        rating: 4.9,
        reviews: 312,
        tag: 'BESTSELLER',
        img: 'public/assets/Shimla 1.png',
        gallery: [
            'public/assets/Shimla 1.png',
            'public/assets/Shimla 2.png',
        ],
        desc: 'Experience the best of Himachal Pradesh — colonial charm of Shimla, the snow-capped Kufri, scenic Solang Valley snow adventure, and the legendary Rohtang Pass.',
        highlights: ['Kufri snow adventure & horse riding', 'Mall Road & Christ Church, Shimla', 'Solang Valley — snow activities', 'Rohtang Pass (subject to weather)', 'Old Manali local market'],
        includes: ['Hotels (6 nights)', 'Breakfast & Dinner daily', 'AC Innova Crysta (Non-AC in hilly areas)', 'Driver & fuel', 'All sightseeing'],
        excludes: ['Rohtang Pass permit (₹500 extra)', 'Personal expenses', 'Lunch', 'Rafting', 'Entry tickets', 'Cable car'],
        itinerary: [
            { day: 'Day 1', title: 'Delhi → Shimla', desc: 'Overnight drive to Shimla, check-in.' },
            { day: 'Day 2', title: 'Shimla Sightseeing', desc: 'Mall Road, Christ Church, Scandal Point, Kufri.' },
            { day: 'Day 3', title: 'Shimla → Manali', desc: 'Scenic drive via Mandi and Kullu Valley.' },
            { day: 'Day 4', title: 'Rohtang Pass', desc: 'Early morning drive to Rohtang Pass, snow activities.' },
            { day: 'Day 5', title: 'Solang Valley', desc: 'Paragliding, zorbing, rope activities at Solang.' },
            { day: 'Day 6', title: 'Manali Local', desc: 'Hadimba Devi Temple, Vashisht Hot Springs, Mall Road.' },
            { day: 'Day 7', title: 'Return Journey', desc: 'Drive back to Delhi/Haridwar.' },
        ],
    },
    
    // Dharamshala & Dalhousie Tour
    {
        slug: 'dharamshala-dalhousie-tour',
        title: 'Dharamshala & Dalhousie Tour',
        region: 'Himachal Pradesh',
        location: 'Dharamshala & Dalhousie, HP',
        days: '4N/5D',
        price: 25999,
        originalPrice: 33000,
        rating: 4.7,
        reviews: 198,
        tag: 'CULTURAL',
        img: 'public/assets/Dharamshala 1.png',
        gallery: [
            'public/assets/Dharamshala 1.png',
            'public/assets/Dharamshala 2.png',
        ],
        desc: 'Explore the home of the Dalai Lama at McLeod Ganj, discover the "Mini Switzerland of India" at Khajjiar, and the colonial charm of Dalhousie.',
        highlights: ['McLeod Ganj & Dalai Lama temple', 'Khajjiar — "Mini Switzerland of India"', 'St. John\'s Church & Kalatop Forest', 'Tibetan market & cuisine', 'Paragliding at Bir Billing'],
        includes: ['Hotel (4 nights)', 'Breakfast & Dinner', 'Innova Crysta', 'All sightseeing'],
        excludes: ['Paragliding charges', 'Personal expenses'],
        itinerary: [
            { day: 'Day 1', title: 'Arrival in Dharamshala', desc: 'Check-in, evening at McLeod Ganj market.' },
            { day: 'Day 2', title: 'Dharamshala Tour', desc: 'Dalai Lama Complex, Bhagsu Nag waterfall, cricket stadium.' },
            { day: 'Day 3', title: 'Khajjiar Day Trip', desc: 'Drive to Khajjiar meadow, return to Dalhousie.' },
            { day: 'Day 4', title: 'Dalhousie Sightseeing', desc: 'Satdhara Falls, St. John\'s Church, Kalatop sanctuary.' },
            { day: 'Day 5', title: 'Departure', desc: 'Morning walk, breakfast, check-out and depart.' },
        ],
    },

    // Spiti Valley Adventure
    {
        slug: 'spiti-valley-adventure',
        title: 'Spiti Valley Adventure',
        region: 'Himachal Pradesh',
        location: 'Spiti Valley, HP',
        days: '6N/7D',
        price: 34999,
        originalPrice: 44000,
        rating: 4.9,
        reviews: 164,
        tag: 'ADVENTURE',
        img: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80',
        gallery: [
            'public/assets/Spiti 1.jpg',
            'public/assets/Spiti 2.jpg',
            'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80',
        ],
        desc: 'Embark on a thrilling high-altitude expedition through Kaza, Key Monastery (world\'s highest), Chandratal Lake, Pin Valley, and Kibber village.',
        highlights: ['Key Monastery — world\'s highest motorable monastery', 'Chandratal Lake — crescent lake at 4300m', 'Pin Valley national park', 'Kibber village — one of world\'s highest villages', 'Stunning moonscape landscapes'],
        includes: ['Hotel/Guesthouse (6 nights)', 'Breakfast & Dinner', 'Innova Crysta (essential)', 'Experienced local driver'],
        excludes: ['Enroute toll', 'Personal expenses', 'Lunch', 'Entry tickets'],
        itinerary: [
            { day: 'Day 1', title: 'Shimla → Narkanda', desc: 'Drive from Shimla, crossing apple orchards.' },
            { day: 'Day 2', title: 'Narkanda → Reckon Peo', desc: 'Cross Wangtu, reach Reckon Peo.' },
            { day: 'Day 3', title: 'Reckon Peo → Kaza', desc: 'Cross Spiti River gorges into Kaza.' },
            { day: 'Day 4', title: 'Kaza Exploration', desc: 'Key Monastery, Kibber, Chicham bridge.' },
            { day: 'Day 5', title: 'Chandratal Lake', desc: 'Drive to crescent Chandratal Lake.' },
            { day: 'Day 6', title: 'Return to Manali', desc: 'Cross Rohtang, return to Manali.' },
            { day: 'Day 7', title: 'Manali → Departure', desc: 'Free morning, depart.' },
        ],
    },

    // Kasol & Kheerganga Trek
    {
        slug: 'kasol-kheerganga-trek',
        title: 'Kasol & Kheerganga Trek',
        region: 'Himachal Pradesh',
        location: 'Parvati Valley, HP',
        days: '3N/4D',
        price: 18999,
        originalPrice: 24000,
        rating: 4.8,
        reviews: 142,
        tag: 'TREKKING',
        img: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80',
        gallery: [
            'public/assets/Kasol 1.png',
            'public/assets/Kasol 2.png',
            'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80',
        ],
        desc: 'Immerse in the serene Parvati Valley, trek through dense forests to natural hot springs at Kheerganga, experience the Israeli & Tibetan café culture of Kasol.',
        highlights: ['Kasol riverside camping', 'Kheerganga hot springs trek (12km)', 'Manikaran Sahib Gurudwara', 'Chalal village walk', 'Organic cafés & local culture'],
        includes: ['Tents/camps (3 nights)', 'All meals'],
        excludes: ['Personal trekking gear', 'Hot spring entry', 'Trek guide', 'Camping equipment'],
        itinerary: [
            { day: 'Day 1', title: 'Arrival at Kasol', desc: 'Reach Kasol, riverside camp settle-in.' },
            { day: 'Day 2', title: 'Kasol Local', desc: 'Manikaran Sahib, Chalal village, market.' },
            { day: 'Day 3', title: 'Kheerganga Trek', desc: '12km trek through forest to hot springs.' },
            { day: 'Day 4', title: 'Return & Depart', desc: 'Trek back, depart for homebase.' },
        ],
    },

    // Romantic Himachal Honeymoon
    {
        slug: 'romantic-himachal-honeymoon',
        title: 'Romantic Himachal Honeymoon',
        region: 'Himachal Pradesh',
        location: 'Shimla · Manali · Kullu, HP',
        days: '6N/7D',
        price: 32999,
        originalPrice: 42000,
        rating: 4.9,
        reviews: 228,
        tag: 'HONEYMOON',
        img: 'public/assets/Romantic Himachal.png',
        gallery: [
            'public/assets/Romantic Himachal.png',
            'public/assets/Shimla 1.png',
            'public/assets/Manali.png',
            'public/assets/Rohtang.jpg',
            'public/assets/Hidimba Devi.jpg',
            'public/assets/Romantic Manali.png',
        ],
        desc: 'A dream honeymoon across the mountains — luxury stays in Shimla, snow-season in Manali, romantic candlelit dinners, private sightseeing, and couple spa packages.',
        highlights: ['Luxury hotel stays (4-star)', 'Private AC vehicle throughout', 'Romantic candlelit dinner arrangement', 'Couple spa session', 'Solang Valley snow activities'],
        includes: ['Hotel (6 nights, couple room)', 'Breakfast & Dinner daily', 'Private AC vehicle', 'Couple activities'],
        excludes: ['Personal expenses', 'Rohtang Pass permit'],
        itinerary: [
            { 
                day: 'Day 1', 
                title: 'Arrival in Shimla', 
                desc: 'Pickup & hotel check-in. Relax with welcome drinks followed by a romantic candlelight dinner & overnight stay.' 
            },
            { 
                day: 'Day 2', 
                title: 'Shimla Romance', 
                desc: 'Visit Kufri for scenic views & activities. Explore Mall Road, Christ Church & enjoy a cozy evening walk together.' 
            },
            { 
                day: 'Day 3', 
                title: 'Shimla → Manali', 
                desc: 'Scenic drive via Kullu Valley, river rafting point & shawl factories. Reach Manali, check-in & relax.' 
            },
            { 
                day: 'Day 4', 
                title: 'Rohtang/Solang Snow Experience', 
                desc: 'Excursion to Solang Valley/Rohtang Pass. Enjoy snow activities, cable car ride & romantic photoshoot in snow.' 
            },
            { 
                day: 'Day 5', 
                title: 'Hadimba & Vashisht', 
                desc: 'Visit Hadimba Devi Temple, Vashisht hot springs & Tibetan Monastery. Evening free for shopping & cafés.' 
            },
            { 
                day: 'Day 6', 
                title: 'Manali Leisure & Romance', 
                desc: 'Leisure day with river-side walk, Old Manali cafés, optional couple spa & private romantic dinner.' 
            },
            { 
                day: 'Day 7', 
                title: 'Departure', 
                desc: 'Breakfast at hotel. Check-out & departure with beautiful honeymoon memories.' 
            },
        ],
    },
];


// ─── Combined PACKAGES array (for existing pages that use it) ───
export const ALL_PACKAGES = [
    ...UTTARAKHAND_PACKAGES,
    ...HIMACHAL_PACKAGES,
].map(normalizeAssetFields);


export const PACKAGES = [
    ...UTTARAKHAND_PACKAGES.slice(0, 4),
    ...HIMACHAL_PACKAGES.slice(0, 2),
].map(normalizeAssetFields);

// ????????? ACTIVITIES (used on homepage) ?????????
export const ACTIVITIES = [
    {
        name: 'River Rafting',
        location: 'RISHIKESH',
        price: '799/person',
        img: 'public/assets/R5.jpg',
        desc: 'Grade II-V rapids on the holy Ganga through scenic gorges',
    },
    {
        name: 'Camping',
        location: 'RISHIKESH RIVERSIDE',
        price: '₹1,299/person',
        img: 'public/assets/Camping Y.png',
        desc: 'Riverside tents, bonfire & stargazing in Himalayan foothills',
    },
    {
        name: 'Bungee Jumping',
        location: 'RISHIKESH',
        price: '₹3,500/person',
        img: 'public/assets/Bungee.png',
        desc: '83m freefall India\'s highest commercial bungee jump',
    },
    {
        name: 'Paragliding',
        location: 'BIR BILLING, MUSSOORIE',
        price: '₹2,000/person',
        img: 'public/assets/Paragliding.png',
        desc: 'Soar over Himalayan valleys in a tandem paragliding flight',
    },
    {
        name: 'Zip-Lining',
        location: 'Rishikesh',
        price: '₹3,999/person',
        img: 'public/assets/Zip 1.png',
        desc: 'Fly across the churning Ganga river at high speed on our 400-meter zip-line.',
    },
    {
        name: 'Bike Rentals',
        location: 'Rishikesh',
        price: '₹600/Day',
        img: 'public/assets/Bike Rental.png',
        desc: 'Rent a classic bicycle for exploring the scenic beauty of Rishikesh.',
        src: 'https://www.yatrago.com/activities/bike-rental',
    },
].map(normalizeAssetFields);

export const getPackageBySlug = (slug) => {
    return ALL_PACKAGES.find(p => p.slug === slug);
};
