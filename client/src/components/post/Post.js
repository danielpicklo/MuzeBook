import React, { Fragment } from "react";
import PropTypes from "prop-types";

const Post = (props) => {
	return (
		<Fragment>
			<div className="comments">
				<CommentForm postId={post._id} />
			</div>
		</Fragment>
	);
};

Post.propTypes = {};

export default Post;
