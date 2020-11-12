import { Component } from "react";
import axios from "../../../axios-orders";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import classes from "./ContactData.module.css";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
	state = {
		orderForm: {
			name: {
				elementType: "input",
				elementConfig: {
					type: "text",
					name: "name",
					placeholder: "Your name",
				},
				value: "",
			},
			street: {
				elementType: "input",
				elementConfig: {
					type: "text",
					name: "street",
					placeholder: "Your street",
				},
				value: "",
			},
			zipcode: {
				elementType: "input",
				elementConfig: {
					type: "text",
					name: "postal",
					placeholder: "ZIP Code",
				},
				value: "",
			},
			country: {
				elementType: "input",
				elementConfig: {
					type: "text",
					name: "country",
					placeholder: "Country",
				},
				value: "",
			},
			email: {
				elementType: "input",
				elementConfig: {
					type: "email",
					name: "email",
					placeholder: "Your E-mail",
				},
				value: "",
			},
			deliveryMethod: {
				elementType: "select",
				elementConfig: {
					options: [
						{ value: "fastest", displayValue: "Fastest" },
						{ value: "standard", displayValue: "Standard" },
						{ value: "cheapest", displayValue: "Cheapest" },
					],
				},
				value: "",
			},
		},
		loading: false,
	};

	orderHandler = (event) => {
		event.preventDefault();

		this.setState({ loading: true });
		const order = {
			ingredients: this.props.ingredients,
			totalPrice: this.props.price,
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
		const formElementArray = [];
		for (let key in this.state.orderForm) {
			formElementArray.push({
				id: key,
				config: this.state.orderForm[key],
			});
		}

		let form = (
			<form>
				{formElementArray.map((formElement) => (
					<Input
						elementType={formElement.config.elementType}
						elementConfig={formElement.config.elementConfig}
						value={formElement.config.value}
						key={formElement.id}
					/>
				))}
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
