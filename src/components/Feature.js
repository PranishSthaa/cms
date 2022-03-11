import React from 'react'

const Feature = ({ title, subtitle }) => {

    return <>
        <div className="bg-light text-center col">
            <div className="my-3 py-3">
                <h2 className="card-title">{title}</h2>
                <p className="card-text">{subtitle}</p>
            </div>
            {/* <div className="bg-dark shadow-sm mx-auto" style={{ width: "80%", height: "300px", border_radius: "21px 21px 0 0" }}></div> */}
        </div>
    </>;

}

export default Feature