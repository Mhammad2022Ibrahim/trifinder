import { Request, Response } from 'express';
import { deleteReview } from '../Module/delete-review-module';

export const deleteReviewRoute = async (req: Request, res: Response) => {
  try {
    const { user, relatedType, relatedId } = req.body;
    const revData = { user, relatedType, relatedId , nbReview: null };
    const rev = await deleteReview(revData);

    res.status(201).json({ message: 'Review delete successfully', rev });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};