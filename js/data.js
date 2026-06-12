/* ============================================
   WORLDCUPWATCHER — Verified Event & Team Data
   2026 FIFA World Cup — USA / Canada / Mexico

   Match schedule: ESPN, FIFA.com, Al Jazeera
   Events: TimeOut London, DesignMyNight,
           Londonist, Eventbrite, Skiddle
   ============================================ */

const TEAMS_2026 = [
  // Group A
  { code: 'MX', name: 'Mexico', flag: '\u{1F1F2}\u{1F1FD}', group: 'A' },
  { code: 'ZA', name: 'South Africa', flag: '\u{1F1FF}\u{1F1E6}', group: 'A' },
  { code: 'KR', name: 'South Korea', flag: '\u{1F1F0}\u{1F1F7}', group: 'A' },
  { code: 'CZ', name: 'Czechia', flag: '\u{1F1E8}\u{1F1FF}', group: 'A' },
  // Group B
  { code: 'CA', name: 'Canada', flag: '\u{1F1E8}\u{1F1E6}', group: 'B' },
  { code: 'BA', name: 'Bosnia & Herzegovina', flag: '\u{1F1E7}\u{1F1E6}', group: 'B' },
  { code: 'QA', name: 'Qatar', flag: '\u{1F1F6}\u{1F1E6}', group: 'B' },
  { code: 'CH', name: 'Switzerland', flag: '\u{1F1E8}\u{1F1ED}', group: 'B' },
  // Group C
  { code: 'BR', name: 'Brazil', flag: '\u{1F1E7}\u{1F1F7}', group: 'C' },
  { code: 'MA', name: 'Morocco', flag: '\u{1F1F2}\u{1F1E6}', group: 'C' },
  { code: 'HT', name: 'Haiti', flag: '\u{1F1ED}\u{1F1F9}', group: 'C' },
  { code: 'SCO', name: 'Scotland', flag: '\u{1F3F4}\u{E0067}\u{E0062}\u{E0073}\u{E0063}\u{E0074}\u{E007F}', group: 'C' },
  // Group D
  { code: 'US', name: 'USA', flag: '\u{1F1FA}\u{1F1F8}', group: 'D' },
  { code: 'PY', name: 'Paraguay', flag: '\u{1F1F5}\u{1F1FE}', group: 'D' },
  { code: 'AU', name: 'Australia', flag: '\u{1F1E6}\u{1F1FA}', group: 'D' },
  { code: 'TR', name: 'Türkiye', flag: '\u{1F1F9}\u{1F1F7}', group: 'D' },
  // Group E
  { code: 'DE', name: 'Germany', flag: '\u{1F1E9}\u{1F1EA}', group: 'E' },
  { code: 'CW', name: 'Curaçao', flag: '\u{1F1E8}\u{1F1FC}', group: 'E' },
  { code: 'CI', name: 'Ivory Coast', flag: '\u{1F1E8}\u{1F1EE}', group: 'E' },
  { code: 'EC', name: 'Ecuador', flag: '\u{1F1EA}\u{1F1E8}', group: 'E' },
  // Group F
  { code: 'NL', name: 'Netherlands', flag: '\u{1F1F3}\u{1F1F1}', group: 'F' },
  { code: 'JP', name: 'Japan', flag: '\u{1F1EF}\u{1F1F5}', group: 'F' },
  { code: 'SE', name: 'Sweden', flag: '\u{1F1F8}\u{1F1EA}', group: 'F' },
  { code: 'TN', name: 'Tunisia', flag: '\u{1F1F9}\u{1F1F3}', group: 'F' },
  // Group G
  { code: 'BE', name: 'Belgium', flag: '\u{1F1E7}\u{1F1EA}', group: 'G' },
  { code: 'EG', name: 'Egypt', flag: '\u{1F1EA}\u{1F1EC}', group: 'G' },
  { code: 'IR', name: 'Iran', flag: '\u{1F1EE}\u{1F1F7}', group: 'G' },
  { code: 'NZ', name: 'New Zealand', flag: '\u{1F1F3}\u{1F1FF}', group: 'G' },
  // Group H
  { code: 'ES', name: 'Spain', flag: '\u{1F1EA}\u{1F1F8}', group: 'H' },
  { code: 'CV', name: 'Cape Verde', flag: '\u{1F1E8}\u{1F1FB}', group: 'H' },
  { code: 'SA', name: 'Saudi Arabia', flag: '\u{1F1F8}\u{1F1E6}', group: 'H' },
  { code: 'UY', name: 'Uruguay', flag: '\u{1F1FA}\u{1F1FE}', group: 'H' },
  // Group I
  { code: 'FR', name: 'France', flag: '\u{1F1EB}\u{1F1F7}', group: 'I' },
  { code: 'SN', name: 'Senegal', flag: '\u{1F1F8}\u{1F1F3}', group: 'I' },
  { code: 'IQ', name: 'Iraq', flag: '\u{1F1EE}\u{1F1F6}', group: 'I' },
  { code: 'NO', name: 'Norway', flag: '\u{1F1F3}\u{1F1F4}', group: 'I' },
  // Group J
  { code: 'AR', name: 'Argentina', flag: '\u{1F1E6}\u{1F1F7}', group: 'J' },
  { code: 'DZ', name: 'Algeria', flag: '\u{1F1E9}\u{1F1FF}', group: 'J' },
  { code: 'AT', name: 'Austria', flag: '\u{1F1E6}\u{1F1F9}', group: 'J' },
  { code: 'JO', name: 'Jordan', flag: '\u{1F1EF}\u{1F1F4}', group: 'J' },
  // Group K
  { code: 'PT', name: 'Portugal', flag: '\u{1F1F5}\u{1F1F9}', group: 'K' },
  { code: 'CD', name: 'DR Congo', flag: '\u{1F1E8}\u{1F1E9}', group: 'K' },
  { code: 'UZ', name: 'Uzbekistan', flag: '\u{1F1FA}\u{1F1FF}', group: 'K' },
  { code: 'CO', name: 'Colombia', flag: '\u{1F1E8}\u{1F1F4}', group: 'K' },
  // Group L
  { code: 'GB-ENG', name: 'England', flag: '\u{1F3F4}\u{E0067}\u{E0062}\u{E0065}\u{E006E}\u{E0067}\u{E007F}', group: 'L' },
  { code: 'HR', name: 'Croatia', flag: '\u{1F1ED}\u{1F1F7}', group: 'L' },
  { code: 'GH', name: 'Ghana', flag: '\u{1F1EC}\u{1F1ED}', group: 'L' },
  { code: 'PA', name: 'Panama', flag: '\u{1F1F5}\u{1F1E6}', group: 'L' },
];

