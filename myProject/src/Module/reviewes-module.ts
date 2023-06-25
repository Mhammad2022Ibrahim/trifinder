import { AppDataSource } from "../data-source";
import { Reviews } from "../entity/Reviews";
import { Attractions } from "../entity/Attractions";
import { Cities } from "../entity/Cities";
import { Trips } from "../entity/Trips";

export const createReview = async (revData: {
  user: any;
  average: any;
  relatedType: any;
  relatedId: any;
}) => {
  try {
    const reviewRepository = AppDataSource.getRepository(Reviews);

    // Check if the user has already reviewed the same attraction
    const existingReview = await reviewRepository.findOne({
      where: revData,
    });

    let newReview: Reviews;

    if (!existingReview) {
      newReview = new Reviews();

      // Create a new review entity
      newReview.userId = revData.user;
      newReview.average = revData.average;
      newReview.relatedType = revData.relatedType;
      newReview.relatedId = revData.relatedId;

      const savedReview = await reviewRepository.save(newReview);

      if (revData.relatedType === 1) {
        // Update nbReview and average for the attraction
        const cityRepository = AppDataSource.getRepository(Cities);
        const cityEntity = await cityRepository.findOne({
          where: { id: revData.relatedId },
        });

        if (cityEntity) {
          cityEntity.nbReview = (cityEntity.nbReview || 0) + 1;
          cityEntity.averageReview =
            ((cityEntity.averageReview || 0) * (cityEntity.nbReview - 1) +
              savedReview.average) /
            cityEntity.nbReview;

          await cityRepository.save(cityEntity);
        }
      }

      if (revData.relatedType === 2) {
        // Update nbReview and average for the attraction
        const attractionRepository = AppDataSource.getRepository(Attractions);
        const attractionEntity = await attractionRepository.findOne({
          where: { id: revData.relatedId },
        });

        if (attractionEntity) {
          attractionEntity.nbReview = (attractionEntity.nbReview || 0) + 1;
          attractionEntity.average =
            ((attractionEntity.average || 0) * (attractionEntity.nbReview - 1) +
              savedReview.average) /
            attractionEntity.nbReview;

          await attractionRepository.save(attractionEntity);
        }
      }
      if (revData.relatedType === 3) {
        // Update nbReview and average for the attraction
        const tripRepository = AppDataSource.getRepository(Trips);
        const tripEntity = await tripRepository.findOne({
          where: { id: revData.relatedId },
        });

        if (tripEntity) {
          tripEntity.nbReview = (tripEntity.nbReview || 0) + 1;
          tripEntity.average =
            ((tripEntity.average || 0) * (tripEntity.nbReview - 1) +
              savedReview.average) /
            tripEntity.nbReview;

          await tripRepository.save(tripEntity);
        }
      }
      return savedReview;
    } else {
      newReview = existingReview;
      return existingReview;
    }

  } catch (error) {
    console.error(error);
    throw new Error("Internal server error");
  }
};

