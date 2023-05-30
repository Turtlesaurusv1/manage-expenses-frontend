import React, { useState } from "react";
import "./style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type ErrorLoggedType = {
  borderColor: "red" | "gray";
  message?: string;
};

interface LoginPageProps {
  onLoginSubmit: (username: string, password: string) => void;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLoginSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/api/v1/auth/web-login",
        {
          email: username,
          password: password,
        }
      );

      if (response.status === 200) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <body>
      <div className="login-box">
        <form onSubmit={handleLoginSubmit}>
          <div className="user-box">
            <input
              id="username"
              required
              value={username}
              onChange={handleUsernameChange}
            />
            <label htmlFor="username">Username</label>
          </div>
          <div className="user-box">
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={handlePasswordChange}
            />
            <label htmlFor="password">Password</label>
          </div>
          <center>
            <a href="#" type="submit" onClick={handleLoginSubmit}>
              LOGIN
              <span></span>
            </a>
          </center>
        </form>
      </div>
    </body>
  );
};

export default LoginPage;
