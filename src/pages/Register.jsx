import React, { useState } from 'react'
import { Footer, Navbar } from "../components";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
const Register = () => {

    const [id, setId] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fullname, setFullname] = useState('')
    const [role, setRole] = useState('user')
    const [purchase_history, setpurchase_history] = useState([])
    const navigate = useNavigate()

    const IsValidate = () => {
        let isproceed = true;
        let errormessage = 'Please enter the value in ';
        if (id === null || id === '') {
            isproceed = false;
            errormessage += 'Username'
        } else if (fullname === null || fullname === '') {
            isproceed = false;
            errormessage += 'Full name'
        } else if (email === null || email === '') {
            isproceed = false;
            errormessage += 'Email address'
        } else if (password === null || password === '') {
            isproceed = false;
            errormessage += 'Password'
        }
        if (!isproceed) {
            toast.warning(errormessage)
        } else {
            if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
            } else {
                isproceed = false;
                toast.warning('Please enter the valid email')
            }
        }
        return isproceed;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let regObj = { id, fullname, email, password, role, purchase_history }
        console.log(regObj);
        if (IsValidate()) {
            fetch("http://localhost:9999/user", {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(regObj)
            }).then((res) => {
                toast.success('Registered successfully.')
                navigate('/login');
            }).catch((err) => {
                toast.error('Failed :' + err.message);
            });
        }
    }

    return (
        <>
            <Navbar />
            <div className="container my-3 py-3">
                <h1 className="text-center">Register</h1>
                <hr />
                <div className="row my-4 h-100">
                    <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
                        <form onSubmit={handleSubmit}>
                            <div className="form my-3">
                                <label for="Name">Username</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="Name"
                                    placeholder="Enter Username"
                                    value={id}
                                    onChange={e => setId(e.target.value)}
                                // required
                                />
                            </div>
                            <div className="form my-3">
                                <label for="Name">Full Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="Name"
                                    placeholder="Enter Your Name"
                                    value={fullname}
                                    onChange={e => setFullname(e.target.value)}
                                // required
                                />
                            </div>

                            <div className="form my-3">
                                <label for="Email">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="Email"
                                    placeholder="name@gmail.com"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                // required
                                />
                            </div>
                            <div className="form  my-3">
                                <label for="Password">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="Password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                // required
                                />
                            </div>
                            <div className="my-3">
                                <p>Already has an account? <Link to="/login" className="text-decoration-underline text-info">Login</Link> </p>
                            </div>
                            <div className="text-center">
                                <button className="my-2 mx-auto btn btn-dark" type="submit">
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Register