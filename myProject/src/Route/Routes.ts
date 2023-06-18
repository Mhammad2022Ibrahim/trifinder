import { Request, Response } from 'express';
import { createCityRoute } from './CityRoute';
import { createUserRoute } from './UserRoute';
import { createImageRoute } from './ImagRoute';
import { createAttractionRoute } from './AttractionRoute';
// import { createReviewAttractionRoute } from './ReviewAttractionRoute';
import { createTripRoute } from './TripRoute';
// import { createReviewCityRoute } from './ReviewCityRoute';
// import { createReviewTripRoute } from './ReviewTripRoute';
import { createCountryRoute } from './CountriesRoute';
import { createDistrictRoute } from './DistrictsRoute';

export function initializeRoutes(app: any) {
  // Route to handle city creation
  app.post('/cities', createCityRoute);

  // Route to handle user creation
  app.post('/users', createUserRoute);

  // Route to handle image creation
  app.post('/images', createImageRoute);

  // Route to handle attraction creation
  app.post('/attractions', createAttractionRoute);

  // Route to handle review attraction creation
  // app.post('/reviews/attraction', createReviewAttractionRoute);

  // Route to handle review trip creation
  // app.post('/reviews/trip', createReviewTripRoute);

  // Route to handle review city creation
  // app.post('/reviews/city', createReviewCityRoute);

  // Route to handle trip creation
  app.post('/trip', createTripRoute);

  // Route to handle review country creation
  app.post('/countries', createCountryRoute);

  // Route to handle district creation
  app.post('/discrits', createDistrictRoute);
}
