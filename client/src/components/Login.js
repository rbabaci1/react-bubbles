import React, { useState } from 'react';

const Login = ({ handleLogin, userInfo, handleChange }) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const { username, password, loading, error } = userInfo;

  return (
    <>
      <div className='login-form'>
        <h1>Welcome to the Bubble App!</h1>

        <h1 className='login-header'>Log in</h1>

        {error && <span>{error}</span>}

        <form onSubmit={handleLogin}>
          <label>
            Type your username:
            <input
              onChange={handleChange}
              value={username}
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
              value={password}
              type='password'
              name='password'
              placeholder='...password'
              required
            />
          </label>

          <section className='btn-section'>
            <button disabled={loading}>
              {loading ? 'Loading...' : 'Login'}
            </button>
          </section>
        </form>
      </div>
    </>
  );
};

export default Login;
