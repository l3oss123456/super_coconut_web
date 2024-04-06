import { GET_CART, SET_CART, CART_ERROR } from "../Actions/cart";
import { getLocalStorage } from "../../Utils/storage";

const cartReducer = (
  state = getLocalStorage("cart") ? getLocalStorage("cart") : "",
  action
) => {
  switch (action.type) {
    case GET_CART:
      return state;
    case SET_CART:
      return action.data;
    case CART_ERROR:
      return action.error;
    default:
      return state;
  }
};
export default cartReducer;
