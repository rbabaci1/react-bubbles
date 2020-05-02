import React, { useState } from 'react';

const initialState = {
  username: '',
  password: '',
};

const Login = ({ handleLogin }) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [userInfo, setUserInfo] = useState(initialState);

  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(userInfo);
  };

  return (
    <>
      <div className='login-form'>
        <h1>Welcome to the Bubble App!</h1>

        <h1 className='login-header'>Log in</h1>

        <form onSubmit={handleSubmit}>
          <label>
            Type your username:
            <input
              onChange={handleChange}
              type='text'
              name='username'
              placeholder='...username'
              required
            />
          </label>

          <label>
            Type your password:
            <input
              onChange={handleChange}
              type='text'
              name='password'
              placeholder='...password'
              required
            />
          </label>

          <section className='btn-section'>
            <button>Login</button>
          </section>
        </form>
      </div>
    </>
  );
};

export default Login;
