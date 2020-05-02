import React, { useState } from 'react';
import { Route, useHistory } from 'react-router-dom';
import axiosWithAuth from './utils/axiosWithAuth';
import Login from './components/Login';
import './styles.scss';

function App() {
  const history = useHistory();

  const handleLogin = (userInfo, setUserInfo) => {
    setUserInfo({
      ...userInfo,
      loading: true,
    });
    axiosWithAuth()
      .post('/login', userInfo)
      .then((res) => {
        setUserInfo({
          ...userInfo,
          loading: false,
          error: '',
        });
        const token = res.data.payload;

        localStorage.setItem('token', token);
        history.push('/bubblePage');
      })
      .catch((err) => {
        setUserInfo({
          ...userInfo,
          loading: false,
          error: "That's not correct, Try again?",
        });
        console.error(err);
      });
  };

  return (
    <div className='App'>
      <Route
        exact
        path='/'
        render={(props) => <Login {...props} handleLogin={handleLogin} />}
      />
      {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}
    </div>
  );
}

export default App;
