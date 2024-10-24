// WARNING THIS is a paid api. Don't run it willy nilly
// see usage statistics https://myprojects.geoapify.com/api/QjWBrzCdFis3GMEIWWpL/statistics
// the limit is 3000 credits a day, this uses half a credit per entry.
import fs from 'fs';
import fetch from 'node-fetch';
import { apiKey } from './apikey';

import { dataEntry } from '.';

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

type LocationData = {
    Name: string,
    Address: string,
    ZipCode: string,
    Country: string
}

type UniqueByKey<T> = (array: T[], key: keyof T) => T[];

const uniqueByKey: UniqueByKey<any> = (array, key) => {
  const seenKeys: { [key: string]: boolean } = {};
  const uniqueArray: any[] = [];

  array.forEach(item => {
    const keyValue = item[key];

    if (!seenKeys[keyValue]) {
      seenKeys[keyValue] = true; // Mark this key as seen
      uniqueArray.push(item); // Add the unique item to the result array
    }
  });

  return uniqueArray;
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

const locationsData = JSON.parse(fs.readFileSync('./locationOutput.json', 'utf8')) as LocationData[];
const churchSuiteData = JSON.parse(fs.readFileSync('./output.json', 'utf8')) as dataEntry[]
console.log(locationsData)


// https://apidocs.geoapify.com/docs/geocoding/batch/
const endpoint = (apiKey: string, requestBody: string[]) => `https://api.geoapify.com/v1/batch/geocode/search?&apiKey=${apiKey}&[${requestBody.join(',')}]&type=amenity`

const locationStringData = locationsData.map(x => `${x.Name}, ${x.Address}, ${x.ZipCode}, ${x.Country}`)

console.log(locationStringData)
const url = `https://api.geoapify.com/v1/batch/geocode/search?apiKey=${apiKey}`;

function getAsyncResult(url, timeout, maxAttempt) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        repeatUntilSuccess(resolve, reject, 0)
      }, timeout);
    });
  
    function repeatUntilSuccess(resolve, reject, attempt) {
      console.log("Attempt: " + attempt);
      fetch(url)
        .then(getBodyAndStatus)
        .then(result => {
          if (result.status === 200) {
            resolve(result.body);
          } else if (attempt >= maxAttempt) {
            reject("Max amount of attempts achived");
          } else if (result.status === 202) {
            // Check again after timeout
            setTimeout(() => {
              repeatUntilSuccess(resolve, reject, attempt + 1)
            }, timeout);
          } else {
            // Something went wrong
            reject(result.body)
          }
        })
        .catch(err => reject(err));
    };
  }

const queryResult = await fetch(url, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(locationStringData)
  })
  .then(getBodyAndStatus)
  .then((result) => {
    if (result.status !== 202) {
      return Promise.reject(result)
    } else {
      console.log("Job ID: " + result.body.id);
      console.log("Job URL: " + result.body.url);

      // get results asynchronously
      return getAsyncResult(`${url}&id=${result.body.id}`, 60 * 1000 /*check every minute*/, 100 /*max number of attempts*/).then(queryResult => {

        console.log(queryResult);
        return queryResult;
      });
    }
  })
  .catch(err => console.log(err));

function getBodyAndStatus(response) {
  return response.json().then(responseBody => {
    return {
      status: response.status,
      body: responseBody
    }
  });
}
// NOTE in google maps lng is used but in geoapify lon is used.
// This is converting to convenient google map format
// // add longitude and latitude

//NB there is ome duplicate data, we strip duplicates if name+zipcode+country are identical
writeJSONToFile(uniqueByKeys(locationsData.map((x, index) => ({
    ...x,
    lng: queryResult[index].lon,
    lat: queryResult[index].lat, 
})), 'Name', 'ZipCode', 'Country'),
'locationsDataPlusCoordinates.json')

writeJSONToFile(uniqueByKey(locationsData.map((x, index) => ({
    key: `${x.Name}, ${x.ZipCode}, ${x.Country}`,
    location: {
        lat: queryResult[index].lat, 
        lng: queryResult[index].lon,
    }

})), 'key'),
'locationsAsCoordinates.json')

writeJSONToFile(uniqueByKey(churchSuiteData.map((x, index) => ({
  ...x,
  key: `${x['Church or Organisation']}, ${x['Church Postcode / ZIP Code']}, ${x['Church Country']}`,
  lng: queryResult[index].lon,
  lat: queryResult[index].lat, 
})), 'key'),
'fullData.json')

writeJSONToFile(uniqueByKey(churchSuiteData.map((x, index) => {
  return {
  ...Object.fromEntries(Object.entries(x).filter(([x,y]) => x !== 'First & Last Name')),
  key: `${x['Church or Organisation']}, ${x['Church Postcode / ZIP Code']}, ${x['Church Country']}`,
  lng: queryResult[index].lon,
  lat: queryResult[index].lat, 
  }
}), 'key'),
'fullDataMinusPII.json')