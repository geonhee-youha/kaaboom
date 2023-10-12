import { Box, Dialog, InputBase, Stack, alpha } from "@mui/material";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { theme } from "../../themes/theme";
import IconButton from "../atoms/IconButton";
import TextButton from "../atoms/TextButton";
import youhaGrey from "../../constants/youhaGrey";
import youhaBlue from "../../constants/youhaBlue";
import { useRecoilState } from "recoil";
import { searchDialogRecoilState } from "../../constants/recoils";
import { useRouter } from "next/router";

export default function SearchDialog({ }: {}) {
  const router = useRouter();
  const [searchDialog, setSearchDialog] = useRecoilState(
    searchDialogRecoilState
  );
  const { open } = searchDialog;
  const [value, setValue] = useState<string>("");
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setValue(value);
  };
  const onClose = () => {
    setSearchDialog({ open: false });
    setValue("");
  };
  const onKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      if (value !== "") { router.push(`/explore/search?searchText=${value}`); }
      setSearchDialog({ open: false });
    }
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      onBackdropClick={onClose}
      aria-labelledby="playlist-dialog-title"
      aria-describedby="playlist-dialog-description"
      sx={{
        "& .MuiBackdrop-root": {
          backdropFilter: `blur(4px)`,
          backgroundColor: alpha(youhaGrey[900], 0.7),
        },
        "& .MuiDialog-paper": {
          backgroundColor: youhaGrey[900],
          border: `1px solid ${youhaGrey[700]}`,
          backgroundImage: `none`,
          width: "100%",
          maxWidth: 700,
          height: 600,
          "@media(max-width: 767px)": {
            maxWidth: "initial",
            maxHeight: "initial",
            m: theme.spacing(0),
            border: "none",
            height: "100%",
          },
        },
        position: "fixed",
        zIndex: 999999,
      }}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={2}
        sx={{
          p: theme.spacing(0, 2, 0, 0),
          borderBottom: `1px solid ${youhaGrey[700]}`,
        }}
      >
        <Box
          sx={{
            flex: 1,
            position: "relative",
          }}
        >
          <IconButton
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 56,
              height: 56,
              zIndex: 99,
              "@media(min-width: 961px)": {
                color: `${youhaGrey[300]} !important`,
              },
            }}
            disableRipple
            name="search"
            size={24}
            color={youhaBlue[500]}
          />
          <InputBase
            value={value}
            onChange={onChange}
            onKeyPress={onKeyPress}
            placeholder="Search for Kpop idols"
            sx={{
              borderRadius: 1,
              width: "100%",
              height: 56,
              p: theme.spacing(0, 5, 0, 7),
              display: "flex",
              alignItems: "center",
              "& input": {
                fontSize: 20,
                lineHeight: "32px !important",
                "&::placeholder": {
                  fontSize: 20,
                  lineHeight: "32px !important",
                  color: youhaGrey[400],
                  opacity: `1 important`,
                  fontWeight: "400",
                },
              },
            }}
          />
        </Box>
        <TextButton
          size="sm"
          label="Cancel"
          borderColor={youhaGrey[700]}
          backgroundColor={alpha(youhaGrey[800], 1)}
          onClick={onClose}
        />
      </Stack>
      <Box sx={{ height: 400 }}></Box>
    </Dialog>
  );
}
