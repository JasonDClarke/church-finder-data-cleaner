This repo contains two utilities
index.ts 
this converts the csv data into json

batch-geocode
this extends the json to include geocode latitude and longitude

We are using this api.
// https://apidocs.geoapify.com/docs/geocoding/batch/

Please note if there are api/pricing issues then this file can be rewritten to use another api. There are other options:
  - HERE
  - google geocoder api (but it doesnt work with batching)

Commands:
npm start
npm run batch-geocode (uses apiKey)
npm run 

To use: 
Step 1. provide geoapify apikey in apikey.ts
https://apidocs.geoapify.com/ go here and generate a key and add to this file
export const apiKey = 'geoapify api key'

Step 2. Provide an input.csv per the format in churchSuite

Run 

npm run all

(this runs
npm start
npm run batch-geocode (uses apiKey)
npm run jsonToCsv
)


These files are outputted. Data is outputted in various formats for demo purposes:


fullData.json

locationOutput.json - this outputs data in this format
  {
    "Country": "MockCountry",
    "ZipCode": "MockZipCode",
    "Name": "MockChurchName",
    "Address": "MockAddress"
  },

locationsAsCoordinates.json - this outputs data in this format
  {
    "key": "MockAddress, mockZipCode, mockCountry",
    "location": {
      "lat": mockLatitudeNumber,
      "lng": mockLongitudeNumber
    }
  },



locationsDataPlusCoordinates.json - this outputs data in this format
  {
    "Country": "MockCountry",
    "ZipCode": "MockZipCode",
    "Name": "MockChurchName",
    "Address": "MockChurchAddress",
    "lng": mockLatitudeNumber,
    "lat": mockLongitudeNumber
  },


output.json - this outputs data in this format
{
    "Notes": "",
    "First & Last Name": "MockName",
    "Church or Organisation": "MockChurchName",
    "Location / City": "MockCity",
    "Church Address": "MockAddress",
    "Church Postcode / ZIP Code": "MockZipCode",
    "Church Country": "MockCountry",
    "Church Contact number / email": "MockNumber OR mockEmail",
    "Church Website URL": "https://mockUrl/",
    "Church Denomination": "MockDenomination",
    "Course start date": "01-Jan-24",
    "Is the above date a provisional / proposed date or a confirmed date?": "Confirmed! We're definitely going ahead!"
  },


fullDataMyMaps.csv - this provides data in this format suitable for google mymaps
"Description","Name","Location / City","Church Address","Church Postcode / ZIP Code","Church Country","Phone","Website","Category","Course start date","Is the above date a provisional / proposed date or a confirmed date?","Address","Longitude","Latitude"
"","MockChurchName","MockCity","MockChurchAddress","MockZipCode","MockCountry","MockNumber OR MockEmail","MockWebsite","MockDenomination","01-Jan-24","Confirmed! We're definitely going ahead!","MockAddress, mockZipCode, mockCountry",mockLngNumber,mockLatNumber

fullData.csv - this provides data in this format
"Notes","First & Last Name","Church or Organisation","Location / City","Church Address","Church Postcode / ZIP Code","Church Country","Church Contact number / email","Church Website URL","Church Denomination","Course start date","Is the above date a provisional / proposed date or a confirmed date?","key","lng","lat"
"","MockChurchLeaderName","MockChurchName","MockCity","MockAddress","MockZipCode","MockCountry","MockNumber OR MockEmail","MockURL","Mock Denomination","01-Jan-24","Confirmed! We're definitely going ahead!","MockAddress, mockZipCode, mockCountry",mockLngNumber,mockLatNumber

This data can be used for church finder map.
Please get permission for any usage of PII personal id - Personally Identifiable Information (user emails phone numbers etc)

Please update readme if making any formatting change