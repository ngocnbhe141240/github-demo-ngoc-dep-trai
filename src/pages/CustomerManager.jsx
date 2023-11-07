import React from 'react';
import { Footer, Navbar } from '../components';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
const CustomerManager = () => {
    const [cusList, setCusList] = useState([]);
    const [data, setData] = useState({});
    useEffect(() => {
        fetch("http://localhost:9999/user")
            .then((res) => {
                if (!res.ok) {
                    return false;
                }
                return res.json();
            })
            .then((res) => {
                setCusList(res);
            });
    }, []);

    const handleChangeRole = (item) => {
        let id = item.id;
        let role;
        if (item.role === 'user') {
            role = 'admin';
        } else {
            role = 'user';
        }

        fetch(" http://localhost:9999/user/" + id)
            .then((x) => x.json())
            .then((x) => {
                setData(x);
            })

        const newUser = { ...data, role };
        // Gửi yêu cầu cập nhật vai trò lên máy chủ
        fetch(`http://localhost:9999/user/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        }).then(() => {
            toast.success('Change role successfully.');
            setCusList((prevCusList) =>
                prevCusList.map((item) => (item.id === id ? { ...item, role } : item))
            );
        });
    };

    const handleDelete = (id) => {
        const userToDelete = cusList.find((user) => user.id === id);
        if (!userToDelete) {
            return;
        }

        const confirmDelete = window.confirm('Do you want to delete the user ' + id);
        if (confirmDelete) {
            // Xác nhận xóa
            fetch(`http://localhost:9999/user/${id}`, {
                method: 'DELETE',
            }).then((res) => {
                if (res.ok) {
                    // Xóa thành công
                    const updatedList = cusList.filter((user) => user.id !== id);
                    setCusList(updatedList);
                    toast.success('User deleted successfully.');
                } else {
                    // Xóa không thành công
                    toast.error('Failed to delete user.');
                }
            });
        }
    };

    return (
        <>
            <Navbar />
            <div className='container py-5'>
                <h2 className='text-center'>Customer Manager</h2>
                <div className='row py-5'>
                    <div className='col'>
                        <div className='card'>
                            <div className='card-header'>
                                <h3>Customer Listing</h3>
                            </div>
                            <div className='card-body'>
                                <table className='table table-bordered'>
                                    <thead className='bg-dark text-white'>
                                        <tr>
                                            <th>Username</th>
                                            <th>Password</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cusList &&
                                            cusList.map((item) => (
                                                <tr key={item.id}>
                                                    <td>{item.id}</td>
                                                    <td>{item.password}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.role}</td>
                                                    <td>
                                                        {item.id === 'admin' ? (
                                                            <></>
                                                        ) : (
                                                            <>
                                                                <button
                                                                    onClick={() => handleChangeRole(item)}
                                                                    className='btn btn-primary'
                                                                >
                                                                    Change Role
                                                                </button>
                                                                &nbsp;&nbsp;
                                                                <button
                                                                    onClick={() => handleDelete(item.id)}
                                                                    className='btn btn-danger'
                                                                >
                                                                    Remove
                                                                </button>
                                                            </>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default CustomerManager