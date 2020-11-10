import axios from "axios";
import { setAlert } from "./alert";
import {
	GET_POSTS,
	POST_ERROR,
	ADD_POST,
	UPDATE_POST,
	ADD_COMMENT,
	REMOVE_COMMENT,
} from "./constants";

export const getPosts = () => async (dispatch) => {
	try {
		const res = await axios.get("/api/posts");

		dispatch({
			type: GET_POSTS,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
	}
};

export const addLove = (id) => async (dispatch) => {
	const res = await axios.put(`/api/posts/love/${id}`);

	dispatch({
		type: UPDATE_POST,
		payload: { id, loves: res.data },
	});
};

export const removeLove = (id) => async (dispatch) => {
	const res = await axios.put(`/api/posts/unlove/${id}`);

	dispatch({
		type: UPDATE_POST,
		payload: { id, loves: res.data },
	});
};

export const addPost = (formData) => async (dispatch) => {
	const config = { headers: { "Content-Type": "application/json" } };

	try {
		const res = await axios.post("/api/posts", formData, config);
		dispatch({
			type: ADD_POST,
			payload: res.data,
		});

		dispatch(setAlert("Created a Post", "success"));
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
	}
};

export const addComment = (postId, formData) => async (dispatch) => {
	const res = await axios.post(`/api/posts/comment/${postId}`, formData);

	dispatch({
		type: ADD_COMMENT,
		payload: res.data,
	});

	dispatch(setAlert("Added Comment", "success"));
};

export const deleteComment = (postId, commentId) => async (dispatch) => {
	await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
	dispatch({
		type: REMOVE_COMMENT,
		payload: commentId,
	});
};
