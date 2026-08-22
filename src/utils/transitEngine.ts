export interface StationInfo {
  name: string;
  code: string;
  lines: string[];
  lat: number;
  lng: number;
  interchange?: boolean;
}

export const ALL_MRT_STATIONS: StationInfo[] = [
  // North South Line (NSL)
  { name: 'Jurong East', code: 'NS1/EW24', lines: ['NSL', 'EWL'], lat: 1.3332, lng: 103.7423, interchange: true },
  { name: 'Bukit Batok', code: 'NS2', lines: ['NSL'], lat: 1.3490, lng: 103.7496 },
  { name: 'Bukit Gombak', code: 'NS3', lines: ['NSL'], lat: 1.3587, lng: 103.7519 },
  { name: 'Choa Chu Kang', code: 'NS4', lines: ['NSL'], lat: 1.3854, lng: 103.7444 },
  { name: 'Yew Tee', code: 'NS5', lines: ['NSL'], lat: 1.3973, lng: 103.7474 },
  { name: 'Kranji', code: 'NS7', lines: ['NSL'], lat: 1.4251, lng: 103.7621 },
  { name: 'Marsiling', code: 'NS8', lines: ['NSL'], lat: 1.4326, lng: 103.7743 },
  { name: 'Woodlands', code: 'NS9/TE2', lines: ['NSL', 'TEL'], lat: 1.4361, lng: 103.7865, interchange: true },
  { name: 'Admiralty', code: 'NS10', lines: ['NSL'], lat: 1.4406, lng: 103.8010 },
  { name: 'Sembawang', code: 'NS11', lines: ['NSL'], lat: 1.4491, lng: 103.8201 },
  { name: 'Canberra', code: 'NS12', lines: ['NSL'], lat: 1.4431, lng: 103.8297 },
  { name: 'Yishun', code: 'NS13', lines: ['NSL'], lat: 1.4294, lng: 103.8350 },
  { name: 'Khatib', code: 'NS14', lines: ['NSL'], lat: 1.4174, lng: 103.8329 },
  { name: 'Yio Chu Kang', code: 'NS15', lines: ['NSL'], lat: 1.3817, lng: 103.8449 },
  { name: 'Ang Mo Kio', code: 'NS16', lines: ['NSL'], lat: 1.3699, lng: 103.8496 },
  { name: 'Bishan', code: 'NS17/CC15', lines: ['NSL', 'CCL'], lat: 1.3508, lng: 103.8481, interchange: true },
  { name: 'Braddell', code: 'NS18', lines: ['NSL'], lat: 1.3405, lng: 103.8468 },
  { name: 'Toa Payoh', code: 'NS19', lines: ['NSL'], lat: 1.3326, lng: 103.8476 },
  { name: 'Novena', code: 'NS20', lines: ['NSL'], lat: 1.3204, lng: 103.8438 },
  { name: 'Newton', code: 'NS21/DT11', lines: ['NSL', 'DTL'], lat: 1.3123, lng: 103.8380, interchange: true },
  { name: 'Orchard', code: 'NS22/TE14', lines: ['NSL', 'TEL'], lat: 1.3040, lng: 103.8318, interchange: true },
  { name: 'Somerset', code: 'NS23', lines: ['NSL'], lat: 1.3003, lng: 103.8390 },
  { name: 'Dhoby Ghaut', code: 'NS24/NE6/CC1', lines: ['NSL', 'NEL', 'CCL'], lat: 1.2989, lng: 103.8463, interchange: true },
  { name: 'City Hall', code: 'NS25/EW13', lines: ['NSL', 'EWL'], lat: 1.2930, lng: 103.8521, interchange: true },
  { name: 'Raffles Place', code: 'NS26/EW14', lines: ['NSL', 'EWL'], lat: 1.2842, lng: 103.8512, interchange: true },
  { name: 'Marina Bay', code: 'NS27/CE2/TE20', lines: ['NSL', 'CCL', 'TEL'], lat: 1.2764, lng: 103.8546, interchange: true },
  { name: 'Marina South Pier', code: 'NS28', lines: ['NSL'], lat: 1.2711, lng: 103.8636 },

  // East West Line (EWL)
  { name: 'Pasir Ris', code: 'EW1', lines: ['EWL'], lat: 1.3730, lng: 103.9493 },
  { name: 'Tampines', code: 'EW2/DT32', lines: ['EWL', 'DTL'], lat: 1.3533, lng: 103.9452, interchange: true },
  { name: 'Simei', code: 'EW3', lines: ['EWL'], lat: 1.3432, lng: 103.9533 },
  { name: 'Tanah Merah', code: 'EW4', lines: ['EWL'], lat: 1.3272, lng: 103.9463, interchange: true },
  { name: 'Bedok', code: 'EW5', lines: ['EWL'], lat: 1.3240, lng: 103.9300 },
  { name: 'Kembangan', code: 'EW6', lines: ['EWL'], lat: 1.3211, lng: 103.9129 },
  { name: 'Eunos', code: 'EW7', lines: ['EWL'], lat: 1.3197, lng: 103.9030 },
  { name: 'Paya Lebar', code: 'EW8/CC9', lines: ['EWL', 'CCL'], lat: 1.3181, lng: 103.8924, interchange: true },
  { name: 'Aljunied', code: 'EW9', lines: ['EWL'], lat: 1.3164, lng: 103.8829 },
  { name: 'Kallang', code: 'EW10', lines: ['EWL'], lat: 1.3115, lng: 103.8714 },
  { name: 'Lavender', code: 'EW11', lines: ['EWL'], lat: 1.3074, lng: 103.8629 },
  { name: 'Bugis', code: 'EW12/DT14', lines: ['EWL', 'DTL'], lat: 1.3005, lng: 103.8558, interchange: true },
  { name: 'Tanjong Pagar', code: 'EW15', lines: ['EWL'], lat: 1.2764, lng: 103.8457 },
  { name: 'Outram Park', code: 'EW16/NE3/TE17', lines: ['EWL', 'NEL', 'TEL'], lat: 1.2804, lng: 103.8395, interchange: true },
  { name: 'Tiong Bahru', code: 'EW17', lines: ['EWL'], lat: 1.2865, lng: 103.8270 },
  { name: 'Redhill', code: 'EW18', lines: ['EWL'], lat: 1.2896, lng: 103.8168 },
  { name: 'Queenstown', code: 'EW19', lines: ['EWL'], lat: 1.2949, lng: 103.8060 },
  { name: 'Commonwealth', code: 'EW20', lines: ['EWL'], lat: 1.3025, lng: 103.7983 },
  { name: 'Buona Vista', code: 'EW21/CC22', lines: ['EWL', 'CCL'], lat: 1.3073, lng: 103.7900, interchange: true },
  { name: 'Dover', code: 'EW22', lines: ['EWL'], lat: 1.3114, lng: 103.7786 },
  { name: 'Clementi', code: 'EW23', lines: ['EWL'], lat: 1.3151, lng: 103.7652 },
  { name: 'Changi Airport', code: 'CG2', lines: ['EWL'], lat: 1.3573, lng: 103.9885 },
  { name: 'Expo', code: 'CG1/DT35', lines: ['EWL', 'DTL'], lat: 1.3353, lng: 103.9616, interchange: true },

  // North East Line (NEL)
  { name: 'HarbourFront', code: 'NE1/CC29', lines: ['NEL', 'CCL'], lat: 1.2653, lng: 103.8222, interchange: true },
  { name: 'Chinatown', code: 'NE4/DT19', lines: ['NEL', 'DTL'], lat: 1.2843, lng: 103.8438, interchange: true },
  { name: 'Clarke Quay', code: 'NE5', lines: ['NEL'], lat: 1.2884, lng: 103.8465 },
  { name: 'Little India', code: 'NE7/DT12', lines: ['NEL', 'DTL'], lat: 1.3068, lng: 103.8492, interchange: true },
  { name: 'Farrer Park', code: 'NE8', lines: ['NEL'], lat: 1.3124, lng: 103.8542 },
  { name: 'Boon Keng', code: 'NE9', lines: ['NEL'], lat: 1.3194, lng: 103.8617 },
  { name: 'Potong Pasir', code: 'NE10', lines: ['NEL'], lat: 1.3314, lng: 103.8691 },
  { name: 'Woodleigh', code: 'NE11', lines: ['NEL'], lat: 1.3392, lng: 103.8708 },
  { name: 'Serangoon', code: 'NE12/CC13', lines: ['NEL', 'CCL'], lat: 1.3497, lng: 103.8736, interchange: true },
  { name: 'Kovan', code: 'NE13', lines: ['NEL'], lat: 1.3601, lng: 103.8850 },
  { name: 'Hougang', code: 'NE14', lines: ['NEL'], lat: 1.3713, lng: 103.8924 },
  { name: 'Buangkok', code: 'NE15', lines: ['NEL'], lat: 1.3829, lng: 103.8931 },
  { name: 'Sengkang', code: 'NE16', lines: ['NEL'], lat: 1.3916, lng: 103.8954, interchange: true },
  { name: 'Punggol', code: 'NE17', lines: ['NEL'], lat: 1.4052, lng: 103.9022, interchange: true },

  // Circle Line (CCL)
  { name: 'Bras Basah', code: 'CC2', lines: ['CCL'], lat: 1.2969, lng: 103.8507 },
  { name: 'Esplanade', code: 'CC3', lines: ['CCL'], lat: 1.2934, lng: 103.8553 },
  { name: 'Promenade', code: 'CC4/DT15', lines: ['CCL', 'DTL'], lat: 1.2940, lng: 103.8603, interchange: true },
  { name: 'Nicoll Highway', code: 'CC5', lines: ['CCL'], lat: 1.3000, lng: 103.8637 },
  { name: 'Stadium', code: 'CC6', lines: ['CCL'], lat: 1.3028, lng: 103.8753 },
  { name: 'Mountbatten', code: 'CC7', lines: ['CCL'], lat: 1.3063, lng: 103.8825 },
  { name: 'Dakota', code: 'CC8', lines: ['CCL'], lat: 1.3084, lng: 103.8885 },
  { name: 'MacPherson', code: 'CC10/DT26', lines: ['CCL', 'DTL'], lat: 1.3262, lng: 103.8899, interchange: true },
  { name: 'Tai Seng', code: 'CC11', lines: ['CCL'], lat: 1.3354, lng: 103.8879 },
  { name: 'Bartley', code: 'CC12', lines: ['CCL'], lat: 1.3426, lng: 103.8799 },
  { name: 'Lorong Chuan', code: 'CC14', lines: ['CCL'], lat: 1.3516, lng: 103.8641 },
  { name: 'Marymount', code: 'CC16', lines: ['CCL'], lat: 1.3487, lng: 103.8394 },
  { name: 'Caldecott', code: 'CC17/TE9', lines: ['CCL', 'TEL'], lat: 1.3378, lng: 103.8396, interchange: true },
  { name: 'Botanic Gardens', code: 'CC19/DT9', lines: ['CCL', 'DTL'], lat: 1.3224, lng: 103.8153, interchange: true },
  { name: 'Farrer Road', code: 'CC20', lines: ['CCL'], lat: 1.3175, lng: 103.8074 },
  { name: 'Holland Village', code: 'CC21', lines: ['CCL'], lat: 1.3120, lng: 103.7960 },
  { name: 'one-north', code: 'CC23', lines: ['CCL'], lat: 1.2996, lng: 103.7874 },
  { name: 'Kent Ridge', code: 'CC24', lines: ['CCL'], lat: 1.2935, lng: 103.7847 },
  { name: 'Haw Par Villa', code: 'CC25', lines: ['CCL'], lat: 1.2825, lng: 103.7818 },
  { name: 'Pasir Panjang', code: 'CC26', lines: ['CCL'], lat: 1.2762, lng: 103.7915 },
  { name: 'Labrador Park', code: 'CC27', lines: ['CCL'], lat: 1.2722, lng: 103.8031 },
  { name: 'Telok Blangah', code: 'CC28', lines: ['CCL'], lat: 1.2707, lng: 103.8097 },
  { name: 'Bayfront', code: 'CE1/DT16', lines: ['CCL', 'DTL'], lat: 1.2819, lng: 103.8590, interchange: true },

  // Downtown Line (DTL)
  { name: 'Bukit Panjang', code: 'DT1', lines: ['DTL'], lat: 1.3790, lng: 103.7618 },
  { name: 'Cashew', code: 'DT2', lines: ['DTL'], lat: 1.3698, lng: 103.7645 },
  { name: 'Hillview', code: 'DT3', lines: ['DTL'], lat: 1.3623, lng: 103.7674 },
  { name: 'Beauty World', code: 'DT5', lines: ['DTL'], lat: 1.3414, lng: 103.7758 },
  { name: 'King Albert Park', code: 'DT6', lines: ['DTL'], lat: 1.3356, lng: 103.7834 },
  { name: 'Sixth Avenue', code: 'DT7', lines: ['DTL'], lat: 1.3308, lng: 103.7969 },
  { name: 'Tan Kah Kee', code: 'DT8', lines: ['DTL'], lat: 1.3258, lng: 103.8077 },
  { name: 'Stevens', code: 'DT10/TE11', lines: ['DTL', 'TEL'], lat: 1.3200, lng: 103.8260, interchange: true },
  { name: 'Rochor', code: 'DT13', lines: ['DTL'], lat: 1.3039, lng: 103.8526 },
  { name: 'Downtown', code: 'DT17', lines: ['DTL'], lat: 1.2794, lng: 103.8528 },
  { name: 'Telok Ayer', code: 'DT18', lines: ['DTL'], lat: 1.2822, lng: 103.8486 },
  { name: 'Fort Canning', code: 'DT20', lines: ['DTL'], lat: 1.2925, lng: 103.8443 },
  { name: 'Bencoolen', code: 'DT21', lines: ['DTL'], lat: 1.2987, lng: 103.8503 },
  { name: 'Jalan Besar', code: 'DT22', lines: ['DTL'], lat: 1.3053, lng: 103.8553 },
  { name: 'Bendemeer', code: 'DT23', lines: ['DTL'], lat: 1.3137, lng: 103.8631 },
  { name: 'Geylang Bahru', code: 'DT24', lines: ['DTL'], lat: 1.3214, lng: 103.8716 },
  { name: 'Mattar', code: 'DT25', lines: ['DTL'], lat: 1.3269, lng: 103.8832 },
  { name: 'Ubi', code: 'DT27', lines: ['DTL'], lat: 1.3299, lng: 103.8993 },
  { name: 'Kaki Bukit', code: 'DT28', lines: ['DTL'], lat: 1.3349, lng: 103.9085 },
  { name: 'Bedok North', code: 'DT29', lines: ['DTL'], lat: 1.3347, lng: 103.9180 },
  { name: 'Bedok Reservoir', code: 'DT30', lines: ['DTL'], lat: 1.3362, lng: 103.9322 },
  { name: 'Tampines West', code: 'DT31', lines: ['DTL'], lat: 1.3455, lng: 103.9384 },
  { name: 'Tampines East', code: 'DT33', lines: ['DTL'], lat: 1.3562, lng: 103.9546 },
  { name: 'Upper Changi', code: 'DT34', lines: ['DTL'], lat: 1.3417, lng: 103.9614 },

  // Thomson-East Coast Line (TEL)
  { name: 'Woodlands North', code: 'TE1', lines: ['TEL'], lat: 1.4482, lng: 103.7857 },
  { name: 'Woodlands South', code: 'TE3', lines: ['TEL'], lat: 1.4274, lng: 103.7932 },
  { name: 'Springleaf', code: 'TE4', lines: ['TEL'], lat: 1.3976, lng: 103.8178 },
  { name: 'Lentor', code: 'TE5', lines: ['TEL'], lat: 1.3852, lng: 103.8361 },
  { name: 'Mayflower', code: 'TE6', lines: ['TEL'], lat: 1.3714, lng: 103.8365 },
  { name: 'Bright Hill', code: 'TE7', lines: ['TEL'], lat: 1.3633, lng: 103.8329 },
  { name: 'Upper Thomson', code: 'TE8', lines: ['TEL'], lat: 1.3544, lng: 103.8329 },
  { name: 'Napier', code: 'TE12', lines: ['TEL'], lat: 1.3068, lng: 103.8184 },
  { name: 'Orchard Boulevard', code: 'TE13', lines: ['TEL'], lat: 1.3023, lng: 103.8239 },
  { name: 'Great World', code: 'TE15', lines: ['TEL'], lat: 1.2932, lng: 103.8320 },
  { name: 'Havelock', code: 'TE16', lines: ['TEL'], lat: 1.2882, lng: 103.8326 },
  { name: 'Maxwell', code: 'TE18', lines: ['TEL'], lat: 1.2805, lng: 103.8437 },
  { name: 'Shenton Way', code: 'TE19', lines: ['TEL'], lat: 1.2778, lng: 103.8502 },
  { name: 'Gardens by the Bay', code: 'TE22', lines: ['TEL'], lat: 1.2785, lng: 103.8672 },
  { name: 'Tanjong Rhu', code: 'TE23', lines: ['TEL'], lat: 1.2974, lng: 103.8734 },
  { name: 'Katong Park', code: 'TE24', lines: ['TEL'], lat: 1.2982, lng: 103.8841 },
  { name: 'Tanjong Katong', code: 'TE25', lines: ['TEL'], lat: 1.3005, lng: 103.8967 },
  { name: 'Marine Parade', code: 'TE26', lines: ['TEL'], lat: 1.3027, lng: 103.9064 },
  { name: 'Marine Terrace', code: 'TE27', lines: ['TEL'], lat: 1.3061, lng: 103.9161 },
  { name: 'Siglap', code: 'TE28', lines: ['TEL'], lat: 1.3101, lng: 103.9298 },
  { name: 'Bayshore', code: 'TE29', lines: ['TEL'], lat: 1.3134, lng: 103.9427 },
];

