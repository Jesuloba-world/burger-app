import Aux from "../../hoc/Aux";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import { useState } from "react";
import { connect } from "react-redux";

const Layout = (props) => {
	const [showSideDrawer, setShowSideDrawer] = useState(false);

	const sideDrawerClosedHandler = () => {
		setShowSideDrawer(false);
	};

	const sideDrawerToggleHandler = () => {
		setShowSideDrawer(!showSideDrawer);
	};

	return (
		<Aux>
			<Toolbar
				isAuth={props.isAuthenticated}
				sideOpen={sideDrawerToggleHandler}
			/>
			<SideDrawer
				isAuth={props.isAuthenticated}
				closer={sideDrawerClosedHandler}
				show={showSideDrawer}
				toggle={sideDrawerToggleHandler}
			/>
			<main className={classes.Content}>{props.children}</main>
		</Aux>
	);
};

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.token !== null,
	};
};

export default connect(mapStateToProps)(Layout);
