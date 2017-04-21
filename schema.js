var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pill = new Schema({
  name:  [{ brandName: String, genericName: String }],
  img: String,
  mgDosage:   String,
  sideEffects: String,
  conditionsItHelps: String,
  conditionsItWorsens: String,
  orderStatus: Boolean
});
