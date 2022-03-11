import React from 'react';
import { SendOutlined } from '@mui/icons-material';


const Signup = () => {
    return (
        <>
            <div className="container mt-3">
                <div className="row">
                    <div className="col-8">
                        <p className="display-5">Contact us to signup</p>
                        <p className="lead">Fill the form and send it to us to get a quote for CMS. <br />After that we can setup your CMS according to your preferences.</p>
                    </div>
                    <div className="col-4 d-flex flex-column min-vh-100 align-items-center">
                        <div className="w-100">
                            <p className="display-6">Tell us about yourself</p>
                            <div className="form-group py-3">
                                <input type="text" className="form-control" placeholder="Name" name="name" id="name" />
                            </div>
                            <div className="form-group pb-3">
                                <input type="text" className="form-control" placeholder="Contact Number" name="contact" id="contact" />
                            </div>
                            <div className="form-group pb-3">
                                <input type="email" className="form-control" placeholder="Contact Email" name="email" id="email" />
                            </div>
                            <div className="form-group pb-3">
                                <input type="text" className="form-control" placeholder="Institution Name" name="iName" id="iName" />
                            </div>
                            <div className="form-group pb-3">
                                <input type="text" className="form-control" placeholder="Institution Address" name="iAddress" id="iAddress" />
                            </div>
                            <div className="text-center">
                                <button className="btn btn-outline-dark btn-md">Send <SendOutlined /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup