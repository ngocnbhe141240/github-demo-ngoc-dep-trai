import React from 'react';
import ReactDOM from 'react-dom/client';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import { Home, Product, Products, AboutPage, ContactPage, Cart, Login, Register, Checkout, PageNotFound } from "./pages"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HeaderAcc from './components/HeaderAcc';
import { Navbar } from './components';
import Admin from './pages/Admin';
import User from './pages/User';
import EditProduct from './pages/EditProduct';
import AddProduct from './pages/AddProduct';
import CustomerManager from './pages/CustomerManager';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div className='App'>
    <ToastContainer theme='colored'></ToastContainer>

    <BrowserRouter>
      <Provider store={store}>
        {/* <HeaderAcc></HeaderAcc> */}
        {/* <Navbar></Navbar> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Products />} />

          <Route path="/product/:id" element={<Product />} />
          <Route path="/addProduct" element={<AddProduct />} />

          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/cart/:username" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/:username" element={<User />} />
          <Route path="/admin/manager" element={<CustomerManager />} />
          <Route path="/user/:username" element={<User />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/product/*" element={<PageNotFound />} />
          <Route path="/editProduct/:productId" element={<EditProduct />} />
        </Routes>
      </Provider>
    </BrowserRouter>

  </div>
);