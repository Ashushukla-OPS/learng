const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      unique: true,
      required: true,
     
    },
    bio: {
  type: String,
  default: "",
},

profilePhoto: {
  type: String,
  default: "",
},

    password: {
      type: String,
      required: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    emailVerificationToken: {
      type: String,
    },

    emailVerificationTokenExpires: {
      type: Date,
    },

    currentStreak: {
      type: Number,
      default: 0,
    },

    longestStreak: {
      type: Number,
      default: 0,
    },

    lastLoggedDate: {
      type: Date,
      default: null,
    },

    challengeCompletedToday:{
      type: Boolean,
      default: false,
    },

    lastChallengeDate: {
      type: Date,
      default: null,
    },

    totalChallengesCompleted: {
      type: Number,
      default: 0,
    },

    badges: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;