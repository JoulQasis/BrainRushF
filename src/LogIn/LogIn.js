import LoginCss from "./LogIn.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { authActions } from "../store";

function LogIn() {

  const dispatch = useDispatch();
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    username: "",
    password: ""
  })

  const handleChange = (e) => {
    setInputs(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/login', {
        username: inputs.username,
        password: inputs.password
      });
      const data = await res.data;
      dispatch(authActions.login({ user: data.user }));
      return data;
    } catch (err) {
      console.log(err);
      // handle error
    }

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // send http request
    sendRequest()
      .then(() => history("/"))
  }
  const navigateToSignUp = () => {
    // 👇️ navigate to /LogIn button
    history("/SignUp");
  };
  return (
    <main className={LoginCss.main}>
      <div className={LoginCss.container}>
        <div>
          <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <input
              name="username"
              onChange={handleChange}
              className={LoginCss.input}
              type="text"
              placeholder="Username"
              value={inputs.username}
            ></input>
            <input
              name="password"
              onChange={handleChange}
              className={LoginCss.input}
              type="password"
              placeholder="Password"
              value={inputs.password}
            />
            <button className={LoginCss.loginbutton2} type="submit">Login</button>
          </form>
        </div>
        <div className="overlay-panel">
          <p className={LoginCss.p}> You haven't tried our games yet!?</p>
          <button className={LoginCss.loginbutton3} onClick={navigateToSignUp}>
            Go Sign Up!
          </button>
        </div>
      </div>
    </main>
  );
}

export default LogIn;
