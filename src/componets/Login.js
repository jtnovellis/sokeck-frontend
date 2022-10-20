import React from 'react';
import '../sytles/Login.css';

const Login = ({ setIsLogged, user, setUser, joinChannel }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLogged(true);
    joinChannel();
  };

  return (
    <div className='login__container'>
      <form onSubmit={handleSubmit} className='form__login'>
        <input
          value={user}
          onChange={(e) => setUser(e.target.value)}
          type='text'
          placeholder='Your username'
        />
        <button>Sign in</button>
      </form>
    </div>
  );
};

export default Login;
