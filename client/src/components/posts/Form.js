import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";

const Form = ({ addPost }) => {
	const [text, setText] = useState("");
	const [uri, setURI] = useState("");

	return (
		<div className="form">
			<h4>Add Post</h4>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					addPost({ text, uri });
					setURI("");
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
				<input
					name="part"
					type="text"
					placeholder="Spotify URI"
					value={uri}
					onChange={(f) => setURI(f.target.value)}
				/>
				<button>Share</button>
			</form>
			<hr />
		</div>
	);
};

Form.propTypes = {
	addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(Form);
