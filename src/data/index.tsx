import _ from "lodash";

export type NationProps = {
  name: string;
  thumbnail: string;
};

export type LinkProps = {
  type: string;
  link: string;
  label?: string;
};