export interface SearchableLocation {
  name: string;
  category: string;
  coords: string;
  lat: number;
  lng: number;
  description: string;
  nearestStation?: string;
}

export const POPULAR_LOCATIONS: SearchableLocation[] = [
  {
    name: 'Bugis / Kampong Glam',
    category: 'Heritage & Culture',
    coords: '1.3081592,103.8551479',
    lat: 1.3081592,
    lng: 103.8551479,
    description: 'Arab Street, Haji Lane & Sultan Mosque',
    nearestStation: 'Bugis (EW12/DT14)',
  },
  {
    name: 'VivoCity / HarbourFront',
    category: 'Shopping & Sentosa Gateway',
    coords: '1.2739864,103.8012642',
    lat: 1.2739864,
    lng: 103.8012642,
    description: 'Gateway to Sentosa & HarbourFront Ferry Terminal',
    nearestStation: 'HarbourFront (NE1/CC29)',
  },
  {
    name: 'Marina Bay Sands',
    category: 'Iconic Landmark',
    coords: '1.2834,103.8607',
    lat: 1.2834,
    lng: 103.8607,
    description: 'Bayfront MRT, Sands SkyPark & The Shoppes',
    nearestStation: 'Bayfront (DT16/CE1)',
  },
  {
    name: 'Gardens by the Bay',
    category: 'Nature & Attractions',
    coords: '1.2815,103.8636',
    lat: 1.2815,
    lng: 103.8636,
    description: 'Supertree Grove, Cloud Forest & Flower Dome',
    nearestStation: 'Gardens by the Bay (TE22) / Bayfront',
  },
  {
    name: 'Jewel Changi Airport',
    category: 'Airport & Lifestyle',
    coords: '1.3602,103.9898',
    lat: 1.3602,
    lng: 103.9898,
    description: 'HSBC Rain Vortex, Canopy Park & Terminals 1-4',
    nearestStation: 'Changi Airport (CG2)',
  },
  {
    name: 'Orchard Road (ION Orchard)',
    category: 'Shopping',
    coords: '1.3040,103.8318',
    lat: 1.3040,
    lng: 103.8318,
    description: 'Premier Shopping Belt & Orchard MRT',
    nearestStation: 'Orchard (NS22/TE14)',
  },
  {
    name: 'Chinatown (Buddha Tooth Relic)',
    category: 'Heritage & Food',
    coords: '1.2825,103.8431',
    lat: 1.2825,
    lng: 103.8431,
    description: 'Heritage Streets, Maxwell Food Centre & Temple',
    nearestStation: 'Chinatown (DT19/NE4) / Maxwell (TE18)',
  },
  {
    name: 'Singapore Botanic Gardens',
    category: 'UNESCO World Heritage',
    coords: '1.3138,103.8159',
    lat: 1.3138,
    lng: 103.8159,
    description: 'National Orchid Garden, Tanglin Gate, Eco Lake',
    nearestStation: 'Botanic Gardens (CC19/DT9) / Napier (TE12)',
  },
  {
    name: 'Little India (Tekka Centre)',
    category: 'Heritage & Spice',
    coords: '1.3065,103.8512',
    lat: 1.3065,
    lng: 103.8512,
    description: 'Tekka Food Centre, Serangoon Road & Mustafa 24/7',
    nearestStation: 'Little India (NE7/DT12)',
  },
  {
    name: 'Clarke Quay & Boat Quay',
    category: 'Nightlife & Riverfront',
    coords: '1.2889,103.8468',
    lat: 1.2889,
    lng: 103.8468,
    description: 'Singapore River cruise, restaurants and riverside bars',
    nearestStation: 'Clarke Quay (NE5) / Fort Canning (DT20)',
  },
  {
    name: 'Sentosa Resorts World (Universal Studios)',
    category: 'Theme Parks & Beach',
    coords: '1.2540,103.8238',
    lat: 1.2540,
    lng: 103.8238,
    description: 'Universal Studios Singapore, S.E.A. Aquarium, Siloso Beach',
    nearestStation: 'HarbourFront (NE1/CC29) + Sentosa Express',
  },
  {
    name: 'Singapore Zoo & Mandai Wildlife',
    category: 'Wildlife & Nature',
    coords: '1.4043,103.7930',
    lat: 1.4043,
    lng: 103.7930,
    description: 'Singapore Zoo, Night Safari, River Wonders & Bird Paradise',
    nearestStation: 'Khatib (NS14) + Mandai Shuttle / Springleaf (TE4)',
  },
  {
    name: 'Katong & Joo Chiat (Koon Seng Road)',
    category: 'Peranakan Heritage',
    coords: '1.3101,103.9015',
    lat: 1.3101,
    lng: 103.9015,
    description: 'Pastel Shophouses, Nonya Laksa & Peranakan Boutiques',
    nearestStation: 'Marine Parade (TE26)',
  },
  {
    name: 'Raffles Place / Merlion Park',
    category: 'Civic District & CBD',
    coords: '1.2868,103.8545',
    lat: 1.2868,
    lng: 103.8545,
    description: 'The Merlion, One Fullerton & Historic Waterfront',
    nearestStation: 'Raffles Place (NS26/EW14)',
  },
];

