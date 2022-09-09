const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workoutsRoute');
const userRoutes = require('./routes/userRoute');
require('dotenv').config();

const app = express();

app.use(express.json());

//routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);
const DB = process.env.MONGO_URL.replace(
  '<PASSWORD>',
  process.env.MONGO_PASSWORD
);
//connect to database
mongoose.connect(DB).then(() => console.log('DB connected successfuly'));

//listen to port
app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is running on port, ${process.env.PORT}!`);
});
