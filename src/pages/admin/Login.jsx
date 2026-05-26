import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Login.css";

function LoginAdmin(){

  const navigate = useNavigate();

  const [username,setUsername] =
  useState("");

  const [password,setPassword] =
  useState("");

  const handleLogin = () => {

    if(

      username === "admin"
      &&
      password === "admin123"

    ){

      localStorage.setItem(
        "adminLogin",
        "true"
      );

      navigate("/admin");

    }else{

      alert("Username atau password salah");

    }

  };

  return(

    <div className="login-page">

      <div className="login-card">

        <h1 className="login-title">
          Admin Login
        </h1>

        <p className="login-subtitle">

          Sistem Pendukung Keputusan
          Pemilihan Jurusan

        </p>

        <input
          type="text"
          placeholder="Username"
          className="login-input"
          value={username}
          onChange={(e)=>
            setUsername(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="login-input"
          value={password}
          onChange={(e)=>
            setPassword(e.target.value)
          }
        />

        <button
          className="login-button"
          onClick={handleLogin}
        >

          Login

        </button>

      </div>

    </div>

  );

}

export default LoginAdmin;