import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../../actions/profile";

const initState = {
	bio: "",
	youtube: "",
	instagram: "",
	bandcamp: "",
	soundcloud: "",
	spotify: "",
	appleMusic: "",
	facebook: "",
};

const CreateProfile = ({
	profile: { profile, loading },
	createProfile,
	getCurrentProfile,
	history,
}) => {
	const [formData, setFormData] = useState(initState);

	useEffect(() => {
		if (!profile) getCurrentProfile();
		if (!loading && profile) {
			const profileData = { ...initState };
			for (const key in profile) {
				if (key in profileData) profileData[key] = profile[key];
			}
			for (const key in profile.social) {
				if (key in profileData) profileData[key] = profile.social[key];
			}
			if (Array.isArray(profileData.skills))
				profileData.skills = profileData.skills.join(", ");
			setFormData(profileData);
		}
	}, [loading, getCurrentProfile, profile]);

	const {
		bio,
		youtube,
		instagram,
		bandcamp,
		soundcloud,
		spotify,
		appleMusic,
		facebook,
	} = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = (e) => {
		e.preventDefault();
		createProfile(formData, history, profile ? true : false);
	};

	return (
		<Fragment>
			<div className="container">
				<div className="form">
					<form className="profile" onSubmit={(e) => onSubmit(e)}>
						<textarea
							name="bio"
							placeholder="Your biography"
							value={bio}
							onChange={(e) => onChange(e)}
						></textarea>
						<input
							name="youtube"
							type="text"
							placeholder="YouTube URL"
							value={youtube}
							onChange={(e) => onChange(e)}
						/>
						<input
							name="instagram"
							type="text"
							placeholder="Instagram URL"
							value={instagram}
							onChange={(e) => onChange(e)}
						/>
						<input
							name="bandcamp"
							type="text"
							placeholder="Bandcamp URL"
							value={bandcamp}
							onChange={(e) => onChange(e)}
						/>
						<input
							name="soundcloud"
							type="text"
							placeholder="Soundcloud URL"
							value={soundcloud}
							onChange={(e) => onChange(e)}
						/>
						<input
							name="spotify"
							type="text"
							placeholder="Spotify URL"
							value={spotify}
							onChange={(e) => onChange(e)}
						/>
						<input
							name="appleMusic"
							type="text"
							placeholder="Apple Music URL"
							value={appleMusic}
							onChange={(e) => onChange(e)}
						/>
						<input
							name="facebook"
							type="text"
							placeholder="Facebook URL"
							value={facebook}
							onChange={(e) => onChange(e)}
						/>
						<input type="submit" />
					</form>
				</div>
			</div>
		</Fragment>
	);
};

CreateProfile.propTypes = {
	createProfile: PropTypes.func.isRequired,
	getCurrentProfile: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
	CreateProfile
);
