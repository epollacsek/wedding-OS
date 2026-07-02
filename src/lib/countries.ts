export type Country = {
  code: string
  name: string    // local name (e.g. "Brasil")
  search: string  // english name (e.g. "Brazil")
  dial: string    // e.g. "+55"
  digits: number
  format: string  // e.g. "(##) #####-####"
}

export const COUNTRIES: Country[] = [
  { code: 'AF', name: 'Afghanistan', search: 'Afghanistan', dial: '+93', digits: 9, format: '### ### ###' },
  { code: 'AL', name: 'Shqipëria', search: 'Albania', dial: '+355', digits: 9, format: '### ### ###' },
  { code: 'DZ', name: 'الجزائر', search: 'Algeria', dial: '+213', digits: 9, format: '### ### ###' },
  { code: 'AD', name: 'Andorra', search: 'Andorra', dial: '+376', digits: 6, format: '### ###' },
  { code: 'AO', name: 'Angola', search: 'Angola', dial: '+244', digits: 9, format: '### ### ###' },
  { code: 'AG', name: 'Antigua and Barbuda', search: 'Antigua', dial: '+1', digits: 10, format: '(###) ###-####' },
  { code: 'AR', name: 'Argentina', search: 'Argentina', dial: '+54', digits: 10, format: '## ####-####' },
  { code: 'AM', name: 'Հայաստան', search: 'Armenia', dial: '+374', digits: 8, format: '## ######' },
  { code: 'AU', name: 'Australia', search: 'Australia', dial: '+61', digits: 9, format: '### ### ###' },
  { code: 'AT', name: 'Österreich', search: 'Austria', dial: '+43', digits: 10, format: '#### ######' },
  { code: 'AZ', name: 'Azərbaycan', search: 'Azerbaijan', dial: '+994', digits: 9, format: '## ### ## ##' },
  { code: 'BS', name: 'Bahamas', search: 'Bahamas', dial: '+1', digits: 10, format: '(###) ###-####' },
  { code: 'BH', name: 'البحرين', search: 'Bahrain', dial: '+973', digits: 8, format: '#### ####' },
  { code: 'BD', name: 'বাংলাদেশ', search: 'Bangladesh', dial: '+880', digits: 10, format: '#### ######' },
  { code: 'BB', name: 'Barbados', search: 'Barbados', dial: '+1', digits: 10, format: '(###) ###-####' },
  { code: 'BY', name: 'Беларусь', search: 'Belarus', dial: '+375', digits: 9, format: '## ### ## ##' },
  { code: 'BE', name: 'België', search: 'Belgium', dial: '+32', digits: 9, format: '### ## ## ##' },
  { code: 'BZ', name: 'Belize', search: 'Belize', dial: '+501', digits: 7, format: '### ####' },
  { code: 'BJ', name: 'Bénin', search: 'Benin', dial: '+229', digits: 8, format: '## ## ## ##' },
  { code: 'BT', name: 'འབྲུག', search: 'Bhutan', dial: '+975', digits: 8, format: '## ######' },
  { code: 'BO', name: 'Bolivia', search: 'Bolivia', dial: '+591', digits: 8, format: '#### ####' },
  { code: 'BA', name: 'Bosna i Hercegovina', search: 'Bosnia', dial: '+387', digits: 8, format: '## ### ###' },
  { code: 'BW', name: 'Botswana', search: 'Botswana', dial: '+267', digits: 8, format: '## ### ###' },
  { code: 'BR', name: 'Brasil', search: 'Brazil', dial: '+55', digits: 11, format: '(##) #####-####' },
  { code: 'BN', name: 'Brunei', search: 'Brunei', dial: '+673', digits: 7, format: '### ####' },
  { code: 'BG', name: 'България', search: 'Bulgaria', dial: '+359', digits: 9, format: '### ### ###' },
  { code: 'BF', name: 'Burkina Faso', search: 'Burkina Faso', dial: '+226', digits: 8, format: '## ## ## ##' },
  { code: 'BI', name: 'Burundi', search: 'Burundi', dial: '+257', digits: 8, format: '## ## ## ##' },
  { code: 'CV', name: 'Cabo Verde', search: 'Cape Verde', dial: '+238', digits: 7, format: '### ####' },
  { code: 'KH', name: 'កម្ពុជា', search: 'Cambodia', dial: '+855', digits: 9, format: '## ### ####' },
  { code: 'CM', name: 'Cameroun', search: 'Cameroon', dial: '+237', digits: 9, format: '### ## ## ##' },
  { code: 'CA', name: 'Canada', search: 'Canada', dial: '+1', digits: 10, format: '(###) ###-####' },
  { code: 'CF', name: 'République Centrafricaine', search: 'Central African Republic', dial: '+236', digits: 8, format: '## ## ## ##' },
  { code: 'TD', name: 'Tchad', search: 'Chad', dial: '+235', digits: 8, format: '## ## ## ##' },
  { code: 'CL', name: 'Chile', search: 'Chile', dial: '+56', digits: 9, format: '# #### ####' },
  { code: 'CN', name: '中国', search: 'China', dial: '+86', digits: 11, format: '### #### ####' },
  { code: 'CO', name: 'Colombia', search: 'Colombia', dial: '+57', digits: 10, format: '### ### ####' },
  { code: 'KM', name: 'Comores', search: 'Comoros', dial: '+269', digits: 7, format: '### ####' },
  { code: 'CG', name: 'Congo', search: 'Congo', dial: '+242', digits: 9, format: '## ### ####' },
  { code: 'CR', name: 'Costa Rica', search: 'Costa Rica', dial: '+506', digits: 8, format: '#### ####' },
  { code: 'HR', name: 'Hrvatska', search: 'Croatia', dial: '+385', digits: 9, format: '## ### ####' },
  { code: 'CU', name: 'Cuba', search: 'Cuba', dial: '+53', digits: 8, format: '# ### ####' },
  { code: 'CY', name: 'Κύπρος', search: 'Cyprus', dial: '+357', digits: 8, format: '## ######' },
  { code: 'CZ', name: 'Česká republika', search: 'Czech Republic', dial: '+420', digits: 9, format: '### ### ###' },
  { code: 'DK', name: 'Danmark', search: 'Denmark', dial: '+45', digits: 8, format: '## ## ## ##' },
  { code: 'DJ', name: 'Djibouti', search: 'Djibouti', dial: '+253', digits: 8, format: '## ## ## ##' },
  { code: 'DM', name: 'Dominica', search: 'Dominica', dial: '+1', digits: 10, format: '(###) ###-####' },
  { code: 'DO', name: 'República Dominicana', search: 'Dominican Republic', dial: '+1', digits: 10, format: '(###) ###-####' },
  { code: 'EC', name: 'Ecuador', search: 'Ecuador', dial: '+593', digits: 9, format: '## ### ####' },
  { code: 'EG', name: 'مصر', search: 'Egypt', dial: '+20', digits: 10, format: '### #### ###' },
  { code: 'SV', name: 'El Salvador', search: 'El Salvador', dial: '+503', digits: 8, format: '#### ####' },
  { code: 'GQ', name: 'Guinea Ecuatorial', search: 'Equatorial Guinea', dial: '+240', digits: 9, format: '### ### ###' },
  { code: 'ER', name: 'ኤርትራ', search: 'Eritrea', dial: '+291', digits: 7, format: '# ### ###' },
  { code: 'EE', name: 'Eesti', search: 'Estonia', dial: '+372', digits: 8, format: '#### ####' },
  { code: 'SZ', name: 'eSwatini', search: 'Eswatini', dial: '+268', digits: 8, format: '## ## ####' },
  { code: 'ET', name: 'ኢትዮጵያ', search: 'Ethiopia', dial: '+251', digits: 9, format: '## ### ####' },
  { code: 'FJ', name: 'Fiji', search: 'Fiji', dial: '+679', digits: 7, format: '### ####' },
  { code: 'FI', name: 'Suomi', search: 'Finland', dial: '+358', digits: 9, format: '## ### ####' },
  { code: 'FR', name: 'France', search: 'France', dial: '+33', digits: 9, format: '# ## ## ## ##' },
  { code: 'GA', name: 'Gabon', search: 'Gabon', dial: '+241', digits: 8, format: '# ## ## ##' },
  { code: 'GM', name: 'Gambia', search: 'Gambia', dial: '+220', digits: 7, format: '### ####' },
  { code: 'GE', name: 'საქართველო', search: 'Georgia', dial: '+995', digits: 9, format: '### ### ###' },
  { code: 'DE', name: 'Deutschland', search: 'Germany', dial: '+49', digits: 10, format: '#### ######' },
  { code: 'GH', name: 'Ghana', search: 'Ghana', dial: '+233', digits: 9, format: '## ### ####' },
  { code: 'GR', name: 'Ελλάδα', search: 'Greece', dial: '+30', digits: 10, format: '### ### ####' },
  { code: 'GD', name: 'Grenada', search: 'Grenada', dial: '+1', digits: 10, format: '(###) ###-####' },
  { code: 'GT', name: 'Guatemala', search: 'Guatemala', dial: '+502', digits: 8, format: '#### ####' },
  { code: 'GN', name: 'Guinée', search: 'Guinea', dial: '+224', digits: 9, format: '### ## ## ##' },
  { code: 'GW', name: 'Guiné-Bissau', search: 'Guinea-Bissau', dial: '+245', digits: 7, format: '### ####' },
  { code: 'GY', name: 'Guyana', search: 'Guyana', dial: '+592', digits: 7, format: '### ####' },
  { code: 'HT', name: 'Haïti', search: 'Haiti', dial: '+509', digits: 8, format: '## ## ####' },
  { code: 'HN', name: 'Honduras', search: 'Honduras', dial: '+504', digits: 8, format: '#### ####' },
  { code: 'HU', name: 'Magyarország', search: 'Hungary', dial: '+36', digits: 9, format: '## ### ####' },
  { code: 'IS', name: 'Ísland', search: 'Iceland', dial: '+354', digits: 7, format: '### ####' },
  { code: 'IN', name: 'भारत', search: 'India', dial: '+91', digits: 10, format: '##### #####' },
  { code: 'ID', name: 'Indonesia', search: 'Indonesia', dial: '+62', digits: 10, format: '### #### ####' },
  { code: 'IR', name: 'ایران', search: 'Iran', dial: '+98', digits: 10, format: '### ### ####' },
  { code: 'IQ', name: 'العراق', search: 'Iraq', dial: '+964', digits: 10, format: '### ### ####' },
  { code: 'IE', name: 'Éire', search: 'Ireland', dial: '+353', digits: 9, format: '## ### ####' },
  { code: 'IL', name: 'ישראל', search: 'Israel', dial: '+972', digits: 9, format: '##-###-####' },
  { code: 'IT', name: 'Italia', search: 'Italy', dial: '+39', digits: 10, format: '### ### ####' },
  { code: 'JM', name: 'Jamaica', search: 'Jamaica', dial: '+1', digits: 10, format: '(###) ###-####' },
  { code: 'JP', name: '日本', search: 'Japan', dial: '+81', digits: 10, format: '##-####-####' },
  { code: 'JO', name: 'الأردن', search: 'Jordan', dial: '+962', digits: 9, format: '# #### ####' },
  { code: 'KZ', name: 'Қазақстан', search: 'Kazakhstan', dial: '+7', digits: 10, format: '### ###-##-##' },
  { code: 'KE', name: 'Kenya', search: 'Kenya', dial: '+254', digits: 9, format: '### ### ###' },
  { code: 'KW', name: 'الكويت', search: 'Kuwait', dial: '+965', digits: 8, format: '#### ####' },
  { code: 'KG', name: 'Кыргызстан', search: 'Kyrgyzstan', dial: '+996', digits: 9, format: '### ### ###' },
  { code: 'LA', name: 'ລາວ', search: 'Laos', dial: '+856', digits: 9, format: '## ### ####' },
  { code: 'LV', name: 'Latvija', search: 'Latvia', dial: '+371', digits: 8, format: '## ### ###' },
  { code: 'LB', name: 'لبنان', search: 'Lebanon', dial: '+961', digits: 8, format: '## ### ###' },
  { code: 'LS', name: 'Lesotho', search: 'Lesotho', dial: '+266', digits: 8, format: '## ## ####' },
  { code: 'LR', name: 'Liberia', search: 'Liberia', dial: '+231', digits: 8, format: '## ### ###' },
  { code: 'LY', name: 'ليبيا', search: 'Libya', dial: '+218', digits: 9, format: '## ### ####' },
  { code: 'LI', name: 'Liechtenstein', search: 'Liechtenstein', dial: '+423', digits: 7, format: '### ####' },
  { code: 'LT', name: 'Lietuva', search: 'Lithuania', dial: '+370', digits: 8, format: '### ## ###' },
  { code: 'LU', name: 'Lëtzebuerg', search: 'Luxembourg', dial: '+352', digits: 9, format: '### ### ###' },
  { code: 'MG', name: 'Madagasikara', search: 'Madagascar', dial: '+261', digits: 9, format: '## ## ### ##' },
  { code: 'MW', name: 'Malawi', search: 'Malawi', dial: '+265', digits: 9, format: '### ### ###' },
  { code: 'MY', name: 'Malaysia', search: 'Malaysia', dial: '+60', digits: 9, format: '##-#### ####' },
  { code: 'MV', name: 'ދިވެހިރާއްޖެ', search: 'Maldives', dial: '+960', digits: 7, format: '### ####' },
  { code: 'ML', name: 'Mali', search: 'Mali', dial: '+223', digits: 8, format: '## ## ## ##' },
  { code: 'MT', name: 'Malta', search: 'Malta', dial: '+356', digits: 8, format: '#### ####' },
  { code: 'MR', name: 'موريتانيا', search: 'Mauritania', dial: '+222', digits: 8, format: '## ## ## ##' },
  { code: 'MU', name: 'Maurice', search: 'Mauritius', dial: '+230', digits: 8, format: '#### ####' },
  { code: 'MX', name: 'México', search: 'Mexico', dial: '+52', digits: 10, format: '## #### ####' },
  { code: 'MD', name: 'Moldova', search: 'Moldova', dial: '+373', digits: 8, format: '### ## ###' },
  { code: 'MC', name: 'Monaco', search: 'Monaco', dial: '+377', digits: 8, format: '## ## ## ##' },
  { code: 'MN', name: 'Монгол', search: 'Mongolia', dial: '+976', digits: 8, format: '#### ####' },
  { code: 'ME', name: 'Crna Gora', search: 'Montenegro', dial: '+382', digits: 8, format: '## ### ###' },
  { code: 'MA', name: 'المغرب', search: 'Morocco', dial: '+212', digits: 9, format: '### ### ###' },
  { code: 'MZ', name: 'Moçambique', search: 'Mozambique', dial: '+258', digits: 9, format: '## ### ####' },
  { code: 'MM', name: 'မြန်မာ', search: 'Myanmar', dial: '+95', digits: 9, format: '## ### ####' },
  { code: 'NA', name: 'Namibia', search: 'Namibia', dial: '+264', digits: 9, format: '## ### ####' },
  { code: 'NP', name: 'नेपाल', search: 'Nepal', dial: '+977', digits: 10, format: '### ### ####' },
  { code: 'NL', name: 'Nederland', search: 'Netherlands', dial: '+31', digits: 9, format: '# ########' },
  { code: 'NZ', name: 'New Zealand', search: 'New Zealand', dial: '+64', digits: 9, format: '## ### ####' },
  { code: 'NI', name: 'Nicaragua', search: 'Nicaragua', dial: '+505', digits: 8, format: '#### ####' },
  { code: 'NE', name: 'Niger', search: 'Niger', dial: '+227', digits: 8, format: '## ## ## ##' },
  { code: 'NG', name: 'Nigeria', search: 'Nigeria', dial: '+234', digits: 10, format: '### ### ####' },
  { code: 'MK', name: 'Северна Македонија', search: 'North Macedonia', dial: '+389', digits: 8, format: '## ### ###' },
  { code: 'NO', name: 'Norge', search: 'Norway', dial: '+47', digits: 8, format: '### ## ###' },
  { code: 'OM', name: 'عُمان', search: 'Oman', dial: '+968', digits: 8, format: '#### ####' },
  { code: 'PK', name: 'پاکستان', search: 'Pakistan', dial: '+92', digits: 10, format: '### #######' },
  { code: 'PW', name: 'Palau', search: 'Palau', dial: '+680', digits: 7, format: '### ####' },
  { code: 'PA', name: 'Panamá', search: 'Panama', dial: '+507', digits: 8, format: '#### ####' },
  { code: 'PG', name: 'Papua New Guinea', search: 'Papua New Guinea', dial: '+675', digits: 8, format: '#### ####' },
  { code: 'PY', name: 'Paraguay', search: 'Paraguay', dial: '+595', digits: 9, format: '### ### ###' },
  { code: 'PE', name: 'Perú', search: 'Peru', dial: '+51', digits: 9, format: '### ### ###' },
  { code: 'PH', name: 'Pilipinas', search: 'Philippines', dial: '+63', digits: 10, format: '### ### ####' },
  { code: 'PL', name: 'Polska', search: 'Poland', dial: '+48', digits: 9, format: '### ### ###' },
  { code: 'PT', name: 'Portugal', search: 'Portugal', dial: '+351', digits: 9, format: '### ### ###' },
  { code: 'QA', name: 'قطر', search: 'Qatar', dial: '+974', digits: 8, format: '#### ####' },
  { code: 'RO', name: 'România', search: 'Romania', dial: '+40', digits: 9, format: '### ### ###' },
  { code: 'RU', name: 'Россия', search: 'Russia', dial: '+7', digits: 10, format: '### ###-##-##' },
  { code: 'RW', name: 'Rwanda', search: 'Rwanda', dial: '+250', digits: 9, format: '### ### ###' },
  { code: 'SA', name: 'المملكة العربية السعودية', search: 'Saudi Arabia', dial: '+966', digits: 9, format: '## ### ####' },
  { code: 'SN', name: 'Sénégal', search: 'Senegal', dial: '+221', digits: 9, format: '## ### ## ##' },
  { code: 'RS', name: 'Србија', search: 'Serbia', dial: '+381', digits: 9, format: '## ### ####' },
  { code: 'SC', name: 'Seychelles', search: 'Seychelles', dial: '+248', digits: 7, format: '### ####' },
  { code: 'SL', name: 'Sierra Leone', search: 'Sierra Leone', dial: '+232', digits: 8, format: '## ######' },
  { code: 'SG', name: 'Singapore', search: 'Singapore', dial: '+65', digits: 8, format: '#### ####' },
  { code: 'SK', name: 'Slovensko', search: 'Slovakia', dial: '+421', digits: 9, format: '### ### ###' },
  { code: 'SI', name: 'Slovenija', search: 'Slovenia', dial: '+386', digits: 8, format: '## ### ###' },
  { code: 'SO', name: 'Soomaaliya', search: 'Somalia', dial: '+252', digits: 9, format: '## ### ####' },
  { code: 'ZA', name: 'South Africa', search: 'South Africa', dial: '+27', digits: 9, format: '## ### ####' },
  { code: 'SS', name: 'South Sudan', search: 'South Sudan', dial: '+211', digits: 9, format: '## ### ####' },
  { code: 'ES', name: 'España', search: 'Spain', dial: '+34', digits: 9, format: '### ### ###' },
  { code: 'LK', name: 'ශ්‍රී ලංකාව', search: 'Sri Lanka', dial: '+94', digits: 9, format: '## ### ####' },
  { code: 'SD', name: 'السودان', search: 'Sudan', dial: '+249', digits: 9, format: '## ### ####' },
  { code: 'SR', name: 'Suriname', search: 'Suriname', dial: '+597', digits: 7, format: '### ####' },
  { code: 'SE', name: 'Sverige', search: 'Sweden', dial: '+46', digits: 9, format: '## ### ## ##' },
  { code: 'CH', name: 'Schweiz', search: 'Switzerland', dial: '+41', digits: 9, format: '## ### ## ##' },
  { code: 'SY', name: 'سوريا', search: 'Syria', dial: '+963', digits: 9, format: '## #### ###' },
  { code: 'TW', name: '台灣', search: 'Taiwan', dial: '+886', digits: 9, format: '### ### ###' },
  { code: 'TJ', name: 'Тоҷикистон', search: 'Tajikistan', dial: '+992', digits: 9, format: '## ### ####' },
  { code: 'TZ', name: 'Tanzania', search: 'Tanzania', dial: '+255', digits: 9, format: '### ### ###' },
  { code: 'TH', name: 'ประเทศไทย', search: 'Thailand', dial: '+66', digits: 9, format: '## ### ####' },
  { code: 'TL', name: 'Timor-Leste', search: 'Timor-Leste', dial: '+670', digits: 8, format: '#### ####' },
  { code: 'TG', name: 'Togo', search: 'Togo', dial: '+228', digits: 8, format: '## ## ## ##' },
  { code: 'TO', name: 'Tonga', search: 'Tonga', dial: '+676', digits: 7, format: '### ####' },
  { code: 'TT', name: 'Trinidad and Tobago', search: 'Trinidad', dial: '+1', digits: 10, format: '(###) ###-####' },
  { code: 'TN', name: 'تونس', search: 'Tunisia', dial: '+216', digits: 8, format: '## ### ###' },
  { code: 'TR', name: 'Türkiye', search: 'Turkey', dial: '+90', digits: 10, format: '### ### ####' },
  { code: 'TM', name: 'Türkmenistan', search: 'Turkmenistan', dial: '+993', digits: 8, format: '## ## ## ##' },
  { code: 'UG', name: 'Uganda', search: 'Uganda', dial: '+256', digits: 9, format: '### ### ###' },
  { code: 'UA', name: 'Україна', search: 'Ukraine', dial: '+380', digits: 9, format: '## ### ####' },
  { code: 'AE', name: 'الإمارات', search: 'United Arab Emirates', dial: '+971', digits: 9, format: '## ### ####' },
  { code: 'GB', name: 'United Kingdom', search: 'United Kingdom', dial: '+44', digits: 10, format: '#### ######' },
  { code: 'US', name: 'United States', search: 'United States', dial: '+1', digits: 10, format: '(###) ###-####' },
  { code: 'UY', name: 'Uruguay', search: 'Uruguay', dial: '+598', digits: 8, format: '## ### ###' },
  { code: 'UZ', name: 'Oʻzbekiston', search: 'Uzbekistan', dial: '+998', digits: 9, format: '## ### ####' },
  { code: 'VU', name: 'Vanuatu', search: 'Vanuatu', dial: '+678', digits: 7, format: '### ####' },
  { code: 'VE', name: 'Venezuela', search: 'Venezuela', dial: '+58', digits: 10, format: '### ### ####' },
  { code: 'VN', name: 'Việt Nam', search: 'Vietnam', dial: '+84', digits: 9, format: '### ### ###' },
  { code: 'YE', name: 'اليمن', search: 'Yemen', dial: '+967', digits: 9, format: '### ### ###' },
  { code: 'ZM', name: 'Zambia', search: 'Zambia', dial: '+260', digits: 9, format: '## ### ####' },
  { code: 'ZW', name: 'Zimbabwe', search: 'Zimbabwe', dial: '+263', digits: 9, format: '## ### ####' },
]

