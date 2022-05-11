import React from "react";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import Axios from "axios";
Axios.defaults.withCredentials = true;
function LoginForm() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [text, settext] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [redirect2, setRedirect2] = useState(false);
  const [mailplaceholder, setmailplaceholder] = useState("Password");

  function otpremove() {
    setmailplaceholder("Password");
    document.getElementById("signinbtn").style.display = "";
    document.getElementById("forgetpassbtn").innerHTML = "Forgot Password";
  }
  function otptake() {
    setmailplaceholder("OTP");
    document.getElementById("signinbtn").style.display = "none";
    document.getElementById("forgetpassbtn").innerHTML = "Verify OTP";
  }

  if (redirect) {
    return <Redirect to="/viewAsset1" />;
  }
  if (redirect2) {
    return (
      <Redirect
        to={{
          pathname: "/passReset",
          state: { email: email },
        }}
      />
    );
  }
  function resetPass() {
    if (email) {
      setRedirect(null);
      Axios.post("http://localhost:3002/getOTPforget", { email: email }).then(
        (response) => {
          if (response && response.status == 201) {
            setRedirect2(true);
          } else {
            console.log(response);
            settext("This Email is not a registered email");
          }
        }
      );
    } else {
      settext("Enter Email First! ");
    }
  }

  function handleLogin(e) {
    settext(null);
    e.preventDefault(e);
    if (email && pass) {
      Axios.post("http://localhost:3002/login", {
        email: email,
        password: pass,
        withCredentials: true,
      }).then((response) => {
        console.log(response);
        if (response.status === 201) {
          setRedirect(true);
        } else if (response.status === 231) {
          settext(response.data.error);
        }
      });
    } else if (email) {
      settext("Enter Password! ");
    } else settext("Enter Email! ");
  }
  return (
    <div>
      <form>
        <h1 className="loginText">Sign In</h1>
        <input
          spellCheck={false}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          className="email"
          placeholder="Email"
        />
        <br />
        <input
          type="password"
          className="password"
          onChange={(e) => setPass(e.target.value)}
          placeholder={mailplaceholder}
        />
        <br />
        <button id="signinbtn" onClick={handleLogin} className="lanButton">
          Sign In
        </button>
        <button id="forgetpassbtn" onClick={resetPass} className="lanButton">
          Forgot Password
        </button>
        <br />
        <p>{text}</p>
      </form>
    </div>
  );
}

export default LoginForm;
