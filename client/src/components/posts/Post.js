import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { addLove, removeLove } from "../../actions/post";

const Post = ({
	addLove,
	removeLove,
	auth,
	post: { _id, text, name, avatar, user, loves, comments, date, uri },
	hideActions,
}) => {
	return (
		<Fragment>
			<div className="post">
				<div className="user-header">
					<Link to={`/profile/${user}`}>
						<img
							className="profile-image"
							src={avatar}
							alt="profile-img"
						/>
						<h4>{name}</h4>
					</Link>
				</div>
				<div className="post-content">
					<p>"{text}"</p>
					{uri == null ? (
						<div></div>
					) : (
						<iframe
							src={`https://open.spotify.com/embed/track/${uri}`}
							width="300"
							height="380"
							frameborder="0"
							allowtransparency="true"
							allow="encrypted-media"
						></iframe>
					)}
				</div>

				<div className="inputs">
					<button type="button" onClick={() => addLove(_id)}>
						<i className="fas fa-heart" />{" "}
						<span>
							<span>{loves.length}</span>
						</span>
					</button>
					<button type="button" onClick={() => removeLove(_id)}>
						<i className="fas fa-heart-broken" />
					</button>
				</div>

				<div className="date">
					<p>
						Shared <Moment format="MM/DD/YYYY">{date}</Moment>
					</p>
				</div>
			</div>
		</Fragment>
	);
};

Post.defaultProps = {
	hideActions: true,
};

Post.propTypes = {
	post: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	addLove: PropTypes.func.isRequired,
	removeLove: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps, { addLove, removeLove })(Post);
