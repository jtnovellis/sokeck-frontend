import './App.css';
import Login from './componets/Login';
import Chatwindow from './componets/Chatwindow';
import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

function App() {
  const [allmessages, setAllMessages] = useState([]);
  const [isLoggged, setIsLogged] = useState(false);
  const [user, setUser] = useState('');
  const [message, setMessage] = useState('');
  const [joins, setJoins] = useState('');
  const ref = useRef();

  useEffect(() => {
    ref.current = io('http://localhost:8080');
    ref.current.on('broadcast', (data) => {
      console.log({ data });
      if (typeof data === 'string') {
        setJoins(data);
      } else {
        setAllMessages((prev) => [...prev, data]);
      }
    });
    return () => {
      ref.current.close();
      ref.current.removeAllListeners();
    };
  }, []);

  const joinChannel = () => {
    ref.current.emit('Channel', { user, message: null });
  };

  const sendMessage = (mgs) => {
    ref.current.emit('Channel', { user, message: mgs });
  };

  return (
    <div className='App'>
      {isLoggged ? (
        <Chatwindow
          user={user}
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
          allmessages={allmessages}
          joins={joins}
        />
      ) : (
        <Login
          joinChannel={joinChannel}
          user={user}
          setUser={setUser}
          setIsLogged={setIsLogged}
        />
      )}
    </div>
  );
}

export default App;
