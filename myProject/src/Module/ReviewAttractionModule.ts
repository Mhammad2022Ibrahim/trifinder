// import { AppDataSource } from "../data-source";
// import { Reviews } from "../entity/Reviews";
// import { Attractions } from "../entity/Attractions";

// export const createReviewAttraction = async (revAttData: {
//   user: any;
//   average: any;
//   relatedType: any;
// }) => {
//   try {
//     const reviewRepository = AppDataSource.getRepository(Reviews);

//     // Check if the user has already reviewed the same attraction
//     const existingReview = await reviewRepository.findOne({
//       where: revAttData,
//     });

//     let newReview: Reviews;

//     if (!existingReview) {
//       newReview = new Reviews();
//     } else {
//       newReview = existingReview;
//     }

//     // Create a new review entity
//     newReview.user = revAttData.user;
//     newReview.average = revAttData.average;
//     newReview.relatedType = revAttData.relatedType;

//     const savedReviewAttraction = await reviewRepository.save(newReview);

//     if (revAttData.relatedType) {
//       // Update nbReview and average for the attraction
//       const attractionRepository = AppDataSource.getRepository(Attractions);
//       const attractionEntity = await attractionRepository.findOne({
//         where: { id: revAttData.relatedType },
//       });

//       if (attractionEntity) {
//         attractionEntity.nbReview = (attractionEntity.nbReview || 0) + 1;
//         attractionEntity.average =
//           ((attractionEntity.average || 0) * (attractionEntity.nbReview - 1) +
//             savedReviewAttraction.average) /
//           attractionEntity.nbReview;

//         await attractionRepository.save(attractionEntity);
//       }
//     }

//     return savedReviewAttraction;
//   } catch (error) {
//     console.error(error);
//     throw new Error("Internal server error");
//   }
// };
