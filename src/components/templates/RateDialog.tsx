import { Box, Dialog, Stack, Typography, alpha } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { theme } from "../../themes/theme";
import IconButton from "../atoms/IconButton";
import youhaGrey from "../../constants/youhaGrey";
import youhaBlue from "../../constants/youhaBlue";
import { useRecoilState } from "recoil";
import { messagesState } from "../../constants/recoils";
import { useRouter } from "next/router";
import Input from "../atoms/Input";
import { artists } from "../../data/artist";
import _ from "lodash";
import Button from "../atoms/Button";
import Icon from "../atoms/Icon";
import { InputProps, inputDefaultProps } from "../../constants";

export default function RateDialog() {
  //#region [router] 이동 및 쿼리
  const router = useRouter();
  const { rating, id } = router.query;
  const open = rating === "true";
  //#region [state] 메시지 및 아티스트
  const [messages, setMessages] = useRecoilState(messagesState);
  const message =
    messages[
      _.findIndex(messages, (el) => {
        return el.id === id;
      })
    ];
  const artist =
    artists[
      _.findIndex(artists, (el) => {
        return el.name === message?.artist.name;
      })
    ];
  //#endregion [state] 메시지 및 아티스트
  //#endregion [router] 이동 및 쿼리
  //#region [state] 본문 및 검증
  const [input, setInput] = useState<InputProps>(inputDefaultProps);
  const buttonDisabled = input.error;
  //#endregion [state] 본문 및 검증
  //#region [function] 본문
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const error = value === "" || value.length < 10 || value.length > 250;
    const helperText = error
      ? value === ""
        ? "Required"
        : value.length < 45
        ? `Total character count cannot be less than ${10}`
        : `Total character count cannot exceed ${250}`
      : "";
    const input = {
      value: value,
      error: error,
      helperText: helperText,
    };
    setInput(input);
  };
  //#endregion [function] 본문
  //#region [function] 닫기
  const onClose = () => {
    router.push(`${router.pathname}?id=${id}`, undefined, {
      shallow: true,
    });
    setInput(inputDefaultProps);
  };
  //#endregion [function] 닫기
  //#region [function] 메인 액션
  const onClickSend = () => {
    if (input.value === "")
      return setInput({ ...input, error: true, helperText: "Required" });
    setMessages((prev) => {
      let newPrev = _.cloneDeep(prev);
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
  //#endregion [function] 메인 액션
  //#region [side effect] 메시지 레이팅 검증
  useEffect(() => {
    if (open && message.rated === true) {
      router.back();
    }
  }, [open, message]);
  //#endregion [side effect] 메시지 레이팅 검증
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
        <Box
          sx={{
            flex: 1,
            p: theme.spacing(1),
          }}
        >
          <Stack direction={"row"} spacing={1}>
            <Icon
              name="thumbs-up"
              color={youhaBlue[400]}
              prefix="fas"
              size={24}
            />
            <Typography
              sx={{
                fontSize: 20,
                lineHeight: "32px",
                fontWeight: "700",
              }}
            >
              Send a thank you note
            </Typography>
          </Stack>
          <Typography
            sx={{
              fontSize: 14,
              lineHeight: "20px",
              color: youhaGrey[300],
            }}
          >
            Let {artist ? artist?.name : "him"} know how much this video meant
            to you by sending a message
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
          value={input.value}
          onChange={onChange}
          multiline
          minRows={6}
          error={input.error}
          maxLength={250}
          helperText={input.helperText}
          showMaxLength
        />
        <Button
          disabled={buttonDisabled}
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
