import { GET_THEME, SET_THEME, THEME_ERROR } from "../Actions/theme";
import { getLocalStorage } from "../../Utils/storage";

const themeReducer = (
  state = getLocalStorage(`theme`) ? getLocalStorage(`theme`) : `light`,
  // state = process.env.REACT_APP_THEME || getLocalStorage(`theme`) || `light`,
  action
) => {
  switch (action.type) {
    case GET_THEME:
      return state;
    case SET_THEME:
      return action.data;
    case THEME_ERROR:
      return action.error;

    default:
      return state;
  }
};
export default themeReducer;
