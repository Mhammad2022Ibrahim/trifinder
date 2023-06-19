import { AppDataSource } from "../data-source";
import { Reviews } from "../entity/Reviews";
import { Attractions } from "../entity/Attractions";
import { Cities } from "../entity/Cities";
import { Trips } from "../entity/Trips";

export const deleteReview = async (revData: {
  user: any;
  relatedType: any;
  relatedId: any;
}) => {
  try {
    const reviewRepository = AppDataSource.getRepository(Reviews);

    // Find the review to delete
    const reviewToDelete = await reviewRepository.findOne({
      where: revData,
    });

    if (!reviewToDelete) {
      throw new Error("Review not found");
    }

    // Delete the review
    const deletedReview = await reviewRepository.remove(reviewToDelete);

    if (revData.relatedType === 1) {
      const cityRepository = AppDataSource.getRepository(Cities);
      const cityEntity = await cityRepository.findOne({
        where: { id: revData.relatedId },
      });

      if (cityEntity) {
        // Calculate the updated average and number of reviews
        const currentNbReview = cityEntity.nbReview || 0;
        const currentAverage = cityEntity.averageReview || 0;

        if (currentNbReview > 1) {
          const updatedAverage =
            (currentAverage * currentNbReview - deletedReview.average) /
            (currentNbReview - 1);

          cityEntity.averageReview = updatedAverage;
        } else {
          // If it's the last review, reset average to 0
          cityEntity.averageReview = 0;
        }

        cityEntity.nbReview = currentNbReview - 1;

        await cityRepository.save(cityEntity);
      }
    } else if (revData.relatedType === 2) {
      const attractionRepository = AppDataSource.getRepository(Attractions);
      const attractionEntity = await attractionRepository.findOne({
        where: { id: revData.relatedId },
      });

      if (attractionEntity) {
        const currentNbReview = attractionEntity.nbReview || 0;
        const currentAverage = attractionEntity.average || 0;

        if (currentNbReview > 1) {
          const updatedAverage =
            (currentAverage * currentNbReview - deletedReview.average) /
            (currentNbReview - 1);

          attractionEntity.average = updatedAverage;
        } else {
          attractionEntity.average = 0;
        }

        attractionEntity.nbReview = currentNbReview - 1;

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

        if (currentNbReview > 1) {
          const updatedAverage =
            (currentAverage * currentNbReview - deletedReview.average) /
            (currentNbReview - 1);

          tripEntity.average = updatedAverage;
        } else {
          tripEntity.average = 0;
        }

        tripEntity.nbReview = currentNbReview - 1;

        await tripRepository.save(tripEntity);
      }
    }

    return deletedReview;
  } catch (error) {
    console.error(error);
    throw new Error("Internal server error");
  }
};