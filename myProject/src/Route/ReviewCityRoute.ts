// import { Request, Response } from 'express';
// import { createReviewCity } from '../Module/ReviewCityModule';

// export const createReviewCityRoute = async (req: Request, res: Response) => {
//   try {
//     const { user, city, average } = req.body;
//     const revCityData = { user, city, average };
//     const revCity = await createReviewCity(revCityData);

//     res.status(201).json({ message: 'Review city created successfully', revCity });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error', error: error.message });
//   }
// };
