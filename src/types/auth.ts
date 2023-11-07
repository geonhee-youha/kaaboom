export type SignupValuesProps = {
  email: string;
  password: string;
  type: string;
  access_token: string;
  expires_in: string;
  refresh_token: string;
  refresh_token_expires_in: string;
};
export const signupValuesDefaultProps = {
  email: "",
  password: "",
  type: "email",
  access_token: "",
  expires_in: "",
  refresh_token: "",
  refresh_token_expires_in: "",
};
