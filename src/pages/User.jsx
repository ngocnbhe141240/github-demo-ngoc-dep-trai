import React from 'react'
import { Footer, Navbar } from '../components'
import EditProfile from './../components/EditProfile';
import ChangePassword from '../components/ChangePassword';
const User = () => {


  return (
    <>
      <Navbar />
      <EditProfile />
      <ChangePassword />
      <Footer />
    </>
  )
}

export default User