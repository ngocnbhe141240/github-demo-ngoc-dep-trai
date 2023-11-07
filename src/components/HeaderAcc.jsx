import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


const HeaderAcc = () => {
    const [displayUsername, setDisplayUsername] = useState('')
    const [showMenu, setshowMenu] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const state = useSelector(state => state.handleCart)
    useEffect(() => {
        if (location.pathname === '/login' || location.pathname === '/register') {
            setshowMenu(false)
        } else {
            setshowMenu(true)
        }

        let username = sessionStorage.getItem('username');
        if (username === '' || username === null) {
            navigate('/login')
        } else {
            setDisplayUsername(username)
        }
    }, [location])

    const LogOut = () => {
        sessionStorage.clear();
    }

    return (
        <div>

            <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
                <div className="container">
                    <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/"> React Ecommerce</NavLink>
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
                            {showMenu &&
                                <>
                                    <NavLink to="/customer" className="btn btn-outline-dark m-2"> Customer</NavLink>
                                    <NavLink to="/login" className="btn btn-outline-dark m-2" onClick={LogOut}><i className="fa fa-sign-in-alt mr-1"></i> Logout</NavLink>
                                    <NavLink to="/cart" className="btn btn-outline-dark m-2"><i className="fa fa-cart-shopping mr-1"></i> Cart ({state.length}) </NavLink>
                                </>
                            }
                            <>
                                <NavLink to="/customer" className="btn btn-outline-dark m-2"> Customer</NavLink>
                                <NavLink to="/login" className="btn btn-outline-dark m-2" onClick={LogOut}><i className="fa fa-sign-in-alt mr-1"></i> Logout</NavLink>
                                <NavLink to="/cart" className="btn btn-outline-dark m-2"><i className="fa fa-cart-shopping mr-1"></i> Cart ({state.length}) </NavLink>
                            </>
                        </div>
                    </div>
                </div>


            </nav >
        </div>
    )
}

export default HeaderAcc