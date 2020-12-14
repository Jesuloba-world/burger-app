import { Route, Switch, Redirect } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { connect } from "react-redux";
import Layout from "./containers/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Logout from "./containers/Auth/Logout/Logout";
import { authCheckState } from "./store/actions/index";
import Spinner from "./components/UI/Spinner/Spinner";

const Checkout = lazy(() => import("./containers/Checkout/Checkout"));
const Orders = lazy(() => import("./containers/Orders/Orders"));
const Auth = lazy(() => import("./containers/Auth/Auth"));

const App = (props) => {
	const { onTryAutoSignup } = props;

	useEffect(() => {
		onTryAutoSignup();
	}, [onTryAutoSignup]);

	let routes = (
		<Switch>
			<Route path="/auth" component={Auth} />
			<Route path="/" exact component={BurgerBuilder} />
			<Redirect to="/" />
		</Switch>
	);

	if (props.isAuthenticated) {
		routes = (
			<Switch>
				<Route path="/checkout" component={Checkout} />
				<Route path="/orders" component={Orders} />
				<Route path="/logout" component={Logout} />
				<Route path="/auth" component={Auth} />
				<Route path="/" exact component={BurgerBuilder} />
				<Redirect to="/" />
			</Switch>
		);
	}

	return (
		<div>
			<Layout>
				<Suspense fallback={<Spinner />}>{routes}</Suspense>
			</Layout>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.token !== null,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onTryAutoSignup: () => dispatch(authCheckState()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
