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