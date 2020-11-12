import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfileById } from "../../actions/profile";
import ProfileAbout from "./ProfileAbout";

const ProfileDashboard = ({ getProfileById, profile: { profile } }) => {
	return (
		<Fragment>
			{profile === null ? (
				<Fragment></Fragment>
			) : (
				<Fragment>
					<div className="profile">
						<ProfileAbout profile={profile} />
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

ProfileDashboard.propTypes = {
	getProfileById: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(ProfileDashboard);
