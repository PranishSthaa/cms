import React from 'react';

const Navbar = () => {
    return (
        <>
            <header className="p-2 bg-dark text-white fixed-top">
                <div className="container">
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <a href="/" class="me-md-auto text-light text-decoration-none">
                            <span class="navbar-brand">CMS</span>
                        </a>

                        <ul className="nav me-lg-auto mb-2 align-items-center justify-content-center">
                            <li><a href="#" className="nav-link px-2 text-secondary">Home</a></li>
                            <li><a href="#" className="nav-link px-2 text-white">About</a></li>
                            <li><a href="#" className="nav-link px-2 text-white">Contact</a></li>

                        </ul>

                        <div className="text-end">
                            <button type="button" className="btn btn-outline-light me-2">Login</button>
                            <button type="button" className="btn btn-outline-success">Sign Up</button>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Navbar