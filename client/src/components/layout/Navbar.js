import React from 'react';
import {Link} from 'react-router-dom';

export const Navbar = () => {
    return (
        <nav className="navbar bg-dark">
            <div className="logo">
                <a href="/"><img src="https://danpicklo.files.wordpress.com/2020/10/white-logo.png" alt="logo"/></a>
            </div>
            <div className="navigation">
                <ul>
                    <li><Link to="/login">Log In</Link></li>
                    <li><Link to="/register">Sign Up</Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;