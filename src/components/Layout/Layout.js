import Aux from "../../hoc/Aux";
import classes from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import { Component } from "react";

class Layout extends Component {
	state = {
		showSideDrawer: false,
	};

	sideDrawerClosedHandler = () => {
		this.setState({ showSideDrawer: false });
	};

	sideDrawerToggleHandler = () => {
		this.setState((prevState) => {
			return { showSideDrawer: !prevState.showSideDrawer };
		});
	};

	render() {
		return (
			<Aux>
				<Toolbar sideOpen={this.sideDrawerToggleHandler} />
				<SideDrawer
					closer={this.sideDrawerClosedHandler}
					show={this.state.showSideDrawer}
				/>
				<main className={classes.Content}>{this.props.children}</main>
			</Aux>
		);
	}
}

export default Layout;
