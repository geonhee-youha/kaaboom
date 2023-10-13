import {
  Box,
  Dialog,
  InputBase,
  Stack,
  Typography,
  alpha,
} from "@mui/material";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { theme } from "../../themes/theme";
import IconButton from "../atoms/IconButton";
import TextButton from "../atoms/TextButton";
import youhaGrey from "../../constants/youhaGrey";
import youhaBlue from "../../constants/youhaBlue";
import { useRecoilState } from "recoil";
import { messagesState, rateDialogRecoilState } from "../../constants/recoils";
import { useRouter } from "next/router";
import Input from "../atoms/Input";
import { artists } from "../../data/artist";
import _ from "lodash";
import Button from "../atoms/Button";
import Icon from "../atoms/Icon";

export default function RateDialog({ }: {}) {
  const router = useRouter();
  const [rateDialog, setRateDialog] = useRecoilState(rateDialogRecoilState);
  const [messages, setMessages] = useRecoilState(messagesState);
  const { id, open } = rateDialog; //api에 어디에 레이팅하는지 알기위한 id를 받아옴
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const unavailable = value === "" || value.length > 250;
  const artist =
    artists[
    _.findIndex(artists, (el) => {
      return el.id === id;
    })
    ];
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setValue(value);
    if (value.length < 20 || value.length > 250) {
      setError(true)
    } else {
      setError(false)
    }
  };
  const onClose = () => {
    setRateDialog({ id: "", open: false });
    setValue("");
  };
  const onClickSend = () => {
    setMessages((prev) => {
      let newPrev = _.cloneDeep(prev);
      console.log(newPrev, id);
      let targetEl =
        newPrev[
        _.findIndex(newPrev, (el) => {
          return el.id === id;
        })
        ];
      targetEl.rated = true;
      return newPrev;
    });
    onClose();
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
          p: theme.spacing(1, 1, 1, 1),
        }}
      >
        <Icon
          name="thumbs-up"
          color={youhaBlue[400]}
          prefix="fas"
          size={40}
          sx={{
            m: theme.spacing(1),
          }}
        />
        <Box
          sx={{
            flex: 1,
            p: theme.spacing(1),
          }}
        >
          <Typography
            sx={{
              fontSize: 20,
              lineHeight: "32px",
              fontWeight: "700",
            }}
          >
            Send a thank you note
          </Typography>
          <Typography
            sx={{
              fontSize: 14,
              lineHeight: "20px",
              color: youhaGrey[300],
            }}
          >
            Let {artist ? artist.name : "him"} know how much this video meant to
            you by sending a message
          </Typography>
        </Box>
        <IconButton name="xmark" onClick={onClose} />
      </Box>
      <Box
        sx={{
          p: 2,
        }}
      >
        <Input
          placeholder={
            "We saw your show in New York and snuck into the after show"
          }
          value={value}
          onChange={onChange}
          multiline
          minRows={6}
          error={error}
          maxLength={250}
          helperText={
            error &&
            (value === ""
              ? "Required" :
              value.length < 20 ?
                `Total character count must exceed ${20}`
                : `Total character count cannot exceed ${250}`)
          }
          showMaxLength
          canOverMaxLength
        />
        <Button
          disabled={unavailable}
          fullWidth
          sx={{ m: theme.spacing(3, 0, 0, 0) }}
          onClick={onClickSend}
        >
          Send
        </Button>
      </Box>
    </Dialog>
  );
}
