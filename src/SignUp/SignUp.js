import React from 'react'
import SignUpCss from "./SignUp.module.css"
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
function SignUp() {
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
    const res = await axios.post('https://brainrushb.onrender.com/api/signup', {
      name: inputs.name,
      username: inputs.username,
      password: inputs.password
    }).catch(err => console.log(err));
    const data = await res.data;
    return data;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    // send http request
    sendRequest().then(() => history("/login"))
  }
  const navigateToLogIn = () => {
    // 👇️ navigate to /LogIn button
    history("/LogIn");
  };

  return (
    <main className={SignUpCss.main}>
      <div className={SignUpCss.container}>
        <div>
          <form onSubmit={handleSubmit}>
            <h1>Sign up!</h1>
            <input
              name="name"
              onChange={handleChange}
              className={SignUpCss.input}
              type="text"
              placeholder="Name"
              value={inputs.name}
            ></input>
            <input
              name="username"
              onChange={handleChange}
              className={SignUpCss.input}
              type="text"
              placeholder="Username"
              value={inputs.username}
            ></input>
            <input
              name="password"
              onChange={handleChange}
              className={SignUpCss.input}
              type="password"
              placeholder="Password"
              value={inputs.password}
            />
            <button className={SignUpCss.loginbutton2} type="submit">Sign up</button>
          </form>
        </div>
        <div className="overlay-panel">
          <p className={SignUpCss.p}> You are a gamer?</p>
          <button className={SignUpCss.loginbutton3} onClick={navigateToLogIn}>
            Log in
          </button>
        </div>
      </div>
    </main>
  )
}

export default SignUp