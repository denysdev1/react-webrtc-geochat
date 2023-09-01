import { useSelector } from 'react-redux';
import { Message } from './Message';
import { useEffect, useRef } from 'react';

export const Messages = ({ socketId }) => {
  const messages = useSelector(
    (state) => state.messenger.chatHistory[socketId]
  );

  const scrollRef = useRef(null);

  const scrollToBottom = () => {
    scrollRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className='chatbox_messages_container'>
      {messages?.map((message) => (
        <Message
          key={message.id}
          content={message.content}
          myMessage={message.myMessage}
        />
      ))}
      <div ref={scrollRef}></div>
    </div>
  );
};
