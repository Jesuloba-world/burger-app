import { Component } from "react";
import { connect } from "react-redux";

import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";
import * as burgerBuilderActions from "../../store/actions/index";

class BurgerBuilder extends Component {
	state = {
		purchasable: false,
		purchasing: false,
	};

	componentDidMount() {
		console.log(this.props);
		this.props.onInitIngredients();
	}

	updatePurchaseState = (ingredients) => {
		const sum = Object.keys(ingredients)
			.map((igKey) => ingredients[igKey])
			.reduce((sum, el) => {
				return sum + el;
			}, 0);

		return sum > 0;
	};

	purchaseHandler = () => {
		this.setState({ purchasing: true });
	};

	purchaseCancelHandler = () => {
		this.setState({ purchasing: false });
	};

	purchaseContinueHandler = () => {
		this.props.history.push("/checkout");
	};

	render() {
		const disabledInfo = {
			...this.props.ings,
		};

		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		let orderSummary = null;

		let burger = this.props.error ? (
			<p>Burger Ingredients cannot be Loaded</p>
		) : (
			<Spinner />
		);

		if (this.props.ings) {
			burger = (
				<Aux>
					<Burger ingredients={this.props.ings} />
					<BuildControls
						ingredientAdder={this.props.onIngredientAdded}
						ingredientRemover={this.props.onIngredientRemoved}
						disabled={disabledInfo}
						purchasable={this.updatePurchaseState(this.props.ings)}
						price={this.props.price}
						order={this.purchaseHandler}
					/>
				</Aux>
			);

			orderSummary = (
				<OrderSummary
					cancel={this.purchaseCancelHandler}
					continue={this.purchaseContinueHandler}
					ingredients={this.props.ings}
					totalPrice={this.props.price}
				/>
			);
		}

		return (
			<Aux>
				<Modal
					show={this.state.purchasing}
					modalClosed={this.purchaseCancelHandler}
				>
					{orderSummary}
				</Modal>
				{burger}
			</Aux>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		ings: state.ingredients,
		price: state.totalPrice,
		error: state.error,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onIngredientAdded: (ingName) =>
			dispatch(burgerBuilderActions.addIngredients(ingName)),
		onIngredientRemoved: (ingName) =>
			dispatch(burgerBuilderActions.removeIngredients(ingName)),
		onInitIngredients: () =>
			dispatch(burgerBuilderActions.initIngredients()),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