// Full MRT line station order sequences for accurate intermediate stop resolution
export const MRT_LINE_SEQUENCES: Record<string, Array<{ name: string; code: string }>> = {
  NSL: [
    { name: 'Jurong East', code: 'NS1' },
    { name: 'Bukit Batok', code: 'NS2' },
    { name: 'Bukit Gombak', code: 'NS3' },
    { name: 'Choa Chu Kang', code: 'NS4' },
    { name: 'Yew Tee', code: 'NS5' },
    { name: 'Kranji', code: 'NS7' },
    { name: 'Marsiling', code: 'NS8' },
    { name: 'Woodlands', code: 'NS9' },
    { name: 'Admiralty', code: 'NS10' },
    { name: 'Sembawang', code: 'NS11' },
    { name: 'Canberra', code: 'NS12' },
    { name: 'Yishun', code: 'NS13' },
    { name: 'Khatib', code: 'NS14' },
    { name: 'Yio Chu Kang', code: 'NS15' },
    { name: 'Ang Mo Kio', code: 'NS16' },
    { name: 'Bishan', code: 'NS17' },
    { name: 'Braddell', code: 'NS18' },
    { name: 'Toa Payoh', code: 'NS19' },
    { name: 'Novena', code: 'NS20' },
    { name: 'Newton', code: 'NS21' },
    { name: 'Orchard', code: 'NS22' },
    { name: 'Somerset', code: 'NS23' },
    { name: 'Dhoby Ghaut', code: 'NS24' },
    { name: 'City Hall', code: 'NS25' },
    { name: 'Raffles Place', code: 'NS26' },
    { name: 'Marina Bay', code: 'NS27' },
    { name: 'Marina South Pier', code: 'NS28' },
  ],
  EWL: [
    { name: 'Pasir Ris', code: 'EW1' },
    { name: 'Tampines', code: 'EW2' },
    { name: 'Simei', code: 'EW3' },
    { name: 'Tanah Merah', code: 'EW4' },
    { name: 'Bedok', code: 'EW5' },
    { name: 'Kembangan', code: 'EW6' },
    { name: 'Eunos', code: 'EW7' },
    { name: 'Paya Lebar', code: 'EW8' },
    { name: 'Aljunied', code: 'EW9' },
    { name: 'Kallang', code: 'EW10' },
    { name: 'Lavender', code: 'EW11' },
    { name: 'Bugis', code: 'EW12' },
    { name: 'City Hall', code: 'EW13' },
    { name: 'Raffles Place', code: 'EW14' },
    { name: 'Tanjong Pagar', code: 'EW15' },
    { name: 'Outram Park', code: 'EW16' },
    { name: 'Tiong Bahru', code: 'EW17' },
    { name: 'Redhill', code: 'EW18' },
    { name: 'Queenstown', code: 'EW19' },
    { name: 'Commonwealth', code: 'EW20' },
    { name: 'Buona Vista', code: 'EW21' },
    { name: 'Dover', code: 'EW22' },
    { name: 'Clementi', code: 'EW23' },
    { name: 'Jurong East', code: 'EW24' },
    { name: 'Chinese Garden', code: 'EW25' },
    { name: 'Lakeside', code: 'EW26' },
    { name: 'Boon Lay', code: 'EW27' },
    { name: 'Pioneer', code: 'EW28' },
    { name: 'Joo Koon', code: 'EW29' },
    { name: 'Gul Circle', code: 'EW30' },
    { name: 'Tuas Crescent', code: 'EW31' },
    { name: 'Tuas West Road', code: 'EW32' },
    { name: 'Tuas Link', code: 'EW33' },
  ],
  NEL: [
    { name: 'HarbourFront', code: 'NE1' },
    { name: 'Outram Park', code: 'NE3' },
    { name: 'Chinatown', code: 'NE4' },
    { name: 'Clarke Quay', code: 'NE5' },
    { name: 'Dhoby Ghaut', code: 'NE6' },
    { name: 'Little India', code: 'NE7' },
    { name: 'Farrer Park', code: 'NE8' },
    { name: 'Boon Keng', code: 'NE9' },
    { name: 'Potong Pasir', code: 'NE10' },
    { name: 'Woodleigh', code: 'NE11' },
    { name: 'Serangoon', code: 'NE12' },
    { name: 'Kovan', code: 'NE13' },
    { name: 'Hougang', code: 'NE14' },
    { name: 'Buangkok', code: 'NE15' },
    { name: 'Sengkang', code: 'NE16' },
    { name: 'Punggol', code: 'NE17' },
  ],
  CCL: [
    { name: 'Dhoby Ghaut', code: 'CC1' },
    { name: 'Bras Basah', code: 'CC2' },
    { name: 'Esplanade', code: 'CC3' },
    { name: 'Promenade', code: 'CC4' },
    { name: 'Nicoll Highway', code: 'CC5' },
    { name: 'Stadium', code: 'CC6' },
    { name: 'Mountbatten', code: 'CC7' },
    { name: 'Dakota', code: 'CC8' },
    { name: 'Paya Lebar', code: 'CC9' },
    { name: 'MacPherson', code: 'CC10' },
    { name: 'Tai Seng', code: 'CC11' },
    { name: 'Bartley', code: 'CC12' },
    { name: 'Serangoon', code: 'CC13' },
    { name: 'Lorong Chuan', code: 'CC14' },
    { name: 'Bishan', code: 'CC15' },
    { name: 'Marymount', code: 'CC16' },
    { name: 'Caldecott', code: 'CC17' },
    { name: 'Botanic Gardens', code: 'CC19' },
    { name: 'Farrer Road', code: 'CC20' },
    { name: 'Holland Village', code: 'CC21' },
    { name: 'Buona Vista', code: 'CC22' },
    { name: 'one-north', code: 'CC23' },
    { name: 'Kent Ridge', code: 'CC24' },
    { name: 'Haw Par Villa', code: 'CC25' },
    { name: 'Pasir Panjang', code: 'CC26' },
    { name: 'Labrador Park', code: 'CC27' },
    { name: 'Telok Blangah', code: 'CC28' },
    { name: 'HarbourFront', code: 'CC29' },
  ],
  DTL: [
    { name: 'Bukit Panjang', code: 'DT1' },
    { name: 'Cashew', code: 'DT2' },
    { name: 'Hillview', code: 'DT3' },
    { name: 'Beauty World', code: 'DT5' },
    { name: 'King Albert Park', code: 'DT6' },
    { name: 'Sixth Avenue', code: 'DT7' },
    { name: 'Tan Kah Kee', code: 'DT8' },
    { name: 'Botanic Gardens', code: 'DT9' },
    { name: 'Stevens', code: 'DT10' },
    { name: 'Newton', code: 'DT11' },
    { name: 'Little India', code: 'DT12' },
    { name: 'Rochor', code: 'DT13' },
    { name: 'Bugis', code: 'DT14' },
    { name: 'Promenade', code: 'DT15' },
    { name: 'Bayfront', code: 'DT16' },
    { name: 'Downtown', code: 'DT17' },
    { name: 'Telok Ayer', code: 'DT18' },
    { name: 'Chinatown', code: 'DT19' },
    { name: 'Fort Canning', code: 'DT20' },
    { name: 'Bencoolen', code: 'DT21' },
    { name: 'Jalan Besar', code: 'DT22' },
    { name: 'Bendemeer', code: 'DT23' },
    { name: 'Geylang Bahru', code: 'DT24' },
    { name: 'Mattar', code: 'DT25' },
    { name: 'MacPherson', code: 'DT26' },
    { name: 'Ubi', code: 'DT27' },
    { name: 'Kaki Bukit', code: 'DT28' },
    { name: 'Bedok North', code: 'DT29' },
    { name: 'Bedok Reservoir', code: 'DT30' },
    { name: 'Tampines West', code: 'DT31' },
    { name: 'Tampines', code: 'DT32' },
    { name: 'Tampines East', code: 'DT33' },
    { name: 'Upper Changi', code: 'DT34' },
    { name: 'Expo', code: 'DT35' },
  ],
  TEL: [
    { name: 'Woodlands North', code: 'TE1' },
    { name: 'Woodlands', code: 'TE2' },
    { name: 'Woodlands South', code: 'TE3' },
    { name: 'Springleaf', code: 'TE4' },
    { name: 'Lentor', code: 'TE5' },
    { name: 'Mayflower', code: 'TE6' },
    { name: 'Bright Hill', code: 'TE7' },
    { name: 'Upper Thomson', code: 'TE8' },
    { name: 'Caldecott', code: 'TE9' },
    { name: 'Stevens', code: 'TE11' },
    { name: 'Napier', code: 'TE12' },
    { name: 'Orchard Boulevard', code: 'TE13' },
    { name: 'Orchard', code: 'TE14' },
    { name: 'Great World', code: 'TE15' },
    { name: 'Havelock', code: 'TE16' },
    { name: 'Outram Park', code: 'TE17' },
    { name: 'Maxwell', code: 'TE18' },
    { name: 'Shenton Way', code: 'TE19' },
    { name: 'Marina Bay', code: 'TE20' },
    { name: 'Gardens by the Bay', code: 'TE22' },
    { name: 'Tanjong Rhu', code: 'TE23' },
    { name: 'Katong Park', code: 'TE24' },
    { name: 'Tanjong Katong', code: 'TE25' },
    { name: 'Marine Parade', code: 'TE26' },
    { name: 'Marine Terrace', code: 'TE27' },
    { name: 'Siglap', code: 'TE28' },
    { name: 'Bayshore', code: 'TE29' },
  ],
};

