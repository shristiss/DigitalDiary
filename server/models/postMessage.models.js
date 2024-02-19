import mongoose from 'mongoose'

const postSchema = mongoose.Schema({}, {timesstamps: true})


export const Post = new mongoose.model("Post",postSchema)