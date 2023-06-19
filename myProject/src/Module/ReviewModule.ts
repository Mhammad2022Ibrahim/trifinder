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
    } else {
      newReview = existingReview;
    }

    // Create or update the review
    newReview.userId = revData.user;
    newReview.average = revData.average;
    newReview.relatedType = revData.relatedType;
    newReview.relatedId = revData.relatedId;

    const savedReview = await reviewRepository.save(newReview);

    // Update average for associated entities
    if (revData.relatedType === 1) {
      await updateCityAverage(revData.relatedId, savedReview.average, !existingReview);
    } else if (revData.relatedType === 2) {
      await updateAttractionAverage(revData.relatedId, savedReview.average, !existingReview);
    } else if (revData.relatedType === 3) {
      await updateTripAverage(revData.relatedId, savedReview.average, !existingReview);
    }

    return savedReview;
  } catch (error) {
    console.error(error);
    throw new Error("Internal server error");
  }
};

export const updateReview = async (revData: {
  reviewId: any;
  user: any;
  average: any;
  relatedType: any;
  relatedId: any;
}) => {
  try {
    const reviewRepository = AppDataSource.getRepository(Reviews);

    // Find the review to update
    const existingReview = await reviewRepository.findOne(revData.reviewId);

    if (!existingReview) {
      throw new Error("Review not found");
    }

    // Get the original average for comparison
    const originalAverage = existingReview.average;

    // Update the review
    existingReview.userId = revData.user;
    existingReview.average = revData.average;
    existingReview.relatedType = revData.relatedType;
    existingReview.relatedId = revData.relatedId;

    const updatedReview = await reviewRepository.save(existingReview);

    // Update average for associated entities if the average has changed
    if (originalAverage !== updatedReview.average) {
      if (revData.relatedType === 1) {
        await updateCityAverage(revData.relatedId, updatedReview.average, false);
      } else if (revData.relatedType === 2) {
        await updateAttractionAverage(revData.relatedId, updatedReview.average, false);
      } else if (revData.relatedType === 3) {
        await updateTripAverage(revData.relatedId, updatedReview.average, false);
      }
    }

    return updatedReview;
  } catch (error) {
    console.error(error);
    throw new Error("Internal server error");
  }
};

async function updateCityAverage(cityId: any, reviewAverage: any, isNewReview: boolean) {
  const cityRepository = AppDataSource.getRepository(Cities);
  const cityEntity = await cityRepository.findOne({
    where: { id: cityId },
  });

  if (cityEntity) {
    cityEntity.averageReview =
      ((cityEntity.averageReview || 0) * cityEntity.nbReview +
        (isNewReview ? reviewAverage : reviewAverage - cityEntity.averageReview)) /
      (isNewReview ? cityEntity.nbReview + 1 : cityEntity.nbReview);

    if (isNewReview) {
      cityEntity.nbReview += 1;
    }

    await cityRepository.save(cityEntity);
  }
}

async function updateAttractionAverage(attractionId: any, reviewAverage: any, isNewReview: boolean) {
  const attractionRepository = AppDataSource.getRepository(Attractions);
  const attractionEntity = await attractionRepository.findOne({
    where: { id: attractionId },
  });

  if (attractionEntity) {
    attractionEntity.average =
      ((attractionEntity.average || 0) * attractionEntity.nbReview +
        (isNewReview ? reviewAverage : reviewAverage - attractionEntity.average)) /
      (isNewReview ? attractionEntity.nbReview + 1 : attractionEntity.nbReview);

    if (isNewReview) {
      attractionEntity.nbReview += 1;
    }

    await attractionRepository.save(attractionEntity);
  }
}


async function updateTripAverage(tripId: any, reviewAverage: any, isNewReview: boolean) {
  const tripRepository = AppDataSource.getRepository(Trips);
  const tripEntity = await tripRepository.findOne({
    where: { id: tripId },
  });

  if (tripEntity) {
    tripEntity.average =
      ((tripEntity.average || 0) * tripEntity.nbReview +
        (isNewReview ? reviewAverage : reviewAverage - tripEntity.average)) /
      (isNewReview ? tripEntity.nbReview + 1 : tripEntity.nbReview);

    if (isNewReview) {
      tripEntity.nbReview += 1;
    }

    await tripRepository.save(tripEntity);
  }
}
