import { Request, Response } from 'express';
import { createReview } from '../Module/ReviewModule';

export const createReviewRoute = async (req: Request, res: Response) => {
  try {
    const { user, average, relatedType, relatedId } = req.body;
    const revData = { user, average, relatedType, relatedId , nbReview: null };
    const rev = await createReview(revData);

    res.status(201).json({ message: 'Review created successfully', rev });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
