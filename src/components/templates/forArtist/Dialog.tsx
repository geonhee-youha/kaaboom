import { useEffect } from "react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { Dialog as MDialog, Typography, Box } from "@mui/material";
import { dialogState, dialogDefaultProps } from "../../../constants/recoils";
import { theme } from "../../../themes/theme";
import youhaGrey from "../../../constants/youhaGrey";
import TextButton from "../../atoms/TextButton";

export default function Dialog() {
  const router = useRouter();
  const [dialog, setDialog] = useRecoilState(dialogState);
  const onClose = (e: any) => {
    e.stopPropagation();
    setDialog({ ...dialog, open: false });
  };
  const open = dialog.open;
  const title = dialog.title;
  const description = dialog.description;
  const cancel = dialog.cancel;
  const cancelLabel = cancel.label;
  const onCancelClick = cancel.onClick;
  const confirm = dialog.confirm;
  const confirmLabel = confirm.label;
  const confirmColor = confirm.color;
  const onConfirmClick = confirm.onClick;
  const dialogOpen = open;
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setDialog({ ...dialogDefaultProps });
      }, 150);
    }
  }, [open]);
  const onCancel = (e: any) => {
    onClose(e);
    onCancelClick();
  };
  const onConfirm = (e: any) => {
    onClose(e);
    onConfirmClick();
  };
  return (
    <MDialog
      open={dialogOpen}
      //   onClose={(event: any, reason: any) => {
      //     if (dialog.backAble) {
      //       onCancel(event);
      //     } else if (reason !== "backdropClick") {
      //       onCancel(event);
      //     }
      //   }}
      aria-labelledby="alert-dialog-label"
      aria-describedby="alert-dialog-description"
      scroll={"paper"}
      sx={{
        position: "fixed",
        zIndex: 9999999,
        "& .MuiDialog-paper": {
          width: "100%",
          maxWidth: "360px",
          backgroundColor: youhaGrey[800],
          backgroundImage: "none",
        },
        "& .MuiTextField-root": {
          zIndex: 1,
        },
      }}
    >
      {title !== "" ? (
        <Box
          sx={{
            p: theme.spacing(2, 2, 0, 2),
            m: theme.spacing(0, 0, -1, 0),
          }}
        >
          <Typography
            sx={{
              fontSize: 20,
              lineHeight: "32px",
              fontWeight: "700",
            }}
          >
            {title}
          </Typography>
        </Box>
      ) : null}
      <Box
        sx={{
          p: theme.spacing(2, 2, 0, 2),
        }}
      >
        <Typography
          sx={{
            fontSize: 14,
            lineHeight: "20px",
            color: youhaGrey[300],
          }}
        >
          {description}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: theme.spacing(1),
        }}
      >
        {cancel.show ? (
          <TextButton
            onClick={onCancel}
            label={cancelLabel}
            color={youhaGrey[500]}
          />
        ) : null}
        <TextButton
          onClick={onConfirm}
          label={confirmLabel}
          color={confirmColor}
        />
      </Box>
    </MDialog>
  );
}
