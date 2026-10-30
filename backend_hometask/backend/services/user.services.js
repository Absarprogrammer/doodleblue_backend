const User=require('../models/user.model')
const UserDetails=require('../models/user.details')
const tokenService=require('../jwt/token.service')
const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
class UserService{
    async signup(name,email,password){
        const exists=await User.findOne({email})
        if(exists){
            throw new Error('User already exists with this email')
        }
        const hashedpwd=await bcrypt.hash(password,10)
        const user=await User.create({name,email,password:hashedpwd})
        return user
    }
    async login(email,password){
        const user=await User.findOne({email}).select("+password")
        if(!user){
            throw new Error("User not found")
        }
        if(!user.isActive){
            throw new Error("Not an Active user")
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
        throw new Error("Invalid Credentials!")
    }
        const payload={
            id:user._id,
            email:user.email,
            role:user.role,
            isActive:user.isActive
        }
        const token=tokenService.generateToken(payload)
        const userwopwd=user.toObject()
        delete userwopwd.password
        return{user:userwopwd,token}
}
    async update(id,password){
        const user=await User.findById(id)
        if(!user){
            throw new Error("User not found")
        }
        const hashpwd=await bcrypt.hash(password,10)
        const updateduser=await User.findByIdAndUpdate(id,{password:hashpwd},{new:true})
        return updateduser
    }


    async updateUser(id, loggedInUserId, loggedInUserRole, updateData) {

    const user = await User.findById(id);

    if (!user) {
        throw new Error("User not found");
    }

    if (loggedInUserRole === 'student') {
        if (loggedInUserId !== id) {
            throw new Error("Students can update only their own data");
        }
    }
    if (loggedInUserRole === 'faculty') {
        if (user.role !== 'student' && loggedInUserId !== id) {
            throw new Error("Faculty can update only their own or student data");
        }
    }

    else {
        throw new Error("Access Denied");
    }
    delete updateData.role;
    delete updateData.password;
    Object.assign(user, updateData);

    await user.save();

    return user;
}

    async adduserdetails(userId,userDetail){
        if(!mongoose.isValidObjectId(userId)){
            throw new Error("Invalid user ID")
        }
        const user=await User.findById(userId)
        if(!user){
            throw new Error("User not found")
        }
        const existingDetails = await UserDetails.findOne({ user: userId });

if (existingDetails) {
    throw new Error("Details already exist for this user");
}
        const userDetails=await UserDetails.create({
            user:userId,
            phone:userDetail.phone,
            age:userDetail.age,
            dob:userDetail.dob,
            department:userDetail.department,
            address:userDetail.address
        })
        user.details=userDetails._id
        await user.save()
        return userDetails
    }

    async get(userId,role){
        if(role=='student'){
            const user=await User.findOne({_id:userId}).populate('details')
            return user
        }
        else if(role=="faculty"){
            const user=await User.find({isActive:true}).populate('details')
            return user
        }
    }

    async softDelete(id, loggedInUserId, loggedInUserRole) {

    const user = await User.findById(id);

    if (!user) {
        throw new Error("User not found");
    }

    if (loggedInUserRole === 'student') {
        if (loggedInUserId !== id) {
            throw new Error("You can delete only your own account");
        }
    }

    else if (loggedInUserRole === 'faculty') {

        if (
            user.role !== 'student' &&
            loggedInUserId !== id
        ) {
            throw new Error("Faculty can delete only their own account or student accounts");
        }
    }

    else {
        throw new Error("Access Denied");
    }

    user.isActive = false;

    await user.save();

    return user;
}

}
module.exports=new UserService();
