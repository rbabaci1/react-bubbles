import React, { useState } from 'react';

const initialState = {
  username: '',
  password: '',
};

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [userInfo, setUserInfo] = useState(initialState);

  return (
    <div className='login-form'>
      <h1>Welcome to the Bubble App!</h1>

      <h1>Log in</h1>

      <form>
        <label>
          Type your username:
          <input type='text' placeholder='...username' required />
        </label>

        <label>
          Type your password:
          <input type='text' placeholder='...password' required />
        </label>
      </form>
    </div>
  );
};

export default Login;
