import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../../actions/post";

const CommentForm = ({ postId, addComment }) => {
	const [text, setText] = useState("");

	return (
		<div>
			<div className="form">
				<form
					onSubmit={(e) => {
						e.preventDefault();
						addComment(postId, { text });
						setText("");
					}}
				>
					<textarea
						name="text"
						cols="25"
						rows="2"
						placeholder="Add a comment"
						value={text}
						onChange={(e) => setText(e.target.value)}
						required
					></textarea>
					<button>Add Comment</button>
				</form>
			</div>
			<hr />
		</div>
	);
};

CommentForm.propTypes = {
	addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
