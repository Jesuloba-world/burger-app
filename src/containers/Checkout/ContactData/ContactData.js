import { Component } from "react";
import axios from "../../../axios-orders";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import classes from "./ContactData.module.css";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
	state = {
		name: "",
		email: "",
		address: {
			street: "",
			postalCode: "",
		},
		loading: false,
	};

	orderHandler = (event) => {
		event.preventDefault();

		this.setState({ loading: true });
		const order = {
			ingredients: this.props.ingredients,
			totalPrice: this.props.price,
			customer: {
				name: "John Needle",
				address: {
					street: "Teststreet 1",
					zipcode: "274199",
					country: "Nigeria",
				},
				email: "test@test.com",
			},
			deliveryMethod: "fastest",
		};

		axios
			.post("/order.json", order)
			.then((response) => {
				this.setState({ loading: false });
				this.props.history.push("/");
			})
			.catch((error) => {
				this.setState({ loading: false });
				// console.log(error);
			});
	};

	render() {
		let form = (
			<form>
				<Input
					inputtype="input"
					type="text"
					name="name"
					placeholder="Your Name"
				/>
				<Input
					inputtype="input"
					type="email"
					name="email"
					placeholder="Your Email"
				/>
				<Input
					inputtype="input"
					type="text"
					name="street"
					placeholder="Street"
				/>
				<Input
					inputtype="input"
					type="text"
					name="postal"
					placeholder="Your Postal Code"
				/>
				<Button btnType="Success" clicked={this.orderHandler}>
					ORDER
				</Button>
			</form>
		);

		if (this.state.loading) {
			form = <Spinner />;
		}

		return (
			<div className={classes.ContactData}>
				<h4>Enter your Contact Data</h4>
				{form}
			</div>
		);
	}
}

export default ContactData;
