import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'


const Navbar = () => {
    const state = useSelector(state => state.handleCart)
    const [user, setUser] = useState()
    const [username, setUsername] = useState()
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [showUserBoard, setShowUserBoard] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setUsername(sessionStorage.getItem('username'));

        if (username === '' || username === null) {
            navigate('/login')
        } else {
            if (sessionStorage.getItem('userrole') === "admin") {
                setShowAdminBoard(sessionStorage.getItem('userrole'))
            } else {
                setShowUserBoard(sessionStorage.getItem('userrole'))
            }

        }

    }, [])



    const LogOut = () => {
        sessionStorage.clear();
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
                <div className="container">
                    <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/">Shop</NavLink>
                    <button className="navbar-toggler mx-2" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav m-auto my-2 text-center">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">Home </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/product">Products</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/about">About</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/contact">Contact</NavLink>
                            </li>
                        </ul>
                        <div className="buttons text-center">
                            {showAdminBoard && (
                                <>
                                    <NavLink to={"/admin/" + username} className="btn btn-outline-dark m-2"> <i className="fa fa-user" aria-hidden="true"></i> {username}</NavLink>
                                    <NavLink to={"/admin/manager"} className="btn btn-outline-dark m-2"> <i class="fa fa-th-list" aria-hidden="true"></i> Manager</NavLink>
                                </>
                            )}

                            {showUserBoard && (
                                <NavLink to={"/user/" + username} className="btn btn-outline-dark m-2"> <i className="fa fa-user" aria-hidden="true"></i> {username}</NavLink>
                            )}

                            {
                                username ? (
                                    <>
                                        <NavLink to="/login" className="btn btn-outline-dark m-2" onClick={LogOut}><i class="fa fa-sign-out" aria-hidden="true"></i> Logout</NavLink>
                                        <NavLink to={"/cart/" + username} className="btn btn-outline-dark m-2"><i className="fa fa-cart-shopping mr-1"></i> Cart ({state.length}) </NavLink>
                                    </>

                                ) : (
                                    <>
                                        <NavLink to="/login" className="btn btn-outline-dark m-2"><i className="fa fa-sign-in-alt mr-1"></i> Login</NavLink>
                                        <NavLink to="/register" className="btn btn-outline-dark m-2"><i className="fa fa-user-plus mr-1"></i> Register</NavLink>
                                        <NavLink to={"/cart/" + username} className="btn btn-outline-dark m-2"><i className="fa fa-cart-shopping mr-1"></i> Cart ({state.length}) </NavLink>
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>


            </nav >
        </>
    )
}

export default Navbar