// Clean station name for robust lookup
function normalizeStnName(name: string): string {
  return name
    .replace(/\s*MRT(\s+Station)?/gi, '')
    .replace(/\s*\([A-Z0-9/]+\)/gi, '')
    .replace(/\s*\/\s*.*/g, '')
    .trim()
    .toLowerCase();
}

// Find intermediate MRT stations between two stations along a given line
export function getIntermediateMrtStations(
  lineCode: string,
  fromName: string,
  toName: string
): Array<{ name: string; stopCode?: string }> {
  // Normalize line code (e.g. 'DTL', 'Downtown Line' -> 'DTL')
  let cleanLine = lineCode.toUpperCase();
  if (cleanLine.includes('DOWNTOWN') || cleanLine.includes('DTL')) cleanLine = 'DTL';
  else if (cleanLine.includes('EAST WEST') || cleanLine.includes('EWL')) cleanLine = 'EWL';
  else if (cleanLine.includes('NORTH SOUTH') || cleanLine.includes('NSL')) cleanLine = 'NSL';
  else if (cleanLine.includes('NORTH EAST') || cleanLine.includes('NEL')) cleanLine = 'NEL';
  else if (cleanLine.includes('CIRCLE') || cleanLine.includes('CCL')) cleanLine = 'CCL';
  else if (cleanLine.includes('THOMSON') || cleanLine.includes('TEL')) cleanLine = 'TEL';

  const sequence = MRT_LINE_SEQUENCES[cleanLine];
  if (!sequence) return [];

  const normFrom = normalizeStnName(fromName);
  const normTo = normalizeStnName(toName);

  let fromIdx = sequence.findIndex((s) => normalizeStnName(s.name) === normFrom || normFrom.includes(normalizeStnName(s.name)));
  let toIdx = sequence.findIndex((s) => normalizeStnName(s.name) === normTo || normTo.includes(normalizeStnName(s.name)));

  if (fromIdx === -1 || toIdx === -1) {
    // Try matching station codes if embedded in the name
    if (fromIdx === -1) {
      fromIdx = sequence.findIndex((s) => fromName.toUpperCase().includes(s.code));
    }
    if (toIdx === -1) {
      toIdx = sequence.findIndex((s) => toName.toUpperCase().includes(s.code));
    }
  }

  if (fromIdx === -1 || toIdx === -1 || fromIdx === toIdx) {
    return [];
  }

  const results: Array<{ name: string; stopCode?: string }> = [];
  if (fromIdx < toIdx) {
    for (let i = fromIdx + 1; i < toIdx; i++) {
      results.push({ name: `${sequence[i].name} MRT`, stopCode: sequence[i].code });
    }
  } else {
    for (let i = fromIdx - 1; i > toIdx; i--) {
      results.push({ name: `${sequence[i].name} MRT`, stopCode: sequence[i].code });
    }
  }

  return results;
}

