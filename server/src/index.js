import express from "express";
import cors from "cors";
import dotenv from 'dotenv'

import userRoutes from './routes/userRoutes.js'
import recipeRoutes from "./routes/recipeRoutes.js";

import dbConnect from "./config/db.js";

dotenv.config()
dbConnect()
const app = express();



app.use(cors());
app.use(express.json()) //handle body object from requests

app.use('/users', userRoutes)
app.use('/recipes', recipeRoutes)

app.use('/images', express.static('./server/uploads')) //when getting a request on the images route, express will search for the files in the uploads folder and serve them... localhost:4000/images/filenamewhatever.jpg has to be asked for

app.listen(4000, () => console.log("Server is running on port 4000"));
