import React from 'react';
import '../sytles/Chatwindow.css';
import { IconSend } from '@tabler/icons';
import CardMessage from './CardMessage';

const Chatwindow = ({
  message,
  setMessage,
  sendMessage,
  allmessages,
  joins,
}) => {
  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const getCurrentTime = () => {
    const date = new Date().getTime();
    const minutes = Math.floor(date / 60000) % 60;
    const hours = Math.floor(date / 300000) % 60;
    const currentTime = `${hours}:${minutes}`;
    return currentTime;
  };

  const channelMessages =
    allmessages.length > 0 &&
    allmessages.map((data, i) => {
      if (!data.user) return null;
      return (
        <CardMessage
          user={data.user}
          message={data.message}
          key={`channel${i + 1}`}
          time={getCurrentTime}
        />
      );
    });

  const noMessages = () => <p>No messages</p>;

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(message);
    setMessage('');
  };

  return (
    <div className='chat__container'>
      <span>{`${joins} is here!`}</span>
      <div className='message__window'>{channelMessages || noMessages()}</div>
      <form className='input__message' onSubmit={handleSubmit}>
        <div className='input__message-element'>
          <input
            onChange={handleChange}
            type='text'
            placeholder='Type a message'
            value={message}
            className='input__element'
          />
          <button type='submit'>
            <IconSend color='#aeaeae' size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chatwindow;