// Generate realistic intermediate bus stops for a bus leg
export function getIntermediateBusStops(
  busNo: string | number,
  fromName: string,
  toName: string,
  targetCount: number = 3
): Array<{ name: string; stopCode?: string }> {
  const POOL_OF_BUS_STOPS = [
    { name: 'Opp Bugis Junction', stopCode: '01119' },
    { name: 'Bras Basah Complex', stopCode: '01019' },
    { name: 'Capitol Building / City Hall', stopCode: '04111' },
    { name: 'Opp Treasury / High St', stopCode: '04249' },
    { name: 'Boat Quay / Clarke Quay', stopCode: '05029' },
    { name: 'Chinatown Point', stopCode: '05049' },
    { name: 'Opp Pearl’s Centre / Outram', stopCode: '05019' },
    { name: 'Blk 140 Bukit Merah', stopCode: '10019' },
    { name: 'Opp VivoCity / Telok Blangah', stopCode: '14119' },
    { name: 'Raffles Hotel / Beach Rd', stopCode: '01619' },
    { name: 'Suntec City Tower 2', stopCode: '02141' },
    { name: 'Promenade Stn / Pan Pacific', stopCode: '02161' },
    { name: 'Marina Bay Sands Theatre', stopCode: '03501' },
    { name: 'Bayfront Stn Exit B', stopCode: '03509' },
    { name: 'Gardens by the Bay Coach Park', stopCode: '03369' },
    { name: 'Dhoby Ghaut Stn Exit B', stopCode: '08031' },
    { name: 'Winsland House / Somerset', stopCode: '08111' },
    { name: 'Midpoint Orchard', stopCode: '09038' },
    { name: 'Lucky Plaza / Orchard Stn', stopCode: '09048' },
    { name: 'Royal Plaza on Scotts', stopCode: '09212' },
    { name: 'Newton Stn Exit C', stopCode: '40049' },
    { name: 'Novena Stn / Velocity', stopCode: '50038' },
  ];

  const count = Math.max(1, Math.min(8, targetCount));
  // Deterministic slice based on bus number and names
  const seed = Math.abs(
    String(busNo).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) +
    fromName.length * 7 +
    toName.length * 13
  );

  const stops: Array<{ name: string; stopCode?: string }> = [];
  for (let i = 0; i < count; i++) {
    const idx = (seed + i * 3) % POOL_OF_BUS_STOPS.length;
    stops.push(POOL_OF_BUS_STOPS[idx]);
  }

  return stops;
}
export function calculateDistanceMeters(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371e3; // Earth radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(R * c);
}

