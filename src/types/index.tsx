import { SlideProps } from "./../hooks/useNavigation";
import { SxProps } from "@mui/system";

export type DrawerProps = {
  open: boolean;
  title?: string;
  children?: React.ReactNode;
  onClose?: () => void;
  item?: SlideProps;
  id?: number;
  zIndex?: number;
};

export const drawerDefaultProps = {
  open: false,
};

export type InputProps = {
  value: string;
  error: boolean;
  helperText: string;
  byte: number;
  bCode?: number;
};

export const inputDefaultProps = {
  value: "",
  error: false,
  helperText: "",
  byte: 0,
};

export type DialogProps = {
  open: boolean;
  title: React.ReactNode;
  content: React.ReactNode;
  pathname: string;
  cancel: {
    show: boolean;
    title: string;
    disabled: boolean;
    onClick: () => void;
  };
  confirm: {
    title: string;
    onClick: () => void;
    onConfirm: (e?: any) => void;
  };
  sx?: SxProps;
  backAble?: boolean;
  form?: boolean;
  value: string;
  children?: React.ReactNode;
  full?: boolean;
  order?: boolean;
};

export const dialogDefaultProps = {
  open: false,
  title: "",
  content: "",
  pathname: "/",
  full: false,
  cancel: {
    show: true,
    title: "취소",
    disabled: false,
    onClick: () => {},
  },
  confirm: {
    title: "확인",
    onClick: () => {},
    onConfirm: () => {},
  },
  value: "",
};
