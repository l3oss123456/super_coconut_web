import { getLocalStorage } from "../utils/storage";

const themeReducer = (
  state = getLocalStorage(`theme`) ? getLocalStorage(`theme`) : `light`,
  action
) => {
  switch (action.type) {
    case "GET_THEME":
      return state;
    case "SET_THEME":
      return action.data;
    case "THEME_ERROR":
      return action.error;

    default:
      return state;
  }
};
export default themeReducer;