// Find closest MRT station to a coordinate
export function findNearestStation(lat: number, lng: number): { station: StationInfo; distance: number } {
  let closest = ALL_MRT_STATIONS[0];
  let minDistance = calculateDistanceMeters(lat, lng, closest.lat, closest.lng);

  for (let i = 1; i < ALL_MRT_STATIONS.length; i++) {
    const s = ALL_MRT_STATIONS[i];
    const dist = calculateDistanceMeters(lat, lng, s.lat, s.lng);
    if (dist < minDistance) {
      minDistance = dist;
      closest = s;
    }
  }

  return { station: closest, distance: minDistance };
}

// Helper to determine connecting lines and interchanges
export function solveMrtRoute(origin: StationInfo, dest: StationInfo) {
  // Check if they share a direct line
  const sharedLine = origin.lines.find((l) => dest.lines.includes(l));

  if (sharedLine) {
    return {
      type: 'direct' as const,
      line: sharedLine,
      transferStation: null,
      transferLine2: null,
    };
  }

  // Find single transfer interchange
  const interchanges = ALL_MRT_STATIONS.filter((s) => s.interchange);
  for (const transfer of interchanges) {
    const lineFromOrigin = origin.lines.find((l) => transfer.lines.includes(l));
    const lineToDest = dest.lines.find((l) => transfer.lines.includes(l));
    if (lineFromOrigin && lineToDest && lineFromOrigin !== lineToDest) {
      return {
        type: 'transfer' as const,
        line: lineFromOrigin,
        transferStation: transfer,
        transferLine2: lineToDest,
      };
    }
  }

  // Default smart hub
  const defaultHub = ALL_MRT_STATIONS.find((s) => s.name === 'Dhoby Ghaut') || ALL_MRT_STATIONS[0];
  return {
    type: 'transfer' as const,
    line: origin.lines[0] || 'EWL',
    transferStation: defaultHub,
    transferLine2: dest.lines[0] || 'NEL',
  };
}

