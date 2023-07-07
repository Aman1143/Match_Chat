import ChatContext from './chatContext.js';
import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ChatState = (props) => {
	const host = "http://localhost:5000";
	const navigate = useNavigate();
	const [user, setUser] = useState();
	const [conversations, setCOnversations] = useState([]);
	const [currentChat, setCurrentChat] = useState(null);
	const [message, setMessage] = useState([]);
	const [arrivalMessage, setArrivalMessage] = useState(null);
	const [allUsers, setAllUsers] = useState();
	const [seder,setSeder]=useState();
	const [socket, setSocket] = useState();
    const [onlineUsers,setOnlineUsers]=useState([]);
	const [friends,setFriends]=useState(null);
	const [isSearch, setIsSearch] = useState(false);



	useEffect(() => {
		setSocket(io.connect(`${host}`));
	}, []);
	
	
	useEffect(() => {
		socket?.on("getMessage", data => {
			setArrivalMessage({
				sender: data.senderId,
				text: data.text,
				createdAt: Date.now()
			})
		})
	}, [])
   



	useEffect(() => {
		arrivalMessage && 
		currentChat?.members.includes(arrivalMessage.sender) &&
			setMessage((prev) => [...prev, arrivalMessage]);
	}, [arrivalMessage, currentChat]);

	useEffect(() => {
		socket?.emit('addUser', user?._id);
		socket?.on('getUsers', users => {
			setOnlineUsers(users);
		})
	}, [socket, user])


	useEffect(() => {
		arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
			setMessage((prev) => [...prev, arrivalMessage]);
	}, [arrivalMessage, currentChat]);

	const sendSocketMessage = (senderId, receivedId, text) => {
		socket?.emit("sendMessage", {
			senderId, receivedId, text,
		})
	}

	const createChat=async(receivedId)=>{
		try {
			const response = await fetch(`${host}/api/chatApp/chat`, {
				method: "POST",
				headers: {
					"Content-Type": 'application/json',
					Authorization: `JWT ${localStorage.getItem('token') || ""}`
				},
				body: JSON.stringify({receivedId})
			})

			const json = await response.json();
			if (json) {
				console.log("jelloi");
				console.log(json)
			}
			else {
				console.log("chat create  Nahi hua")
			}
		} catch (error) {
			console.log(error);
		}
	}

    const getFriends=async(id)=>{
		try {
			const response = await fetch(`${host}/api/chatApp/friends/${id}`, {
				method: "GET",
				headers: {
					"Content-Type": 'application/json',
					Authorization: `JWT ${localStorage.getItem('token') || ""}`
				},
			})

			const json = await response.json();
			if (json) {
				setFriends(json);
			} else {
				console.log("Something wrong");
			}
		} catch (error) {
			console.log(error);
		}
	}
	const getSearchusers = async (data) => {
		try {
			const response = await fetch(`${host}/api/chatApp/?search=${data}`, {
				method: "GET",
				headers: {
					"Content-Type": 'application/json',
					Authorization: `JWT ${localStorage.getItem('token') || ""}`
				},
			})

			const json = await response.json();
			if (json.users) {
				setAllUsers(json.users);
			} else {
				console.log("Something wrong");
			}
		} catch (error) {
			console.log(error);
		}
	}

	const getsender = async (id) => {
		try {
			const response = await fetch(`${host}/api/chatApp/sender/${id}`, {
				method: "GET",
				headers: {
					"Content-Type": 'application/json',
					Authorization: `JWT ${localStorage.getItem('token') || ""}`
				},
			})

			const json = await response.json();
			if (json) {
				setSeder(json);
			} else {
				console.log("Something wrong");
			}
		} catch (error) {
			console.log(error);
		}
	}

	const getConversations = async () => {
		try {
			const response = await fetch(`${host}/api/chatApp/chat/${user._id}`, {
				method: "GET",
				headers: {
					"Content-Type": 'application/json',
					Authorization: `JWT ${localStorage.getItem('token') || ""}`
				},
			})

			const json = await response.json();
			if (json) {
				setCOnversations(json);
			} else {
				console.log("Something wrong");
			}
		} catch (error) {
			console.log(error);
		}
	}
	const getMessage = async () => {
		try {
			const response = await fetch(`${host}/api/chatApp/message/${currentChat?._id}`, {
				method: "GET",
				headers: {
					"Content-Type": 'application/json',
					Authorization: `JWT ${localStorage.getItem('token') || ""}`
				},
			})

			const json = await response.json();
			if (json) {
				console.log(json);
				setMessage(json);
			} else {
				console.log("Something wrong");
			}
		} catch (error) {
			console.log(error);
		}
	}

	const sendMessage = async (msg) => {
		try {
			const response = await fetch(`${host}/api/chatApp/message`, {
				method: "POST",
				headers: {
					"Content-Type": 'application/json',
					Authorization: `JWT ${localStorage.getItem('token') || ""}`
				},
				body: JSON.stringify(msg)
			})

			const json = await response.json();
			if (json) {
				console.log(json);
				setMessage([...message, json]);
			} else {
				console.log("Registration successfull nahi hua");
			}
		} catch (error) {
			console.log(error);
		}
	}


	



	// user authentication..

	const handleRegister = async (data) => {
		try {
			const response = await fetch(`${host}/api/chatApp/register`, {
				method: "POST",
				headers: {
					"Content-Type": 'application/json',
					Authorization: `JWT ${localStorage.getItem('token') || ""}`
				},
				body: JSON.stringify(data)
			})

			const json = await response.json();
			if (json.success) {
				setUser(json.user)
				localStorage.setItem('token', json.token);
				navigate("../chat", { new: true });
			} else {
				console.log("Registration successfull nahi hua");
			}
		} catch (error) {
			console.log(error);
		}
	}

	const handleLogin = async (data) => {
		try {
			const response = await fetch(`${host}/api/chatApp/login`, {
				method: "POST",
				headers: {
					"Content-Type": 'application/json',
					Authorization: `JWT ${localStorage.getItem('token') || ""}`
				},
				body: JSON.stringify(data)
			})

			const json = await response.json();
			if (json.success) {
				setUser(json.user);
				localStorage.setItem('token', json.token);
				navigate("../chat", { new: true });
			}
			else {
				console.log("Login Nahi hua")
			}
		} catch (error) {
			console.log(error);
		}
	}


	return (
		<ChatContext.Provider value={{ handleRegister, handleLogin, allUsers, setAllUsers, getConversations, conversations, setCOnversations, currentChat, message, setCurrentChat, getMessage, user, sendMessage, sendSocketMessage, arrivalMessage, setArrivalMessage, setMessage,onlineUsers,seder,
		getsender,getFriends,getSearchusers,createChat,friends,setIsSearch,isSearch}}>
			{props.children}
		</ChatContext.Provider>
	)
}

export default ChatState;