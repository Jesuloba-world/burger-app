export {
	addIngredients,
	removeIngredients,
	initIngredients,
	setIngredients,
	fetchIngredientsFailed,
} from "./burgerBuilder";

export { purchaseBurger, purchaseInit, fetchOrders } from "./order";

export {
	auth,
	logout,
	setAuthRediectPath,
	authCheckState,
	didLogout,
	authStart,
	authSuccess,
	authFail,
	checkAuthTimeout,
} from "./auth";

export const firebaseAPIkey = "AIzaSyDfByMqErKbDtAaE_M7Y7je0y7JOjsV_FQ";
