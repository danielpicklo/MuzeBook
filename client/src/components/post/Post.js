import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getPost } from "../../actions/post";
import Post from "../posts/Post";

const Post = ({ getPost, post: post, match }) => {
	useEffect(() => {
		getPost(match.params.id);
	}, [getPost]);

	return (
		<Fragment>
			<Link to="/posts">Back</Link>
			<Post post={post} hideActions={false} />
			<div className="comments">
				<CommentForm postId={post._id} />
			</div>
		</Fragment>
	);
};

Post.propTypes = {
	getPost: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ post: state.post });

export default connect(mapStateToProps, { getPost })(Post);
