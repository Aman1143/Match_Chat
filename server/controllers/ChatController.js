import Chat from "../models/chat.js"

 
export const  newChat=async(req,res)=>{
	const newC=await Chat({
		members:[req.body._id,req.body.receivedId],
	})

	try {
		const savedChat=await newC.save();
		res.status(200).json(newC);
	} catch (error) {
		req.status(500).json(error);
	}
}

export const chatUser=async(req,res)=>{
	try {
		const userChat=await Chat.find({
			members:{$in:[req.params.userId]},
		})
		res.status(200).json(userChat);
	} catch (error) {
		res.status(500).json(error);
	}
}

export const bothUserChat=async(req,res)=>{
	try {
		const chat=await Chat.findOne({
			members:{$all:[req.params.firstUserId,req.params.secondUserId]},
		})

		res.status(200).json(chat);
	} catch (error) {
		res.status(500).json(error);
	}
}