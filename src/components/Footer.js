import React from 'react'

const Footer = () => {
    return (
        <>
            <div className="container sticky-top">
                <footer className="footer d-flex flex-wrap align-items-center py-2 border-top">
                    <p className="col-md-4 mb-0 text-muted">© 2022 Pranish Shrestha</p>

                    <div className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto ">
                        <a href="/" className="link-dark text-decoration-none navbar-brand">
                            CMS
                        </a>
                    </div>

                    <ul className="nav col-md-4 justify-content-end">
                        <li className="nav-item"><a href="#" className="nav-link px-2 link-dark">Home</a></li>
                        <li className="nav-item"><a href="#" className="nav-link px-2 link-dark">About</a></li>
                        <li className="nav-item"><a href="#" className="nav-link px-2 link-dark">Contact</a></li>

                    </ul>
                </footer>
            </div>
        </>
    )
}

export default Footer