//handlers for routes
import PostMessage from "../models/postMessage.models.js";
import mongoose from "mongoose";

export const getPosts = async (req, res) => {
  const { page } = req.query;
  try {
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT; //get the starting index of every page , such as 0, 8
    const total = await PostMessage.countDocuments({});

    const posts = await PostMessage.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);
    res.status(200).json({
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;
  console.log(searchQuery);
  console.log(tags);
  try {
    const title = new RegExp(searchQuery, "i"); //remove case and consider all
    const posts = await PostMessage.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });
    console.log(posts);
    res.json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await PostMessage.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  console.log(post);
  const newPostMessage = new PostMessage({
    ...post,
    creater: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newPostMessage.save();

    res.status(201).json(newPostMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, message, creator, selectedFile, tags } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

  await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await PostMessage.findByIdAndDelete(id);

  res.json({ message: "post deleted!" });
};

export const likePost = async (req, res) => {
  const { id } = req.params;
 console.log("imhere")
  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const post = await PostMessage.findById(id);
  if(!post){
    return res.status(404).json({message: 'Post not found'})
  }

const alreadyLiked = post.likes.includes(req.userId)
if (!alreadyLiked) {
  // If the user hasn't liked the post, add the user to the likes array
  await PostMessage.findByIdAndUpdate(id, { $addToSet: { likes: req.userId } });
} else {
  // If the user has already liked the post, remove the user from the likes array
  await PostMessage.findByIdAndUpdate(id, { $pull: { likes: req.userId } });
}
const updatedPost = await PostMessage.findById(id)
res.status(200).json(updatedPost)
  // const index = post.likes.findIndex((id) => id === String(req.userId));

  // if (index === -1) {
  //   post.likes.push(req.userId);
  // } else {
  //   post.likes = post.likes.filter((id) => id !== String(req.userId));
  // }

  // const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
  //   new: true,
  // });

  // res.status(200).json(updatedPost);
};

export const commentPost = async (req, res) => {
  const { id } = req.params;
  const { value } = req.body;

  const post = await PostMessage.findById(id);

  post.comments.push(value);

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.json(updatedPost);
};
