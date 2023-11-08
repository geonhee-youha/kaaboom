import { ThemeProvider } from "@mui/material";
import { theme } from "../themes/theme";

type Props = {
  children: React.ReactNode;
};
export default function App({ children }: Props) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
