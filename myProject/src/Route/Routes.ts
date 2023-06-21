import { Request, Response } from 'express';
import { createCityRoute, getCitiesByNameRoute } from './CityRoute';
import { createUserRoute } from './UserRoute';
import { createImageRoute } from './ImagRoute';
import { createAttractionRoute } from './AttractionRoute';
import { createReviewRoute } from './ReviewRoute';
import { createTripRoute } from './TripRoute';
import { updateReviewRoute } from './UpdateReviewroute';
// import { createReviewTripRoute } from './ReviewTripRoute';
import { createCountryRoute } from './CountriesRoute';
import { createDistrictRoute } from './DistrictsRoute';
import { deleteReviewRoute } from './DeleteReviewRoute';

export function initializeRoutes(app: any) {
  // Route to handle city creation
  app.post('/cities', createCityRoute);

  // Get cities by name
  app.get('/getcities', getCitiesByNameRoute);

  // Route to handle user creation
  app.post('/users', createUserRoute);

  // Route to handle image creation
  app.post('/images', createImageRoute);

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
}
