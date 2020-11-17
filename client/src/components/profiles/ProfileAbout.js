import React from "react";

const ProfileAbout = ({
	profile: {
		socials,
		user: { name, avatar },
		bio,
	},
}) => {
	return (
		<div className="">
			<img className="" src={avatar} alt="" />
			<h1 className="">{name}</h1>
			<div className="">
				<p>{bio}</p>
			</div>
			{socials && socials.youtube && (
				<a
					href={socials.youtube}
					target="_blank"
					rel="noopener noreferrer"
				>
					<i className="fab fa-youtube fa-2x" />
				</a>
			)}
			{socials && socials.facebook && (
				<a
					href={socials.facebook}
					target="_blank"
					rel="noopener noreferrer"
				>
					<i className="fab fa-facebook fa-2x" />
				</a>
			)}
			{socials && socials.instagram && (
				<a
					href={socials.instagram}
					target="_blank"
					rel="noopener noreferrer"
				>
					<i className="fab fa-instagram fa-2x" />
				</a>
			)}
			{socials && socials.soundcloud && (
				<a
					href={socials.soundcloud}
					target="_blank"
					rel="noopener noreferrer"
				>
					<i className="fab fa-soundcloud fa-2x" />
				</a>
			)}
			{socials && socials.spotify && (
				<a
					href={socials.spotify}
					target="_blank"
					rel="noopener noreferrer"
				>
					<i className="fab fa-spotify fa-2x" />
				</a>
			)}
			{socials && socials.appleMusic && (
				<a
					href={socials.appleMusic}
					target="_blank"
					rel="noopener noreferrer"
				>
					<i className="fab fa-apple fa-2x" />
				</a>
			)}
		</div>
	);
};

ProfileAbout.propTypes = {};

export default ProfileAbout;
