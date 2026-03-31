import { normalizeAssetFields } from '../lib/assets';

export const BLOG_POSTS = [
    {
        id: 1,
        title: 'Exploring the Hidden Trails: A Complete Guide to Uttarakhand Trekking',
        category: 'Adventure',
        readTime: '8 min read',
        date: 'October 15, 2023',
        author: { name: 'Aryan Sharma', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&q=80', role: 'Head of Trekking Operations' },
        excerpt: 'Discover the untouched beauty of the Himalayas. From the vibrant Valley of Flowers to the challenging Roopkund trek...',
        imageUrl: 'public/assets/Trekking Blog 2.png',
        featured: true,
        content: `
            <p>Uttarakhand, often referred to as Devbhumi (Land of the Gods), is arguably India's premier destination for high-altitude trekking. Nestled deep within the majestic Himalayas, it offers trails that wander through sprawling alpine meadows, thick oak forests, and past crystal-clear glacial lakes. Whether you are a beginner seeking a weekend escape or a seasoned mountaineer hunting for your next challenge, the Garhwal and Kumaon regions have trails that cater to every spirit of adventure.</p>
            
            <h3>1. The Valley of Flowers Trek</h3>
            <p>A UNESCO World Heritage Site, this relatively moderate trek bursts into life during the monsoon months of July and August. Over 300 species of rare alpine flowers carpet the sweeping valleys, set against the backdrop of imposing snow-capped peaks. The trail originates from Govindghat, taking you through vibrant streams and waterfalls before culminating at a surreal 12,000 feet.</p>
            <ul>
                <li><strong>Difficulty:</strong> Moderate</li>
                <li><strong>Best Time:</strong> July to September</li>
                <li><strong>Base Camp:</strong> Govindghat</li>
            </ul>

            <h3>2. Kedarkantha Over-Snow Trek</h3>
            <p>If plunging into knee-deep snow defines adventure for you, Kedarkantha is the ultimate winter trek. Characterized by its stunning 360-degree view of the prominent mountain ranges like Swargarohini and Bandarpoonch, the summit climb is an absolute mind-bender. The pine forests leading up to the summit look incredibly magical under a heavy blanket of winter snow.</p>
            
            <blockquote>
                "The mountains are calling and I must go. Specifically, the Himalayas."
            </blockquote>

            <h3>Essential Packing List</h3>
            <p>Before attempting any Himalayan ascent, safety and preparation cannot be stressed enough. Always pack:</p>
            <ol>
                <li>High-ankle waterproof trekking boots</li>
                <li>A negative-degree rated sleeping bag (if independent trekking)</li>
                <li>Thermal base layers and a down jacket</li>
                <li>Personal medical kit including altitude sickness (Diamox) tablets</li>
            </ol>
            
            <p>Embrace the challenge, breathe the purest air on earth, and let the sheer scale of the Himalayas humble you. Happy trekking!</p>
        `
    },
    {
        id: 2,
        title: 'The Ultimate Chardham Yatra Travel Itinerary (2024 Guide)',
        category: 'Spiritual',
        readTime: '12 min read',
        date: 'September 22, 2023',
        author: { name: 'Priya Verma', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80', role: 'Pilgrimage Expert' },
        excerpt: 'Plan your sacred pilgrimage to Yamunotri, Gangotri, Kedarnath, and Badrinath. Learn the best routes, VIP Darshan tips...',
        imageUrl: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800&q=80',
        featured: false,
        content: `
            <p>The Chardham Yatra is not just a tour; it is a profound spiritual awakening. Nestled at colossal altitudes in the Garhwal Himalayas, the four sacred shrines—Yamunotri, Gangotri, Kedarnath, and Badrinath—draw millions of devoted pilgrims every year seeking Moksha (salvation). Undertaking this journey requires rigorous planning, physical endurance, and a pure heart.</p>
            
            <h3>Understanding the Route</h3>
            <p>Tradition dictates that the Yatra must be completed from West to East. Therefore, the spiritual journey begins at Yamunotri, followed by Gangotri, progresses to the arduous Kedarnath, and finally concludes at the grand Badrinath temple.</p>
            
            <h3>1. Yamunotri: Origins of Grace</h3>
            <p>Dedicated to Goddess Yamuna, reaching the temple involves a steep 6km trek from Janki Chatti. Many prefer hiring ponies or palanquins. Make sure to cook rice in the natural hot springs of Surya Kund to take home as Prasad.</p>
            
            <h3>2. Gangotri: The Descent of Ganga</h3>
            <p>Accessible directly by motorable roads, Gangotri is stunning. Set amidst deodar forests, the shrine is incredibly peaceful. Don't forget to take a holy dip in the icy Bhagirathi river before visiting the shrine.</p>

            <h3>3. Kedarnath: The Abode of Shiva</h3>
            <p>Perhaps the most demanding, Kedarnath requires a grueling 16km uphill trek from Gaurikund. For those short on time or physical stamina, booking a helicopter shuttle is highly recommended—however, book months in advance!</p>

            <h3>4. Badrinath: The Grand Finale</h3>
            <p>Dedicated to Lord Vishnu, this is the most accessible and celebrated of the four shrines. Sitting on the banks of the Alaknanda River, the temple's bright facade is iconic. Visit the Tapt Kund before your Darshan.</p>

            <h3>Essential Permits & Bookings</h3>
            <p>You strictly need a mandatory <strong>Yatra Registration (Photometric Pass)</strong> issued by the Uttarakhand Government to participate. Avoid monsoon months (July-August) due to heavy landslide risks.</p>
        `
    },
    {
        id: 3,
        title: 'Top 10 Luxury Riverside Camps in Rishikesh You Must Visit',
        category: 'Stay & Relax',
        readTime: '6 min read',
        date: 'August 10, 2023',
        author: { name: 'Yatra Go Experts', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80', role: 'Lifestyle Reviewer' },
        excerpt: 'Experience the serene blend of luxury and raw nature. We review the most premium camping sites alongside the Ganges offering world-class amenities, private pools, and starlit dining...',
        imageUrl: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=800&q=80',
        featured: false,
        content: `
            <p>Gone are the days when camping in Rishikesh meant sleeping on a thin mat in a cramped dome tent. The era of "Glamping" (Glamorous Camping) has firmly rooted itself along the shores of the Ganges. Imagine waking up to the soothing sounds of the river, stepping out onto a wooden deck, and having a private butler serve you freshly brewed Himalayan tea. This is luxury redefined.</p>

            <h3>1. Aloha by the Ganges</h3>
            <p>A high-end resort offering luxury Swiss tents right on the riverbank. Aloha focuses on a wellness-oriented stay with exquisite spa therapies and multi-cuisine dining under the stars.</p>

            <h3>2. The Glasshouse on the Ganges</h3>
            <p>Set amidst a lychee and mango orchard, their luxury tents offer private, uninterrupted access to a white-sand beach. It is incredibly romantic, peaceful, and totally isolated from city noise.</p>
            
            <h3>What to Expect from Premium Camps</h3>
            <ul>
                <li>En-suite modern washrooms with constant hot water</li>
                <li>Plush, massive king-sized beds with electric blankets for cold nights</li>
                <li>Curated experiences: Live BBQ, private bonfires, guided morning yoga</li>
                <li>Top-of-the-line security and privacy</li>
            </ul>

            <p>Rishikesh transforms completely once the sun sets. The cool mountain breeze, the roaring river, and a luxurious setup guarantee it will be the most relaxing weekend of your life.</p>
        `
    },
    {
        id: 4,
        title: 'River Rafting 101: Navigating the Ganges Like a Pro',
        category: 'Activity',
        readTime: '5 min read',
        date: 'July 18, 2023',
        author: { name: 'Aryan Sharma', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&q=80', role: 'Head of Trekking Operations' },
        excerpt: 'Everything you need to know before hitting the rapids in Rishikesh. We break down the courses from Marine Drive to Shivpuri, safety protocols, and what to pack for the ultimate splash...',
        imageUrl: 'public/assets/Rafting1.png',
        featured: false,
        content: `
            <p>Rishikesh holds the undisputed crown as India's River Rafting capital. The mighty Ganges flowing down from the glaciers offers some of the most thrilling, pulse-pounding, Grade II to Grade IV rapids accessible to both beginners and experts alike.</p>
            
            <h3>Choosing Your Course</h3>
            <p>The rafting routes are categorized mainly by distance and the intensity of rapids. Choose wisely based on your group's fitness and fear threshold!</p>
            
            <ul>
                <li><strong>9 KM Route (Brahmpuri):</strong> Perfect for families and absolute beginners. Small splashes, very safe, takes about 1.5 hours.</li>
                <li><strong>16 KM Route (Shivpuri):</strong> The crowd favorite! Features famous rapids like 'Roller Coaster' and 'Golf Course'. Packed with fun.</li>
                <li><strong>26 KM Route (Marine Drive):</strong> For the brave. Long, enduring, and features massive waves. Highly exhausting but incredibly rewarding.</li>
                <li><strong>35 KM Route (Kaudiyala):</strong> Features "The Wall," a formidable Grade IV+ rapid that is notorious for flipping rafts. Strictly for experienced rafters.</li>
            </ul>

            <h3>Safety First: The Golden Rules</h3>
            <p>While rafting is immensely fun, it is an extreme sport. Your safety depends entirely on discipline.</p>
            <ol>
                <li>Always wear your life jacket and helmet. Ensure they are strapped impossibly tight.</li>
                <li>Listen exclusively to your River Guide. In a rapid, their command is law.</li>
                <li>Never carry valuables, phones, or non-waterproof cameras on the raft.</li>
                <li>Avoid alcohol drastically at least 24 hours prior to your run.</li>
            </ol>
            
            <p>Embrace the fear and let the Ganges wash over you. It's an adrenaline cocktail you'll never forget!</p>
        `
    },
    {
        id: 5,
        title: 'Devprayag: Where the Rivers Meet and Spirituality Begins',
        category: 'Destinations',
        readTime: '7 min read',
        date: 'June 30, 2023',
        author: { name: 'Rohan Gupta', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80', role: 'Cultural Expert' },
        excerpt: 'A mesmerizing photo-journey through Devprayag, the divine confluence of Alaknanda and Bhagirathi rivers. Discover why this small town is a photographer\'s absolute paradise...',
        imageUrl: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=800&q=80',
        featured: false,
        content: `
            <p>There are rare places on earth where nature stages poetry. Devprayag, located around 70km from Rishikesh, is one such masterpiece. This small, cascading town is globally renowned as the precise point where the violent, muddy waters of the Bhagirathi river collide with the calm, emerald streams of the Alaknanda to officially form the holy river Ganga.</p>

            <h3>The Astonishing Visual Contrast</h3>
            <p>The primary reason Devprayag is a photographer's dream is the distinct, almost unbelievable color difference between the two rivers before they merge. You can stand on the suspension bridge and witness the exact line where the two forces mix, creating a mesmerizing swirling pattern of jade and brown.</p>

            <h3>Spiritual Significance</h3>
            <p>In Hindu mythology, Devprayag is immensely powerful. It is the final of the "Panch Prayags" (Five Confluences). The ancient <strong>Raghunathji Temple</strong>, dedicated to Lord Rama, sits high up in the town, believed to be over 10,000 years old. Legend states that Lord Rama did penance here to absolve himself of the sin of killing Ravana.</p>

            <h3>What to do in Devprayag</h3>
            <ul>
                <li>Take a ritual bath at the Sangam (confluence point), though extreme caution is required due to fast currents.</li>
                <li>Explore the narrow, winding stone alleys filled with ancient architecture and traditional Garhwali homes.</li>
                <li>Visit the Dashrathshila, a holy rock where King Dashrath performed penance.</li>
            </ul>

            <p>A day trip to Devprayag will leave you spiritually refreshed and with an SD card full of some of the most magnificent landscape photos of the Himalayas.</p>
        `
    },
    {
        id: 6,
        title: '5 Must-Try Local Delicacies When Traveling Through Garhwal',
        category: 'Culture & Food',
        readTime: '4 min read',
        date: 'May 12, 2023',
        author: { name: 'Priya Verma', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80', role: 'Pilgrimage Expert' },
        excerpt: 'From the warm, comforting Kafuli to the sweet Bal Mithai, explore the authentic culinary treasures of the Garhwal Himalayas. The true taste of Uttarakhand awaits...',
        imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80',
        featured: false,
        content: `
            <p>If you travel to Uttarakhand without diving into the local Garhwali cuisine, you've missed half the cultural experience. The food here is distinctly marked by the harsh but fertile mountain climate—it's incredibly earthy, highly nutritious, and designed to generate warmth in freezing temperatures.</p>

            <h3>1. Kafuli</h3>
            <p>This is the definitive comfort food of the region. A thick, dark green gravy made predominantly of spinach and fenugreek leaves, cooked slowly in an iron wok, spiced gracefully, and thickened with rice flour. It's usually devoured with steaming hot rice.</p>

            <h3>2. Phaanu</h3>
            <p>A complex dish originating from the heart of Garhwal, Phaanu is made from mixed lentils (especially Gahat) that are soaked overnight, ground into a paste, and then cooked into a rich, savory broth. A must-have during the bone-chilling mountain winters.</p>

            <h3>3. Aloo ke Gutke</h3>
            <p>It sounds simple—roasted potatoes—but the magic lies in the local Himalayan spices. Boiled potatoes are fried in mustard oil, completely coated with Jakhiya (wild mustard seeds), red chilies, and coriander. It serves as an ultimate spicy side-dish.</p>
            
            <h3>4. Bhang ki Chutney</h3>
            <p>Do not be alarmed! Hemp seeds are a massive part of Uttarakhandi culture. This extremely tangy, nutty chutney made from roasted hemp seeds, cumin, and lemon juice absolutely elevates any boring meal.</p>
            
            <h3>5. Bal Mithai</h3>
            <p>A dessert strictly native to the region, predominantly Kumaon. It's a dark, roasted milk fudge covered entirely in tiny white sugar balls. It has a rich, deeply caramelized flavor that pairs perfectly with a view of the mountains.</p>

            <p>Leave the pizza and pasta behind for a few days, and let the mountain chefs surprise you. Happy eating!</p>
        `
    }
].map(normalizeAssetFields);
