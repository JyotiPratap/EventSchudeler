const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const eventSchema = new mongoose.Schema(
  {
    creator:{
      type:ObjectId,
      ref:"User"
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String
    },
    eventDate: {
      type: String,
      required: true
    }
  },

  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);