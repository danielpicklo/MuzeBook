import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import Post from "./Post";
import { connect } from "react-redux";
import { getPosts } from "../../actions/post";
import Form from "./Form";

const Posts = ({ getPosts, post: { posts, loading } }) => {
	useEffect(() => {
		getPosts();
	}, [getPosts]);

	return (
		<Fragment>
			<div>
				<div className="wrapper">
					<Form />
					<div className="post-container">
						{posts.map((post) => (
							<Post key={post._id} post={post} />
						))}
					</div>
				</div>
			</div>
		</Fragment>
	);
};

Posts.propTypes = {
	getPosts: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ post: state.post });

export default connect(mapStateToProps, { getPosts })(Posts);
