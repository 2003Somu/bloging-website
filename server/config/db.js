// const mongoose = require(mongoose);
// const connectDB = async () => {

//     try {
//         mongoose.set(strictQuery, false);
//         const conn = await mongoose.connect(process.env.MONGODB_URI);
//         console.log(`Database Connected: ${conn.connection.host}`);
//     } catch (error){
//         console.log(error);
    

//     }
// }

// export default connectDB;

const mongoose = require('mongoose');
const connectDB = async () => {
  
  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Database Connected`);
  } catch (error) {
    console.log(`Database Connection error`,error);
  }

}

module.exports = connectDB;