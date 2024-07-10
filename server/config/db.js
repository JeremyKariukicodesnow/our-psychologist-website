const mongoose = require('mongoose')

const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('App successfully connected to the MONGO database');
    } catch (error) {
      console.error('Error connecting to the database:', error.message);
      process.exit(1); // Exit process with failure
    }
  };

  module.exports = connectDB