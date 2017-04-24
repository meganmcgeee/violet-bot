const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

const pillSchema = new Schema({
  name: [{ brandName: String, genericName: String }],
  pillKind: String,
  img: String,
  mgDosage: String,
  sideEffects: String,
  conditionsItHelps: String,
  conditionsItWorsens: String,
  orderStatus: Boolean,
});

const Pill = mongoose.model(`Pill`, pillSchema);

module.exports = Pill;
