const { Schema } = require("mongoose");

const calendarSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const User = model("Calendar", calendarSchema);

module.exports = Calendar;
