// import { AppDataSource } from '../data-source';
// import { Districts } from '../entity/Districts';

// export const createDistrict = async (districtData: Districts) => {
//   try {
//     const districtRepository = AppDataSource.getRepository(Districts);

//     // Check if the name already exists
//     const existingDistrict = await districtRepository.findOne({ where: { name: districtData.name } });

//     if (existingDistrict) {
//       console.log('This district name already exists');
//       throw new Error('District name already exists');
//     }

//     // Create the district
//     const district = new Districts();
//     district.name = districtData.name;

//     // Save the district to the database
//     const createdDistrict = await districtRepository.save(district);
//     return createdDistrict;

//   } catch (error) {
//     console.log('Failed to create District:', error);
//     throw new Error('Failed to create District');
//   }
// };
