const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MenusSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  url: {
    type: String
  },
  order: {
    type: Number,
    required: true
  },
  subMenu: [
    {
      name: {
        type: String,
        required: true
      },
      url: {
        type: String
      },
      status: {
        type: String
      },
      order: Number
    }
  ],
  status: {
    type: String
  }
});

mongoose.model("menu", MenusSchema);
