import _ from "lodash";
import { artists } from "../../data/artist";
import { MessageProps } from "../../data/message";
import { Box, ButtonBase, Stack, Typography, alpha } from "@mui/material";
import youhaGrey from "../../constants/youhaGrey";
import Visual from "../atoms/Visual";
import { theme } from "../../themes/theme";
import moment from "moment";
import Link from "next/link";
import MessageItem from "./MessageItem";
import { useState } from "react";
import IconButton from "../atoms/IconButton";
import youhaBlue from "../../constants/youhaBlue";
import { useRecoilState } from "recoil";
import { rateDialogRecoilState } from "../../constants/recoils";

export default function MessageChatItem({
  type,
  item,
}: {
  type?: string;
  item: MessageProps;
}) {
  const [rateDialog, setRateDialog] = useRecoilState(rateDialogRecoilState);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const artist =
    artists[
      _.findIndex(artists, (el) => {
        return el.name === item.artist.name;
      })
    ];
  const onClickDownload = () => {
    alert("다운로드 기능");
  };
  const onClickShare = () => {
    alert("공유 기능");
  };
  const onClickRate = () => {
    if (item.rated) return;
    setRateDialog({ id: item.id, open: true });
  };
  return (
    <Box
      sx={{
        p: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <Link href={`/detail/artist/${artist.id}`} passHref>
          <ButtonBase
            sx={{
              position: "relative",
              width: 40,
              height: 40,
              m: theme.spacing(0, 1.5, 0, 0),
            }}
            disableRipple
          >
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: "100%",
                border: `1px solid ${youhaGrey[700]}`,
                borderRadius: "50%",
                overflow: "hidden",
                aspectRatio: `1`,
              }}
            >
              <Visual src={artist.thumbnail} absolute noScale={false} />
            </Box>
          </ButtonBase>
        </Link>
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <Box sx={{ flex: 1 }}>
              <MessageItem
                index={1}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
                item={item}
                type="chat"
              />
            </Box>
            <Stack
              spacing={2}
              alignItems={"center"}
              sx={{
                m: theme.spacing(0, 0, 0, 2),
              }}
            >
              {/* <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <IconButton
                  name="expand"
                  backgroundColor={youhaGrey[700]}
                  //   borderColor={youhaGrey[600]}
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                  }}
                  prefix="fal"
                />
                <Typography
                  sx={{
                    m: theme.spacing(0.5, 0, 0, 0),
                    fontSize: 10,
                    lineHeight: "14px",
                    textAlign: "center",
                  }}
                >
                  Full screen
                </Typography>
              </Box> */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={onClickDownload}
              >
                <IconButton
                  name="download"
                  backgroundColor={youhaGrey[700]}
                  //   borderColor={youhaGrey[600]}
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                  }}
                  prefix="fal"
                />
                <Typography
                  sx={{
                    m: theme.spacing(0.5, 0, 0, 0),
                    fontSize: 10,
                    lineHeight: "14px",
                    textAlign: "center",
                  }}
                >
                  Download
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={onClickShare}
              >
                <IconButton
                  name="share-alt"
                  backgroundColor={youhaGrey[700]}
                  //   borderColor={youhaGrey[600]}
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                  }}
                  prefix="fal"
                />
                <Typography
                  sx={{
                    m: theme.spacing(0.5, 0, 0, 0),
                    fontSize: 10,
                    lineHeight: "14px",
                    textAlign: "center",
                  }}
                >
                  Share
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  cursor: item.rated ? "initial" : "pointer",
                }}
                onClick={onClickRate}
              >
                <IconButton
                  name="thumbs-up"
                  backgroundColor={
                    item.rated ? alpha(youhaGrey[700], 0.4) : youhaGrey[700]
                  }
                  //   borderColor={youhaGrey[600]}
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    cursor: item.rated ? "default !important" : "initial",
                    "& *": {
                      cursor: item.rated ? "default !important" : "initial",
                    },
                  }}
                  prefix={item.rated ? "fas" : "fal"}
                  color={item.rated ? youhaBlue[500] : "#ffffff"}
                  disableRipple={item.rated}
                />
                <Typography
                  sx={{
                    m: theme.spacing(0.5, 0, 0, 0),
                    fontSize: 10,
                    lineHeight: "14px",
                    textAlign: "center",
                    opacity: item.rated ? 0.4 : 1,
                  }}
                >
                  Say thank
                </Typography>
              </Box>
            </Stack>
          </Box>
          <Box
            sx={{
              maxWidth: 420,
              p: theme.spacing(2),
              m: theme.spacing(2, 0, 0, 0),
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 8,
              border: `1px solid ${youhaGrey[400]}`,
            }}
          >
            <Typography
              sx={{
                fontSize: 14,
                lineHeight: "20px",
              }}
            >
              {item.text}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          m: theme.spacing(1, 0, 0, 6.5),
        }}
      >
        <Typography
          sx={{
            fontSize: 12,
            lineHeight: "16px",
            color: youhaGrey[200],
          }}
        >
          {moment(item.date).format("MM/DD/YYYY")}
        </Typography>
      </Box>
    </Box>
  );
}
