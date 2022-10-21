import './App.css';
import Login from './componets/Login';
import Chatwindow from './componets/Chatwindow';
import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

function App() {
  const [allmessages, setAllMessages] = useState([]);
  const [isLoggged, setIsLogged] = useState(false);
  const [localUser, setLocalUser] = useState('');
  const [message, setMessage] = useState('');
  const [joins, setJoins] = useState('');
  const ref = useRef();

  useEffect(() => {
    ref.current = io('https://socket-demo-jond.herokuapp.com');
    ref.current.on('broadcast', (data) => {
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
    ref.current.emit('Channel', { user: localUser, message: null });
  };

  const sendMessage = (mgs) => {
    ref.current.emit('Channel', { user: localUser, message: mgs });
  };

  return (
    <div className='App'>
      {isLoggged ? (
        <Chatwindow
          user={localUser}
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
          allmessages={allmessages}
          joins={joins}
          localUser={localUser}
        />
      ) : (
        <Login
          joinChannel={joinChannel}
          user={localUser}
          setUser={setLocalUser}
          setIsLogged={setIsLogged}
        />
      )}
    </div>
  );
}

export default App;