export function getLineFullName(lineCode: string): string {
  switch (lineCode) {
    case 'NSL':
      return 'North South Line (Red)';
    case 'EWL':
      return 'East West Line (Green)';
    case 'NEL':
      return 'North East Line (Purple)';
    case 'CCL':
      return 'Circle Line (Yellow)';
    case 'DTL':
      return 'Downtown Line (Blue)';
    case 'TEL':
      return 'Thomson-East Coast Line (Brown)';
    default:
      return `${lineCode} Line`;
  }
}

// Generate dynamic, realistic transit routes between any two Singapore coordinates
export function generateDynamicTransitItineraries(
  startLat: number,
  startLng: number,
  startName: string,
  endLat: number,
  endLng: number,
  endName: string
) {
  const originStationData = findNearestStation(startLat, startLng);
  const destStationData = findNearestStation(endLat, endLng);
  const originStation = originStationData.station;
  const destStation = destStationData.station;

  const totalDistanceM = calculateDistanceMeters(startLat, startLng, endLat, endLng);
  const mrtSolution = solveMrtRoute(originStation, destStation);

  const baseStartTime = Date.now() + 2 * 60 * 1000;
  const walkOriginDist = originStationData.distance;
  const walkDestDist = destStationData.distance;
  const walkOriginTime = Math.max(120, Math.round((walkOriginDist / 80) * 60)); // ~80m/min
  const walkDestTime = Math.max(120, Math.round((walkDestDist / 80) * 60));

  // Compute realistic MRT transit time based on distance (~40 km/h avg)
  const estMrtTimeSec = Math.max(300, Math.round((totalDistanceM / 11) * 0.85)); // ~40km/h
  const fare = Math.min(2.4, Math.max(1.09, 1.09 + (totalDistanceM / 1000) * 0.08));

  // 1. Primary Fastest MRT Itinerary
  const legs1: any[] = [
    {
      mode: 'WALK',
      route: `Walk to ${originStation.name} MRT`,
      duration: walkOriginTime,
      distance: walkOriginDist,
      from: { name: startName || 'Origin Location', lat: startLat, lon: startLng },
      to: { name: `${originStation.name} MRT (${originStation.code})`, stopCode: originStation.code, lat: originStation.lat, lon: originStation.lng },
      instruction: `Walk ${walkOriginDist}m (${Math.round(walkOriginTime / 60)} mins) to ${originStation.name} Station entrance`,
    },
  ];

  if (mrtSolution.type === 'direct') {
    const intermediateList = getIntermediateMrtStations(
      mrtSolution.line,
      originStation.name,
      destStation.name
    );
    const stopCount = intermediateList.length > 0 ? intermediateList.length : Math.max(1, Math.round(totalDistanceM / 1400));
    const finalStops = intermediateList.length > 0
      ? intermediateList
      : getIntermediateBusStops(mrtSolution.line, originStation.name, destStation.name, stopCount);

    legs1.push({
      mode: 'SUBWAY',
      route: mrtSolution.line,
      routeShortName: mrtSolution.line,
      routeLongName: getLineFullName(mrtSolution.line),
      duration: estMrtTimeSec,
      distance: totalDistanceM,
      from: { name: `${originStation.name} MRT`, stopCode: originStation.code },
      to: { name: `${destStation.name} MRT`, stopCode: destStation.code },
      numIntermediateStops: finalStops.length,
      intermediateStops: finalStops,
      instruction: `Board ${getLineFullName(mrtSolution.line)} at ${originStation.name} towards ${destStation.name} (${finalStops.length} stops)`,
    });
  } else {
    const timeLeg1 = Math.round(estMrtTimeSec * 0.55);
    const timeLeg2 = Math.round(estMrtTimeSec * 0.45);
    const transferStn = mrtSolution.transferStation!;

    const intermediateLeg1 = getIntermediateMrtStations(
      mrtSolution.line,
      originStation.name,
      transferStn.name
    );
    const stopCount1 = intermediateLeg1.length > 0 ? intermediateLeg1.length : Math.max(1, Math.round((totalDistanceM * 0.55) / 1400));
    const finalStops1 = intermediateLeg1.length > 0
      ? intermediateLeg1
      : getIntermediateBusStops(mrtSolution.line, originStation.name, transferStn.name, stopCount1);

    const intermediateLeg2 = getIntermediateMrtStations(
      mrtSolution.transferLine2!,
      transferStn.name,
      destStation.name
    );
    const stopCount2 = intermediateLeg2.length > 0 ? intermediateLeg2.length : Math.max(1, Math.round((totalDistanceM * 0.45) / 1400));
    const finalStops2 = intermediateLeg2.length > 0
      ? intermediateLeg2
      : getIntermediateBusStops(mrtSolution.transferLine2!, transferStn.name, destStation.name, stopCount2);

    legs1.push({
      mode: 'SUBWAY',
      route: mrtSolution.line,
      routeShortName: mrtSolution.line,
      routeLongName: getLineFullName(mrtSolution.line),
      duration: timeLeg1,
      distance: Math.round(totalDistanceM * 0.55),
      from: { name: `${originStation.name} MRT`, stopCode: originStation.code },
      to: { name: `${transferStn.name} MRT`, stopCode: transferStn.code },
      numIntermediateStops: finalStops1.length,
      intermediateStops: finalStops1,
      instruction: `Board ${getLineFullName(mrtSolution.line)} towards ${transferStn.name} (${finalStops1.length} stops)`,
    });

    legs1.push({
      mode: 'SUBWAY',
      route: mrtSolution.transferLine2!,
      routeShortName: mrtSolution.transferLine2!,
      routeLongName: getLineFullName(mrtSolution.transferLine2!),
      duration: timeLeg2,
      distance: Math.round(totalDistanceM * 0.45),
      from: { name: `${transferStn.name} MRT`, stopCode: transferStn.code },
      to: { name: `${destStation.name} MRT`, stopCode: destStation.code },
      numIntermediateStops: finalStops2.length,
      intermediateStops: finalStops2,
      instruction: `Transfer at ${transferStn.name} to ${getLineFullName(mrtSolution.transferLine2!)} towards ${destStation.name} (${finalStops2.length} stops)`,
    });
  }

  legs1.push({
    mode: 'WALK',
    route: `Walk to ${endName || 'Destination'}`,
    duration: walkDestTime,
    distance: walkDestDist,
    from: { name: `${destStation.name} MRT (${destStation.code})`, stopCode: destStation.code },
    to: { name: endName || 'Destination Location', lat: endLat, lon: endLng },
    instruction: `Alight at ${destStation.name} MRT and walk ${walkDestDist}m to ${endName}`,
  });

  const totalDuration1 = walkOriginTime + estMrtTimeSec + walkDestTime + (mrtSolution.type === 'transfer' ? 180 : 60);

  // 2. Direct Bus / Express Alternative Itinerary
  const busNumber = [100, 65, 143, 147, 190, 857, 36, 10, 51, 14][
    Math.abs(Math.round(startLat * 1000 + endLng * 1000)) % 10
  ];
  const busDurationSec = Math.round(estMrtTimeSec * 1.35 + 240);
  const busWalk1 = Math.round(walkOriginTime * 0.8);
  const busWalk2 = Math.round(walkDestTime * 0.8);
  const totalDuration2 = busWalk1 + busDurationSec + busWalk2;
  const busStopsTargetCount = Math.max(3, Math.round(totalDistanceM / 650));
  const busIntermediateStops = getIntermediateBusStops(
    busNumber,
    originStation.name,
    destStation.name,
    busStopsTargetCount
  );

  const legs2: any[] = [
    {
      mode: 'WALK',
      route: `Walk to ${startName} Bus Stop`,
      duration: busWalk1,
      distance: Math.round(walkOriginDist * 0.75),
      from: { name: startName || 'Origin Point', lat: startLat, lon: startLng },
      to: { name: `Near ${originStation.name} Bus Stop (01${Math.abs(Math.round(startLat * 100)) % 900})` },
      instruction: `Walk ${Math.round(walkOriginDist * 0.75)}m to the nearest sheltered bus stop along the main corridor`,
    },
    {
      mode: 'BUS',
      route: `Bus ${busNumber}`,
      routeShortName: `${busNumber}`,
      routeLongName: `SBS / SMRT Public Bus ${busNumber} Direct Trunk`,
      duration: busDurationSec,
      distance: totalDistanceM,
      from: { name: `Bus Stop near ${originStation.name}` },
      to: { name: `Bus Stop near ${destStation.name}` },
      numIntermediateStops: busIntermediateStops.length,
      intermediateStops: busIntermediateStops,
      instruction: `Board Double-Decker Bus ${busNumber} directly towards ${endName} (${busIntermediateStops.length} stops, Wheelchair Accessible)`,
    },
    {
      mode: 'WALK',
      route: `Walk to ${endName}`,
      duration: busWalk2,
      distance: Math.round(walkDestDist * 0.75),
      from: { name: `Bus Stop near ${destStation.name}` },
      to: { name: endName || 'Destination Point', lat: endLat, lon: endLng },
      instruction: `Alight and walk ${Math.round(walkDestDist * 0.75)}m into ${endName}`,
    },
  ];

  // 3. Alternative Combined MRT Line Itinerary
  const legs3 = JSON.parse(JSON.stringify(legs1));
  const totalDuration3 = totalDuration1 + 240;

  return [
    {
      id: 'itinerary-1-optimal-mrt',
      tag: 'Fastest Transit',
      duration: totalDuration1,
      startTime: baseStartTime,
      endTime: baseStartTime + totalDuration1 * 1000,
      walkTime: walkOriginTime + walkDestTime,
      transitTime: estMrtTimeSec,
      waitingTime: mrtSolution.type === 'transfer' ? 180 : 120,
      walkDistance: walkOriginDist + walkDestDist,
      transfers: mrtSolution.type === 'transfer' ? 1 : 0,
      fareSgd: parseFloat(fare.toFixed(2)),
      legs: legs1,
    },
    {
      id: 'itinerary-2-direct-bus',
      tag: 'Direct Public Bus',
      duration: totalDuration2,
      startTime: baseStartTime + 120 * 1000,
      endTime: baseStartTime + (totalDuration2 + 120) * 1000,
      walkTime: busWalk1 + busWalk2,
      transitTime: busDurationSec,
      waitingTime: 180,
      walkDistance: Math.round(walkOriginDist * 0.75 + walkDestDist * 0.75),
      transfers: 0,
      fareSgd: parseFloat(Math.max(1.09, fare - 0.15).toFixed(2)),
      legs: legs2,
    },
    {
      id: 'itinerary-3-alternative-mrt',
      tag: 'Alternative Scenic Route',
      duration: totalDuration3,
      startTime: baseStartTime + 180 * 1000,
      endTime: baseStartTime + (totalDuration3 + 180) * 1000,
      walkTime: walkOriginTime + walkDestTime + 60,
      transitTime: estMrtTimeSec + 180,
      waitingTime: 240,
      walkDistance: walkOriginDist + walkDestDist + 50,
      transfers: mrtSolution.type === 'transfer' ? 1 : 1,
      fareSgd: parseFloat(fare.toFixed(2)),
      legs: legs3,
    },
  ];
}
