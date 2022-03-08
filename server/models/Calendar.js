const { Schema, model } = require("mongoose");

const calendarSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  days: [String],
  months: [String],
  monthDayCount: [Int],
  currentYear: {
    type: Number,
    required: true,
    default: 0,
  },
});

// const Calendar = model("Calendar", calendarSchema);

module.exports = calendarSchema;
