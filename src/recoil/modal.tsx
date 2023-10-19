
  import { atom } from "recoil";
  import { DialogProps, dialogDefaultProps, DrawerProps, drawerDefaultProps } from "../types/index";
  export const dialogState = atom<DialogProps>({
    key: "modal/dialog",
    default: dialogDefaultProps,
  });
  export const loaderState = atom<{ open: boolean }>({
    key: "modal/loader",
    default: {
      open: false,
    },
  });
  export const drawerState = atom<DrawerProps>({
    key: "modal/drawer",
    default: drawerDefaultProps,
  });