import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export default NotFound = () => {
    return (
        <div className="boxed-view">
            <div className="boxed-view__box">
                <h1>Page not found.</h1>
                <p>Hmmm, we're unable to find that page.</p>
                <Link to="/" className="button button--link">Head Home</Link>
            </div>
        </div>
    );
}