import React, { useState } from "react";
import { Route, useHistory } from "react-router-dom";
import axiosWithAuth from "./utils/axiosWithAuth";
import Login from "./components/Login";
import "./styles.scss";
import PrivateRoute from "./PrivateRoutes/PrivateRoute";
import BubblePage from "./components/BubblePage";

const initialState = {
  username: "username",
  password: "password",
  loading: false,
  error: "",
};

function App() {
  const history = useHistory();
  const [userInfo, setUserInfo] = useState(initialState);

  const handleChange = e => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
      error: "",
    });
  };

  const handleLogin = e => {
    e.preventDefault();

    setUserInfo({
      ...userInfo,
      loading: true,
      error: "",
    });

    setTimeout(() => {
      axiosWithAuth()
        .post("/api/login", userInfo)
        .then(res => {
          setUserInfo({
            ...userInfo,
            loading: false,
            error: "",
          });
          const token = res.data.payload;

          localStorage.setItem("token", token);
          setUserInfo({ ...userInfo, password: "" });
          history.push("/bubblesPage");
        })
        .catch(err => {
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
        render={props => (
          <Login
            {...props}
            userInfo={userInfo}
            handleLogin={handleLogin}
            handleChange={handleChange}
          />
        )}
      />

      <PrivateRoute path='/bubblesPage' component={BubblePage} />
    </div>
  );
}

export default App;
