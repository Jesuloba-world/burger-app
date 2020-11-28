import * as actionTypes from "./actionTypes";
import axios from "axios";

const firebaseAPIkey = "AIzaSyDfByMqErKbDtAaE_M7Y7je0y7JOjsV_FQ";

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START,
	};
};

export const authSuccess = (token, userId) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		idToken: token,
		userId: userId,
	};
};

export const authFail = (error) => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error,
	};
};

export const auth = (email, password, isSignup) => {
	return (dispatch) => {
		dispatch(authStart());
		const authData = {
			email,
			password,
			returnSecureToken: true,
		};

		let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseAPIkey}`;
		if (!isSignup) {
			url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseAPIkey}`;
		}
		axios
			.post(url, authData)
			.then((response) => {
				console.log(response);
				dispatch(
					authSuccess(response.data.idToken, response.data.localId)
				);
			})
			.catch((err) => {
				dispatch(authFail(err.response.data.error));
			});
	};
};
