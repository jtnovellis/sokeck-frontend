import React from 'react';
import '../sytles/CardMessage.css';

const CardMessage = ({ user, message, time }) => {
  const currentTime = time();
  return (
    <div className='cardMessage__container'>
      <div className='name'>
        <span>{user}</span>
      </div>
      <div className='message'>
        <p>{message}</p>
      </div>
      <div className='time'>
        <span>{currentTime}</span>
      </div>
    </div>
  );
};

export default CardMessage;
