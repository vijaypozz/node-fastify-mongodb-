const mongoose = require("mongoose")

// try {
//     const mongoUrl = process.env.MONGODB_URL
//     var connection = mongoose.connect(mongoUrl, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     }).then((res,ress) => console.log('MongoDB connected........................................'))
//         .catch(err => console.log("problem to connect db=====",err));
// } catch (error) {
//     console.error("------------------errrr", error)
// }
// module.exports = connection;



// import mongoose from 'mongoose';


const connectDB =  async ()=>{

    try{
          await mongoose.connect("mongodb+srv://viiay:vijaysundar01@cluster0.lcdlevt.mongodb.net/DataManagement",{
            //must add in order to not get any error masseges:
            useNewUrlParser: true,
        useUnifiedTopology: true
        }, function(err, client) {
            console.log(`Mongo Database is Connected!!!==========2========== `,err)

       
        }
        )
        console.log(`Mongo Database is Connected!!!==================== `)

    }catch(error){
        console.error(`Error=========: ${error} `)
        process.exit(1) //passing 1 - will exit the proccess with error
    }

}

module.exports = connectDB
