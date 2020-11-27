import * as actionTypes from "./actionTypes";
import axios from "axios";

const firebaseAPIkey = "AIzaSyDfByMqErKbDtAaE_M7Y7je0y7JOjsV_FQ";

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START,
	};
};

export const authSuccess = (authData) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		authData: authData,
	};
};

export const authFail = (error) => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error,
	};
};

export const auth = (email, password) => {
	return (dispatch) => {
		dispatch(authStart());
		const authData = {
			email,
			password,
			returnSecureToken: true,
		};
		axios
			.post(
				`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseAPIkey}`,
				authData
			)
			.then((response) => {
				console.log(response);
				dispatch(authSuccess(response.data));
			})
			.catch((err) => {
				console.log(err);
				dispatch(authFail(err));
			});
	};
};
