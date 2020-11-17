import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfileById } from "../../actions/profile";
import ProfileAbout from "./ProfileAbout";

const Profile = ({ getProfileById, profile: { profile }, auth, match }) => {
	useEffect(() => {
		getProfileById(match.params.id);
	}, [getProfileById, match.params.id]);
	return (
		<Fragment>
			<div className="container">
				{profile === null ? (
					<Fragment></Fragment>
				) : (
					<Fragment>
						<div className="profile">
							<ProfileAbout profile={profile} />
						</div>
					</Fragment>
				)}
			</div>
		</Fragment>
	);
};

Profile.propTypes = {
	getProfileById: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
