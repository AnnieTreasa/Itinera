const request = require('request');
import {Router} from "express";

const rout=Router()

rout.get('/location/:location', async (req,res)=>{

const options = {
  method: 'GET',
  url: 'https://api.content.tripadvisor.com/api/v1/location/locationId/details?language=en&currency=USD&key=86865F4DDFC242BBAF4C6882EBA29058',
  headers: {accept: 'application/json'}
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

});


export default rout;
