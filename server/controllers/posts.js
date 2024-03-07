//handlers for routes
import  Post  from "../models/postMessage.models.js";
import mongoose from 'mongoose'
export const getPost = async (req, res) => {
  try {
    const postMessages = await Post.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const { title, message, selectedFile, creator, tags } = req.body;
 
    const newPostMessage = new Post({ title, message, selectedFile, creator, tags })
console.log(newPostMessage)
    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, message, creator, selectedFile, tags } = req.body;
  
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

  await Post.findByIdAndUpdate(id, updatedPost, { new: true });

  res.json(updatedPost);
}

export const deletePost = async (req,res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  await Post.findByIdAndDelete(id);

  res.json({message : 'post deleted!'})

}

export const likePost = async (req,res) =>{
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  const post = await Post.findById(id)
  const updatedPost = await Post.findByIdAndUpdate(id, {likeCount:post.likeCount +1 }, {new :true})

  res.json(updatedPost)
}
