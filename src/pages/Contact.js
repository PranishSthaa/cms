import React from 'react'
import { MailOutlined, PhoneOutlined } from '@mui/icons-material'

const Contact = () => {
    return (
        <>
            <div className="container my-5 py-4">
                <div className="p-4 p-md-5 mb-4 text-white rounded bg-dark">
                    <div className="col-md-6 px-0">
                        <h1 className="display-4">Get In Touch</h1>
                        <div className="py-2"></div>
                        <div className="col d-flex align-items-start">
                            <MailOutlined className='me-2' fontSize="large" />
                            <p className="lead">pranish99912@gmail.com</p>
                        </div>
                        <div className="col d-flex align-items-start">
                            <PhoneOutlined className='me-2' fontSize="large" />
                            <p className="lead">+977-980-8269-836</p>
                        </div>
                        {/* <div className="col d-flex align-items-start">
                            <PhoneOutlined className='me-2' fontSize="large" />
                            <p className="lead">+977-980-8269-836</p>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact