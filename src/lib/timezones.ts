export type TzEntry = {
  tz: string
  offset: string
  offsetMinutes: number
  city: string
  region: string
  aliases: string[]
}

// Cities whose popular name differs from the IANA timezone city
const ALIASES: Record<string, string[]> = {
  'Asia/Jerusalem':          ['Tel Aviv', 'Jerusalem', 'Haifa', 'Israel'],
  'Asia/Kolkata':            ['Mumbai', 'Bombay', 'Delhi', 'New Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata', 'India'],
  'Asia/Shanghai':           ['Beijing', 'Shanghai', 'China', 'Shenzhen', 'Guangzhou', 'Chengdu'],
  'Asia/Tokyo':              ['Tokyo', 'Osaka', 'Kyoto', 'Yokohama', 'Japan'],
  'Asia/Seoul':              ['Seoul', 'Busan', 'Korea'],
  'Asia/Singapore':          ['Singapore', 'Kuala Lumpur', 'KL', 'Malaysia'],
  'Asia/Hong_Kong':          ['Hong Kong', 'HK'],
  'Asia/Taipei':             ['Taipei', 'Taiwan'],
  'Asia/Bangkok':            ['Bangkok', 'Thailand', 'Ho Chi Minh', 'Saigon', 'Vietnam', 'Hanoi', 'Jakarta', 'Indonesia', 'Phnom Penh'],
  'Asia/Dubai':              ['Dubai', 'Abu Dhabi', 'UAE', 'Muscat', 'Oman'],
  'Asia/Karachi':            ['Karachi', 'Islamabad', 'Lahore', 'Pakistan'],
  'Asia/Tehran':             ['Tehran', 'Iran'],
  'Asia/Riyadh':             ['Riyadh', 'Jeddah', 'Saudi Arabia', 'Mecca', 'Medina'],
  'Asia/Baghdad':            ['Baghdad', 'Iraq'],
  'Asia/Beirut':             ['Beirut', 'Lebanon'],
  'Asia/Amman':              ['Amman', 'Jordan'],
  'Asia/Damascus':           ['Damascus', 'Syria'],
  'Asia/Kabul':              ['Kabul', 'Afghanistan'],
  'Asia/Dhaka':              ['Dhaka', 'Chittagong', 'Bangladesh'],
  'Asia/Colombo':            ['Colombo', 'Sri Lanka'],
  'Asia/Yangon':             ['Yangon', 'Rangoon', 'Myanmar', 'Burma'],
  'Asia/Kathmandu':          ['Kathmandu', 'Nepal'],
  'Asia/Almaty':             ['Almaty', 'Kazakhstan'],
  'Asia/Tashkent':           ['Tashkent', 'Uzbekistan'],
  'Asia/Tbilisi':            ['Tbilisi', 'Georgia'],
  'Asia/Baku':               ['Baku', 'Azerbaijan'],
  'Asia/Yerevan':            ['Yerevan', 'Armenia'],
  'Asia/Nicosia':            ['Nicosia', 'Cyprus'],
  'Asia/Manila':             ['Manila', 'Philippines'],
  'Asia/Jakarta':            ['Jakarta', 'Bali', 'Surabaya'],
  'Asia/Makassar':           ['Makassar', 'Bali', 'Lombok'],
  'Asia/Jayapura':           ['Papua', 'Jayapura'],
  'Asia/Ulaanbaatar':        ['Ulaanbaatar', 'Mongolia'],
  'Asia/Vladivostok':        ['Vladivostok', 'Russia Far East'],
  'Asia/Magadan':            ['Magadan', 'Siberia'],
  'Europe/London':           ['London', 'UK', 'England', 'Edinburgh', 'Dublin', 'Ireland', 'Cardiff', 'Belfast'],
  'Europe/Lisbon':           ['Lisbon', 'Porto', 'Portugal'],
  'Europe/Paris':            ['Paris', 'France'],
  'Europe/Berlin':           ['Berlin', 'Munich', 'Frankfurt', 'Hamburg', 'Germany', 'Cologne'],
  'Europe/Rome':             ['Rome', 'Milan', 'Italy', 'Naples', 'Venice'],
  'Europe/Madrid':           ['Madrid', 'Barcelona', 'Spain', 'Seville'],
  'Europe/Amsterdam':        ['Amsterdam', 'Netherlands', 'Rotterdam'],
  'Europe/Brussels':         ['Brussels', 'Belgium', 'Antwerp'],
  'Europe/Zurich':           ['Zurich', 'Geneva', 'Bern', 'Switzerland'],
  'Europe/Vienna':           ['Vienna', 'Austria'],
  'Europe/Stockholm':        ['Stockholm', 'Sweden', 'Gothenburg'],
  'Europe/Oslo':             ['Oslo', 'Norway', 'Bergen'],
  'Europe/Copenhagen':       ['Copenhagen', 'Denmark'],
  'Europe/Helsinki':         ['Helsinki', 'Finland'],
  'Europe/Warsaw':           ['Warsaw', 'Krakow', 'Poland'],
  'Europe/Prague':           ['Prague', 'Czech Republic', 'Czechia'],
  'Europe/Budapest':         ['Budapest', 'Hungary'],
  'Europe/Bucharest':        ['Bucharest', 'Romania'],
  'Europe/Sofia':            ['Sofia', 'Bulgaria'],
  'Europe/Athens':           ['Athens', 'Thessaloniki', 'Greece'],
  'Europe/Istanbul':         ['Istanbul', 'Ankara', 'Turkey', 'Izmir'],
  'Europe/Moscow':           ['Moscow', 'Saint Petersburg', 'St Petersburg', 'Russia'],
  'Europe/Kiev':             ['Kyiv', 'Kiev', 'Ukraine'],
  'Europe/Riga':             ['Riga', 'Latvia'],
  'Europe/Tallinn':          ['Tallinn', 'Estonia'],
  'Europe/Vilnius':          ['Vilnius', 'Lithuania'],
  'Europe/Minsk':            ['Minsk', 'Belarus'],
  'Europe/Belgrade':         ['Belgrade', 'Serbia', 'Zagreb', 'Croatia', 'Ljubljana', 'Slovenia'],
  'Europe/Sarajevo':         ['Sarajevo', 'Bosnia'],
  'Europe/Skopje':           ['Skopje', 'North Macedonia'],
  'Europe/Tirane':           ['Tirane', 'Albania'],
  'Europe/Dublin':           ['Dublin', 'Ireland', 'Cork'],
  'Europe/Reykjavik':        ['Reykjavik', 'Iceland'],
  'Africa/Cairo':            ['Cairo', 'Egypt', 'Alexandria'],
  'Africa/Johannesburg':     ['Johannesburg', 'Cape Town', 'Durban', 'South Africa', 'Pretoria'],
  'Africa/Nairobi':          ['Nairobi', 'Kenya', 'Addis Ababa', 'Ethiopia', 'Dar es Salaam', 'Tanzania'],
  'Africa/Lagos':            ['Lagos', 'Abuja', 'Nigeria', 'Accra', 'Ghana'],
  'Africa/Casablanca':       ['Casablanca', 'Rabat', 'Morocco'],
  'Africa/Tunis':            ['Tunis', 'Tunisia'],
  'Africa/Algiers':          ['Algiers', 'Algeria'],
  'Africa/Tripoli':          ['Tripoli', 'Libya'],
  'Africa/Khartoum':         ['Khartoum', 'Sudan'],
  'Africa/Luanda':           ['Luanda', 'Angola'],
  'Africa/Kampala':          ['Kampala', 'Uganda'],
  'Africa/Dar_es_Salaam':    ['Dar es Salaam', 'Tanzania'],
  'Africa/Abidjan':          ['Abidjan', 'Ivory Coast'],
  'Africa/Dakar':            ['Dakar', 'Senegal'],
  'America/New_York':        ['New York', 'NYC', 'Miami', 'Atlanta', 'Boston', 'Philadelphia', 'Washington DC', 'Detroit', 'Toronto', 'Montreal', 'Eastern Time'],
  'America/Chicago':         ['Chicago', 'Houston', 'Dallas', 'Minneapolis', 'New Orleans', 'Kansas City', 'Mexico City', 'Central Time'],
  'America/Denver':          ['Denver', 'Phoenix', 'Salt Lake City', 'Albuquerque', 'Mountain Time'],
  'America/Los_Angeles':     ['Los Angeles', 'LA', 'San Francisco', 'SF', 'Seattle', 'Portland', 'Las Vegas', 'Vancouver', 'Pacific Time'],
  'America/Anchorage':       ['Anchorage', 'Juneau', 'Alaska'],
  'America/Halifax':         ['Halifax', 'Atlantic Time', 'Nova Scotia'],
  'America/Toronto':         ['Toronto', 'Ottawa', 'Hamilton'],
  'America/Vancouver':       ['Vancouver', 'Victoria', 'British Columbia'],
  'America/Sao_Paulo':       ['São Paulo', 'Sao Paulo', 'Rio de Janeiro', 'Rio', 'Brasília', 'Brasilia', 'Curitiba', 'Porto Alegre', 'Fortaleza', 'Recife', 'Salvador', 'Belo Horizonte', 'Brazil'],
  'America/Manaus':          ['Manaus', 'Amazonas'],
  'America/Fortaleza':       ['Fortaleza', 'Recife', 'Maceio', 'Northeast Brazil'],
  'America/Belem':           ['Belém', 'Belem', 'Para'],
  'America/Argentina/Buenos_Aires': ['Buenos Aires', 'Córdoba', 'Rosario', 'Mendoza', 'Argentina'],
  'America/Santiago':        ['Santiago', 'Valparaiso', 'Chile'],
  'America/Lima':            ['Lima', 'Peru', 'Bogota', 'Colombia', 'Quito', 'Ecuador'],
  'America/Bogota':          ['Bogota', 'Medellín', 'Medellin', 'Colombia', 'Cali'],
  'America/Caracas':         ['Caracas', 'Venezuela'],
  'America/La_Paz':          ['La Paz', 'Bolivia'],
  'America/Asuncion':        ['Asuncion', 'Paraguay'],
  'America/Montevideo':      ['Montevideo', 'Uruguay'],
  'America/Guayaquil':       ['Guayaquil', 'Quito', 'Ecuador'],
  'America/Mexico_City':     ['Mexico City', 'CDMX', 'Guadalajara', 'Monterrey', 'Mexico'],
  'America/Panama':          ['Panama City', 'Panama'],
  'America/Costa_Rica':      ['San Jose', 'Costa Rica'],
  'America/Guatemala':       ['Guatemala City', 'Guatemala'],
  'America/Havana':          ['Havana', 'Cuba'],
  'America/Jamaica':         ['Kingston', 'Jamaica'],
  'America/Puerto_Rico':     ['San Juan', 'Puerto Rico'],
  'America/Santo_Domingo':   ['Santo Domingo', 'Dominican Republic'],
  'Pacific/Honolulu':        ['Honolulu', 'Hawaii', 'Maui', 'Oahu'],
  'Pacific/Auckland':        ['Auckland', 'Wellington', 'Christchurch', 'New Zealand'],
  'Pacific/Fiji':            ['Suva', 'Fiji'],
  'Pacific/Tahiti':          ['Tahiti', 'Papeete', 'French Polynesia'],
  'Pacific/Sydney':          ['Sydney', 'Melbourne', 'Canberra', 'Australia East'],
  'Australia/Sydney':        ['Sydney', 'Melbourne', 'Canberra', 'Wollongong'],
  'Australia/Brisbane':      ['Brisbane', 'Gold Coast', 'Queensland'],
  'Australia/Adelaide':      ['Adelaide', 'South Australia'],
  'Australia/Perth':         ['Perth', 'Western Australia'],
  'Australia/Darwin':        ['Darwin', 'Northern Territory'],
  'UTC':                     ['UTC', 'GMT', 'Universal'],
}

