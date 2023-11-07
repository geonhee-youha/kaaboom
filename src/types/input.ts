export type InputProps = {
  value: string;
  error: boolean;
  helperText: React.ReactNode;
  byte: number;
  zCode?: number;
  bCode?: number;
};

export const inputDefaultProps = {
  value: "",
  error: false,
  helperText: "",
  byte: 0,
};
