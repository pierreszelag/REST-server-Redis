var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CallSchema = new Schema({
  title : String,
  message : String,
  createdAt : {
    type : Date,
    default : Date.now
  },
});


module.exports = mongoose.model('Call', CallSchema);
