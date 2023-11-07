import { atom } from "recoil";
import { FoodListItemProps } from "../types/food";
export const selectedFoodsState = atom<FoodListItemProps[]>({
  key: "food/selectedFoodsState",
  default: [],
});
