const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const calendarSchema = require("./Calendar");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must use a valid email address"],
    },
    password: {
      type: String,
      required: true,
    },
    calendarList: [calendarSchema],
  },

  {
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 14;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

//later make this calendar count
// userSchema.virtual("spotifySongCount").get(function () {
//   return this.savedSpotifySongs.length;
// });

const User = model("User", userSchema);

module.exports = User;
