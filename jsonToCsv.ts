
import fs from 'fs';
import { Parser } from 'json2csv'

const fullData = JSON.parse(fs.readFileSync('./fullData.json', 'utf8'))



try {
    // Flatten nested JSON using dot notation (e.g., Location.Latitude)
    const fields = ['Notes','First & Last Name','Church or Organisation','Location / City','Church Address','Church Postcode / ZIP Code','Church Country','Church Contact number / email','Church Website URL','Church Denomination','Course start date','Is the above date a provisional / proposed date or a confirmed date?','key','lng','lat']; 
    const json2csvParser = new Parser({ fields });
  // Convert JSON to CSV
  const fullDatacsv = json2csvParser.parse(fullData);
  console.log(fullDatacsv);

  // Optionally, write CSV to a file
  fs.writeFileSync('fullData.csv', fullDatacsv);
  console.log('CSV file successfully created.');
} catch (err) {
  console.error('Error converting JSON to CSV:', err);
}

// format for google mymaps



try {
  // Convert JSON to CSV
  // fix headings

//   Required Columns:
// Name: The title or name of the location (e.g., landmark, restaurant).
// Latitude: The latitude of the location (in decimal format).
// Longitude: The longitude of the location (in decimal format).
// Optional Columns:
// Description: A description of the location or any notes (text, HTML allowed).
// Image URL: A link to an image that will appear in the location's description.
// Category: A label to group or categorize locations (can be used for different marker icons).
// Address: If you have an address instead of lat/long, Google My Maps can attempt to geocode it.
// Phone: A phone number associated with the location.
// Website: A website URL linked to the location.
// Timestamp: For adding dates or times to events or places.
  const fields = [
    {value: 'Notes', label: 'Description'},
    {value: 'Church or Organisation', label: 'Name'},
    'Location / City','Church Address',
    'Church Postcode / ZIP Code',
    'Church Country',
    {value: 'Church Contact number / email', label: 'Phone'},
    {value: 'Church Website URL', label: 'Website'},
    {value: 'Church Denomination', label: 'Category'},
    'Course start date','Is the above date a provisional / proposed date or a confirmed date?',
    {value: 'key', label: 'Address'},
    {value: 'lng', label: 'Longitude'},
    {value: 'lat', label: 'Latitude'}]; 
  const json2csvParserMyMaps = new Parser({ fields });
  const fullDatacsv = json2csvParserMyMaps.parse(fullData);
  console.log(fullDatacsv);

  // Optionally, write CSV to a file
  fs.writeFileSync('fullDataMyMaps.csv', fullDatacsv);
  console.log('CSV file successfully created.');
} catch (err) {
  console.error('Error converting JSON to CSV:', err);
}
