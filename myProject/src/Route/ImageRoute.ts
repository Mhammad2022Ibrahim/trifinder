// ImageRoute.ts
import { Request, Response } from 'express';
import { createImage, getImage } from '../Module/ImageModule';

export const createImageRoute = async (req: Request, res: Response) => {
  try {
    const { name, image, relatedId, relatedType } = req.body;

    const imageData = {
      name,
      image,
      relatedId,
      relatedType,
    };

    const createdImage = await createImage(imageData);

    res.status(201).json({ message: 'Image created successfully', image: createdImage });
  } catch (error) {
    console.log('Failed to create image:', error);
    res.status(500).json({ error: 'Failed to create image' });
  }
};
export async function getImages(req: Request, res: Response) {
  try {
    const { country } = req.query;

    const fetchedImages = await getImage(country);

    res.status(200).json({ images: fetchedImages });
  } catch (error) {
    console.log('Failed to fetch images:', error);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
};

// export const getCountryByNameRoute = async (req: Request, res: Response) => {
//   try {
//     const { name } = req.query;

//     if (!name) {
//       res.status(400).json({ error: 'Name parameter is missing' });
//       return;
//     }

//     const countries = await getCountriesByName(name as string);

//     res.status(200).json({ countries });
//   } catch (error) {
//     console.log('Failed to fetch country by name:', error);
//     res.status(500).json({ error: 'Failed to fetch country by name' });
//   }
// };
