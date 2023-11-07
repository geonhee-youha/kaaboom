import { atom } from "recoil";
import { inputDefaultProps, InputProps } from "../types/input";
import { ShopCartItemProps } from "../types/shop";

export const directCartsState = atom<ShopCartItemProps[]>({
  key: "directCartsState",
  default: [],
});
export const cartsState = atom<ShopCartItemProps[]>({
  key: "cartsState",
  default: [],
});
export const orderState = atom<{
  user: {
    name: InputProps;
    phone: InputProps;
  };
  delivery: {
    name: InputProps;
    phone: InputProps;
    address: InputProps;
    detail: InputProps;
    desc: InputProps;
  };
  point: InputProps;
  method: InputProps;
  type: "direct" | "common";
  imp_uid?: any;
  merchant_uid?: any;
}>({
  key: "orderState",
  default: {
    user: {
      name: inputDefaultProps,
      phone: inputDefaultProps,
    },
    delivery: {
      name: inputDefaultProps,
      phone: inputDefaultProps,
      address: inputDefaultProps,
      detail: inputDefaultProps,
      desc: inputDefaultProps,
    },
    point: inputDefaultProps,
    method: { ...inputDefaultProps, value: "kakaopay" },
    type: "common",
  },
});
