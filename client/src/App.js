import React, { useState } from 'react';
import { Route, useHistory } from 'react-router-dom';
import axiosWithAuth from './utils/axiosWithAuth';
import Login from './components/Login';
import './styles.scss';
import PrivateRoute from './PrivateRoutes/PrivateRoute';
import BubblePage from './components/BubblePage';

const initialState = {
  username: '',
  password: '',
  loading: false,
  error: '',
};

function App() {
  const history = useHistory();
  const [userInfo, setUserInfo] = useState(initialState);

  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setUserInfo({
      ...userInfo,
      loading: true,
    });

    setTimeout(() => {
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
          history.push('/bubblesPage');
        })
        .catch((err) => {
          setUserInfo({
            ...userInfo,
            loading: false,
            error: "That's not correct, Try again?",
          });
          console.error(err);
        });
    }, 1500);
  };

  return (
    <div className='App'>
      <Route
        exact
        path='/'
        render={(props) => (
          <Login
            {...props}
            userInfo={userInfo}
            handleLogin={handleLogin}
            handleChange={handleChange}
          />
        )}
      />
      {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}
      <PrivateRoute path='/bubblesPage' component={BubblePage} />
    </div>
  );
}

export default App;
