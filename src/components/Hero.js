import React from 'react'

const Hero = () => {
    return (
        <div class="container py-5">
            <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
                <div class="col-10 col-sm-8 col-lg-6">
                    {/*TODO: add image*/}
                    {/* <img src="bootstrap-themes.png" class="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy"> */}
                </div>
                <div class="col-lg-6">
                    <h1 class="display-5 fw-bold lh-1 mb-3">College Management System</h1>
                    <p class="lead">CMS brings you easy to use and hassle free college management system that helps administrators, instructors and students.</p>
                    <div class="d-grid gap-2 d-md-flex justify-content-md-start">
                        <button type="button" class="btn btn-outline-success btn-md px-4 me-md-2">Sign Up</button>
                        <button type="button" class="btn btn-outline-primary btn-md px-4">Learn More</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero