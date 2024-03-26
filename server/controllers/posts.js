//handlers for routes
import  PostMessage  from "../models/postMessage.models.js";
import mongoose from 'mongoose'
export const getPost = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
 console.log(post)
    const newPostMessage = new PostMessage ({...post, creater:req.userId , createdAt : new Date().toISOString()})

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

  await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

  res.json(updatedPost);
}

export const deletePost = async (req,res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  await PostMessage.findByIdAndDelete(id);

  res.json({message : 'post deleted!'})

}

export const likePost = async (req, res) => {
  const { id } = req.params
  ;
  if (!id) {
      return res.json({ message: "Unauthenticated" });
    }

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
  
  const post = await PostMessage.findById(id);
  const index = post.likes.findIndex((id) => id === String(id));
  console.log("index = ",index)
  if (index === -1) {
    post.likes.push(id);
  } else {
    post.likes = post.likes.filter((id) => id !== String(id));
  }
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
  res.status(200).json(updatedPost);
}


