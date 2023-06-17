// import { AppDataSource } from '../data-source';
// import { Reviews } from '../entity/Reviews';
// import { Cities } from '../entity/Cities';

// export const createReviewCity = async (revCityData) => {
//   try {
//     const reviewRepository = AppDataSource.getRepository(Reviews);

//     // Check if the user has already reviewed the same city
//     const existingReview = await reviewRepository.findOne({
//       where: { user: revCityData.user, city: revCityData.city },
//     });

//     if (existingReview) {
//       console.log('Review already exists for this city');
//       throw new Error('Review already exists for this city');
//     }

//     // Create a new review entity
//     const newReview = new Reviews();
//     newReview.user = revCityData.user;
//     newReview.average = revCityData.average;
//     newReview.city = revCityData.city;

//     const savedReviewCity = await reviewRepository.save(newReview);

//     if (revCityData.city) {
//       // Update nbReview and average for the city
//       const cityRepository = AppDataSource.getRepository(Cities);
//       const cityEntity = await cityRepository.findOne({
//         where: { id: revCityData.city },
//       });

//       if (cityEntity) {
//         cityEntity.nbReview = (cityEntity.nbReview || 0) + 1;
//         cityEntity.averageReview =
//           ((cityEntity.averageReview || 0) * (cityEntity.nbReview - 1) +
//             savedReviewCity.average) /
//           cityEntity.nbReview;

//         await cityRepository.save(cityEntity);
//       }
//     }

//     return savedReviewCity;
//   } catch (error) {
//     console.error(error);
//     throw new Error('Internal server error');
//   }
// };
