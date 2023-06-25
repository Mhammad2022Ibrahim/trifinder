import { Request, Response } from 'express';
import { updateReview } from '../Module/update-review-module';

export const updateReviewRoute = async (req: Request, res: Response) => {
  try {
    const { user, relatedType, relatedId,average } = req.body;
    const revData = { user, relatedType, relatedId ,average, nbReview: null };
    const rev = await updateReview(revData);

    res.status(201).json({ message: 'Review updated successfully', rev });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};