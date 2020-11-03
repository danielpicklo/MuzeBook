import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {getProfile} from '../../actions/profile';
import {connect} from 'react-redux';

const Dash = ({getProfile, auth, profile}) => {
    useEffect(() => {
        getProfile()
    }, []);

    return (
        <div>
            Dashboard
        </div>
    )
}

Dash.propTypes = {
    getProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({auth:state.auth, profile:state.profile});
 
export default connect(mapStateToProps, {getProfile})(Dash);
