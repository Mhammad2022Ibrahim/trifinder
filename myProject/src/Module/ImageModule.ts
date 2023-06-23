// ImageModule.ts
import { AppDataSource } from "../data-source";
import { Images } from '../entity/Images';
import { Repository } from "typeorm";
import { Countries } from '../entity/Countries'; // Import the Country entity
import { Cities } from '../entity/Cities'; // Import the City entity
import { Attractions } from "../entity/Attractions";
import { Trips } from "../entity/Trips";
import { Districts } from "../entity/Districts";

export async function getImage(country: String): Promise<Images[]> {
  try {
    const imgRepository: Repository<Images> = AppDataSource.getRepository(Images);
    const countRepository: Repository<Countries> = AppDataSource.getRepository(Countries);
    const countr= await countRepository.find({where: { name : country.toString()}})
    const images = await imgRepository.find({ where: { relatedType: 1 } });
    // const dist = await distRepository.find({ where: { name: country.toString() }});
    // const firstDistrict = dist[0]; // Access the first Districts object in the array
    // const images = await imgRepository.find({ where: { relatedType: firstDistrict.id } });


    if (images.length === 0) {
      throw new Error('No images found');
    }
    
    return images;
  } catch (error) {
    console.error('An error occurred while fetching images:', error);
    throw error;
  }
}




export const createImage = async (imgData: Partial<Images>): Promise<Images> => {
  try {
    const imgRepository: Repository<Images> = AppDataSource.getRepository(Images);

    // Check if the relatedId exists in the related table
    if (imgData.relatedType === 1) { // Assuming relatedType 1 is for countries
      const countryRepository: Repository<Countries> = AppDataSource.getRepository(Countries);
      const country = await countryRepository.findOne({ where: { id: imgData.relatedId } });
      if (!country) {
        throw new Error('Related country does not exist.');
      }
    } else if (imgData.relatedType === 2) { // Assuming relatedType 2 is for cities
      const cityRepository: Repository<Cities> = AppDataSource.getRepository(Cities);
      const city = await cityRepository.findOne({ where: { id: imgData.relatedId } });
      if (!city) {
        throw new Error('Related city does not exist.');
      }
    }else if (imgData.relatedType === 3){// Assuming relatedType 3 is for attractions
      const attRepository : Repository<Attractions> = AppDataSource.getRepository(Attractions);
      const attraction = await attRepository.findOne({where:{id:imgData.relatedId}});
      if(!attraction){
        throw new Error('Attraction not found');
      }
    }
    else if(imgData.relatedType===4){// Assuming relatedType 4 is for trips
      const tripRepository : Repository<Trips> = AppDataSource.getRepository(Trips);
      const trip = await tripRepository.findOne({where:{id:imgData.relatedId}});
      if(!trip){
        throw new Error('Trip not found');
      }
    }
    
    // Create the image
    const img = new Images();
    img.name = imgData.name;
    img.image = imgData.image;
    img.relatedId = imgData.relatedId;
    img.relatedType = imgData.relatedType;

    // Save the image to the database within the appropriate query scope
    const createdImage = await imgRepository.save(img);

    return createdImage;
  } catch (error) {
    console.log('Failed to create image:', error);
    throw new Error('Failed to create image');
  }
};



