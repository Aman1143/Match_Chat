import React, { useEffect,useContext } from 'react'
import avatar from '../../image/avatar.png'
import chatContext from '../../context/chat/chatContext.js'



const Conversation = ({cnversation,currentUser}) => {
	const context = useContext(chatContext);
    const {getFriends,seder,friends}=context;
	useEffect(()=>{
       const friendId=cnversation.members.find((m)=> m!==currentUser._id);
	   getFriends(friendId);
	},[currentUser,cnversation])
	return (
		<div>
			<a href="#" className="list-group-item list-group-item-action border-0 profileTag" key={cnversation} >
				<div className="badge bg-success float-right notificationBox">5</div>
				<div className="d-flex align-items-start">
					<div className="imge">
						<img src={avatar} alt="Vanessa Tucker" width="40" height="40" />
					</div>
					<div className="flex-grow-1 ml-3 nameBox">
					     {friends?.name}
						<div className="small"><span className="fas fa-circle chat-online"></span> Online</div>
					</div>
				</div>
			</a>
		</div>
	)
}

export default Conversation