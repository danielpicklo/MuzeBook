import axios from "axios";
import { setAlert } from "./alert";
import {
	PROFILE_ERROR,
	GET_PROFILE,
	GET_PROFILES,
	CLR_PROFILE,
} from "./constants";

export const getCurrentProfile = () => async (dispatch) => {
	try {
		const res = await axios.get("/api/profile/me");

		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
	}
};

export const getProfiles = () => async (dispatch) => {
	dispatch({ type: CLR_PROFILE });

	try {
		const res = await axios.get("/api/profile");

		dispatch({
			type: GET_PROFILES,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
	}
};

export const getProfileById = (userId) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/profile/user/${userId}`);

		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
	}
};

export const createProfile = (formData, history, edit = false) => async (
	dispatch
) => {
	try {
		const res = await axios.post("/api/profile", formData);

		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});

		history.push("/posts");
	} catch (err) {
		const errors = err.response.data.errors;

		console.log(err.message);

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
		}

		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
	}
};
