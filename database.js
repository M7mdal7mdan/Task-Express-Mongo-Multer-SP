const mongoose = require('mongoose');
const connectDB = async () => {
  const conn = await mongoose.connect('mongodb+srv://mohammad:abc1234@cluster0.znwld.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log(`mongo connected: ${conn.connection.host}`);
};
module.exports = connectDB;
