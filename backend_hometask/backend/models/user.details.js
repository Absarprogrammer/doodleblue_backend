const mongoose=require('mongoose')
const userDetailSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
        unique:true,
        required:true
    },
    phone:{type:String,trim:true},
    age:{type:Number,trim:true},
    dob:{type:String,trim:true},
    department:{type:String,trim:true},
    address:{type:String,trim:true},
},
{
    timestamps:true
}
)
const UserDetails=mongoose.model("UserDetails",userDetailSchema)
module.exports=UserDetails