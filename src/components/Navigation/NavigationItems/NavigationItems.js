import classes from "./NavigationItems.module.css";
import NavigationItem from "./Navigationitem/NavigationItem";

const navigationItems = (props) => (
	<ul className={classes.NavigationItems}>
		<NavigationItem link="/" closed={props.closed} exact>
			Burger Builder
		</NavigationItem>
		{props.isAuthenticated ? (
			<NavigationItem link="/orders" closed={props.closed}>
				Orders
			</NavigationItem>
		) : null}
		{!props.isAuthenticated ? (
			<NavigationItem link="/auth" closed={props.closed}>
				Authenticate
			</NavigationItem>
		) : (
			<NavigationItem link="/logout" closed={props.closed}>
				Logout
			</NavigationItem>
		)}
	</ul>
);

export default navigationItems;
