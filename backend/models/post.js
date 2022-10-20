const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      max: 500,
    },
    img: {
      type: String,
    },
    likes: {
      type: Number,
      default: 0,
      min: 0,
    },
    comment: [
      {type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}
    ],
    share: {
        type: Number,
        default: 0,
        min: 0
    }
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);
module.exports =  Post