// All times in BST (British Summer Time, UTC+1) for London viewers
const MATCHES = [
  // ── June 11 ──
  { id: 'm1', teamA: 'MX', teamB: 'ZA', date: '2026-06-11', time: '20:00', stage: 'Group A', venue: 'Mexico City Stadium' },

  // ── June 12 ──
  { id: 'm2', teamA: 'CA', teamB: 'BA', date: '2026-06-12', time: '20:00', stage: 'Group B', venue: 'Toronto Stadium' },

  // ── June 13 ──
  { id: 'm3', teamA: 'QA', teamB: 'CH', date: '2026-06-13', time: '20:00', stage: 'Group B', venue: 'San Francisco Stadium' },
  { id: 'm4', teamA: 'BR', teamB: 'MA', date: '2026-06-13', time: '23:00', stage: 'Group C', venue: 'MetLife Stadium, NJ' },

  // ── June 14 ──
  { id: 'm5', teamA: 'DE', teamB: 'CW', date: '2026-06-14', time: '18:00', stage: 'Group E', venue: 'Houston Stadium' },
  { id: 'm6', teamA: 'NL', teamB: 'JP', date: '2026-06-14', time: '21:00', stage: 'Group F', venue: 'AT&T Stadium, Dallas' },
  { id: 'm7', teamA: 'CI', teamB: 'EC', date: '2026-06-14', time: '00:00', stage: 'Group E', venue: 'Lincoln Financial Field' },

  // ── June 15 ──
  { id: 'm8', teamA: 'ES', teamB: 'CV', date: '2026-06-15', time: '18:00', stage: 'Group H', venue: 'Mercedes-Benz, Atlanta' },
  { id: 'm9', teamA: 'BE', teamB: 'EG', date: '2026-06-15', time: '20:00', stage: 'Group G', venue: 'Lumen Field, Seattle' },
  { id: 'm10', teamA: 'SA', teamB: 'UY', date: '2026-06-15', time: '23:00', stage: 'Group H', venue: 'Hard Rock Stadium, Miami' },

  // ── June 16 ──
  { id: 'm11', teamA: 'FR', teamB: 'SN', date: '2026-06-16', time: '20:00', stage: 'Group I', venue: 'MetLife Stadium, NJ' },
  { id: 'm12', teamA: 'IQ', teamB: 'NO', date: '2026-06-16', time: '23:00', stage: 'Group I', venue: 'Gillette Stadium, Boston' },

  // ── June 17 ──
  { id: 'm13', teamA: 'PT', teamB: 'CD', date: '2026-06-17', time: '18:00', stage: 'Group K', venue: 'NRG Stadium, Houston' },
  { id: 'm14', teamA: 'GB-ENG', teamB: 'HR', date: '2026-06-17', time: '21:00', stage: 'Group L', venue: 'AT&T Stadium, Dallas' },
  { id: 'm15', teamA: 'GH', teamB: 'PA', date: '2026-06-17', time: '00:00', stage: 'Group L', venue: 'BMO Field, Toronto' },

  // ── June 18 ──
  { id: 'm16', teamA: 'CZ', teamB: 'ZA', date: '2026-06-18', time: '17:00', stage: 'Group A', venue: 'Mercedes-Benz, Atlanta' },
  { id: 'm17', teamA: 'CH', teamB: 'BA', date: '2026-06-18', time: '20:00', stage: 'Group B', venue: 'SoFi Stadium, LA' },
  { id: 'm18', teamA: 'CA', teamB: 'QA', date: '2026-06-18', time: '23:00', stage: 'Group B', venue: 'BC Place, Vancouver' },

  // ── June 19 ──
  { id: 'm19', teamA: 'US', teamB: 'AU', date: '2026-06-19', time: '20:00', stage: 'Group D', venue: 'Lumen Field, Seattle' },
  { id: 'm20', teamA: 'SCO', teamB: 'MA', date: '2026-06-19', time: '23:00', stage: 'Group C', venue: 'Gillette Stadium, Boston' },

  // ── June 20 ──
  { id: 'm21', teamA: 'NL', teamB: 'SE', date: '2026-06-20', time: '18:00', stage: 'Group F', venue: 'NRG Stadium, Houston' },
  { id: 'm22', teamA: 'DE', teamB: 'CI', date: '2026-06-20', time: '21:00', stage: 'Group E', venue: 'BMO Field, Toronto' },

  // ── June 21 ──
  { id: 'm23', teamA: 'ES', teamB: 'SA', date: '2026-06-21', time: '17:00', stage: 'Group H', venue: 'Mercedes-Benz, Atlanta' },
  { id: 'm24', teamA: 'BE', teamB: 'IR', date: '2026-06-21', time: '20:00', stage: 'Group G', venue: 'SoFi Stadium, LA' },
  { id: 'm25', teamA: 'UY', teamB: 'CV', date: '2026-06-21', time: '23:00', stage: 'Group H', venue: 'Hard Rock Stadium, Miami' },

  // ── June 22 ──
  { id: 'm26', teamA: 'AR', teamB: 'AT', date: '2026-06-22', time: '18:00', stage: 'Group J', venue: 'AT&T Stadium, Dallas' },
  { id: 'm27', teamA: 'FR', teamB: 'IQ', date: '2026-06-22', time: '22:00', stage: 'Group I', venue: 'Lincoln Financial Field' },

  // ── June 23 ──
  { id: 'm28', teamA: 'PT', teamB: 'UZ', date: '2026-06-23', time: '18:00', stage: 'Group K', venue: 'NRG Stadium, Houston' },
  { id: 'm29', teamA: 'GB-ENG', teamB: 'GH', date: '2026-06-23', time: '21:00', stage: 'Group L', venue: 'Gillette Stadium, Boston' },
  { id: 'm30', teamA: 'PA', teamB: 'HR', date: '2026-06-23', time: '00:00', stage: 'Group L', venue: 'BMO Field, Toronto' },

  // ── June 24 ──
  { id: 'm31', teamA: 'CH', teamB: 'CA', date: '2026-06-24', time: '20:00', stage: 'Group B', venue: 'BC Place, Vancouver' },
  { id: 'm32', teamA: 'BA', teamB: 'QA', date: '2026-06-24', time: '20:00', stage: 'Group B', venue: 'Lumen Field, Seattle' },
  { id: 'm33', teamA: 'SCO', teamB: 'BR', date: '2026-06-24', time: '23:00', stage: 'Group C', venue: 'Hard Rock Stadium, Miami' },
  { id: 'm34', teamA: 'MA', teamB: 'HT', date: '2026-06-24', time: '23:00', stage: 'Group C', venue: 'Mercedes-Benz, Atlanta' },

  // ── June 25 ──
  { id: 'm35', teamA: 'EC', teamB: 'DE', date: '2026-06-25', time: '21:00', stage: 'Group E', venue: 'MetLife Stadium, NJ' },
  { id: 'm36', teamA: 'CW', teamB: 'CI', date: '2026-06-25', time: '21:00', stage: 'Group E', venue: 'Lincoln Financial Field' },

  // ── June 26 ──
  { id: 'm37', teamA: 'NO', teamB: 'FR', date: '2026-06-26', time: '20:00', stage: 'Group I', venue: 'Gillette Stadium, Boston' },
  { id: 'm38', teamA: 'SN', teamB: 'IQ', date: '2026-06-26', time: '20:00', stage: 'Group I', venue: 'BMO Field, Toronto' },

  // ── June 27 ──
  { id: 'm39', teamA: 'PA', teamB: 'GB-ENG', date: '2026-06-27', time: '22:00', stage: 'Group L', venue: 'MetLife Stadium, NJ' },
  { id: 'm40', teamA: 'HR', teamB: 'GH', date: '2026-06-27', time: '22:00', stage: 'Group L', venue: 'Lincoln Financial Field' },
  { id: 'm41', teamA: 'CO', teamB: 'PT', date: '2026-06-27', time: '00:30', stage: 'Group K', venue: 'Hard Rock Stadium, Miami' },
];

