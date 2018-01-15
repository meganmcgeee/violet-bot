const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: [{ first_Name: String, last_Name: String }],
  isNew: Boolean,
  pillNeeded: String,
});

const User = mongoose.model(`User`, userSchema);

module.exports = User;
