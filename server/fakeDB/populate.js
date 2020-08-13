const mongoose = require('mongoose');
const config = require('../config/dev');
const fakeDb = require('./FakeDB');


mongoose.connect(config.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
},async  () => {
  console.log('Starting Populating DB........');
  await fakeDb.populate();
  await mongoose.connection.close();
  console.log('Connected to DB');
})