// import { AppDataSource } from "./data-source"

// AppDataSource.initialize().then(async () => {

//     console.log("Inserting a new user into the database...")

// }).catch(error => console.log(error))

const express = require('express');
import { AppDataSource } from "./data-source";
import { initializeRoutes } from './Route/Routes';

const app = express();
app.use(express.json());

AppDataSource.initialize().then(async () => {

  initializeRoutes(app);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });      
})
.catch((error) => {
console.error('Failed to connect to the database:', error);
});

