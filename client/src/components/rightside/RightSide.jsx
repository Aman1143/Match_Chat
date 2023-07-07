import React, { useContext, useEffect, useRef, useState } from 'react'
import './RightSide.css'
import avatar from '../../image/avatar.png'
import chatContext from '../../context/chat/chatContext.js'
import { format } from 'timeago.js'


const RightSide = () => {
	const context = useContext(chatContext);
	const { currentChat, message, getMessage, user, sendMessage, sendSocketMessage, setMessage, arrivalMessage,getsender,seder } = context;
	const [newMessage, setNewMessage] = useState("  ");
	const [sender, setSender] = useState();
	const scollRef = useRef();





	const receivedId = currentChat?.members.find(member => member !== user?._id)

	useEffect(() => {
		getMessage();
	}, [currentChat]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		sendSocketMessage(user?._id, receivedId, newMessage);
		const msg = {
			sender: user?._id,
			text: newMessage,
			conversationId: currentChat?._id,
		}
		await sendMessage(msg);
		setNewMessage("");
	}

	useEffect(() => {
		scollRef.current?.scrollIntoView({ behavior: "smooth" });
			getsender(receivedId);
	}, [message])

	return (
		<div className='rightSide'>      <div class="content">
			<div class="container p-0">

				<h1 class="h3 mb-3">Messages</h1>

				<div class="card">
					<div class="row g-0">
						{
							currentChat ? (

								<div class="col-12 col-lg-7 col-xl-9 chatBox">
									<div class="py-2 px-4 border-bottom d-none d-lg-block">
										<div class="d-flex align-items-center py-1">
											<div class="position-relative">
												<img src={ avatar} class="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40" />
											</div>
											<div class="flex-grow-1 pl-3">
												<strong>{seder.name}</strong>
												<div class="text-muted small"><em>Typing...</em></div>
											</div>
											<div>
												<button class="btn btn-primary btn-lg mr-1 px-3 svg"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-phone feather-lg"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg></button>
												<button class="btn btn-info btn-lg mr-1 px-3 d-none d-md-inline-block svg"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-video feather-lg"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg></button>
												<button class="btn btn-light border btn-lg px-3 svg"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-horizontal feather-lg"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg></button>
											</div>
										</div>
									</div>

									<div class="position-relative">
										<div class="chat-messages p-4">
											{
												message.map((item) => {
													return item?.sender?._id == user._id ? (
														<div class="chat-message-right pb-4" ref={scollRef}>
															<div>
																<img src={item?.image || avatar} class="rounded-circle mr-1" alt="Chris Wood" width="40" height="40" />
																<div class="text-muted small text-nowrap mt-2">{format(item.createdAt)}</div>
															</div>
															<div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
																<div class="font-weight-bold mb-1">You</div>
																{item.text}
															</div>
														</div>
													) : (
														<div class="chat-message-left pb-4" ref={scollRef}>
															<div>
																<img src={avatar} class="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40" />
																<div class="text-muted small text-nowrap mt-2">{format(item.createdAt)}</div>
															</div>
															<div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
																<div class="font-weight-bold mb-1">{item?.sender?.name}</div>
																{item.text}
															</div>
														</div>
													);
												})
											}
										</div>
									</div>

									<div class="flex-grow-0 py-3 px-4 border-top sender">
										<div class="input-group">
											<form onSubmit={handleSubmit} style={{ width: '100%' }}>
												<input type="text" className="form-control" placeholder="Type your message" onChange={(e) => setNewMessage(e.target.value)} value={newMessage} />
												<button type="submit" className='send'><i class="far fa-paper-plane"></i></button>
											</form>
										</div>
									</div>

								</div>
							) : (
								<h2>start converstions</h2>
							)
						}
					</div>
				</div>
			</div>
		</div>
		</div>
	)
}

export default RightSide