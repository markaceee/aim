import axios from 'axios';
import React, { useState } from 'react';
import logo from '../../../assets/svg/botlogo.svg';
import './ChatBot.css';

function ChatBot() {
  const [message, setMessage] = useState({
    sentBy: "",
    message: ""
  });
  const [myMessage, setMyMessage] = useState("");
  const [messageArray, setMessageArray] = useState([]);
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  }

  const handleClick = async () => {
    const userQuestion = myMessage.trim();
  
    if (userQuestion !== "") {
      console.log("User Question:", userQuestion);

      const userMessage = {
        message: userQuestion,
        sentBy: "me",
      };
      setMessage(userMessage);
  
      setMessageArray(prevArray => [...prevArray, userMessage]);
  
      try {
        // const res = await axios.get("http://localhost:8080/bot/chat?prompt=" + userQuestion);
        const res = await axios.get("https://aim-lgn2.onrender.com/bot/chat?prompt=" + userQuestion);
        const aiMessage = {
          message: res.data,
          sentBy: "ai",
        };
  
        setMessage(aiMessage);
        setMessageArray(prevArray => [...prevArray, aiMessage]);
        
      } catch (e) {
        console.log(e);
      }
      
      setMyMessage("");
    }
    
  }

  const handleClose = () => {
    setMessageArray([]);
  }

  return (
    <>
      <div className='fixed right-6 bottom-6'>
        <div
          onClick={toggleModal}
          className='rounded-full w-12 h-12 bg-gray-300 cursor-pointer fixed right-7 bottom-7 hover:scale-110 ease-in-out duration-300'>
          <img src={logo} alt="Chat Bot" />
        </div>

        {modal && (
          <div className="chatbot">
            <header>
              <h2>AimGPT</h2>
              <button className="close-btn hover:underline" onClick={handleClose}>Reset Chat</button>
            </header>

            <ul className="chatbox">
              <li className="chat incoming">

                <p>How can I help you today?</p>

              </li>
              {messageArray.length > 0 ? (
                messageArray.map((data, index) => (
                  <li key={index} className={`chat ${data.sentBy === "ai" ? "incoming" : "outgoing"} mt-3`}>
                    <p>{data.message}</p>
                  </li>
                ))
              ) : ""}
            </ul>

            <div className="chat-input">
              <textarea placeholder="Message TsukiGPT..." className=" focus:ring-0 ml-1" spellCheck="false" value={myMessage} onChange={(e) => setMyMessage(e.target.value)} required></textarea>
              <span id="send-btn" className="material-symbols-rounded text-[#4f5b79] mr-1" onClick={handleClick}>Send</span>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default ChatBot;