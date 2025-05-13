
const userRoute= require('./Routes/userRoute.js');
const canvasRoute= require('./Routes/canvasRoute.js');
const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
require('dotenv').config();
const app = express();


app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000',  // Replace with your frontend's URL
}));


mongoose.connect(process.env.URL, {

}).then(() =>{ console.log('Database connected');app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));})
  .catch(err => console.log(err));

app.use(express.json());
app.use('/api/users', userRoute);
app.use('/api/canvas', canvasRoute);


