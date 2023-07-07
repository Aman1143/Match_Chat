import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	name: {
		type: String,
	},
	email: {
		type: String,
		required: true,
		unique: [true, "Email already exists"]
	},
	password: {
		type: String,
		required: [true, "Please enter a password"],
		minlength: [6, "Password must be at least 6 characters"]
	},
	image: {
		public_id: String,
		url: String,
	}
},{
	timestamps:true,
}
)

const User=new mongoose.model("User",userSchema);
export default User;

