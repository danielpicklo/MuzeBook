import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../actions/auth';

export const Navbar = ({auth: {isAuthenticated, loading}, logout}) => {
    const authLinks = (
        <ul>
            <li><a onClick={logout} href="#!">Logout</a></li>
        </ul>
    );
    const deauthLinks = (
        <ul>
            <li><Link to="/login">Log In</Link></li>
            <li><Link to="/register">Sign Up</Link></li>
        </ul>
    );

    return (
        <nav className="navbar bg-dark">
            <div className="logo">
                <a href="/"><img src="https://danpicklo.files.wordpress.com/2020/10/white-logo.png" alt="logo"/></a>
            </div>
            <div className="navigation">
                <Fragment>{isAuthenticated ? authLinks : deauthLinks}</Fragment>
            </div>
        </nav>
    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({ auth: state.auth });

export default connect(mapStateToProps, {logout})(Navbar);