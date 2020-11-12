import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfileById } from "../../actions/profile";
import ProfileAbout from "./ProfileAbout";

const ProfileSidebar = ({ profile: { profile }, auth }) => {
	return (
		<Fragment>
			{profile === null ? (
				<Fragment></Fragment>
			) : (
				<Fragment>
					<div className="profile">
						<ProfileAbout profile={auth} />
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

ProfileSidebar.propTypes = {
	getProfileById: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(ProfileSidebar);
