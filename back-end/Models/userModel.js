const { Schema, model } = require("mongoose");


const userSchema = new Schema({
  userName: String,
  password: String,
  phone: String,
  count: Number,
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

model("users", userSchema);