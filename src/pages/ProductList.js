import { Link, NavLink, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import Skeleton from "react-loading-skeleton";
import ReactPaginate from "react-paginate";

const types = ["Shirt", "Pants", "Jewelery"];

const sizes = ["S", "M", "L", "XL"];


function ProductList() {
  const [viewType, setViewType] = useState({ grid: true });
  const [showAdminBoard, setShowAdminBoard] = useState(false);


  const [username, setUsername] = useState(sessionStorage.getItem('username'))
  useEffect(() => {
    fetch(" http://localhost:9999/user/" + username)
      .then((x) => x.json())
      .then((x) => {
        if (x.role === "admin") {
          setShowAdminBoard(x.role)
          // console.log(showAdminBoard);
        }
      })
  }, []);
  function changeViewType() {
    setViewType({
      grid: !viewType.grid,
    });
  }
  //------------------------------------------------------------------------
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  const [nameGender, setNameGender] = useState('');
  let componentMounted = true;

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product))
  }

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("http://localhost:9999/products");
      if (componentMounted) {
        setData(await response.clone().json());
        setFilter(await response.json());
        setLoading(false);
      }

      return () => {
        componentMounted = false;
      };
    };

    getProducts();
  }, []);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");


  const handleTypeChange = (event) => {
    const type = event.target.value;
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const handleSizeChange = (event) => {
    const size = event.target.value;
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter((s) => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };


  const handleMinPriceChange = (event) => {
    setMinPrice(parseInt(event.target.value));
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(parseInt(event.target.value));
  };

  const filterProducts = () => {
    let filteredData = data;


    if (selectedTypes.length > 0) {
      filteredData = filteredData.filter((product) => selectedTypes.includes(product.type));
    }

    if (selectedSizes.length > 0) {
      filteredData = filteredData.filter((product) =>
        product.size.some((size) => selectedSizes.includes(size))
      );
    }

    filteredData = filteredData.filter((product) => product.price >= minPrice && product.price <= maxPrice);
    if (searchKeyword) {
      filteredData = filteredData.filter((product) =>
        product.title.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    }

    if (nameGender) {
      console.log("nameGender ", nameGender);
      filteredData = filteredData.filter(product => product.gender === nameGender)
      console.log("filteredData ", filteredData);

    }

    setFilter(filteredData);
  };

  useEffect(() => {
    filterProducts();
  }, [searchKeyword, selectedTypes, selectedSizes, minPrice, maxPrice, nameGender]);

  const filterProduct = (name) => {
    setNameGender(name)
  }

  const clearFilters = () => {
    setSelectedTypes([]);
    setSelectedSizes([]);
    setMinPrice(0);
    setMaxPrice(1000000);
  };

  // Phan trang--------------------------------------------------------------------
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 9;

  // Sử dụng các biến để tính vị trí bắt đầu và kết thúc của danh sách sản phẩm trên trang hiện tại.

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const ShowProducts = () => {
    return (
      <>
        {filter.map((product) => {
          return (
            <div id={product.id} key={product.id} className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
              <div className="card text-center h-100" key={product.id}>
                {showAdminBoard && (
                  <NavLink to={`/editProduct/${product.id}`} className="card-header">
                    Edit
                  </NavLink>
                )}
                <img
                  className="card-img-top p-3"
                  src={product.image}
                  alt="Card"
                  height={300}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {product.title.substring(0, 12)}...
                  </h5>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item lead">$ {product.price}</li>
                </ul>
                <div className="card-body">
                  <Link to={"/product/" + product.id} className="btn btn-dark m-1">
                    Buy Now
                  </Link>
                  <button className="btn btn-dark m-1" onClick={() => addProduct(product)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>

          );
        })}
      </>
    );
  };

  //------------------------------------------------------------------------------------
  const [sortBy, setSortBy] = useState(null);
  const sortProducts = (sortBy) => {
    if (sortBy === "name") {
      // Sắp xếp theo tên
      const sortedData = [...filter].sort((a, b) => a.title.localeCompare(b.title));
      setFilter(sortedData);
    } else if (sortBy === "price") {
      // Sắp xếp theo giá
      const sortedData = [...filter].sort((a, b) => a.price - b.price);
      setFilter(sortedData);
    }
  };

  return (
    <div className="container mt-5 py-4 px-xl-5">
      <div className="row">
        <div className="col-12">
          <h2 className="display-5 text-center">New Collections</h2>
          <hr />
        </div>
      </div>
      <div className="row justify-content-center"></div>
      <div className="buttons text-center py-5">
        <button className="btn btn-outline-dark btn-sm m-2" onClick={() => setFilter(data)}>All</button>
        <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("Men")}>Men</button>
        <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("Women")}>Women</button>
        <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("Kids")}>Kids</button>
        <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("Jewelery")}>Jewelery</button>
      </div>
      <div className="row mb-3 d-block d-lg-none">
        <div className="col-12">
          <div id="accordionFilter" className="accordion shadow-sm">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button fw-bold collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFilter"
                  aria-expanded="false"
                  aria-controls="collapseFilter"
                >
                  Filter Products
                </button>
              </h2>
            </div>
            <div
              id="collapseFilter"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionFilter"
            >

            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4 mt-lg-3">
        <div className="d-none d-lg-block col-lg-3">
          <div className="border rounded shadow-sm">
            <ul className="list-group list-group-flush rounded">
              <li className="list-group-item">
                <h5 className="mt-1 mb-1">Type</h5>
                <div className="d-flex flex-column">
                  {/* Checkbox cho Type */}
                  {types.map((t, i) => {
                    return (
                      <div key={i} className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={t}
                          checked={selectedTypes.includes(t)}
                          onChange={handleTypeChange}
                        />
                        <label className="form-check-label" htmlFor={`type-${i}`}>
                          {t}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </li>
              <li className="list-group-item">
                <h5 className="mt-1 mb-1">Size</h5>
                <div className="d-flex flex-column">
                  {/* Checkbox cho Size */}
                  {sizes.map((v, i) => {
                    return (
                      <div key={i} className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={v}
                          checked={selectedSizes.includes(v)}
                          onChange={handleSizeChange}
                        />
                        <label className="form-check-label" htmlFor={`size-${i}`}>
                          {v}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </li>
              <li className="list-group-item">
                <h5 className="mt-1 mb-2">Price Range</h5>
                <div className="d-grid d-block mb-3">
                  {/* Input cho giá */}
                  <div className="form-floating mb-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Min"
                      defaultValue={minPrice}
                      onChange={handleMinPriceChange}
                    />
                    <label htmlFor="minPrice">Min Price</label>
                  </div>
                  <div className="form-floating mb-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Max"
                      defaultValue={maxPrice}
                      onChange={handleMaxPriceChange}
                    />
                    <label htmlFor="maxPrice">Max Price</label>
                  </div>

                  <button className="btn btn-dark" onClick={clearFilters}>
                    Clear
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-lg-9">
          <div className="d-flex flex-column h-100">
            <div className="row mb-3">
              <div className="input-group">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Search products..."
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
                &nbsp;
                &nbsp;
                {showAdminBoard && (
                  <NavLink to="/addProduct" type="button" className="btn btn-danger">Add Product</NavLink>
                )}
                &nbsp;
                <div class="dropdown">
                  <button class="btn btn-outline-success dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                    Sort
                  </button>
                  <div class="dropdown-menu">
                    <button class="dropdown-item" type="button" onClick={() => sortProducts("name")}>Sort by Name</button>
                    <button class="dropdown-item" type="button" onClick={() => sortProducts("price")}>Sort by Price</button>
                  </div>
                </div>
              </div>


            </div>
            <div
              className={
                "row row-cols-1 row-cols-md-2 row-cols-lg-2 g-3 mb-4 flex-shrink-0 " +
                (viewType.grid ? "row-cols-xl-3" : "row-cols-xl-2")
              }
            >
              {<ShowProducts />}
            </div>
            <ReactPaginate
              pageCount={Math.ceil(filter.length / productsPerPage)}
              pageRangeDisplayed={5}
              marginPagesDisplayed={1}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              activeClassName={"active"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
