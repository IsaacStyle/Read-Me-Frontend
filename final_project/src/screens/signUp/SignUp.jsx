import React, { useState } from "react";
import { Navigate } from "react-router-dom";
// import user authentication 
import "./signup.css";

export default function SignUp() {

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
    valid: ""
  });

  const [username, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [valid, setValid] = useState("")
  
    return(
  <div className="sign-up-main-container">
    <h1> Sign up page</h1>
  </div>
    )
}
