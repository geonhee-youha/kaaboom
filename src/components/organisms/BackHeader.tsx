import { AppBar, Box, Container } from "@mui/material";
import IconButton from "../atoms/IconButton";
import { theme } from "../../themes/theme";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function BackHeader() {
  const router = useRouter();
  const onClickBack = () => {
    router.back();
  };
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted ? (
    <AppBar
      component="div"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 999,
        pt: "var(--sait)",
        borderBottomWidth: 1,
      }}
      elevation={0}
      className="Header"
    >
      <Container
        sx={{
          transition: "all 0.5s ease",
          position: "relative",
          display: "flex",
          alignItems: "center",
          height: 56,
        }}
      >
        <Box
          sx={{
            display: "flex",
            m: theme.spacing(0, 0, 0, -1),
          }}
        >
          <IconButton name="chevron-left" onClick={onClickBack} size={20}/>
        </Box>
        <Box
          sx={{
            flex: 1,
          }}
        ></Box>
      </Container>
      <Box
        sx={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: `1px`,
        }}
        className="HeaderBottom"
      />
    </AppBar>
  ) : (
    <></>
  );
}
