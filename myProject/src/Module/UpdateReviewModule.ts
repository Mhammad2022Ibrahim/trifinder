import { AppDataSource } from "../data-source";
import { Reviews } from "../entity/Reviews";
import { Attractions } from "../entity/Attractions";
import { Cities } from "../entity/Cities";
import { Trips } from "../entity/Trips";

export const updateReview = async (revData: {
  user: any;
  relatedType: any;
  relatedId: any;
  average: number; // New average rating value
}) => {
  try {
    const reviewRepository = AppDataSource.getRepository(Reviews);

    // Find the review to update
    const reviewToUpdate = await reviewRepository.findOne({
      where: {
        user: revData.user,
        relatedType: revData.relatedType,
        relatedId: revData.relatedId,
      },
    });

    if (!reviewToUpdate) {
      throw new Error("Review not found");
    }

    const oldAverage = reviewToUpdate.average; // Store the old average rating

    // Update the review
    reviewToUpdate.average = revData.average;

    const updatedReview = await reviewRepository.save(reviewToUpdate);

    if (revData.relatedType === 1) {
      const cityRepository = AppDataSource.getRepository(Cities);
      const cityEntity = await cityRepository.findOne({
        where: { id: revData.relatedId },
      });

      if (cityEntity) {
        // Calculate the updated average and number of reviews
        const currentNbReview = cityEntity.nbReview || 0;
        const currentAverage = cityEntity.averageReview || 0;

        const updatedAverage =
          (currentAverage * currentNbReview - oldAverage + revData.average) /
          (currentNbReview || 1); // Adding fallback to avoid division by zero

        cityEntity.averageReview = updatedAverage;
        cityEntity.nbReview = currentNbReview + 1; // Increment the number of reviews

        await cityRepository.save(cityEntity);
      }
    } else if (revData.relatedType === 2) {
      const attractionRepository = AppDataSource.getRepository(Attractions);
      const attractionEntity = await attractionRepository.findOne({
        where: { id: revData.relatedId },
      });
    
      if (attractionEntity) {
        const currentNbReview = attractionEntity.nbReview || 0;
        const currentTotalRating = attractionEntity.average * currentNbReview || 0;
        const newTotalRating = currentTotalRating - oldAverage + revData.average;
        const updatedAverage = newTotalRating / (currentNbReview + 1);
    
        attractionEntity.average = updatedAverage;
        // attractionEntity.nbReview = currentNbReview + 1; // Increment the number of reviews
    
        await attractionRepository.save(attractionEntity);
      }
    
    } else if (revData.relatedType === 3) {
      const tripRepository = AppDataSource.getRepository(Trips);
      const tripEntity = await tripRepository.findOne({
        where: { id: revData.relatedId },
      });

      if (tripEntity) {
        const currentNbReview = tripEntity.nbReview || 0;
        const currentAverage = tripEntity.average || 0;

        const updatedAverage =
          (currentAverage * currentNbReview - oldAverage + revData.average) /
          (currentNbReview || 1); // Adding fallback to avoid division by zero

        tripEntity.average = updatedAverage;
        tripEntity.nbReview = currentNbReview + 1; // Increment the number of reviews

        await tripRepository.save(tripEntity);
      }
    }

    return updatedReview;
  } catch (error) {
    console.error(error);
    throw new Error("Internal server error");
  }
};
