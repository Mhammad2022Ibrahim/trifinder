// import { Request, Response } from 'express';
// import { createReviewTrip } from '../Module/ReviewTripModule';

// export const createReviewTripRoute = async (req: Request, res: Response) => {
//   try {
//     const { user, average, trip } = req.body;
//     const revTripData = { user, average, trip };
//     const revTrip = await createReviewTrip(revTripData);

//     res
//       .status(201)
//       .json({ message: 'Review Trip created successfully', revTrip });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error', error: error.message });
//   }
// };