export function applyPhoneFormat(digits: string, format: string): string {
  let out = ''
  let di = 0
  for (const ch of format) {
    if (di >= digits.length) break
    out += ch === '#' ? digits[di++] : ch
  }
  return out
}

export function findByCode(code: string): Country | undefined {
  return COUNTRIES.find(c => c.code === code.toUpperCase())
}

export function resolveCountry(value: string | null | undefined): Country | undefined {
  if (!value) return undefined
  return (
    COUNTRIES.find(c => c.code === value.toUpperCase()) ??
    COUNTRIES.find(c => c.search.toLowerCase() === value.toLowerCase()) ??
    COUNTRIES.find(c => c.name.toLowerCase() === value.toLowerCase())
  )
}

// Parse a stored phone string like "+5511999999999" into country + local digits
export function parsePhone(phone: string | null | undefined): { country: Country; localDigits: string } | null {
  if (!phone || !phone.startsWith('+')) return null
  // Sort longest dial first to avoid "+1" matching before "+1868"
  const sorted = [...COUNTRIES].sort((a, b) => b.dial.length - a.dial.length)
  for (const c of sorted) {
    if (phone.startsWith(c.dial)) {
      const localDigits = phone.slice(c.dial.length).replace(/\D/g, '')
      return { country: c, localDigits }
    }
  }
  return null
}
