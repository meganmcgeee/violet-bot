const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pillSchema = new Schema({
  name:  [{ brandName: String, genericName: String }],
  pillKind: String,
  img: String,
  mgDosage:   String,
  sideEffects: String,
  conditionsItHelps: String,
  conditionsItWorsens: String,
  orderStatus: Boolean
});


const userSchema = new Schema({
  name:  [{ first_Name: String, last_Name: String }],
  isNew: Boolean,
  pillNeeded: String
});



let Pill = mongoose.model('Pill', pillSchema);
let User = mongoose.model('User', userSchema);


module.exports = Pill;
module.exports = User;