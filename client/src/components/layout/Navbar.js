import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../actions/auth';

export const Navbar = ({auth: {isAuthenticated, loading}, logout}) => {
    const authLinks = (
        <ul>
            <li><a onClick={logout} href="#!">Logout</a></li>
            <li><Link to="/posts">Posts</Link></li>
        </ul>
    );
    const deauthLinks = (
        <ul>
            <li><Link to="/login">Log In</Link></li>
            <li><Link to="/register">Sign Up</Link></li>
        </ul>
    );

    return (
        <nav className="navbar bg-white">
            <div className="container-head">
                <div className="logo">
                    <Link to="/"><img src="https://danpicklo.files.wordpress.com/2020/09/cropped-standard-logo-e1599581963846-1.png" alt="logo"/></Link>
                </div>
                <div className="navigation">
                    <Fragment>{isAuthenticated ? authLinks : deauthLinks}</Fragment>
                </div>
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