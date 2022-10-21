import React, { useEffect, useRef } from 'react';
import '../sytles/CardMessage.css';

const CardMessage = ({ user, message, time, localUser }) => {
  const currentTime = time();
  const dummy = useRef(null);
  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }, [message]);
  return (
    <div
      className={
        user === localUser
          ? 'cardMessage__container-local'
          : 'cardMessage__container'
      }
    >
      <div className={user === localUser ? 'name-local' : 'name'}>
        <span>{user || 'No users'}</span>
      </div>
      <div className={user === localUser ? 'message-local' : 'message'}>
        <p>{message}</p>
      </div>
      <div className={user === localUser ? 'time-local' : 'time'}>
        <span>{currentTime}</span>
      </div>
      <div ref={dummy} />
    </div>
  );
};

export default CardMessage;
