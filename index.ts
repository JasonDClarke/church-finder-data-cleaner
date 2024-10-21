import csv from 'csv-parser'
import fs from 'fs'

const writeJSONToFile = <T = dataEntry[]>(data: T, filePath: string = 'output.json') => {

  // Write JSON data to a file
  fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error('Error writing JSON to file:', err);
    } else {
      console.log('JSON data written successfully to', filePath);
    }
  });
}

const results = [] as dataEntry[];

export type dataEntry = {
  'Notes':string
  'First & Last Name': string, // eg 'Andrew Russell'
  'Church or Organisation': string, // eg  'Port and Warrawong Churches'
  'Location / City': string, // eg Wexford
  'Church Address': string,
  'Church Postcode / ZIP Code': string,
  'Church Country': string //   'Australia' | 'United States' | 'United Kingdom' | 'Canada' | 'Tasmania' | 'New Zealand'
  'Church Contact number / email': string
  'Church Website URL': string
  'Church Denomination': string // eg 'Anglican'
  'Course start date': string // '11-Feb-24'
  'Is the above date a provisional / proposed date or a confirmed date?': 
    `Confirmed! We're definitely going ahead!`
    | `We're not quite at the "date-setting" stage yet.`
    | `Provisional / Proposed. Still working out the details...`
}

const uniqueFilter = <T>(value: T, index: number, self: T[]): boolean => {
  return self.indexOf(value) === index;
};

type UniqueByKeys<T> = (array: T[], key1: keyof T, key2: keyof T, key3: keyof T) => T[];
const uniqueByKeys: UniqueByKeys<any> = (array, key1, key2, key3) => {
  const seenKeys: { [key: string]: boolean } = {};
  const uniqueArray: any[] = [];

  array.forEach(item => {
    const keyValue1 = item[key1];
    const keyValue2 = item[key2];
    const keyValue3 = item[key3];
    const compositeKey = `${keyValue1}|${keyValue2}|${keyValue3}`; // Create a composite key

    if (!seenKeys[compositeKey]) {
      seenKeys[compositeKey] = true; // Mark this composite key as seen
      uniqueArray.push(item); // Add the unique item to the result array
    }
  });

  return uniqueArray;
};

fs.createReadStream('input.csv')
  .pipe(csv())
  .on('data', (data: dataEntry) => results.push(data))
  .on('end', () => {
    console.log(results);
    console.log(results.length)
    console.log(
      results.map(x => x['Is the above date a provisional / proposed date or a confirmed date?']).filter(uniqueFilter)
    )
    console.log(
      results.map(x => x['Church Denomination']).filter(uniqueFilter)
    )
    console.log(results.map(x => x['Church Country']).filter(uniqueFilter))

    console.log(results.filter(x => x['Church Country'] === 'United Kingdom'))
    console.log(results.filter(x => x['Church Country'] === 'United States'))
    console.log(results.filter(x => x['Church Country'] === 'Australia'))
    console.log(results.filter(x => x['Church Country'] === 'Canada'))
    console.log(results.filter(x => x['Church Country'] === 'Tasmania'))
    console.log(results.filter(x => x['Church Country'] === 'New Zealand'))

    console.log(results.filter(x => x['Church Country'] === 'United Kingdom').length)
    console.log(results.filter(x => x['Church Country'] === 'United States').length)
    console.log(results.filter(x => x['Church Country'] === 'Australia').length)
    console.log(results.filter(x => x['Church Country'] === 'Canada').length)
    console.log(results.filter(x => x['Church Country'] === 'Tasmania').length)
    console.log(results.filter(x => x['Church Country'] === 'New Zealand').length)
    
    const uniqueResults = uniqueByKeys(results, 'Church or Organisation', 'Church Postcode / ZIP Code', 'Church Country')
    writeJSONToFile(uniqueResults, 'output.json')
    writeJSONToFile(uniqueResults.map(x => ({
      Country: x['Church Country'],
      'ZipCode': x['Church Postcode / ZIP Code'],
      'Name': x['Church or Organisation'],
      'Address': x['Church Address']
    })), 'locationOutput.json')
  });