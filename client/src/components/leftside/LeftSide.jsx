import React, { useContext, useEffect, useState } from 'react'
import './LeftSide.css'
import chatContext from '../../context/chat/chatContext.js'
import avatar from '../../image/avatar.png'
import Conversation from '../conversation/Conversation'
import Search from '../search/Search'



const LeftSide = () => {
	const context = useContext(chatContext);
	const { conversations, getConversations, setCurrentChat, user, getSearchusers, isSearch, setIsSearch } = context;
	const [search, setSearch] = useState("");

	useEffect(() => {
		getConversations();
	}, [])



	const handleSubmit = async (e) => {
		e.preventDefault();
		 setIsSearch(true);
		await getSearchusers(search);
		setSearch("");
	}

	return (
		<div className='leftSide'>
			<div className="col-12 col-lg-5 col-xl-3 border-right userBox">

				<div className="px-4 d-none d-md-block">
					<div className="d-flex align-items-center">
						<div className="flex-grow-1 bottom">
							<form onSubmit={handleSubmit}>
								<input type="text" className="form-control my-3" placeholder="create chat..." value={search} onChange={(e) => setSearch(e.target.value)} />
								<button type="submit" className='btun'><i class="far fa-paper-plane"></i></button>
							</form>
						</div>
					</div>
				</div>
				{
				  !isSearch&&	conversations && conversations.length > 0 && (
						conversations.map((item) => (
							<div onClick={() => setCurrentChat(item)} key={item.id}>
								<Conversation cnversation={item} currentUser={user} />
							</div>
						))
					)
				}
				{isSearch ? <Search /> : null}






				<hr className="d-block d-lg-none mt-1 mb-0" />
			</div>
		</div>
	)
}

export default LeftSide