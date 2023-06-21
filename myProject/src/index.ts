const express = require('express');
import { AppDataSource } from "./data-source";
import { initializeRoutes } from './Route/Routes';
import cors from 'cors';


const app = express();
app.use(express.json());

// Allow all origins (you can restrict it to your frontend domain in production)
const cors = require('cors');
app.use(cors({
    origin: '*'
}));

AppDataSource.initialize().then(async () => {

  initializeRoutes(app);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });      
})
.catch((error) => {
console.error('Failed to connect to the database:', error);
});

