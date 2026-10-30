const express=require('express')
const cors=require('cors')
require('dotenv').config()
const connectDB=require('./config/db')
const userRoutes=require('./routes/user.routes')
const app=express()
app.use(express.json())
app.use(cors({origin:"*"}))//cors 
app.use('/api/user/',userRoutes)
const port=process.env.PORT
connectDB().then(()=>{
    app.listen(port,()=>{
        console.log(`server is running on ${port}`)
    })
}).catch((err)=>{
    console.error('Failted to start server due to MongoDB:',err.message)
    process.exit(1)
})