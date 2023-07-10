const usermodel = require("../model/user");
const bcrypt = require('bcrypt');

exports.getAlluser = async (req,res) =>{
    try{
        const users = await usermodel.find({});
        return res.status(200).send({
            userCount: users.length,
            success: true,
            message : "The all users",
            users
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).send({
            success: false,
            message: "error in get all users",
            err
        });
    }
}

exports.registercontroller = async (req,res) =>{
    try{
        const {username, email, password} = req.body;
        const hashpass = await bcrypt.hash(password,10)
        if(!username || !email || !password){
            return res.status(400).send({
                success : false,
                message : "please fill all fields"
            });
        }
        const exisitingUser = await usermodel.findOne({email})
        if(exisitingUser){
            return res.status(401).send({
                success : false,
                message : "user already exists",
            });
        }

        const user = new usermodel({username,email,password : hashpass});
        await user.save();
        return res.status(201).send({
            success : true,
            message : "New User Created"
        })
    }catch(err){
        console.log(err);
        return res.status(500).send({
            message : "error in happend",
            success : false,
            err
        });
    }
}

exports.logincontroller = async (req,res) =>{
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).send({
                success : false,
                message : 'Plese enter email Or Password'
            })
        }
        const user = await usermodel.findOne({email})
        if(!user){
            return res.status(200).send({
                success: false,
                message: 'email is not registerd'
            })
        }
        const ismatch = await bcrypt.compare(password,user.password);
        if(!ismatch){
            return res.status(401).send({
                success : false,
                message: 'Plese enter valide email'
            })
        }
        return res.status(200).send({
            success : true,
            message : 'login successfully',
            user
        })
    }catch(err){
        console.log(err);
        return res.status(500).send({
            success : false,
            message : "error is there",
            err
        })
    }
}