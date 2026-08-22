import fs from 'fs';

const TARGET_PAGES = [
  // Neighbourhoods
  { id: 'katong-joo-chiat', category: 'neighbourhood', name: 'Katong / Joo Chiat', url: 'https://www.visitsingapore.com/neighbourhood/featured-neighbourhood/katong-joo-chiat/' },
  { id: 'chinatown', category: 'neighbourhood', name: 'Chinatown', url: 'https://www.visitsingapore.com/neighbourhood/featured-neighbourhood/chinatown/' },
  { id: 'kampong-gelam', category: 'neighbourhood', name: 'Kampong Gelam', url: 'https://www.visitsingapore.com/neighbourhood/featured-neighbourhood/kampong-gelam/' },
  { id: 'little-india', category: 'neighbourhood', name: 'Little India', url: 'https://www.visitsingapore.com/neighbourhood/featured-neighbourhood/little-india/' },
  { id: 'marina-bay', category: 'neighbourhood', name: 'Marina Bay', url: 'https://www.visitsingapore.com/neighbourhood/featured-neighbourhood/marina-bay/' },
  { id: 'orchard-road', category: 'neighbourhood', name: 'Orchard Road', url: 'https://www.visitsingapore.com/neighbourhood/featured-neighbourhood/orchard-road/' },
  { id: 'sentosa-island', category: 'neighbourhood', name: 'Sentosa Island', url: 'https://www.visitsingapore.com/neighbourhood/featured-neighbourhood/sentosa-island/' },
  { id: 'singapore-river', category: 'neighbourhood', name: 'Singapore River & Civic District', url: 'https://www.visitsingapore.com/neighbourhood/featured-neighbourhood/singapore-river/' },
  
  // Itineraries
  { id: 'itinerary-24h', category: 'itinerary', name: '24 Hours in Singapore', url: 'https://www.visitsingapore.com/travel-tips/travelling-to-singapore/itineraries/24-hours-in-singapore/' },
  { id: 'itinerary-4days', category: 'itinerary', name: '4 Days in Singapore (Essential Explorer)', url: 'https://www.visitsingapore.com/travel-tips/travelling-to-singapore/itineraries/4-days-in-singapore/' },
  { id: 'itinerary-7days', category: 'itinerary', name: '7 Days in Singapore (Complete Experience)', url: 'https://www.visitsingapore.com/travel-tips/travelling-to-singapore/itineraries/7-days-in-singapore/' },
  { id: 'itinerary-food', category: 'itinerary', name: '3-Day Singapore Food Guide & Hawker Trail', url: 'https://www.visitsingapore.com/travel-tips/travelling-to-singapore/itineraries/singapore-food-guide/' },
  { id: 'itinerary-outdoor', category: 'itinerary', name: 'Outdoor Adventures & City in Nature', url: 'https://www.visitsingapore.com/travel-tips/travelling-to-singapore/itineraries/outdoor-adventure-activities-in-singapore/' },
  { id: 'itinerary-family', category: 'itinerary', name: 'Places to Visit with Family', url: 'https://www.visitsingapore.com/travel-tips/travelling-to-singapore/itineraries/places-to-visit-with-family/' },
  
  // Food & Dining Guides
  { id: 'coffee-guide', category: 'food_culture', name: 'Order Coffee Like A Local (Kopi Guide)', url: 'https://www.visitsingapore.com/things-to-do/dining/local-food-and-drinks/order-coffee-like-a-local/' },
  { id: 'local-delights', category: 'food_culture', name: 'Local Singapore Delights & Hawker Food', url: 'https://www.visitsingapore.com/things-to-do/dining/local-food-and-drinks/experience-local-delights/' },
  { id: 'top-restaurants-bars', category: 'food_culture', name: 'Top Bars & Unique Dining Experiences', url: 'https://www.visitsingapore.com/things-to-do/dining/reputable-bars/' },
  
  // Festivals
  { id: 'festivals-cny', category: 'festival', name: 'Chinese New Year & River Hongbao', url: 'https://www.visitsingapore.com/whats-happening/all-happenings/festivals/chinese-new-year/' },
  { id: 'festivals-mid-autumn', category: 'festival', name: 'Mid-Autumn Festival', url: 'https://www.visitsingapore.com/whats-happening/all-happenings/festivals/mid-autumn-festival/' },
  { id: 'festivals-deepavali', category: 'festival', name: 'Deepavali', url: 'https://www.visitsingapore.com/whats-happening/all-happenings/festivals/deepavali/' },
  { id: 'festivals-hari-raya', category: 'festival', name: 'Hari Raya Aidilfitri', url: 'https://www.visitsingapore.com/whats-happening/all-happenings/festivals/hari-raya-aidilfitri/' },
  { id: 'festivals-thaipusam', category: 'festival', name: 'Thaipusam', url: 'https://www.visitsingapore.com/whats-happening/all-happenings/festivals/thaipusam/' },
  { id: 'festivals-f1', category: 'festival', name: 'Singapore Grand Prix Season', url: 'https://www.visitsingapore.com/whats-happening/all-happenings/events/singapore-grand-prix-season/' },
  
  // Travel Essentials & Sustainability
  { id: 'travel-sustainably', category: 'travel_tip', name: 'Travel Sustainably in Singapore', url: 'https://www.visitsingapore.com/travel-tips/about-singapore/travel-sustainably/' },
  { id: 'gst-refund', category: 'travel_tip', name: 'Tourist GST Tax Refund Guide', url: 'https://www.visitsingapore.com/travel-tips/essential-travel-information/gst-tax-refund-singapore/' },
  { id: 'local-brands', category: 'shopping', name: 'Made with Passion Singapore Brands', url: 'https://www.visitsingapore.com/things-to-do/shop/singapore-local-brands/made-with-passion/' },
];

