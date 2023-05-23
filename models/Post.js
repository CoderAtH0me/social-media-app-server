import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: {
      type: Map,
      of: Boolean,
    },
    // CHANGING DATA TYPE TO ALLOW US TO MODIFY
    comments: {
      type: Map,
      of: Object,
    },
    // DONT FORGET TO DROP AND RECREATE YOUR DATABASE AND ADD THERE ALL INPUT
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
