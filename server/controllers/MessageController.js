import Message from "../models/message.js" 
export const addChat=async(req,res)=>{
	try {
		const saveDMessage=await Message.create({
			conversationId:req.body.conversationId,
			sender:req.body.sender,
			text:req.body.text,
		});
		await saveDMessage.save();
		console.log(saveDMessage);
		res.status(200).json(saveDMessage);
	} catch (error) {
		res.status(500).json(error);
	}
}


export const getMesage=async(req,res)=>{
	try {
		let message=await Message.find({
			conversationId:req.params.conversationId
		}).populate('sender');
		// console.log(message);
		res.status(200).json(message);
	} catch (error) {
		res.status(500).json(error);	
	}
}