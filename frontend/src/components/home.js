import React, { useState } from "react";
import LoginScreen from "./loginScreen.js";
import { Redirect, withRouter } from 'react-router-dom';
import "./style.css";

const DATA = {
      SOURCE: "http://localhost:8080/1704389/", //               http://localhost:8080/1704389/ 
      LEVEL_1_APPROVAL_AMOUNT: 10000
};


function Home({ cookies }) {
      const [username, setUsername] = useState("");
      const [password, setPassword] = useState("");
      const [invalidCredentials, setInvalidCredentials] = useState(false);
      document.title = "Login";

      const loginAvailable = () => {
            const level = cookies.get("level");
            if (((level === "1") || (level === "2") || (level === "3"))) {
                  return 1;
            }
            return 0;
      }

      const handleSubmit = () => {
            if (invalidCredentials) {
                  setInvalidCredentials(false);
            }
            let req = new XMLHttpRequest();
            req.onreadystatechange = function () {
                  if (this.readyState === 4 && this.status === 200) {
                        const res = this.responseText;
                        if (res[0] === "1") {
                              const hours = 0;
                              const minutes = 30;
                              const age = 60 * minutes * (hours === 0 ? 1 : 60 * hours);
                              cookies.set('username', username,
                                    { path: '/', maxAge: age });
                              cookies.set('level', res[res.length - 1],
                                    { path: '/', maxAge: age });
                        }
                        else if (res === "0") {
                              setInvalidCredentials(true);
                        }
                        else {
                              alert("Sql Error");
                        }
                  }
            }
            req.open("POST", DATA.SOURCE + "ValidateLogin", true);
            req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            req.send("username=" + username + "&password=" + password);

      }

      return (loginAvailable() ?
            <Redirect to="/dashboard" /> :
            <LoginScreen username={username} setUsername={setUsername} password={password}
                  setPassword={setPassword} handleSubmit={handleSubmit}
                  invalidCredentials={invalidCredentials} setInvalidCredentials={setInvalidCredentials} />);
};

export default withRouter(Home);
