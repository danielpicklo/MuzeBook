import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { addLove, removeLove } from "../../actions/post";
import { post } from "request";
import CommentForm from "../post/CommentForm";

const Post = ({
	addLove,
	removeLove,
	auth,
	post: { _id, text, name, avatar, user, loves, comments, date },
}) => {
	return (
		<Fragment>
			<div className="post">
				<Link to={`/profile/${user}`}>
					<img
						className="profile-image"
						src={avatar}
						alt="profile-img"
					/>
				</Link>
				<h4>{name}</h4>
				<div className="post-content">
					<p>"{text}"</p>
				</div>
				<div className="inputs">
					<button type="button" onClick={() => addLove(_id)}>
						<i className="fas fa-thumbs-up" />{" "}
						<span>
							<span>{loves.length}</span>
						</span>
					</button>
					<button type="button" onClick={() => removeLove(_id)}>
						<i className="fas fa-thumbs-down" />
					</button>
				</div>
				<div className="date">
					<p>
						Shared <Moment format="MM/DD/YYYY">{date}</Moment>
					</p>
				</div>
				{!auth.loading && user === auth.user._id && <button>X</button>}
				<div className="comments">
					<CommentForm postId={post._id} />
				</div>
			</div>
		</Fragment>
	);
};

Post.propTypes = {
	post: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	addLove: PropTypes.func.isRequired,
	removeLove: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps, { addLove, removeLove })(Post);
