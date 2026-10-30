const mongoose=require('mongoose')
const userSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"Name is required"],
            trim:true,
        },
        email:{
            type:String,
            required:[true,"Email is required"],
            trim:true,
            unique:true,
            lowercase:true,
        },
        password:{
            type:String,
            required:[true,"Password is required"],
            select:false,
        },
        role:{
            type:String,
            enum:["student","faculty"],
            default:"student",
        },
        isActive:{
            type:Boolean,
            default:true,
        },
        details:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"UserDetails",
            default:null
        }
        
    },
    {timestamps:true,}
)
const Users=mongoose.model("User",userSchema)
module.exports=Users