/*
   EVENTS — All sourced from verified listings:
   - TimeOut London (timeout.com/london)
   - DesignMyNight (designmynight.com)
   - Londonist (londonist.com)
   - Eventbrite UK
   - Skiddle
   - Venue websites

   Matches shown are based on what each venue advertises:
   "all matches" = showing every game
   "England matches" = confirmed for England fixtures
   "major fixtures" = key games beyond just England
*/
const EVENTS = [
  // ══════════════════════════════════════════
  // BRAZIL vs MOROCCO — Sat 13 Jun, 23:00 BST
  // ══════════════════════════════════════════
  {
    id: 'e1',
    title: 'Brazil vs Morocco — Boxhall City',
    venue: 'Boxhall City',
    address: 'Boxhall City, London',
    lat: 51.5155, lng: -0.0922,
    date: '2026-06-13', time: '21:00',
    matchId: 'm4',
    type: 'ticketed', price: '£10+',
    vibe: 'Fan Zone', capacity: '500+',
    link: 'https://www.eventbrite.com/e/brazil-v-morocco-world-cup-2026-screening-boxhall-city-tickets-1986223658430',
    source: 'Eventbrite',
    description: 'Ticketed screening with drinks and food from 14 independent kitchens. 9pm–1:30am.'
  },
  {
    id: 'e2',
    title: 'Brazil vs Morocco — The Garden Vauxhall',
    venue: 'The Garden Vauxhall',
    address: 'Fire Club & The Garden, Vauxhall, SW8',
    lat: 51.4855, lng: -0.1228,
    date: '2026-06-13', time: '22:00',
    matchId: 'm4',
    type: 'ticketed', price: '£6',
    vibe: 'Outdoor', capacity: '1000+',
    link: 'https://www.skiddle.com/g/world-cup-2026-screenings-at-the-garden-vauxhall/',
    source: 'Skiddle',
    description: 'Massive open-air beer garden with three LED screens, rotating street food stalls and two large bars. £6 non-England matches.'
  },
  {
    id: 'e3',
    title: 'Brazil vs Morocco — German Kraft Brewery',
    venue: 'German Kraft Brewery at Mercato Metropolitano',
    address: 'Mercato Metropolitano, 42 Newington Causeway, SE1 6DR',
    lat: 51.4960, lng: -0.1005,
    date: '2026-06-13', time: '22:00',
    matchId: 'm4',
    type: 'free', price: null,
    vibe: 'Outdoor', capacity: '700',
    link: 'https://www.germankraftbrewery.com',
    source: 'TimeOut London',
    description: 'Free entry, 700-capacity open-air screening area. 20sqm screen. 50+ food stalls. 10 free pints given away every time England or Germany score.'
  },
  {
    id: 'e4',
    title: 'Brazil vs Morocco — Paddy\'s Sportsbook at The Hippodrome',
    venue: 'The Hippodrome Casino',
    address: 'Cranbourn St, Leicester Square, WC2H 7JH',
    lat: 51.5112, lng: -0.1282,
    date: '2026-06-13', time: '22:00',
    matchId: 'm4',
    type: 'ticketed', price: 'Free entry',
    vibe: 'Sports Bar', capacity: '500+',
    link: 'https://www.hippodromecasino.com',
    source: 'TimeOut London',
    description: '54 HD screens plus a massive 10-metre screen. Open until 4am. Showing every single match of the tournament.'
  },
  {
    id: 'e5',
    title: 'Brazil vs Morocco — Mare Street Market',
    venue: 'Mare Street Market',
    address: '117 Mare St, Hackney, E8 4RU',
    lat: 51.5440, lng: -0.0555,
    date: '2026-06-13', time: '22:00',
    matchId: 'm4',
    type: 'free', price: null,
    vibe: 'Indoor', capacity: '500',
    link: 'https://www.marestreetmarket.com',
    source: 'TimeOut London',
    description: '10,000 sq ft space with big screen and three outdoor terrace screens. No booking fee. Showing every match.'
  },
  {
    id: 'e6',
    title: 'Brazil vs Morocco — The Dial, Meantime Brewery',
    venue: 'The Dial - Home of Meantime',
    address: 'Greenwich Peninsula, SE10',
    lat: 51.4990, lng: 0.0080,
    date: '2026-06-13', time: '22:00',
    matchId: 'm4',
    type: 'free', price: null,
    vibe: 'Pub', capacity: '300',
    link: 'https://www.meantimebrewing.com',
    source: 'TimeOut London',
    description: 'Meantime Brewery HQ with 13 screens broadcasting every last match. Free entry, seated or standing.'
  },
  {
    id: 'e7',
    title: 'Brazil vs Morocco — Bat & Ball Stratford',
    venue: 'Bat & Ball',
    address: 'Unit 1110/11, Montfichet Rd, Westfield Stratford, E20 1EJ',
    lat: 51.5435, lng: -0.0065,
    date: '2026-06-13', time: '22:00',
    matchId: 'm4',
    type: 'free', price: null,
    vibe: 'Sports Bar', capacity: '300',
    link: 'https://www.batandball.co',
    source: 'TimeOut London',
    description: '23 screens showing every single game. Free with £10 deposit per booking. Ping pong tables for half-time.'
  },
  {
    id: 'e8',
    title: 'Brazil vs Morocco — Snoozebox Olympic Park',
    venue: 'Snoozebox Olympic Park',
    address: 'Pudding Mill Lane, Stratford, E15 2NQ',
    lat: 51.5340, lng: -0.0130,
    date: '2026-06-13', time: '22:00',
    matchId: 'm4',
    type: 'ticketed', price: 'TBC',
    vibe: 'Fan Zone', capacity: '500+',
    link: 'https://www.eventbrite.co.uk/e/world-cup-2026-screening-in-stratford-london-tickets-1989097488132',
    source: 'Eventbrite',
    description: 'Big screen at Queen Elizabeth Olympic Park. Beer and burger deal included with ticket. By PLG Events.'
  },

  // ══════════════════════════════════════════
  // ENGLAND vs CROATIA — Tue 17 Jun, 21:00 BST
  // ══════════════════════════════════════════
  {
    id: 'e9',
    title: 'England vs Croatia — Flat Iron Square',
    venue: 'Flat Iron Square',
    address: '45 Southwark St, London Bridge, SE1 9HP',
    lat: 51.5040, lng: -0.0945,
    date: '2026-06-17', time: '19:00',
    matchId: 'm14',
    type: 'ticketed', price: 'from £2',
    vibe: 'Fan Zone', capacity: '800+',
    link: 'https://flatironsquare.co.uk',
    source: 'TimeOut London',
    description: '16ft indoor Jumbotron, 10ft outdoor garden screens, 19 screens total, 16 beers on tap. DJs before and after every game.'
  },
  {
    id: 'e10',
    title: 'England vs Croatia — The Garden Vauxhall',
    venue: 'The Garden Vauxhall',
    address: 'Fire Club & The Garden, Vauxhall, SW8',
    lat: 51.4855, lng: -0.1228,
    date: '2026-06-17', time: '20:00',
    matchId: 'm14',
    type: 'ticketed', price: '£10',
    vibe: 'Outdoor', capacity: '1000+',
    link: 'https://www.skiddle.com/g/world-cup-2026-screenings-at-the-garden-vauxhall/',
    source: 'Skiddle',
    description: 'Massive open-air beer garden with three LED screens. £10 for England matches, includes reserved spot.'
  },
  {
    id: 'e11',
    title: 'England vs Croatia — Boxpark Wembley',
    venue: 'Boxpark Wembley',
    address: '18 Olympic Way, Wembley, HA9 0JT',
    lat: 51.5560, lng: -0.2795,
    date: '2026-06-17', time: '20:00',
    matchId: 'm14',
    type: 'ticketed', price: 'TBC',
    vibe: 'Fan Zone', capacity: '2000+',
    link: 'https://www.boxpark.co.uk',
    source: 'TimeOut London',
    description: '4K TVs, table service, street food. Showing all matches across Camden, Croydon, Wembley and Shoreditch.'
  },
  {
    id: 'e12',
    title: 'England vs Croatia — Rooftop Cinema Club Peckham',
    venue: 'Rooftop Cinema Club',
    address: "Bussey Building, 133 Rye Ln, Peckham, SE15 4ST",
    lat: 51.4700, lng: -0.0660,
    date: '2026-06-17', time: '20:00',
    matchId: 'm14',
    type: 'ticketed', price: '£15',
    vibe: 'Rooftop', capacity: '200',
    link: 'https://rooftopcinemaclub.com/london',
    source: 'TimeOut London',
    description: 'Rooftop screening with city views, lounge seats, complimentary drink included. Also showing semi-finals and final.'
  },
  {
    id: 'e13',
    title: 'England vs Croatia — Clapham Grand',
    venue: 'Clapham Grand',
    address: '21-25 St John\'s Hill, Clapham Junction, SW11 1TT',
    lat: 51.4620, lng: -0.1685,
    date: '2026-06-17', time: '20:00',
    matchId: 'm14',
    type: 'ticketed', price: 'from £10',
    vibe: 'Club', capacity: '800',
    link: 'https://www.claphamgrand.com',
    source: 'TimeOut London',
    description: '24-foot cinema screen on stage plus plasma TVs. Free beer before 7pm with ticket. Live music and DJs.'
  },
  {
    id: 'e14',
    title: 'England vs Croatia — Big Penny Social',
    venue: 'Big Penny Social',
    address: '1 Priestley Way, Walthamstow, E17 6AL',
    lat: 51.5850, lng: -0.0425,
    date: '2026-06-17', time: '20:00',
    matchId: 'm14',
    type: 'ticketed', price: '£12',
    vibe: 'Indoor', capacity: '1000+',
    link: 'https://www.bigpennysocial.co.uk',
    source: 'TimeOut London',
    description: 'Billed as UK\'s biggest beer hall. Three gigantic screens, 100+ beer taps, live entertainment. £15 for knockouts.'
  },
  {
    id: 'e15',
    title: 'England vs Croatia — Between The Bridges',
    venue: 'Between The Bridges',
    address: "The Queen's Walk, Waterloo, SE1 8XX",
    lat: 51.5055, lng: -0.1145,
    date: '2026-06-17', time: '20:00',
    matchId: 'm14',
    type: 'ticketed', price: '£12',
    vibe: 'Outdoor', capacity: '2000',
    link: 'https://www.betweenthebridges.co.uk',
    source: 'DesignMyNight',
    description: 'Three giant video walls on the South Bank with the London skyline behind you. 7 food vendors, multiple bars.'
  },
  {
    id: 'e16',
    title: 'England vs Croatia — Lost Oasis at Trafalgar Sq',
    venue: 'Lost Oasis',
    address: "St Martin-in-the-Fields, Trafalgar Square, WC2N 4JJ",
    lat: 51.5090, lng: -0.1265,
    date: '2026-06-17', time: '20:00',
    matchId: 'm14',
    type: 'ticketed', price: '£10',
    vibe: 'Fan Zone', capacity: '400',
    link: 'https://www.lostoasis.co.uk',
    source: 'TimeOut London',
    description: 'Lush green garden space by Trafalgar Sq. England watch parties presented by Pukka Pies. £10 includes drink voucher.'
  },
  {
    id: 'e17',
    title: 'England vs Croatia — BrewDog Waterloo',
    venue: 'BrewDog Waterloo',
    address: 'Unit G, 1 The Sidings, Waterloo, SE1 7BH',
    lat: 51.5020, lng: -0.1120,
    date: '2026-06-17', time: '20:00',
    matchId: 'm14',
    type: 'ticketed', price: 'Free entry',
    vibe: 'Sports Bar', capacity: '1800',
    link: 'https://www.brewdog.com/uk/waterloo',
    source: 'DesignMyNight',
    description: '11 projectors, 23 screens, live DJ, dedicated MC. Capacity ~1,800. Free entry with booking.'
  },
  {
    id: 'e18',
    title: 'England vs Croatia — Eltham Park South Big Screen',
    venue: 'Eltham Park South',
    address: 'Eltham Park South, Eltham, SE9',
    lat: 51.4430, lng: 0.0570,
    date: '2026-06-17', time: '19:30',
    matchId: 'm14',
    type: 'ticketed', price: 'TBC',
    vibe: 'Outdoor', capacity: '1000+',
    link: 'https://www.eventbrite.co.uk/e/big-screen-football-world-cup-2026-screenings-eltham-park-south-tickets-1989338485963',
    source: 'Eventbrite',
    description: 'Open-air cinema big screen football. Gates open 7:30pm, kick-off 9pm BST.'
  },
  {
    id: 'e19',
    title: 'England vs Croatia — Pop Brixton',
    venue: 'Pop Brixton',
    address: '49 Brixton Station Rd, Brixton, SW9 8PQ',
    lat: 51.4618, lng: -0.1140,
    date: '2026-06-17', time: '20:00',
    matchId: 'm14',
    type: 'ticketed', price: '£11',
    vibe: 'Fan Zone', capacity: '500',
    link: 'https://www.popbrixton.org',
    source: 'TimeOut London',
    description: 'All England matches. DJs, multiple street food stalls, screens throughout. Reserved seating £15pp.'
  },
  {
    id: 'e20',
    title: 'England vs Croatia — Kick Off Club at Outernet',
    venue: 'Kick Off Club — Outernet',
    address: 'Outernet, Denmark St, WC2H 8LB',
    lat: 51.5155, lng: -0.1300,
    date: '2026-06-17', time: '20:00',
    matchId: 'm14',
    type: 'ticketed', price: 'TBC',
    vibe: 'Fan Zone', capacity: '1000+',
    link: 'https://www.kickoffclub.com',
    source: 'TimeOut London',
    description: "London's largest indoor screen. Plus fan zones at Electric Brixton (Britpop vibes) and Colour Factory (lasers and club lighting)."
  },
  {
    id: 'e21',
    title: 'England vs Croatia — 40ft Brewery',
    venue: '40ft Brewery',
    address: 'Blackhorse Road, Walthamstow, E17',
    lat: 51.5870, lng: -0.0400,
    date: '2026-06-17', time: '20:00',
    matchId: 'm14',
    type: 'ticketed', price: 'TBC',
    vibe: 'Outdoor', capacity: '500',
    link: 'https://www.40ftbrewery.com',
    source: 'TimeOut London',
    description: 'Huge LED screen in the yard. Partnership with Football Ramble podcast. Special tournament lager. Live DJs.'
  },
  {
    id: 'e22',
    title: 'England vs Croatia — Vinegar Yard',
    venue: 'Vinegar Yard',
    address: '72-82 St Thomas St, London Bridge, SE1 3QU',
    lat: 51.5045, lng: -0.0870,
    date: '2026-06-17', time: '20:00',
    matchId: 'm14',
    type: 'ticketed', price: '£12',
    vibe: 'Outdoor', capacity: '400+',
    link: 'https://www.vinegaryard.london',
    source: 'TimeOut London / DesignMyNight',
    description: 'Urban garden with large alfresco LED screen. Ticket includes free drink token. Heating and covering.'
  },
  {
    id: 'e23',
    title: 'England vs Croatia — Madison Rooftop',
    venue: 'Madison Rooftop',
    address: 'One New Change, St Paul\'s, EC4M 9AF',
    lat: 51.5135, lng: -0.0945,
    date: '2026-06-17', time: '20:00',
    matchId: 'm14',
    type: 'ticketed', price: '£22',
    vibe: 'Rooftop', capacity: '300',
    link: 'https://www.madisonlondon.net',
    source: 'DesignMyNight',
    description: 'Rooftop terrace with LED outdoor screen and views of St Paul\'s Cathedral. £22 includes beer.'
  },
  {
    id: 'e24',
    title: 'England vs Croatia — Hackney Bridge',
    venue: 'Hackney Bridge',
    address: 'Echo Building, East Bay Lane, E15 2SJ',
    lat: 51.5470, lng: -0.0260,
    date: '2026-06-17', time: '20:00',
    matchId: 'm14',
    type: 'ticketed', price: '£15.40',
    vibe: 'Outdoor', capacity: '400',
    link: 'https://www.hackneybridge.org',
    source: 'DesignMyNight',
    description: 'Giant outdoor screen, multiple bars, street food. Ticket includes a drink. England games.'
  },

  // ══════════════════════════════════════════
  // ENGLAND vs GHANA — Mon 23 Jun, 21:00 BST
  // ══════════════════════════════════════════
  {
    id: 'e25',
    title: 'England vs Ghana — Between The Bridges',
    venue: 'Between The Bridges',
    address: "The Queen's Walk, Waterloo, SE1 8XX",
    lat: 51.5055, lng: -0.1145,
    date: '2026-06-23', time: '20:00',
    matchId: 'm29',
    type: 'ticketed', price: '£12',
    vibe: 'Outdoor', capacity: '2000',
    link: 'https://www.betweenthebridges.co.uk',
    source: 'DesignMyNight',
    description: 'Three giant video walls on the South Bank. Tournament\'s biggest outdoor London screening.'
  },
  {
    id: 'e26',
    title: 'England vs Ghana — Clapham Grand',
    venue: 'Clapham Grand',
    address: '21-25 St John\'s Hill, Clapham Junction, SW11 1TT',
    lat: 51.4620, lng: -0.1685,
    date: '2026-06-23', time: '20:00',
    matchId: 'm29',
    type: 'ticketed', price: 'from £10',
    vibe: 'Club', capacity: '800',
    link: 'https://www.claphamgrand.com',
    source: 'TimeOut London',
    description: '24-foot cinema screen plus plasmas. Free beer before 7pm. Live music and DJs all night.'
  },
  {
    id: 'e27',
    title: 'England vs Ghana — Flat Iron Square',
    venue: 'Flat Iron Square',
    address: '45 Southwark St, London Bridge, SE1 9HP',
    lat: 51.5040, lng: -0.0945,
    date: '2026-06-23', time: '19:00',
    matchId: 'm29',
    type: 'ticketed', price: 'from £2',
    vibe: 'Fan Zone', capacity: '800+',
    link: 'https://flatironsquare.co.uk',
    source: 'TimeOut London',
    description: '16ft Jumbotron, 10ft outdoor screens, 19 screens total. Ticket includes free drink.'
  },
  {
    id: 'e28',
    title: 'England vs Ghana — Brixton Jamm',
    venue: 'Brixton Jamm',
    address: '261 Brixton Rd, Brixton, SW9 6LH',
    lat: 51.4615, lng: -0.1147,
    date: '2026-06-23', time: '20:00',
    matchId: 'm29',
    type: 'ticketed', price: '£5.50',
    vibe: 'Club', capacity: '400',
    link: 'https://www.brixtonjamm.org',
    source: 'DesignMyNight',
    description: 'Giant 3m LED screen, retractable roofs, beach garden. £5.50 ticket includes a beer.'
  },
  {
    id: 'e29',
    title: 'England vs Ghana — Queen of Hoxton',
    venue: 'Queen of Hoxton',
    address: '1 Curtain Rd, Shoreditch, EC2A 3JX',
    lat: 51.5250, lng: -0.0790,
    date: '2026-06-23', time: '20:00',
    matchId: 'm29',
    type: 'ticketed', price: 'from £10',
    vibe: 'Pub', capacity: '400',
    link: 'https://www.queenofhoxton.com',
    source: 'TimeOut London',
    description: 'Two-floor Shoreditch mega pub. Ticketed for England. Bajan food, cocktails, air con. £10 includes free drink.'
  },

  // ══════════════════════════════════════════
  // PANAMA vs ENGLAND — Sat 27 Jun, 22:00 BST
  // ══════════════════════════════════════════
  {
    id: 'e30',
    title: 'Panama vs England — Boxhall City',
    venue: 'Boxhall City',
    address: 'Boxhall City, London',
    lat: 51.5155, lng: -0.0922,
    date: '2026-06-27', time: '19:00',
    matchId: 'm39',
    type: 'ticketed', price: 'TBC',
    vibe: 'Fan Zone', capacity: '500+',
    link: 'https://www.eventbrite.com/e/panama-v-england-world-cup-2026-screening-boxhall-city-tickets-1987055422258',
    source: 'Eventbrite',
    description: 'Ticketed screening 7pm–12:30am. Street food from 14 independent London kitchens.'
  },
  {
    id: 'e31',
    title: 'Panama vs England — The Garden Vauxhall',
    venue: 'The Garden Vauxhall',
    address: 'Fire Club & The Garden, Vauxhall, SW8',
    lat: 51.4855, lng: -0.1228,
    date: '2026-06-27', time: '21:00',
    matchId: 'm39',
    type: 'ticketed', price: '£10',
    vibe: 'Outdoor', capacity: '1000+',
    link: 'https://www.skiddle.com/g/world-cup-2026-screenings-at-the-garden-vauxhall/',
    source: 'Skiddle',
    description: 'Final group game in the massive Vauxhall beer garden. Three LED screens. Late licence.'
  },
  {
    id: 'e32',
    title: 'Panama vs England — Big Penny Social',
    venue: 'Big Penny Social',
    address: '1 Priestley Way, Walthamstow, E17 6AL',
    lat: 51.5850, lng: -0.0425,
    date: '2026-06-27', time: '21:00',
    matchId: 'm39',
    type: 'ticketed', price: '£12',
    vibe: 'Indoor', capacity: '1000+',
    link: 'https://www.bigpennysocial.co.uk',
    source: 'TimeOut London',
    description: 'UK\'s biggest beer hall. Three gigantic screens, 100+ beer taps. The decider.'
  },

  // ══════════════════════════════════════════
  // "ALL MATCHES" VENUES — showing every game
  // Listed under Germany vs Curaçao (Jun 14)
  // as a representative non-England fixture
  // ══════════════════════════════════════════
  {
    id: 'e33',
    title: 'All World Cup Matches — German Kraft Brewery',
    venue: 'German Kraft Brewery at Mercato Metropolitano',
    address: 'Mercato Metropolitano, 42 Newington Causeway, SE1 6DR',
    lat: 51.4960, lng: -0.1005,
    date: '2026-06-14', time: '17:00',
    matchId: 'm5',
    type: 'free', price: null,
    vibe: 'Outdoor', capacity: '700',
    link: 'https://www.germankraftbrewery.com',
    source: 'TimeOut London',
    description: 'Free entry. 700-capacity open-air screening. Every match shown on 20sqm screen. 50+ food stalls. 10 free pints every England or Germany goal.'
  },
  {
    id: 'e34',
    title: 'All World Cup Matches — The Hippodrome',
    venue: 'Paddy\'s Sportsbook at The Hippodrome Casino',
    address: 'Cranbourn St, Leicester Square, WC2H 7JH',
    lat: 51.5112, lng: -0.1282,
    date: '2026-06-14', time: '17:00',
    matchId: 'm5',
    type: 'ticketed', price: 'Free entry',
    vibe: 'Sports Bar', capacity: '500+',
    link: 'https://www.hippodromecasino.com',
    source: 'TimeOut London',
    description: '54 HD screens plus a 10-metre big screen. Every game. Open until 4am. Book a table or walk in.'
  },
  {
    id: 'e35',
    title: 'All World Cup Matches — Mare Street Market',
    venue: 'Mare Street Market',
    address: '117 Mare St, Hackney, E8 4RU',
    lat: 51.5440, lng: -0.0555,
    date: '2026-06-14', time: '17:00',
    matchId: 'm5',
    type: 'free', price: null,
    vibe: 'Indoor', capacity: '500',
    link: 'https://www.marestreetmarket.com',
    source: 'TimeOut London',
    description: 'Every match in 10,000 sq ft space. Big screen plus three outdoor terrace screens. No booking fee.'
  },
  {
    id: 'e36',
    title: 'All World Cup Matches — TOCA Social at The O2',
    venue: 'TOCA Social',
    address: 'The O2, Peninsula Square, Greenwich, SE10 0DX',
    lat: 51.5030, lng: 0.0032,
    date: '2026-06-14', time: '17:00',
    matchId: 'm5',
    type: 'ticketed', price: 'from £5.50',
    vibe: 'Sports Bar', capacity: '600',
    link: 'https://www.tocasocial.com',
    source: 'TimeOut London',
    description: 'Every minute of every match. Standing from £5.50, tables from £10.60, private room for 30 from £583. All include a drink.'
  },
  {
    id: 'e37',
    title: 'All World Cup Matches — Bar Kick Shoreditch',
    venue: 'Bar Kick',
    address: '127 Shoreditch High St, E1 6JE',
    lat: 51.5255, lng: -0.0775,
    date: '2026-06-14', time: '17:00',
    matchId: 'm5',
    type: 'free', price: null,
    vibe: 'Pub', capacity: '200',
    link: 'https://www.cafekick.co.uk',
    source: 'TimeOut London',
    description: 'Free with £10 deposit per booking. 4K screens across two floors. Foosball tables for half-time.'
  },
  {
    id: 'e38',
    title: 'All World Cup Matches — Five Points Taproom',
    venue: 'Five Points Taproom & Courtyard',
    address: '61 Mare St, Hackney, E8 4RG',
    lat: 51.5420, lng: -0.0555,
    date: '2026-06-14', time: '17:00',
    matchId: 'm5',
    type: 'free', price: null,
    vibe: 'Outdoor', capacity: '300',
    link: 'https://fivepointsbrewing.co.uk',
    source: 'Londonist',
    description: 'Enormous outdoor screen with surround sound. 10 screens total. Craft beer. Queue-jump upgrade available.'
  },

  // ══════════════════════════════════════════
  // SPAIN & BELGIUM DAY — Sun 21 Jun
  // ══════════════════════════════════════════
  {
    id: 'e39',
    title: 'World Cup Day Party — Spain & Belgium Screenings',
    venue: 'ONO London at Pop Brixton',
    address: '49 Brixton Station Rd, Brixton, SW9 8PQ',
    lat: 51.4618, lng: -0.1140,
    date: '2026-06-21', time: '15:00',
    matchId: 'm23',
    type: 'ticketed', price: 'TBC',
    vibe: 'Fan Zone', capacity: '500',
    link: 'https://www.eventbrite.co.uk/e/world-cup-day-party-spain-belgium-live-screenings-tickets-1990471526919',
    source: 'Eventbrite',
    description: 'Spain vs Saudi Arabia (5pm BST) then Belgium vs Iran (8pm BST). Giant screens, DJs between games. 3pm–midnight.'
  },

  // ══════════════════════════════════════════
  // FRANCE vs SENEGAL — Tue 16 Jun, 20:00 BST
  // ══════════════════════════════════════════
  {
    id: 'e40',
    title: 'France vs Senegal — German Kraft Brewery',
    venue: 'German Kraft Brewery at Mercato Metropolitano',
    address: 'Mercato Metropolitano, 42 Newington Causeway, SE1 6DR',
    lat: 51.4960, lng: -0.1005,
    date: '2026-06-16', time: '19:00',
    matchId: 'm11',
    type: 'free', price: null,
    vibe: 'Outdoor', capacity: '700',
    link: 'https://www.germankraftbrewery.com',
    source: 'TimeOut London',
    description: 'Free entry. Showing every match on the 20sqm screen. 50+ food stalls surrounding.'
  },
  {
    id: 'e41',
    title: 'France vs Senegal — Mestizo Camden',
    venue: 'Mestizo',
    address: '103 Hampstead Rd, Camden, NW1 3EL',
    lat: 51.5310, lng: -0.1380,
    date: '2026-06-16', time: '19:00',
    matchId: 'm11',
    type: 'free', price: null,
    vibe: 'Restaurant', capacity: '150',
    link: 'https://www.mestizomx.com',
    source: 'Londonist',
    description: "London's unofficial Mexican World Cup HQ. Open as a fan zone during the tournament. Mexican food and drink specials."
  },
];

