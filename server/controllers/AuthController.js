import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// import cloudinary from "../utils/cloudinary.js";
import crypto from 'crypto';

export const register = async (req, res) => {
	try {
		const { name, email, password } = req.body;
		console.log(req.body);
		const oldUser = await User.findOne({ email });
		if (oldUser) return res.status(400).json({
			message: "User already exists",
		})
		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(password, salt);
		// const uploadResponse = await cloudinary.v2.uploader.upload(image, {
		// 	upload_preset: 'opnnk8pe',
		// });
		const user = await User.create({
			name,
			password: hashPassword,
			email,
			image: {
				public_id: "uploadResponse.public_id",
				url:" uploadResponse.secure_url",
			}
		})
		user.save();
		const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_KEY, {
			expiresIn: 30 * 24 * 60 * 60 * 1000
		});
		res.status(200).json({
			token,
			user,
			success:true,
			message:"Registration  Successfull"
		})
	} catch (error) {
		console.log(error)
		res.status(500).send(error);
	}


}

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email }).select("+password");
		if (!user) {
			return res.status(404).json({
				message: "user not found",
			});
		}
		const validity = await bcrypt.compare(password, user.password);
		if (!validity) return res.status(403).json({
			message: "Invalid credensitial",
		})
		const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_KEY, {
			expiresIn: 30 * 24 * 60 * 60 * 1000
		});
		res.status(200).json({
			token,
			user,
			success:true,
			message:"Login Successfull"
		})
	} catch (error) {
		console.log(error)
		res.status(500).send(error);
	}
}

export const allUser=async(req,res)=>{
	console.log(req.query);
	try {
		const users = await User.find({ name: { $regex: req.query.search, $options: 'i' } }).select("-password");
		if(!users || users.length<=0){
			return res.status(403).json({
				message:"Please enter correct username"
			})
		}
	    res.status(200).json({
			users,
			message:"Person found",
		})
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
}

export const getAllusers=async(req,res)=>{
	try {
		const users=await User.find();
		if(users.length<=0)
		return res.json({
			message:"No Usere"
		})
		res.status(200).json(users);
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
}

export const getUser=async(req,res)=>{
	try {
		const user=await User.findById(req.params.id);
		if(!user)
		return res.json({
			message:"No Usere"
		})
		// const {password,updatedAt,...other}=user._doc;
		res.status(200).json(user);
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
}

export const getFriends=async(req,res)=>{
	try {
		const user=await User.findById(req.params.id);
		if(!user)
		return res.json({
			message:"No Usere"
		})
		const {password,updatedAt,...other}=user._doc;
		res.status(200).json(other);
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
}