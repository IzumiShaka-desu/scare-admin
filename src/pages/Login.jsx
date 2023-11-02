import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient";
import Swal from "sweetalert2";
import { Row, Col } from "react-bootstrap";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (event) => {
        // event.preventDefault();
        if (!email || !password) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please fill email and password fields!",
            });
            return;
        }

        try {
            // event.preventDefault();
            const response = await fetch("http://localhost:3000/auth/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            console.log(data);
            // check response status code is success or not
            if (response.status === 200) {
                // set token to local storage
                localStorage.setItem("token", data.token);
                // redirect to dashboard
                window.location.href = "/";
            } else {
                // show error message
                // setError(data.message);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: data.message,
                });
            }

            // event.preventDefault();
            // console.log(response.data);
            // const token = response.data.token;
            // localStorage.setItem("token", token);
            //   redirect using raw js
            // window.location.href = "/";
        } catch (error) {
            console.error('Error adding data', error);
            console.log(error.message);

            // setError(error.message);
        }
    };

    return (
        <div className="container">
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <div className="">
                        <h1>Login</h1>

                        <div className="form-control">
                            <div className="form-group">
                                <label >Email address</label>

                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                                <small id="emailHelp" className="form-text text-muted">please input your email</small>
                            </div>
                            <div className="form-group">
                                <label >Password</label>

                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                                <small id="emailHelp" className="form-text text-muted">please type your password</small>
                            </div>
                            <button className="btn btn-primary" onClick={(e) => handleLogin(e)}> Login </button>
                        </div>
                        {error && <p>{error}</p>}
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default Login;