import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="mb-0 text-center bg-light">
        <div className="d-flex align-items-center justify-content-center pb-2">
          <div className="col-md-6">
            <p className="mb-3 mb-md-0">© by {" "}
              <a className="text-decoration-underline text-dark fs-6" target="_blank" rel="noreferrer">NGOC NB</a>
            </p>
            <a className="text-dark fs-4"  target="_blank" rel="noreferrer">
              <i className="fa fa-github"></i>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
