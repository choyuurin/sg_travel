import fs from 'fs';

const ALL_PAGES = [
  // Neighbourhoods & Sub-attractions
  { id: 'chinatown', type: 'neighbourhood', name: 'Chinatown', url: 'https://www.visitsingapore.com/neighbourhood/featured-neighbourhood/chinatown/' },
  { id: 'chinatown-buddha-tooth', type: 'attraction', name: 'Buddha Tooth Relic Temple & Museum', url: 'https://www.visitsingapore.com/neighbourhood/featured-neighbourhood/chinatown/buddha-tooth-relic-temple/' },
  { id: 'chinatown-sri-mariamman', type: 'attraction', name: 'Sri Mariamman Temple', url: 'https://www.visitsingapore.com/neighbourhood/featured-neighbourhood/chinatown/sri-mariamman-temple/' },
  { id: 'chinatown-jamae-mosque', type: 'attraction', name: 'Jamae Mosque (Masjid Chulia)', url: 'https://www.visitsingapore.com/neighbourhood/featured-neighbourhood/chinatown/jamae-mosque-masjid-chulia/' },
  { id: 'chinatown-street-market', type: 'attraction', name: 'Chinatown Street Market & Pagoda Street', url: 'https://www.visitsingapore.com/neighbourhood/featured-neighbourhood/chinatown/chinatown-street-market/' },

  { id: 'kampong-gelam', type: 'neighbourhood', name: 'Kampong Gelam', url: 'https://www.visitsingapore.com/neighbourhood/featured-neighbourhood/kampong-gelam/' },
  { id: 'kampong-gelam-sultan-mosque', type: 'attraction', name: 'Sultan Mosque (Masjid Sultan)', url: 'https://www.visitsingapore.com/neighbourhood/featured-neighbourhood/kampong-gelam/sultan-mosque/' },
  { id: 'kampong-gelam-haji-lane', type: 'attraction', name: 'Haji Lane & Gelam Gallery', url: 'https://www.visitsingapore.com/neighbourhood/featured-neighbourhood/kampong-gelam/haji-lane/' },
  
  { id: 'katong-joo-chiat', type: 'neighbourhood', name: 'Katong / Joo Chiat', url: 'https://www.visitsingapore.com/neighbourhood/featured-neighbourhood/katong-joo-chiat/' },
  { id: 'katong-koon-seng', type: 'attraction', name: 'Koon Seng Road Peranakan Shophouses', url: 'https://www.visitsingapore.com/neighbourhood/featured-neighbourhood/katong-joo-chiat/shophouses-koon-seng-road/' },
  { id: 'katong-the-intan', type: 'attraction', name: 'The Intan Peranakan Home Museum', url: 'https://www.visitsingapore.com/neighbourhood/featured-neighbourhood/katong-joo-chiat/the-intan/' },
  { id: 'katong-kim-choo', type: 'attraction', name: 'Kim Choo Kueh Chang', url: 'https://www.visitsingapore.com/neighbourhood/featured-neighbourhood/katong-joo-chiat/kim-choo-kueh-chang/' },
  { id: 'katong-eurasian-heritage', type: 'attraction', name: 'Eurasian Heritage Gallery', url: 'https://www.visitsingapore.com/neighbourhood/featured-neighbourhood/katong-joo-chiat/eurasian-heritage-centre/' },

  { id: 'little-india', type: 'neighbourhood', name: 'Little India', url: 'https://www.visitsingapore.com/neighbourhood/featured-neighbourhood/little-india/' },
  { id: 'little-india-heritage-centre', type: 'attraction', name: 'Indian Heritage Centre', url: 'https://www.visitsingapore.com/neighbourhood/featured-neighbourhood/little-india/indian-heritage-centre/' },
  { id: 'little-india-veeramakaliamman', type: 'attraction', name: 'Sri Veeramakaliamman Temple', url: 'https://www.visitsingapore.com/neighbourhood/featured-neighbourhood/little-india/sri-veeramakaliamman-temple/' },
  { id: 'little-india-tan-teng-niah', type: 'attraction', name: 'Former House of Tan Teng Niah', url: 'https://www.visitsingapore.com/neighbourhood/featured-neighbourhood/little-india/tan-teng-niah-house/' },

  { id: 'marina-bay', type: 'neighbourhood', name: 'Marina Bay', url: 'https://www.visitsingapore.com/neighbourhood/featured-neighbourhood/marina-bay/' },
  { id: 'marina-bay-gardens', type: 'attraction', name: 'Gardens by the Bay', url: 'https://www.visitsingapore.com/neighbourhood/featured-neighbourhood/marina-bay/gardens-by-the-bay/' },
  { id: 'marina-bay-mbs', type: 'attraction', name: 'Marina Bay Sands & SkyPark', url: 'https://www.visitsingapore.com/neighbourhood/featured-neighbourhood/marina-bay/marina-bay-sands/' },
  { id: 'marina-bay-merlion', type: 'attraction', name: 'Merlion Park', url: 'https://www.visitsingapore.com/neighbourhood/featured-neighbourhood/marina-bay/merlion-park/' },
  { id: 'marina-bay-esplanade', type: 'attraction', name: 'Esplanade – Theatres on the Bay', url: 'https://www.visitsingapore.com/neighbourhood/featured-neighbourhood/marina-bay/esplanades-theatres-on-the-bay/' },
  { id: 'marina-bay-flyer', type: 'attraction', name: 'Singapore Flyer & Time Capsule', url: 'https://www.visitsingapore.com/neighbourhood/featured-neighbourhood/marina-bay/singapore-flyer/' },
  { id: 'marina-bay-barrage', type: 'attraction', name: 'Marina Barrage & Green Roof', url: 'https://www.visitsingapore.com/neighbourhood/featured-neighbourhood/marina-bay/marina-barrage/' },

  { id: 'orchard-road', type: 'neighbourhood', name: 'Orchard Road', url: 'https://www.visitsingapore.com/neighbourhood/featured-neighbourhood/orchard-road/' },
  { id: 'orchard-emerald-hill', type: 'attraction', name: 'Emerald Hill Conservation Area', url: 'https://www.visitsingapore.com/neighbourhood/featured-neighbourhood/orchard-road/heritage-walk-itinerary/emerald-hill/' },
  { id: 'orchard-design-orchard', type: 'attraction', name: 'Design Orchard Local Showcase', url: 'https://www.visitsingapore.com/neighbourhood/featured-neighbourhood/orchard-road/heritage-walk-itinerary/design-orchard/' },

  { id: 'sentosa-island', type: 'neighbourhood', name: 'Sentosa Island', url: 'https://www.visitsingapore.com/neighbourhood/featured-neighbourhood/sentosa-island/' },
  { id: 'sentosa-rws', type: 'attraction', name: 'Resorts World Sentosa & S.E.A. Aquarium', url: 'https://www.visitsingapore.com/neighbourhood/featured-neighbourhood/sentosa-island/resorts-world-sentosa/' },

  { id: 'singapore-river', type: 'neighbourhood', name: 'Singapore River & Civic District', url: 'https://www.visitsingapore.com/neighbourhood/featured-neighbourhood/singapore-river/' },

  // Itineraries
  { id: 'itinerary-24h', type: 'itinerary', name: '24 Hours in Singapore', url: 'https://www.visitsingapore.com/travel-tips/travelling-to-singapore/itineraries/24-hours-in-singapore/' },
  { id: 'itinerary-4days', type: 'itinerary', name: '4 Days in Singapore (Essential Explorer)', url: 'https://www.visitsingapore.com/travel-tips/travelling-to-singapore/itineraries/4-days-in-singapore/' },
  { id: 'itinerary-7days', type: 'itinerary', name: '7 Days in Singapore (Complete Experience)', url: 'https://www.visitsingapore.com/travel-tips/travelling-to-singapore/itineraries/7-days-in-singapore/' },
  { id: 'itinerary-food', type: 'itinerary', name: '3-Day Singapore Food Guide & Hawker Trail', url: 'https://www.visitsingapore.com/travel-tips/travelling-to-singapore/itineraries/singapore-food-guide/' },
  { id: 'itinerary-nature', type: 'itinerary', name: 'Outdoor Adventure & City in Nature', url: 'https://www.visitsingapore.com/travel-tips/travelling-to-singapore/itineraries/outdoor-adventure-activities-in-singapore/' },
  { id: 'itinerary-family', type: 'itinerary', name: 'Family Fun Itinerary', url: 'https://www.visitsingapore.com/travel-tips/travelling-to-singapore/itineraries/places-to-visit-with-family/' },

  // Food & Coffee
  { id: 'order-coffee', type: 'food', name: 'Order Coffee Like A Local', url: 'https://www.visitsingapore.com/things-to-do/dining/local-food-and-drinks/order-coffee-like-a-local/' },
  { id: 'local-delights', type: 'food', name: 'Experience Local Hawker Delights', url: 'https://www.visitsingapore.com/things-to-do/dining/local-food-and-drinks/experience-local-delights/' },
  { id: 'top-bars', type: 'food', name: 'World-Class Bars & Nightlife', url: 'https://www.visitsingapore.com/things-to-do/dining/reputable-bars/' },

  // Sustainability & GST
  { id: 'travel-sustainably', type: 'travel_tip', name: 'Travel Sustainably in Singapore', url: 'https://www.visitsingapore.com/travel-tips/about-singapore/travel-sustainably/' },
  { id: 'gst-refund', type: 'travel_tip', name: 'Tourist GST Tax Refund Guide', url: 'https://www.visitsingapore.com/travel-tips/essential-travel-information/gst-tax-refund-singapore/' },
];

