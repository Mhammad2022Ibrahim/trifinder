// import { AppDataSource } from '../data-source';
// import { Reviews } from '../entity/Reviews';
// import { Trips } from '../entity/Trips';

// export const createReviewTrip = async (revTripData) => {
//   try {
//     const reviewRepository = AppDataSource.getRepository(Reviews);

//     // Check if the user has already reviewed the same trip
//     const existingReview = await reviewRepository.findOne({
//       where: { user: revTripData.user, trip: revTripData.trip },
//     });

//     if (existingReview) {
//       console.log('Review already exists for this trip');
//       throw new Error('Review already exists for this trip');
//     }

//     // Create a new review entity
//     const newReview = new Reviews();
//     newReview.user = revTripData.user;
//     newReview.average = revTripData.average;
//     newReview.trip = revTripData.trip;


//     const savedReviewTrip = await reviewRepository.save(newReview);

//     if (revTripData.trip) {
//       // Update nbReview and average for the trip
//       const tripRepository = AppDataSource.getRepository(Trips);
//       const tripEntity = await tripRepository.findOne({
//         where: { id: revTripData.trip },
//       });

//       if (tripEntity) {
//         tripEntity.nbReview = (tripEntity.nbReview || 0) + 1;
//         tripEntity.average =
//           ((tripEntity.average || 0) * (tripEntity.nbReview - 1) +
//             savedReviewTrip.average) /
//           tripEntity.nbReview;

//         await tripRepository.save(tripEntity);
//       }
//     }

//     return savedReviewTrip;
//   } catch (error) {
//     console.error(error);
//     throw new Error('Internal server error');
//   }
// };
