import {
  Box,
  Dialog,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  alpha,
} from "@mui/material";
import { ChangeEvent } from "react";
import { theme } from "../../themes/theme";
import IconButton from "../atoms/IconButton";
import youhaGrey from "../../constants/youhaGrey";
import { useRecoilState } from "recoil";
import { sortDialogRecoilState } from "../../constants/recoils";
import { sorts } from "../../constants";
import { useRouter } from "next/router";

export default function SortDialog({}: {}) {
  const router = useRouter();
  const currentValue = router.query.sortBy ?? "featured";
  const [sortDialog, setSortDialog] = useRecoilState(sortDialogRecoilState);
  const { open } = sortDialog;
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    router.push(
      `/${router.pathname}?sortBy=${(event.target as HTMLInputElement).value}`
    );
    onClose();
  };
  const onClose = () => {
    setSortDialog({ open: false });
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
          maxWidth: 400,
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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          height: 56,
          p: theme.spacing(0, 1, 0, 2),
          borderBottom: `1px solid ${youhaGrey[700]}`,
        }}
      >
        <Typography
          sx={{
            flex: 1,
            fontSize: 20,
            lineHeight: "32px",
            fontWeight: "700",
          }}
        >
          Sort By
        </Typography>
        <IconButton name="xmark" onClick={onClose} />
      </Box>
      <Box
        sx={{
          p: theme.spacing(1, 2),
        }}
      >
        <FormControl>
          <RadioGroup value={currentValue} onChange={onChange}>
            {sorts.map((item, index) => {
              return (
                <FormControlLabel
                  key={index}
                  value={item.value}
                  control={<Radio />}
                  label={item.label}
                />
              );
            })}
          </RadioGroup>
        </FormControl>
      </Box>
    </Dialog>
  );
}
