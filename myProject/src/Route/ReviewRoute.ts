import { Request, Response } from 'express';
import { createReview } from '../Module/ReviewModule';

export const createReviewRoute = async (req: Request, res: Response) => {
  try {
    const { user, average, relatedType, relatedId } = req.body;
    const revAttData = { user, average, relatedType, relatedId , nbReview: null };
    const revAtt = await createReview(revAttData);

    res.status(201).json({ message: 'Review Attraction created successfully', revAtt });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
