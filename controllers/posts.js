import Post from "../models/Post.js";
import User from "../models/User.js";

/*  CREATE  */

export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      // CHANGE DEFAULT COMMENTS VALUE FROM EMPTY ARRAY TO EMPTY OBJECT
      comments: {},
    });

    await newPost.save();

    const post = await Post.find();

    res.status(201).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* READ */

export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/*    UPDATE    */

export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// ADDING CONTROLLER FOR COMMENTING POST
export const commentPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { commentId, comment } = req.body;
    const post = await Post.findById(id);

    const isRepeatedComment = post.comments.get(commentId);
    if (!isRepeatedComment) {
      post.comments.set(commentId, comment);
    } else {
      let random = Math.floor(Math.random() * 10000);
      const newCommentId = commentId + String(random);
      console.log(`NUMBER IS : ${random}`, newCommentId);
      post.comments.set(newCommentId, comment);
    }

    // if (isRepeatedComment) {
    //   let randomNumber = Math.floor(Math.random() * 100000);
    //   const newCommentId = commentId + "_" + randomNumber;
    //   console.log(`WORKING IF IF IF `);
    //   post.comments.set(newCommentId, comment);
    // } else {
    //   console.log(`WORKING ELSE ELSE ELSE `);

    // }

    // [actualUserId, commentHash] = commentId.split("_");

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { comments: post.comments },
      { new: comment }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { id, commentId } = req.params;

    const post = await Post.findById(id);

    post.comments.delete(commentId);

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { comments: post.comments },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
