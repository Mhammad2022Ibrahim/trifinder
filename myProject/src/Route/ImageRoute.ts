// ImageRoute.ts
import { Request, Response } from 'express';
import { createImage, getImagesForTable } from '../Module/ImageModule';

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

export async function getImagesForTableRoute(req: Request, res: Response) {
  try {
    const tableType = Number(req.query.tableType);
    const images = await getImagesForTable(tableType);

    res.json({ images });
  } catch (error) {
    console.log('Failed to fetch images:', error);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
}