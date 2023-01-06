const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
require("dotenv").config();

const url = process.env.MONGODB_URI;

mongoose
  .connect(url)
  .then((result) => console.log("connected to MongoDB"))
  .catch((error) => console.log("Error connecting to MongoDB:", error.message));

const phoneSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
    unique: true,
  },

  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: function (v) {
        return /(\d{2,3}-)\d{5}/.test(v);
      },
      message: (props) =>
        `${props.value} is not a valid phone number! The right format is {D}DD-DDDDD`,
    },
    required: true,
  },
});

phoneSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

phoneSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Phone", phoneSchema);
