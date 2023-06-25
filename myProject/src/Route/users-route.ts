import { Request, Response } from 'express';
import { createUser } from '../Module/users-module';

export const createUserRoute = async (req: Request, res: Response) => {
  try {
    const { username, email, age, gender, cityId } = req.body;

    const userData = {
      username,
      email,
      age,
      gender,
      cityId,
    };

    const user = await createUser(userData);

    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    console.log('Failed to create user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
};
