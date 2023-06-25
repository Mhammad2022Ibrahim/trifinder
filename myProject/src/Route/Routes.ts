import { Request, Response } from 'express';
import { createCityRoute, getCitiesByNameRoute, getAllCities } from './cities-route';
import { createUserRoute } from './users-route';
import { createImageRoute, getImages } from './images-route';
import { createAttractionRoute } from './attractions-route';
import { createReviewRoute } from './reviewes-route';
import { createTripRoute } from './trips-route';
import { updateReviewRoute } from './update-review-route';
import { createCountryRoute, getCountryByNameRoute } from './countries-route';
import { createDistrictRoute, getAlldistricts } from './districts-route';
import { deleteReviewRoute } from './delete-review-route';

export function initializeRoutes(app: any) {
  // Route to handle city creation
  app.post('/cities', createCityRoute);

  // Get cities by name
  app.get('/getcityName', getCitiesByNameRoute);

  // Get cities by name
  app.get('/allcities', getAllCities);

  // Route to handle user creation
  app.post('/users', createUserRoute);

  // Route to handle image creation
  app.post('/images', createImageRoute);

  // Route to handle get image 
   app.get('/getimages', getImages);

   // Route to handle get country 
   app.get('/getcountry', getCountryByNameRoute);


  // Route to handle attraction creation
  app.post('/attractions', createAttractionRoute);

  // Route to handle review  creation
  app.post('/reviews', createReviewRoute);

  // Route to handle delete review 
  app.post('/delete/reviews', deleteReviewRoute);

  // Route to handle update review 
  app.post('/update/reviews', updateReviewRoute);

  // Route to handle trip creation
  app.post('/trip', createTripRoute);

  // Route to handle review country creation
  app.post('/countries', createCountryRoute);

  // Route to handle district creation
  app.post('/discrits', createDistrictRoute);
  // Get cities by name
  app.get('/alldistricts', getAlldistricts);
}
