const mongoose = require('mongoose');
const BlogModel = require('../model/blogModel')
const user = require('../model/user');
const usermodel = require('../model/user');

exports.getAllBlog = async(req,res) =>{
    try{
        const blog = await BlogModel.find({}).populate('user');
        if(!blog){
            return res.stauts(200).send({
                success : false,
                message : "No Blog found"
            })
        }
        return res.status(200).send({
            success : true,
            message : "The all blogs are",
            blog
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).send({
            success : false,
            message : "error in getting blog",
            err
        });
    }
}

exports.getBlogbyId = async(req,res) =>{
    try{
        const {id} = req.params;
        const blog = await BlogModel.findById(id);
        if(!blog){
            return res.status(200).send({
                success : false,
                message : "blog is not with this id"
            })
        }
        return res.status(200).send({
            success : true,
            message : "The blog is",
            blog
        })
    }
    catch(err){
        console.log(err);
        return res.status(400).send({
            success : false,
            message : "error in getting",
            err
        })
    }
}

exports.CretateBlog = async(req,res) =>{
    try{
        const {title,descripation,image, user} = req.body;
        if(!title || !descripation || !image || !user){
            return res.status(200).send({
                success : false,
                message: "All filed is required"
            })
        }
        const existinguser = await usermodel.findById(user);
        if(!existinguser){
            return res.status(404).send({
                success : false,
                message: "unable to find user"
            })
        }
        const newblog = new BlogModel({title,descripation,image,user});
        const session = await mongoose.startSession();
        session.startTransaction()
        await newblog.save({session});
        existinguser.blogs.push(newblog);
        await existinguser.save({session});
        await session.commitTransaction();
        await newblog.save();
        return res.status(201).send({
            success : true,
            message : "New blog wiill be added",
            newblog
        })
    }catch(err){
        console.log(err);
        res.status(400).send({
            success : false,
            message : "error in creating blog",
            err
        })
    }
}

exports.UpdateBlog = async(req,res) =>{
    try{
        const {id} = req.params;
        // const {title,descripation,image} = req.body;
        const blog = await BlogModel.findByIdAndUpdate(id,{...req.body},{new :true});
        
        console.log(id);
        return res.status(200).send({
            success : true,
            message : "Blog is Updated",
            blog
        });
    }catch(err){
        console.log(err);
        return res.status(400).send({
            success : false,
            message : "error in updating",
            err
        })
    }
}

exports.deleteBlogById = async(req,res) =>{
    try{
        const blog = await BlogModel.findByIdAndDelete(req.params.id).populate("user");
        // console.log(blog);
        await blog.user.blogs.pull(blog);
        await blog.user.save();
        return res.status(200).send({
            success : true,
            message : "Delete blog successfully"
        })
    }
    catch(err){
        console.log(err);
        return res.status(400).send({
            success : false,
            message : "error in deleting blog",
            err
        })
    }
}

exports.userblog = async (req,res) =>{
    try{
        const userblog = await usermodel.findById(req.params.id).populate("blogs");
        if(!userblog){
            return res.status(400).send({
                success : false,
                message : "blogs is not found with this id"
            })
        }
        return res.status(200).send({
            success : true,
            message : "The Blogs are => ",
            userblog
        })
    }catch(err){
        console.log(err);
        return res.status(400).send({
            success : false,
            message : "error in user blog",
            err
        })
    }
}