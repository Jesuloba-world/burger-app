import { Component } from "react";
import Aux from "../../../hoc/Aux";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
	componentDidUpdate() {
		console.log("[OrderSummary.js] Did update!");
	}

	render() {
		const ingredientSummary = Object.keys(this.props.ingredients).map(
			(igKey, i) => {
				return (
					<li key={igKey + i}>
						<span style={{ textTransform: "capitalize" }}>
							{igKey}
						</span>
						: {this.props.ingredients[igKey]}
					</li>
				);
			}
		);

		return (
			<Aux>
				<h3>Your Order</h3>
				<p>A delicious burger with the following ingredients:</p>
				<ul>{ingredientSummary}</ul>
				<p>
					<strong>
						Total price: ${this.props.totalPrice.toFixed(2)}
					</strong>
				</p>
				<p>Continue to Checkout?</p>
				<Button btnType={"Danger"} clicked={this.props.cancel}>
					CANCEL
				</Button>
				<Button btnType={"Success"} clicked={this.props.continue}>
					CONTINUE
				</Button>
			</Aux>
		);
	}
}

export default OrderSummary;
