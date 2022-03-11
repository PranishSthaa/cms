import React from 'react';
import { LoginOutlined, VisibilityOutlined, VisibilityOffOutlined } from '@mui/icons-material';

const Login = () => {
    return (
        <>
            <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
                <button type="button" class="btn-close btn-lg mb-3" aria-label="Close" data-bs-toggle="tooltip" data-bs-placement="top" title="Close"></button>
                <div className="card w-25 text-center glass-effect">
                    <div className="card-header">
                        <p className='display-6'>Login</p>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div classNameName="col">
                                <div className="form-group py-2">
                                    <input type="email" className="form-control" placeholder="Email" name="email" id="email" />
                                </div>
                                <div className="form-group pb-2">
                                    <div class="input-group mb-3">
                                        <input type="text" class="form-control" placeholder="Password" name="password" id="password" aria-label="Password" aria-describedby="button-addon" />
                                        {/* // TODO - add visibilty functionality to password field */}
                                        <button class="btn btn-outline-dark" type="button" id="button-addon"><VisibilityOffOutlined /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="btn btn-outline-dark btn-md">Login <LoginOutlined /></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login