// import { AppDataSource } from "../data-source";
// import { Users } from '../entity/Users';

// export const createUser = async (userData) => {
//   try {
//     const userRepository = AppDataSource.getRepository(Users);

//     // Check if the email already exists
//     const existingUser = await userRepository.findOne({ where: { email: userData.email } });

//     if (existingUser) {
//       console.log('Email already exists');
//       throw new Error('Email already exists');
//     }

//     // Create the user
//     const user = new Users();
//     user.username = userData.username;
//     user.email = userData.email;
//     user.age = userData.age;
//     user.gender = userData.gender;
//     user.relatedCity = userData.relatedCity;

//     // Save the user to the database
//     await userRepository.save(user);

//     return user;
    
//   } catch (error) {
//     console.log('Failed to create user:', error);
//     throw new Error('Failed to create user');
//   }
// };
