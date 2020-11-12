const mongoose = require('mongoose');

const connectionString = process.env.MONGODB_URI || "mongodb://localhost:24831/trackstar"; 

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(function () {
    console.log("Mongodb connected....");
  })
  .catch(function (error) {
    console.log("Mongodb connection err", error);
  });

mongoose.connection.on("disconnect", function (event) {
  console.log("mongodb disconnected", event);
});

  module.exports = {
    User: require('./User'),
    Artist: require('./Artist'), 
    Genre: require('./Genre'),
    Song: require('./Song'),
    User: require('./User')
  }
