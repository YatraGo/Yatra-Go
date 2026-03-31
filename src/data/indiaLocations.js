export const INDIA_LOCATIONS = [
    'Agra', 'Ahmedabad', 'Ajmer', 'Alappuzha', 'Alibaug', 'Aligarh', 'Allahabad', 'Almora',
    'Amarnath', 'Amritsar', 'Anandpur Sahib', 'Andaman Islands', 'Anjuna', 'Araku Valley', 'Auli', 'Aurangabad',
    'Ayodhya', 'Badrinath', 'Bagdogra', 'Bangalore', 'Bankura', 'Bareilly', 'Bastar', 'Belur',
    'Bengaluru', 'Bharatpur', 'Bhavnagar', 'Bhedaghat', 'Bhilai', 'Bhimtal', 'Bhopal', 'Bhubaneswar',
    'Bhuj', 'Bikaner', 'Bir Billing', 'Bodh Gaya', 'Calangute', 'Chail', 'Chamba', 'Chandigarh',
    'Chennai', 'Cherrapunji', 'Chikmagalur', 'Chitrakoot', 'Chittorgarh', 'Coimbatore', 'Coorg', 'Coonoor',
    'Corbett', 'Dalhousie', 'Daman', 'Darjeeling', 'Dehradun', 'Delhi', 'Devprayag', 'Dharamshala',
    'Dhanaulti', 'Digha', 'Diu', 'Dwarka', 'Faridabad', 'Gangotri', 'Gangtok', 'Gaya',
    'Goa', 'Gokarna', 'Gulmarg', 'Gurgaon', 'Guwahati', 'Gwalior', 'Hampi', 'Haridwar',
    'Hassan', 'Hyderabad', 'Imphal', 'Indore', 'Itanagar', 'Jabalpur', 'Jaipur', 'Jaisalmer',
    'Jalandhar', 'Jammu', 'Jamnagar', 'Jim Corbett', 'Jodhpur', 'Joshimath', 'Junagadh', 'Kanchipuram',
    'Kanha', 'Kannur', 'Kanpur', 'Kanyakumari', 'Kasauli', 'Kasol', 'Katra', 'Kaziranga',
    'Kedarnath', 'Kharagpur', 'Khajjiar', 'Khajuraho', 'Kochi', 'Kolhapur', 'Kolkata', 'Kollam',
    'Konark', 'Kota', 'Kovalam', 'Kullu', 'Kumarakom', 'Kurseong', 'Leh', 'Lonavala',
    'Lucknow', 'Ludhiana', 'Madurai', 'Mahabaleshwar', 'Mahabalipuram', 'Malvan', 'Manali', 'Mandarmani',
    'Mangalore', 'Mathura', 'McLeod Ganj', 'Meerut', 'Mount Abu', 'Mumbai', 'Munnar', 'Mussoorie',
    'Mysore', 'Nabadwip', 'Nagpur', 'Nahan', 'Nainital', 'Nashik', 'Noida', 'Ooty',
    'Orchha', 'Pahalgam', 'Palampur', 'Panchgani', 'Patiala', 'Patna', 'Pelling', 'Pondicherry',
    'Prayagraj', 'Pune', 'Puri', 'Pushkar', 'Rameswaram', 'Ranikhet', 'Ranthambore', 'Rishikesh',
    'Rohtang', 'Shillong', 'Shimla', 'Shirdi', 'Sikkim', 'Srinagar', 'Spiti Valley', 'Surat',
    'Tawang', 'Tehri', 'Thrissur', 'Trivandrum', 'Udaipur', 'Udupi', 'Ujjain', 'Varanasi',
    'Varkala', 'Vrindavan', 'Wayanad', 'Yamunotri'
];

const ITINERARY_KEYWORDS = [
    'Char Dham Yatra',
    'Chardham Yatra',
    'Do Dham Yatra',
    'Kedarnath Yatra',
    'Badrinath Yatra',
    'Rishikesh Adventure',
    'Mussoorie Escape',
    'Nainital Tour',
    'Jim Corbett Safari',
    'Auli Snow Adventure',
    'Haridwar Spiritual Tour',
    'Shimla Manali Tour',
    'Spiti Valley Adventure',
    'Kasol Trip',
    'Honeymoon Tour',
];

const SEARCHABLE_LOCATIONS = [...new Set([...INDIA_LOCATIONS, ...ITINERARY_KEYWORDS])];

export const getLocationSuggestions = (query = '', limit = 8) => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return [];

    return SEARCHABLE_LOCATIONS
        .filter((location) => location.toLowerCase().includes(normalizedQuery))
        .sort((a, b) => {
            const aStarts = a.toLowerCase().startsWith(normalizedQuery) ? -1 : 1;
            const bStarts = b.toLowerCase().startsWith(normalizedQuery) ? -1 : 1;
            if (aStarts !== bStarts) return aStarts - bStarts;
            return a.localeCompare(b);
        })
        .slice(0, limit);
};
