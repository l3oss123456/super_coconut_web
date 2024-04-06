import helper from "../../../Utils/helper";
import instance from "../../axiosBuyProductInstance";

export const buyProduct = async (body = {}) => {
  const form_data = helper.ConvertJsonToFormData(body);
  try {
    return await instance.post(`/api/buy-product`, form_data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    throw error;
  }
};
