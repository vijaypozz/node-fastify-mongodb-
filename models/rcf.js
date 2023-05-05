const mongoose = require("mongoose");
const rcf = new mongoose.Schema({
  
    mobile_no: {
     type: String,
  },
  correct_contact_no: {
     type: String,
  },
},{ timestamps: true });

module.exports = mongoose.model("RCF", rcf);