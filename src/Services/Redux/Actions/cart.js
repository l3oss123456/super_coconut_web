import * as R from "ramda";
import { setLocalStorage } from "../../Utils/storage";

export const GET_CART = `GET_CART`;
export const SET_CART = `SET_CART`;
export const CART_ERROR = `CART_ERROR`;

export const set_data = (post) => {
  return {
    type: SET_CART,
    data: post,
  };
};
export const set_error = (post) => {
  return {
    type: SET_CART,
    data: post,
  };
};
export const receive_error = (error) => {
  return {
    type: CART_ERROR,
    error: error,
  };
};

export const editCart = ({ product_id = "" }) => {
  return async (dispatch, getState) => {
    try {
      const currentState = getState();
      let cartData = currentState.cart;

      if (R.isEmpty(cartData)) {
        cartData += `${product_id}`;
      } else {
        cartData += ` ${product_id}`;
      }

      setLocalStorage("cart", cartData);
      dispatch(set_data(cartData));
    } catch (error) {
      dispatch(receive_error(error));
    }
  };
};

export const removeCartData = ({ product_id = "" }) => {
  return async (dispatch, getState) => {
    try {
      const currentState = getState();
      let cartData = currentState.cart;

      const cartArray = cartData.split(" ");
      const updatedCartArray = cartArray.filter((item) => item !== product_id);
      const updatedCart = updatedCartArray.join(" ");

      setLocalStorage("cart", updatedCart);
      dispatch(set_data(updatedCart));
    } catch (error) {
      dispatch(receive_error(error));
    }
  };
};

export const clearCartData = () => {
  return async (dispatch, getState) => {
    try {
      setLocalStorage("cart", "");
      dispatch(set_data(""));
    } catch (error) {
      dispatch(receive_error(error));
    }
  };
};
