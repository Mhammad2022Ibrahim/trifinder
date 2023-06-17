// import { Request, Response } from 'express';
// import { createReviewAttraction } from '../Module/ReviewAttractionModule';

// export const createReviewAttractionRoute = async (req: Request, res: Response) => {
//   try {
//     const { user, average, attraction } = req.body;
//     const revAttData = { user, average, attraction, nbReview: null };
//     const revAtt = await createReviewAttraction(revAttData);

//     res.status(201).json({ message: 'Review Attraction created successfully', revAtt });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error', error: error.message });
//   }
// };
