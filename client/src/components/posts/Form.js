import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";

const Form = ({ addPost }) => {
	const [text, setText] = useState("");

	return (
		<div className="post-container">
			<div className="form">
				<h4>Add Post</h4>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						addPost({ text });
						setText("");
					}}
				>
					<textarea
						name="post"
						cols="25"
						rows="2"
						placeholder="Text here"
						value={text}
						onChange={(e) => setText(e.target.value)}
						required
					></textarea>
					<button>Share</button>
				</form>
				<hr />
			</div>
		</div>
	);
};

Form.propTypes = {
	addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(Form);
