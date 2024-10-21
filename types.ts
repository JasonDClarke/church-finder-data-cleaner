// WIP

type Denomination = 
  'Evangelical multi-denominational' |
  'Anglican' |
  'Anglican ' |
  'Presbyterian' |
  'Community Church / Non-denomination' |
  'Non-denominational' |
  'Baptist' |
  'Evangelical Congregational Church' |
  'Global Methodist Church' |
  '' |
  'Presbyterian�' |
  'Presbyterian ' |
  'Non-denominational / Evangelical' |
  'Methodist' |
  'Pentecostal' |
  'N/A' |
  'Non-denominational / Charismatic' |
  'Newfrontiers' |
  'Non-denominational or Pentecostal' |
  'Christian Reformed Church (CRC)' |
  'Congregationalism ' |
  'United Methodist' |
  'Reformed' |
  'Non-demoninational' |
  'New Covenant' |
  'Reformed Evangelical' |
  'Non-denominational / Newfrontiers'

type Country = 'Australia' | 
'United States' | 
'United Kingdom' |
 'Canada' | 
 'Tasmania' | 
 'New Zealand'

type Postcode = string 
  // Australia/NZ/Tasmania postcode is 4 digit eg sydney is 2000
  // Canada zip code is A1A A1A format
  // US is 12345 or 12345-1234 (most likely just 5 digits)
  // UK is weird  eg "L1", "W1A", "RH1", "RH10", or "SE1P" + 3 char 2nd part startign with a number eg SW1W 0NY