// Group standings — Mexico 2-0 South Africa (June 11). All others not yet played.
const GROUP_STANDINGS = {
  A: [
    { team: 'MX', p: 1, w: 1, d: 0, l: 0, gd: 2, pts: 3 },
    { team: 'KR', p: 0, w: 0, d: 0, l: 0, gd: 0, pts: 0 },
    { team: 'CZ', p: 0, w: 0, d: 0, l: 0, gd: 0, pts: 0 },
    { team: 'ZA', p: 1, w: 0, d: 0, l: 1, gd: -2, pts: 0 },
  ],
  B: [
    { team: 'CA', p: 0, w: 0, d: 0, l: 0, gd: 0, pts: 0 },
    { team: 'CH', p: 0, w: 0, d: 0, l: 0, gd: 0, pts: 0 },
    { team: 'BA', p: 0, w: 0, d: 0, l: 0, gd: 0, pts: 0 },
    { team: 'QA', p: 0, w: 0, d: 0, l: 0, gd: 0, pts: 0 },
  ],
  C: [
    { team: 'BR', p: 0, w: 0, d: 0, l: 0, gd: 0, pts: 0 },
    { team: 'MA', p: 0, w: 0, d: 0, l: 0, gd: 0, pts: 0 },
    { team: 'SCO', p: 0, w: 0, d: 0, l: 0, gd: 0, pts: 0 },
    { team: 'HT', p: 0, w: 0, d: 0, l: 0, gd: 0, pts: 0 },
  ],
  D: [
    { team: 'US', p: 0, w: 0, d: 0, l: 0, gd: 0, pts: 0 },
    { team: 'TR', p: 0, w: 0, d: 0, l: 0, gd: 0, pts: 0 },
    { team: 'AU', p: 0, w: 0, d: 0, l: 0, gd: 0, pts: 0 },
    { team: 'PY', p: 0, w: 0, d: 0, l: 0, gd: 0, pts: 0 },
  ],
  E: [
    { team: 'DE', p: 0, w: 0, d: 0, l: 0, gd: 0, pts: 0 },
    { team: 'EC', p: 0, w: 0, d: 0, l: 0, gd: 0, pts: 0 },
    { team: 'CI', p: 0, w: 0, d: 0, l: 0, gd: 0, pts: 0 },
    { team: 'CW', p: 0, w: 0, d: 0, l: 0, gd: 0, pts: 0 },
  ],
  F: [
    { team: 'NL', p: 0, w: 0, d: 0, l: 0, gd: 0, pts: 0 },
    { team: 'JP', p: 0, w: 0, d: 0, l: 0, gd: 0, pts: 0 },
    { team: 'SE', p: 0, w: 0, d: 0, l: 0, gd: 0, pts: 0 },
    { team: 'TN', p: 0, w: 0, d: 0, l: 0, gd: 0, pts: 0 },
  ],
  G: [
    { team: 'BE', p: 0, w: 0, d: 0, l: 0, gd: 0, pts: 0 },
    { team: 'EG', p: 0, w: 0, d: 0, l: 0, gd: 0, pts: 0 },
    { team: 'IR', p: 0, w: 0, d: 0, l: 0, gd: 0, pts: 0 },
    { team: 'NZ', p: 0, w: 0, d: 0, l: 0, gd: 0, pts: 0 },
  ],
  H: [
    { team: 'ES', p: 0, w: 0, d: 0, l: 0, gd: 0, pts: 0 },
    { team: 'UY', p: 0, w: 0, d: 0, l: 0, gd: 0, pts: 0 },
    { team: 'SA', p: 0, w: 0, d: 0, l: 0, gd: 0, pts: 0 },
    { team: 'CV', p: 0, w: 0, d: 0, l: 0, gd: 0, pts: 0 },
  ],
  I: [
    { team: 'FR', p: 0, w: 0, d: 0, l: 0, gd: 0, pts: 0 },
    { team: 'SN', p: 0, w: 0, d: 0, l: 0, gd: 0, pts: 0 },
    { team: 'NO', p: 0, w: 0, d: 0, l: 0, gd: 0, pts: 0 },
    { team: 'IQ', p: 0, w: 0, d: 0, l: 0, gd: 0, pts: 0 },
  ],
  J: [
    { team: 'AR', p: 0, w: 0, d: 0, l: 0, gd: 0, pts: 0 },
    { team: 'DZ', p: 0, w: 0, d: 0, l: 0, gd: 0, pts: 0 },
    { team: 'AT', p: 0, w: 0, d: 0, l: 0, gd: 0, pts: 0 },
    { team: 'JO', p: 0, w: 0, d: 0, l: 0, gd: 0, pts: 0 },
  ],
  K: [
    { team: 'PT', p: 0, w: 0, d: 0, l: 0, gd: 0, pts: 0 },
    { team: 'CO', p: 0, w: 0, d: 0, l: 0, gd: 0, pts: 0 },
    { team: 'UZ', p: 0, w: 0, d: 0, l: 0, gd: 0, pts: 0 },
    { team: 'CD', p: 0, w: 0, d: 0, l: 0, gd: 0, pts: 0 },
  ],
  L: [
    { team: 'GB-ENG', p: 0, w: 0, d: 0, l: 0, gd: 0, pts: 0 },
    { team: 'HR', p: 0, w: 0, d: 0, l: 0, gd: 0, pts: 0 },
    { team: 'GH', p: 0, w: 0, d: 0, l: 0, gd: 0, pts: 0 },
    { team: 'PA', p: 0, w: 0, d: 0, l: 0, gd: 0, pts: 0 },
  ],
};
