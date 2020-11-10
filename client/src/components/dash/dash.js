import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getCurrentProfile } from "../../actions/profile";
import { connect } from "react-redux";
import Profile from "../profiles/Profile";

const Dash = ({ getCurrentProfile, auth: { user }, profile: { profile } }) => {
	useEffect(() => {
		getCurrentProfile();
	}, [getCurrentProfile]);

	return (
		<Fragment>
			<div className="container">
				{profile !== null ? (
					<Fragment>
						<Profile />
					</Fragment>
				) : (
					<Fragment>
						<h1>{user && user.name}</h1>
						<p>Do you want to set up your profile?</p>
						<Link to="/create-profile">
							<button>Create Profile</button>
						</Link>
					</Fragment>
				)}
			</div>
		</Fragment>
	);
};

Dash.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dash);
