const UserService=require('../services/user.services')
class UserController{
    async signup(req,res){
        try {
            const{name,email,password}=req.body
            if(!name||!email||!password){
                return res.status(400).json({message:"All fields are required!"})
            }
            const result=await UserService.signup(name,email,password)
            return res.status(201).json({message:"User Created Successfully!",data:result})
        } catch (err) {
            return res.status(500).json({message:err.message})
        }
    }
    async login(req,res){
        try {
            const {email,password}=req.body
            if(!email||!password){
                return res.status(400).json({message:"Both fields are required!"})
            }
            const result=await UserService.login(email,password)
            return res.status(200).json(result)
        } catch (err) {
            res.status(500).json({error:err.message})
        }
    }
    async updatepwd(req,res){
        try {
            const{id}=req.params
            const{password}=req.body
            const result=await UserService.update(id,password)
            return res.status(200).json({message:"Password changed",data:result})
        } catch (err) {
            console.error("Update error:",err)
            return res.status(500).json({message:err.message})
        }
    }

    async update(req, res) {
    try {
        const { id } = req.params;
        const loggedInUser = req.user;

        if (!loggedInUser) {
            return res.status(401).json({
                message: "Please login first"
            });
        }

        const updateData = req.body;

        if (!updateData || Object.keys(updateData).length === 0) {
            return res.status(400).json({
                message: "Please provide data to update"
            });
        }

        const result = await UserService.updateUser(
            id,
            String(loggedInUser.id),
            loggedInUser.role,
            updateData
        );

        return res.status(200).json({
            message: "User updated successfully",
            data: result
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

    async adduserDetails(req,res){
            try {
                const userId=req.user.id
                const{phone,age,dob,department,address}=req.body
                if(!userId){
                    return res.status(400).json({message:'User Id is required'})
                }
                const newuserDetail=await UserService.adduserdetails(userId,{phone,age,dob,department,address})
                res.status(201).json(newuserDetail)
            } catch (error) {
                if(error.code===11000){
                    return res.status(409).json({message:"A profile for this user already exists"})
                }
                console.log(error)
                res.status(400).json({error:error.message})
            }
        }

        async getall(req,res){
            try {
                const loggedInUser=req.user
                const result=await UserService.get(loggedInUser.id,loggedInUser.role)
                return res.status(200).json({result});
            } catch (error) {
                return res.status(500).json({message: error.message});
        }
    }

    async softdelete(req,res){
        try {
            const{id}=req.params
            const loggedInUser=req.user

            if (loggedInUser.role === 'student' && loggedInUser.id !== id) {
            return res.status(403).json({
                message: "Students can delete only their own data"
            });
        }
            if(req.user.role!=='faculty'){
                return res.status(403).json({message:"Access Denied"})
            }
            const result =await UserService.softDelete(id,loggedInUser.id,loggedInUser.role)
            return res.status(201).json({message:"User deleted successfully",data:result});
            
        } catch (error) {
            return res.status(500).json({message:error.message})
        }
    }

}
module.exports=new UserController