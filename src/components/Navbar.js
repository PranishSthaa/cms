import React from 'react';

const Navbar = () => {
    return (
        <>
            <div className="fixed-top">
                <header className="p-2 bg-dark text-white">
                    <div className="container">
                        <div className="navbar d-flex flex-wrap align-items-center justify-content-center">
                            <div className="col-4">
                                <a href="/" class="md-auto text-light text-decoration-none">
                                    <span class="navbar-brand">CMS</span>
                                </a>
                            </div>

                            <div className="col-4">
                                <ul className="nav align-items-center justify-content-center">
                                    <li><a href="#" className="nav-link px-2 text-secondary">Home</a></li>
                                    <li><a href="#" className="nav-link px-2 text-white">About</a></li>
                                    <li><a href="#" className="nav-link px-2 text-white">Contact</a></li>

                                </ul>
                            </div>

                            <div className="col-4 text-end">
                                <button type="button" className="btn btn-outline-light me-2">Login</button>
                                <button type="button" className="btn btn-outline-success">Sign Up</button>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        </>
    )
}

export default Navbar