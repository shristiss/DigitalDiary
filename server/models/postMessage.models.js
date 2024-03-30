import mongoose from 'mongoose'

const postSchema = mongoose.Schema(
    {
        title :String,
        message : String,
        name:String,
        creator :String,
        tags : [String] ,
        selectedFile : String,
        likes: { type: [String], default: [] },
        createdAt :{
            type: Date,
            default : new Date()
        },
        comments:{
            type:[String],
            default:[]
        }
    },
     {timesstamps: true})


var Post = new mongoose.model("Post",postSchema)
export default Post