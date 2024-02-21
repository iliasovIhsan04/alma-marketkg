import { allHarryBuy } from "../slice/mySlice";
import { url } from "../../Api";

export const allHarryBuyList = () => async (dispatch) => {
  try {
    const response = await fetch(url + "/card/all-one");
    const data = await response.json();
    dispatch(allHarryBuy(data));
  } catch (error) {}
};
