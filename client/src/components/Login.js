import React from 'react';

const Login = ({ handleLogin, userInfo, handleChange }) => {
  const { username, password, loading, error } = userInfo;

  return (
    <>
      <div className='login-form'>
        <h1>Welcome to the Bubble App!</h1>

        <h1 className='login-header'>Log in</h1>

        {error && <span style={{ color: 'red' }}>{error}</span>}

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
