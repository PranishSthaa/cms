import React from 'react';
import Hero from '../components/Hero';
import Feature from '../components/Feature';

const Home = () => {
    var contents = [{
        title: "Simple UI", subtitle: "The UI is designed in such a way that it can be used by everyone with ease."
    },
    {
        title: "Best Security", subtitle: "All your data are secured so security is no longer a concern."
    },
    {
        title: "One Stop Solution", subtitle: "All of educational institution needs in one app so you don't have to pay for multiple apps."
    }];
    return (
        <>
            <Hero />
            <div className="container">
                <div className="row align-items-center">
                    {contents.map((content) => {
                        return <Feature title={content.title} subtitle={content.subtitle} />
                    })}
                </div>
            </div>
        </>
    )
}

export default Home