function cleanHtmlText(str) {
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

async function scrapeAll() {
  console.log('Starting VisitSingapore scraper for', TARGET_PAGES.length, 'pages...');
  const results = [];

  for (const page of TARGET_PAGES) {
    try {
      console.log(`Fetching: ${page.name} (${page.url})...`);
      const res = await fetch(page.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        }
      });

      if (!res.ok) {
        console.warn(`Failed to fetch ${page.url} - Status ${res.status}`);
        continue;
      }

      const html = await res.text();
      const unescaped = html.replace(/&#34;/g, '"').replace(/&quot;/g, '"').replace(/&#39;/g, "'");

      // Extract tiles
      const tileHeaders = [...unescaped.matchAll(/"tileHeader_t"\s*:\s*"([^"]+)"/g)].map(m => cleanHtmlText(m[1]));
      const tileDescriptions = [...unescaped.matchAll(/"tileDescription_t"\s*:\s*"([^"]+)"/g)].map(m => cleanHtmlText(m[1]));
      const tileImages = [...unescaped.matchAll(/"tileImagePath"\s*:\s*"([^"]+)"/g)].map(m => {
        let p = m[1];
        if (p.startsWith('/')) p = 'https://www.visitsingapore.com' + p;
        return p;
      });

      // Extract general text content blocks
      const items = [];
      for (let i = 0; i < Math.max(tileHeaders.length, tileDescriptions.length); i++) {
        if (tileHeaders[i] || tileDescriptions[i]) {
          items.push({
            title: tileHeaders[i] || `Highlight ${i + 1}`,
            description: tileDescriptions[i] || '',
            image: tileImages[i] || ''
          });
        }
      }

      // Look for custom text fields in AEM components
      const paragraphs = [...unescaped.matchAll(/"text"\s*:\s*"([^"]{40,1000})"/g)].map(m => cleanHtmlText(m[1])).filter(t => !t.includes('{') && !t.includes('<div'));

      results.push({
        id: page.id,
        category: page.category,
        name: page.name,
        sourceUrl: page.url,
        itemsCount: items.length,
        items,
        paragraphs: paragraphs.slice(0, 10)
      });
      console.log(`✓ ${page.name}: Extracted ${items.length} items and ${paragraphs.length} paragraphs.`);
    } catch (err) {
      console.error(`Error scraping ${page.name}:`, err.message);
    }
  }

  fs.writeFileSync('src/data/visitSingaporeScraped.json', JSON.stringify(results, null, 2));
  console.log('Saved all scraped data to src/data/visitSingaporeScraped.json');
}

scrapeAll();
