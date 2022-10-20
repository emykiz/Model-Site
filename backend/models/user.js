const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, require: true, min: 6, max: 20, unique: true },
    email: { type: String, required: true, max: 50, unique: true },
    password: { type: String, required: true, min: 8 },
    profile_picture: { type: String },
    cover_picture: { type: String },
    followers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    followings: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    is_admin: { type: Boolean, default: false },
    desc: { type: String, max: 50 },
    city: { type: String, max: 50 },
    from: { type: String, max: 50 },
    relationship: { type: Number, enum: [1, 2, 3] },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User