const { Schema, model } = require("mongoose");

const calendarSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    id: {
      type: Number,
      required: true,
    },
    days: [String],
    months: [String],
    monthDayCount: [Number],
    currentYear: {
      type: Number,
      required: true,
      default: 0,
    },
    daysInYear: {
      type: Number,
      required: true,
      default: 1,
    },
    dayIndex: {
      type: Number,
      required: true,
      default: 0,
    },
    monthIndex: {
      type: Number,
      required: true,
      default: 0,
    },
  },

  {
    toJSON: {
      virtuals: true,
    },
  }
);

calendarSchema.virtual("currentDay").get(function () {
  return this.days[dayIndex];
});

calendarSchema.virtual("currentMonth").get(function () {
  return this.months[monthIndex];
});

// const Calendar = model("Calendar", calendarSchema);

module.exports = calendarSchema;
