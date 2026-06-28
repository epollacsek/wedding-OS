export type TzEntry = {
  tz: string
  offset: string
  offsetMinutes: number
  label: string
  cities: string[]
}

export const TIMEZONES: TzEntry[] = [
  { tz: 'Pacific/Midway',       offset: 'GMT-11:00', offsetMinutes: -660, label: 'Midway Island, Samoa',              cities: ['Midway', 'Samoa', 'Pago Pago'] },
  { tz: 'Pacific/Honolulu',     offset: 'GMT-10:00', offsetMinutes: -600, label: 'Hawaii',                            cities: ['Honolulu', 'Hawaii', 'Hilo', 'Pearl City'] },
  { tz: 'America/Anchorage',    offset: 'GMT-09:00', offsetMinutes: -540, label: 'Alaska',                            cities: ['Anchorage', 'Juneau', 'Fairbanks', 'Alaska'] },
  { tz: 'America/Los_Angeles',  offset: 'GMT-08:00', offsetMinutes: -480, label: 'Pacific Time — US & Canada',        cities: ['Los Angeles', 'San Francisco', 'Seattle', 'Vancouver', 'Las Vegas', 'Portland', 'LA', 'SF'] },
  { tz: 'America/Denver',       offset: 'GMT-07:00', offsetMinutes: -420, label: 'Mountain Time — US & Canada',       cities: ['Denver', 'Phoenix', 'Salt Lake City', 'Albuquerque', 'Calgary', 'Edmonton'] },
  { tz: 'America/Chicago',      offset: 'GMT-06:00', offsetMinutes: -360, label: 'Central Time — US & Canada',        cities: ['Chicago', 'Houston', 'Dallas', 'Mexico City', 'Kansas City', 'Minneapolis', 'New Orleans', 'Winnipeg'] },
  { tz: 'America/New_York',     offset: 'GMT-05:00', offsetMinutes: -300, label: 'Eastern Time — US & Canada',        cities: ['New York', 'NYC', 'Miami', 'Atlanta', 'Boston', 'Toronto', 'Philadelphia', 'Washington', 'Detroit', 'Montreal'] },
  { tz: 'America/Halifax',      offset: 'GMT-04:00', offsetMinutes: -240, label: 'Atlantic Time — Canada',            cities: ['Halifax', 'Saint John', 'Moncton', 'Puerto Rico', 'Caracas'] },
  { tz: 'America/Sao_Paulo',    offset: 'GMT-03:00', offsetMinutes: -180, label: 'Brasília Time — Brazil',            cities: ['São Paulo', 'Sao Paulo', 'Rio de Janeiro', 'Rio', 'Brasília', 'Brasilia', 'Fortaleza', 'Salvador', 'Belo Horizonte', 'Curitiba', 'Recife', 'Porto Alegre', 'Manaus'] },
  { tz: 'America/Argentina/Buenos_Aires', offset: 'GMT-03:00', offsetMinutes: -180, label: 'Argentina Time',          cities: ['Buenos Aires', 'Córdoba', 'Rosario', 'Mendoza', 'Argentina'] },
  { tz: 'America/Santiago',     offset: 'GMT-03:00', offsetMinutes: -180, label: 'Chile Time',                        cities: ['Santiago', 'Chile', 'Valparaíso'] },
  { tz: 'Atlantic/Azores',      offset: 'GMT-01:00', offsetMinutes:  -60, label: 'Azores',                            cities: ['Azores', 'Ponta Delgada'] },
  { tz: 'UTC',                  offset: 'GMT+00:00', offsetMinutes:    0, label: 'UTC — Coordinated Universal Time',  cities: ['UTC', 'GMT', 'Universal'] },
  { tz: 'Europe/London',        offset: 'GMT+00:00', offsetMinutes:    0, label: 'London, Dublin, Lisbon',            cities: ['London', 'Dublin', 'Lisbon', 'Edinburgh', 'Cardiff', 'Belfast', 'UK', 'Ireland', 'Portugal'] },
  { tz: 'Europe/Paris',         offset: 'GMT+01:00', offsetMinutes:   60, label: 'Central European Time',             cities: ['Paris', 'Berlin', 'Madrid', 'Rome', 'Amsterdam', 'Brussels', 'Vienna', 'Prague', 'Warsaw', 'Budapest', 'Barcelona', 'Milan', 'Frankfurt', 'Munich', 'Zurich', 'Geneva', 'Stockholm', 'Oslo', 'Copenhagen'] },
  { tz: 'Europe/Athens',        offset: 'GMT+02:00', offsetMinutes:  120, label: 'Eastern European Time',             cities: ['Athens', 'Helsinki', 'Kyiv', 'Bucharest', 'Sofia', 'Riga', 'Vilnius', 'Tallinn', 'Nicosia', 'Cairo', 'Johannesburg', 'Pretoria'] },
  { tz: 'Europe/Moscow',        offset: 'GMT+03:00', offsetMinutes:  180, label: 'Moscow, Istanbul, Nairobi',         cities: ['Moscow', 'Istanbul', 'Nairobi', 'Riyadh', 'Baghdad', 'Kuwait', 'Doha', 'Addis Ababa'] },
  { tz: 'Asia/Dubai',           offset: 'GMT+04:00', offsetMinutes:  240, label: 'Dubai, Abu Dhabi, Muscat',          cities: ['Dubai', 'Abu Dhabi', 'Muscat', 'Tbilisi', 'Yerevan', 'Baku', 'UAE'] },
  { tz: 'Asia/Karachi',         offset: 'GMT+05:00', offsetMinutes:  300, label: 'Karachi, Tashkent, Islamabad',      cities: ['Karachi', 'Islamabad', 'Lahore', 'Tashkent', 'Pakistan'] },
  { tz: 'Asia/Kolkata',         offset: 'GMT+05:30', offsetMinutes:  330, label: 'India Standard Time',               cities: ['Mumbai', 'Delhi', 'Bangalore', 'Kolkata', 'Chennai', 'Hyderabad', 'Pune', 'New Delhi', 'India', 'Bombay'] },
  { tz: 'Asia/Dhaka',           offset: 'GMT+06:00', offsetMinutes:  360, label: 'Dhaka, Almaty',                     cities: ['Dhaka', 'Almaty', 'Bangladesh', 'Chittagong'] },
  { tz: 'Asia/Bangkok',         offset: 'GMT+07:00', offsetMinutes:  420, label: 'Bangkok, Jakarta, Hanoi',           cities: ['Bangkok', 'Jakarta', 'Hanoi', 'Ho Chi Minh', 'Saigon', 'Thailand', 'Vietnam', 'Indonesia', 'Phnom Penh'] },
  { tz: 'Asia/Shanghai',        offset: 'GMT+08:00', offsetMinutes:  480, label: 'Beijing, Shanghai, Singapore',      cities: ['Shanghai', 'Beijing', 'Singapore', 'Hong Kong', 'Taipei', 'Kuala Lumpur', 'Perth', 'China', 'Taiwan', 'Malaysia'] },
  { tz: 'Asia/Tokyo',           offset: 'GMT+09:00', offsetMinutes:  540, label: 'Tokyo, Seoul, Osaka',               cities: ['Tokyo', 'Osaka', 'Seoul', 'Sapporo', 'Japan', 'Korea'] },
  { tz: 'Australia/Sydney',     offset: 'GMT+10:00', offsetMinutes:  600, label: 'Sydney, Melbourne, Brisbane',       cities: ['Sydney', 'Melbourne', 'Brisbane', 'Canberra', 'Adelaide', 'Australia'] },
  { tz: 'Pacific/Auckland',     offset: 'GMT+12:00', offsetMinutes:  720, label: 'Auckland, Wellington, Fiji',        cities: ['Auckland', 'Wellington', 'Christchurch', 'Fiji', 'New Zealand', 'Suva'] },
]

export function searchTimezones(query: string): TzEntry[] {
  if (!query) return TIMEZONES
  const q = query.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
  return TIMEZONES.filter(t =>
    t.cities.some(c => c.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').includes(q)) ||
    t.label.toLowerCase().includes(q) ||
    t.tz.toLowerCase().includes(q) ||
    t.offset.toLowerCase().includes(q)
  )
}
