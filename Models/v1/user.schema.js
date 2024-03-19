const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      default: () => Math.floor(Math.random() * 16777215).toString(16),
      unique: true,
    },
    role: {
      type: String,
      enum: ["admin", "viewer", "moderator"],
      default: "admin",
    },
    imgURL: {
      type: String,
      validate: [validator.isURL, "Please Provide A Valid imgURL url!"],
      default:
        "https://us.123rf.com/450wm/anatolir/anatolir2011/anatolir201105528/159470802-jurist-avatar-icon-flat-style.jpg?ver=6",
    },
    name: {
      type: String,
      required: [true, "Please Provide Your Name!"],
      minLength: [3, "Name Must Be At Least 3 Characters!"],
      maxLength: [100, "Name is to long!"],
    },

    userName: {
      type: String,
      required: [true, "Username Is Required!"],
      minLength: [3, "Username Must Be Between 3-8 Characters!"],
      maxLength: [8, "Username Must Be Between 3-8 Characters!"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [6, "Password Length Minimum 6 Characters!"],
    },

    primary: {
      type: String,
      enum: ["true", "false"],
      default: "false",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    apiVersion: {
      type: String,
      enum: ["v1"],
      default: "v1",
      immutable: true,
    },
    passwordChangeAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },

  { timestamps: true }
);

// password hashing
userSchema.pre("save", function (next) {
  const password = this.password;
  const hashedPassword = bcryptjs.hashSync(password);
  this.password = hashedPassword;
  next();
});

userSchema.methods.comparePassword = function (password, hash) {
  const isPasswordValid = bcryptjs.compareSync(password, hash);
  return isPasswordValid;
};

const user = mongoose.model("users", userSchema);
module.exports = user;