function getOffsetString(tz: string): { offset: string; offsetMinutes: number } {
  try {
    const now = new Date()
    const parts = new Intl.DateTimeFormat('en', {
      timeZone: tz,
      timeZoneName: 'shortOffset',
    }).formatToParts(now)
    const raw = parts.find(p => p.type === 'timeZoneName')?.value ?? 'GMT+0'
    const match = raw.match(/GMT([+-])(\d+)(?::(\d+))?/)
    if (!match) return { offset: 'GMT+00:00', offsetMinutes: 0 }
    const sign = match[1] === '+' ? 1 : -1
    const h = parseInt(match[2], 10)
    const m = parseInt(match[3] ?? '0', 10)
    const offsetMinutes = sign * (h * 60 + m)
    const pad = (n: number) => n.toString().padStart(2, '0')
    return { offset: `GMT${match[1]}${pad(h)}:${pad(m)}`, offsetMinutes }
  } catch {
    return { offset: 'GMT+00:00', offsetMinutes: 0 }
  }
}

let _cache: TzEntry[] | null = null

export function getAllTimezones(): TzEntry[] {
  if (_cache) return _cache

  const raw: string[] = (typeof Intl !== 'undefined' && 'supportedValuesOf' in Intl)
    ? (Intl as unknown as { supportedValuesOf: (k: string) => string[] }).supportedValuesOf('timeZone')
    : Object.keys(ALIASES)

  _cache = raw.map(tz => {
    const { offset, offsetMinutes } = getOffsetString(tz)
    const parts = tz.split('/')
    const city = (parts[parts.length - 1] ?? tz).replace(/_/g, ' ')
    const region = parts[0] ?? 'Other'
    const aliases = ALIASES[tz] ?? []
    return { tz, offset, offsetMinutes, city, region, aliases }
  }).sort((a, b) => a.offsetMinutes - b.offsetMinutes || a.city.localeCompare(b.city))

  return _cache
}

export function searchTimezones(query: string): TzEntry[] {
  const all = getAllTimezones()
  if (!query.trim()) return all

  const q = query.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')

  return all.filter(t => {
    const haystack = [
      t.city, t.tz, t.offset, t.region, ...t.aliases
    ].join(' ').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    return haystack.includes(q)
  })
}

// Keep TzEntry export for consumers
export type { TzEntry as default }
