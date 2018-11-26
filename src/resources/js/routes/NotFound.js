import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (

    <div className="display">
        <div className="content">

            <img src="/img/error.jpg" style={{width: 600, height: 400, display: 'block', margin: 'auto', position: 'relative' }} />
            <center>
                <h1> PAGE NOT FOUND, PLEASE GO BACK TO HOME PAGE</h1>
                <Link to="/">Return to Home Page</Link>
            </center>
        </div>
    </div>

);
export default NotFound;