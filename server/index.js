import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import postRoutes from './routes/posts.js'


const app=express()

app.use('/posts',postRoutes)

app.use(bodyParser.json({limit : "30mb" , extended:true}))
app.use(bodyParser.urlencoded({limit : "30mb" , extended:true}))
app.use(cors());


const CONNECTION_URL = 'mongodb+srv://ss20:Shristi20@socio.zqipiyv.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(CONNECTION_URL)
.then(() => app.listen(PORT , ()=>console.log(`Server is running on port ${PORT}`)))
.catch((err) => console.log(err.message))


//mongoose.set('useFindAndModify', false) //remove error in console

const PORT = process.env.PORT || 5000



//connect to real database (cloud atlas)

