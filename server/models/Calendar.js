const { Schema } = require("mongoose");

const calendarSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    days: [String],
    months: [String],
    currentYear: {
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

const Calendar = model("Calendar", calendarSchema);

userSchema.virtual("monthCount").get(function () {
  return this.months.length;
});

module.exports = Calendar;
