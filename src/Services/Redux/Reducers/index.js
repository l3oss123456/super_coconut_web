import { combineReducers } from "redux";
import loginInfoReducer from "./loginInfo";
import languageReducer from "./language";
import themeReducer from "./theme";
import cartReducer from "./cart";

const rootReducers = combineReducers({
  loginInfo: loginInfoReducer,
  language: languageReducer,
  theme: themeReducer,
  cart: cartReducer,
});
export default rootReducers;
