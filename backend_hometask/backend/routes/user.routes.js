const express=require('express')
const auth=require('../middleware/auth.middleware')
const UserController=require('../controllers/user.controllers')
const router=express.Router()
router.post('/signup',UserController.signup)
router.post('/login',UserController.login)
router.patch('/updatepwd/:id',UserController.updatepwd)

router.use(auth)
router.patch('/updateDetails/:id',UserController.update)
router.get('/get',UserController.getall)
router.post('/adddetails',UserController.adduserDetails)
router.delete('/delete/:id',UserController.softdelete)

module.exports=router