function clean(str) {
  if (!str) return '';
  return str
    .replace(/&#34;/g, '"')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\\u003c[^>]+>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

async function scrapeEverything() {
  console.log(`Scraping ${ALL_PAGES.length} VisitSingapore pages...`);
  const results = {};

  for (const page of ALL_PAGES) {
    try {
      const res = await fetch(page.url, {
        headers: { 'User-Agent': 'Mozilla/5.0' }
      });
      if (!res.ok) {
        console.warn(`[Skip] ${page.name} - Status ${res.status}`);
        continue;
      }
      const html = await res.text();
      const unescaped = html.replace(/&#34;/g, '"').replace(/&quot;/g, '"').replace(/&#39;/g, "'");

      // Extract title
      const title = clean((html.match(/<title>(.*?)<\/title>/i) || ['', ''])[1].split('|')[0]);

      // Extract tiles
      const tileHeaders = [...unescaped.matchAll(/"tileHeader_t"\s*:\s*"([^"]+)"/g)].map(m => clean(m[1]));
      const tileDescriptions = [...unescaped.matchAll(/"tileDescription_t"\s*:\s*"([^"]+)"/g)].map(m => clean(m[1]));
      const tileImages = [...unescaped.matchAll(/"tileImagePath"\s*:\s*"([^"]+)"/g)].map(m => {
        let p = m[1];
        if (p.startsWith('/')) p = 'https://www.visitsingapore.com' + p;
        return p;
      });

      const tiles = [];
      for (let i = 0; i < Math.max(tileHeaders.length, tileDescriptions.length); i++) {
        if (tileHeaders[i] || tileDescriptions[i]) {
          tiles.push({
            title: tileHeaders[i] || `Highlight ${i + 1}`,
            description: tileDescriptions[i] || '',
            image: tileImages[i] || ''
          });
        }
      }

      // Extract raw body text sections
      const cleanHtml = html
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
        .replace(/<[^>]+>/g, '\n');

      const lines = cleanHtml
        .split('\n')
        .map(l => clean(l))
        .filter(l => l.length > 25 && !l.includes('dataLayer') && !l.includes('Optanon') && !l.includes('function(') && !l.includes('window.'));

      results[page.id] = {
        id: page.id,
        name: page.name,
        title,
        url: page.url,
        type: page.type,
        tiles,
        contentLines: lines.slice(0, 20)
      };

      console.log(`✓ ${page.name} (${page.id}): ${tiles.length} tiles, ${lines.length} content lines.`);
    } catch (e) {
      console.error(`Error on ${page.name}:`, e.message);
    }
  }

  fs.writeFileSync('src/data/rawVisitSingaporeData.json', JSON.stringify(results, null, 2));
  console.log('Finished scraping! Output saved to src/data/rawVisitSingaporeData.json');
}

scrapeEverything();
