import React, { useContext, useState } from 'react'
import './Auth.css'
import chatlogo from '../../image/chat1.webp'
import chatContext from '../../context/chat/chatContext';

const Auth = () => {
	const context = useContext(chatContext);
	const { handleRegister, handleLogin } = context;
	const [isSignUp, setIsSignUp] = useState(true);
	const initialState = {
		name: "",
		password: "",
		email: "",
	};
	const [data, setData] = useState(initialState);
	const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	}
	const handleSubmit = (e) => {
		e.preventDefault();
		if (isSignUp) {
			handleRegister(data);
			setData(initialState);
			resetForm();
		}else{
			handleLogin(data);
			setData(initialState);
			resetForm();
		}
	}
	const resetForm = () => {
		setData(initialState);
	}
	return (
		<div className="Auth">

			<div className="a-left">
				<img src={chatlogo} alt="" />

				<div className="Webname">
					<h1>CHAT Media</h1>
					<h6>Explore the ideas throughout the Media</h6>
				</div>
			</div>
			<div className="a-right">
				<form className="infoForm authForm" onSubmit={handleSubmit}>
					<h3>{isSignUp ? "Register" : "Login"}</h3>
					{isSignUp && (
						<div>
							<input
								required
								type="text"
								placeholder="Name"
								className="infoInput"
								name="name"
								value={data.name}
								onChange={handleChange}
							/>
						</div>
					)}

					<div>
						<input
							required
							type="email"
							placeholder="Email"
							className="infoInput"
							name="email"
							value={data.email}
							onChange={handleChange}
						/>
					</div>
					<div>
						<input
							required
							type="password"
							className="infoInput"
							placeholder="Password"
							name="password"
							value={data.password}
							onChange={handleChange}
						/>
					</div>
					<div>
						<span
							style={{
								fontSize: "12px",
								cursor: "pointer",
								textDecoration: "underline",
							}}
							onClick={() => {
								resetForm();
								setIsSignUp((prev) => !prev);
							}}
						>
							{isSignUp
								? "Already have an account ? Login"
								: "Don't have an account ? Sign up"}
						</span>
						<button
							className="button infoButton"
							type="Submit"
						>
							{isSignUp ? "SignUp" : "Login"}
						</button>
					</div>
					{
						!isSignUp && (
							<div>
								<span
									style={{
										fontSize: "12px",
										cursor: "pointer",
										textDecoration: "underline",
										// display:'block'
									}}
								>
									Forgot Password
								</span>
							</div>
						)
					}
				</form>
			</div>
		</div>
	)
}

export default Auth