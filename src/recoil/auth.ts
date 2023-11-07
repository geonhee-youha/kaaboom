import { atom } from "recoil";
import { signupValuesDefaultProps, SignupValuesProps } from "../types/auth";
export const signupValuesState = atom<SignupValuesProps>({
  key: "auth/signupValuesState",
  default: signupValuesDefaultProps,
});
