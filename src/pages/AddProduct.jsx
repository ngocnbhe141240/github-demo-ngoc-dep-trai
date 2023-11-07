import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";
import { useRef } from "react";
import { Footer, Navbar } from "../components";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const AddProduct = () => {
    const navigate = useNavigate();


    const [loading, setLoading] = useState(false);
    const [img, setImg] = useState("");
    const size = ["S", "M", "L", "XL"]
    const rating = { rate: 0, count: 250 }
    const title = useRef();
    const price = useRef();
    const gender = useRef();
    const image = useRef();
    const type = useRef();
    const [isChange, setIsChange] = useState(true);

    const updateImage = (e) => {
        const link = e.target.value;
        const links = link.split("\\");
        const linkname = gender.current.value;
        setImg(`../../images/Product/${linkname}/${links.pop()}`)
        console.log(img);
    }

    const handleAdd = () => {
        if (title.current.value == "" || gender.current.value == ""
            || price.current.value == "" || type.current.value == ""
            && image.current.value == "") {
            toast.error("Enter complete information")
        }
        else {
            const link = image.current.value;
            const links = link.split("\\");
            const linkname = gender.current.value;

            const newproduct = {
                title: title.current.value,
                price: price.current.value,
                type: type.current.value,
                gender: gender.current.value,
                image: img,
                size,
                rating
            }
            console.log("newproduct ", newproduct);
            fetch(`http://localhost:9999/products`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newproduct),
            });
            toast.success("Add Successfully")
            setIsChange(!isChange)
        }
        navigate("/product");

    }

    const ShowProduct = () => {
        return (
            <>
                <div className="container my-5 py-5">
                    <div className="row">
                        <div className="col-12">
                            <h2 className="display-5 text-center">Add new Product</h2>
                            <hr />
                        </div>
                    </div>
                    <form onSubmit={handleAdd}>
                        <div className="row">
                            <div className="col-md-6 col-sm-12 py-5">
                                <div className="form-group">
                                    <label for="image" class="col-sm-2 col-form-label"></label>
                                    <div class="col-sm-10">
                                        <input
                                            type="file"
                                            className="form-control form-control-lg"
                                            id="image"
                                            ref={image}
                                            onChange={(e) => updateImage(e)} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-md-6 py-5">


                                <div class="form-group row">
                                    <label for="title" class="col-sm-2 col-form-label">Title</label>
                                    <div class="col-sm-10">
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            id="title"
                                            placeholder="Enter Title"
                                            ref={title}
                                        />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label for="gender" class="col-sm-2 col-form-label">Gender</label>
                                    <div class="col-sm-10">
                                        <select
                                            className="custom-select custom-select-lg mb-3"
                                            id="gender"
                                            placeholder="Enter Gender"
                                            ref={gender}
                                        >
                                            <option value="Men">Men</option>
                                            <option value="Women">Women</option>
                                            <option value="Kids">Kids</option>
                                            <option value="Jewelery">Jewelery</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label for="price" class="col-sm-2 col-form-label">Price</label>
                                    <div class="col-sm-10">
                                        <input
                                            type="number"
                                            className="form-control form-control-lg"
                                            id="price"
                                            placeholder="Enter Price"
                                            ref={price}
                                        />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label for="type" class="col-sm-2 col-form-label">Type</label>
                                    <div class="col-sm-10">
                                        <select
                                            className="custom-select custom-select-lg mb-3"
                                            id="type"
                                            placeholder="Enter Type"
                                            ref={type}
                                        >
                                            <option value="Shirt">Shirt</option>
                                            <option value="Pants">Pants</option>
                                            <option value="Jewelery">Jewelery</option>
                                        </select>
                                    </div>
                                </div>


                                <button
                                    className="btn btn-outline-dark"
                                >
                                    Submit
                                </button>
                                <Link to="/product" className="btn btn-dark mx-3">
                                    Cancle
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </>
        );
    };

    const Loading = () => {
        return (
            <>
                <div className="container my-5 py-2">
                    <div className="row">
                        <div className="col-md-6 py-3">
                            <Skeleton height={400} width={400} />
                        </div>
                        <div className="col-md-6 py-5">
                            <Skeleton height={30} width={250} />
                            <Skeleton height={90} />
                            <Skeleton height={40} width={70} />
                            <Skeleton height={50} width={110} />
                            <Skeleton height={120} />
                            <Skeleton height={40} width={110} inline={true} />
                            <Skeleton className="mx-3" height={40} width={110} />
                        </div>
                    </div>
                </div>
            </>
        );
    };
    return (
        <>
            <Navbar />
            <div className="container">
                <div className="row">{loading ? <Loading /> : <ShowProduct />}</div>

            </div>
            <Footer />
        </>
    )
}

export default AddProduct