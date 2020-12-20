import React, { useState, useEffect } from "react";
import hrcLOGO from "./assests/hrc-logo.svg";
import artLOGO from "./assests/human-machine-hand-homepage.svg";
import "./style.css";

const WIDTH_THRESHOLD = 700;

function LoginScreen({ username, setUsername, password, setPassword,
      handleSubmit, invalidCredentials, setInvalidCredentials }) {
      const [changeLayout, setChangeLayout] = useState(false);
      let buttonState = () => {
            return username === "" || password === "";
      }

      let setChangedValue = (e, method) => {
            if (invalidCredentials) {
                  setInvalidCredentials(false);
            }
            method(e.target.value);
      }


      const handleResize = () => {
            if (window.screen.width < WIDTH_THRESHOLD) {
                  setChangeLayout(true);
            }
            else {
                  setChangeLayout(false);
            }
      }

      useEffect(() => {
            handleResize();
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
      }, []);


      return (
            <div style={{ display: "flex", flex: "100%", flexDirection: "column", alignItems: "flex-start", flexWrap: "wrap" }}>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                        <img style={{ marginLeft: "10px" }} src={hrcLOGO} alt="hrc-logo" className={"hrcLogo"} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                        <img src={artLOGO} alt="art" className={"artLogo"} />
                  </div>
                  <div style={{
                        display: "flex", flexDirection: "row",
                        flexWrap: "wrap", justifyContent: changeLayout ? "center" : "initial"
                  }}>
                        <div style={{ display: "flex" }} className="heading">
                              <span className="heading-text" style={{ fontSize: changeLayout ? "4vw" : "2vw" }}>ORDER MANAGEMENT APPLICATION</span>
                        </div>

                        <div className={changeLayout ? "responsive" : "default"} >
                              < span className={"signin"} > Sign in</span>
                              <br />
                              <form >
                                    < label htmlFor="username">Username</label><br />
                                    <input className={"input-box"} type="text" id="username" name="username" value={username}
                                          onChange={(e) => setChangedValue(e, setUsername)} /><br /><br />
                                    <label htmlFor="password">Password</label><br />
                                    <input className={"input-box"} type="password" id="password" name="password"
                                          onChange={(e) => setChangedValue(e, setPassword)} autoComplete="on" /><br></br>
                              </form>
                              {invalidCredentials ? <div className="login-error">Invalid Credentials</div> :
                                    <div style={{ color: "white", fontFamily: "monospace" }} >^_^</div >}
                              <br />
                              <div style={{ display: "flex", flexDirection: "row-reverse" }}>
                                    <button className="submit-button" value="Sign in" disabled={buttonState()}
                                          onClick={() => { handleSubmit() }} ><span className="button-text">Sign in</span></button>
                              </div>
                        </div>

                  </div >
            </div >);
};

export default LoginScreen;
