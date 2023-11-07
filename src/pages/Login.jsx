import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Footer, Navbar } from "../components";
import { toast } from "react-toastify";

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const ProceedLogin = (e) => {
    e.preventDefault()
    if (validate()) {
      // console.log('process');
      fetch("http://localhost:9999/user/" + username).then((res) => {
        return res.json();
      })
        .then((resp) => {
          // console.log(resp)
          if (Object.keys(resp).length === 0) {
            toast.error('Please Enter valid Username');
          } else {
            if (resp.password === password) {
              toast.success('Success');
              sessionStorage.setItem('username', username);
              sessionStorage.setItem('userrole', resp.role);
              navigate('/')
            } else {
              toast.error('Please Enter valid credentials');
            }
          }
        })
        .catch((err) => {
          toast.error('Login Failed due to :' + err.message);
        });
    }
  }

  const validate = () => {
    let result = true;
    if (username === null || username === '') {
      result = false
      toast.warning('Please Username')
    } else if ((password === null || password === '')) {
      result = false
      toast.warning('Please Enter Password')
    }
    return result;
  }

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Login</h1>
        <hr />
        <div class="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={ProceedLogin}>
              <div class="my-3">
                <label for="display-4">Username</label>
                <input
                  type="text"
                  class="form-control"
                  id="floatingInput"
                  placeholder="Username"
                  value={username}
                  onChange={e => { setUsername(e.target.value) }}
                />
              </div>
              <div class="my-3">
                <label for="floatingPassword display-4">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  value={password}
                  onChange={e => { setPassword(e.target.value) }}
                />
              </div>
              <div className="my-3">
                <p>New Here? <Link to="/register" className="text-decoration-underline text-info">Register</Link> </p>
              </div>
              <div className="text-center">
                <button class="my-2 mx-auto btn btn-dark" type="submit">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
