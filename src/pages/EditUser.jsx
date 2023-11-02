import React, { useEffect, useRef, useState } from 'react';
import { Row, Col, Container } from "react-bootstrap";
import apiClient from '../api/apiClient';
import Swal from "sweetalert2";
// create form to add new user (admin) with email,name,phone,password   
// and button to submit the form

export default function EditUser() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");

    const isMounted = useRef(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email || !name || !phone || !password || !address) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please fill all fields!",
            });
            return;
        }
        // validate format email
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please input valid email!",
            });
            return;
        }
        // validate format phone (indonesia)
        const phoneRegex = /^(^\+62\s?|^0)(\d{3,4}-?){2}\d{3,4}$/g;
        if (!phoneRegex.test(phone)) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please input valid phone number!",
            });
            return;
        }
        // validate password length
        if (password.length < 6) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Password must be at least 6 characters!",
            });
            return;
        }



        try {
            const response = await apiClient.post("/auth/register", {
                email,
                name,
                phone,
                level: "admin",
                password,
                address,
            });
            console.log(response.data);
            if (response.status === 201) {
                Swal.fire({
                    icon: "success",
                    title: "Success!",
                    text: "User has been added.",
                });
                // redirect to users page
                window.location.href = "/users";
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: response.data.message,
                });
            }
        } catch (error) {
            console.error('Error adding data', error);
            console.log(error.message);
        }
    };

    return (
        <Container>
            <Row>
                <Col md={{
                    span: 6,
                    offset: 3

                }}>
                    <h1>Add User</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                className="form-control"
                                type="email"
                                name="email"
                                id="email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                className="form-control"
                                type="password"
                                name="password"
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                className="form-control"
                                type="text"
                                name="name"
                                id="name"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input
                                className="form-control"
                                type="text"
                                name="phone"
                                id="phone"
                                onChange={(e) => setPhone(e.target.value)}
                                value={phone}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <textarea
                                className="form-control"
                                name="address"
                                id="address"
                                onChange={(e) => setAddress(e.target.value)}
                                value={address}
                            />
                        </div>
                        <button className="btn btn-primary">Submit</button>
                    </form>
                </Col>
            </Row>
        </Container>
    );
}


