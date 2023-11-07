import { createTheme, ThemeProvider } from "@mui/material";
import { deepOrange, grey, red } from "@mui/material/colors";
import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { appThemeState } from "../recoil/common";
import { theme } from "../themes/theme";

type Props = {
  children: React.ReactNode;
};
export default function App({ children }: Props) {
  const mode = useRecoilValue(appThemeState);
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
