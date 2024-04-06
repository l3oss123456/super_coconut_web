import {
  GET_LANGUAGE,
  SET_LANGUAGE,
  LANGUAGE_ERROR,
} from "../Actions/language";
import { getLocalStorage } from "../../Utils/storage";

const loginInfoReducer = (
  //   state = process.env.REACT_APP_LANGUAGE_CODE,
  state = getLocalStorage(`language`) ? getLocalStorage(`language`) : `en`,
  // state = process.env.REACT_APP_LANGUAGE || getLocalStorage(`language`) || `en`,
  action
) => {
  switch (action.type) {
    case GET_LANGUAGE:
      return state;
    case SET_LANGUAGE:
      return action.data;
    case LANGUAGE_ERROR:
      return action.error;

    default:
      return state;
  }
};
export default loginInfoReducer;
