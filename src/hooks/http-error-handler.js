import { useState, useEffect } from "react";

export default function ErrorHandler(axios) {
	const [error, setError] = useState(null);

	const reqInterceptor = axios.interceptors.request.use(
		(req) => {
			setError(null);
			return req;
		},
		(error) => {
			setError(error);
		}
	);
	const resInterceptor = axios.interceptors.response.use(
		(res) => res,
		(error) => {
			setError(error);
		}
	);

	const { request, response } = axios.interceptors;

	useEffect(() => {
		return () => {
			request.eject(reqInterceptor);
			response.eject(resInterceptor);
		};
	}, [reqInterceptor, resInterceptor, request, response]);

	const errorConfirmedHandler = () => {
		setError(null);
	};

	return [error, errorConfirmedHandler];
}
