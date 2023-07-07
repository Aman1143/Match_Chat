import React, { useEffect, useState, useContext } from 'react';
import avatar from '../../image/avatar.png';
import './Search.css';
import chatContext from '../../context/chat/chatContext.js';

const Search = () => {
  const context = useContext(chatContext);
  const { allUsers, createChat,isSearch,setIsSearch } = context;

const handleClick = (e, receivedId) => {
    e.preventDefault();
    setIsSearch(false);
    createChat(receivedId);
  };

  return (
    <div className="LogoSearch">
      {isSearch && (
      <div className="searchPerson">
        <div className="cutSearch" onClick={() => setIsSearch(false)}>
          <i className="fas fa-times"></i>
        </div>
        {allUsers && allUsers.length > 0 && (
          allUsers.map((item) => (
            <div>
              <a href="#" className="list-group-item list-group-item-action border-0 profileTag">
                <div className="badge bg-success float-right notificationBox">5</div>
                <div className="d-flex align-items-start">
                  <div className="imge">
                    <img src={avatar} alt="Vanessa Tucker" width="40" height="40" />
                  </div>
                  <div className="flex-grow-1 ml-3 nameBox ">
                    {item.name}
                    <div className='chatbox'>
                      <div className="small"><span className="fas fa-circle chat-online"></span> Online</div>
                      <div className="chat">
                        <button onClick={(e) => { handleClick(e,item._id) }} className='chatbtn'>Chat</button>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))
        )}
      </div>
      )}
    </div>
  );
};

export default Search;
