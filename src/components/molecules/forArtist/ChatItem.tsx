import { Box, Stack, Typography } from "@mui/material";
import User from "../../atoms/forArtist/User";
import { tempArtistUser } from "../../../data/temp";
import { theme } from "../../../themes/theme";
import moment from "moment";
import youhaGrey from "../../../constants/youhaGrey";
import {
  OrderProps,
  messagesState,
  tempUsers,
} from "../../../constants/recoils";
import { videoTypes } from "../../../data";
import _ from "lodash";
import Typo from "../../atoms/Typo";
import { comma } from "../../../utils";
import { messages } from "../../../data/message";
import VideoPlayer from "../../atoms/forArtist/VideoPlayer";
import { reviews } from "../../../data/review";
import Icon from "../../atoms/Icon";
import youhaBlue from "../../../constants/youhaBlue";
import { useRecoilState } from "recoil";

export default function ChatItem({ item }: { item: OrderProps }) {
  const [messages, setMessages] = useRecoilState(messagesState);
  const id = item.id;
  const state = item.state;
  const date = moment(item.date).format("hh:mm A MM/DD/YYYY");
  const videoType =
    videoTypes[_.findIndex(videoTypes, (el) => el.value === item.videoType)]
      .label;
  const price = item.price;
  const user =
    tempUsers[_.findIndex(tempUsers, (el) => el.id === item.user.id)];
  const whomType = item.whomType;
  const toWhom = item.toFirstName;
  const fromWhom = item.fromFirstName;
  const instructions = item.instructions;
  const expiredDate = moment(
    new Date(item.date.getTime() + 7 * 24 * 60 * 60 * 1000)
  ).format("hh:mm A MM/DD/YYYY");
  const declinedDate = moment(item.declinedDate).format("hh:mm A MM/DD/YYYY");
  const canceledDate = moment(item.canceledDate).format("hh:mm A MM/DD/YYYY");
  const completedDate = moment(item.completedDate).format("hh:mm A MM/DD/YYYY");
  const video = messages[_.findIndex(messages, (el) => el.id === item.id)];
  const review = reviews[0];
  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          p: theme.spacing(0, 2, 2, 2),
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            m: theme.spacing(0, 2, 0),
            maxWidth: "calc(100% - 120px)",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Box
              sx={{
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                borderBottomLeftRadius: 8,
                borderBottomRightRadius: 0,
                backgroundColor: youhaGrey[600],
              }}
            >
              <Box
                sx={{
                  p: theme.spacing(2),
                  "& > *:not(:nth-of-type(1))": {
                    m: theme.spacing(1, 0, 0, 0),
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 14,
                      lineHeight: "20px",
                      fontWeight: "700",
                    }}
                  >
                    {videoType}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 14,
                      lineHeight: "20px",
                      fontWeight: "700",
                    }}
                  >
                    {`$${comma(price)}.00`}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontSize: 14,
                      lineHeight: "20px",
                    }}
                  >
                    {`For ${toWhom}`}
                    {whomType !== "myself" && (
                      <>
                        <span>{` / `}</span>
                        {`From ${fromWhom}`}
                      </>
                    )}
                  </Typography>
                </Box>
                <Box>
                  <Typo
                    lines={3}
                    sx={{
                      fontSize: 14,
                      lineHeight: "20px",
                      color: youhaGrey[300],
                    }}
                  >
                    {instructions}
                  </Typo>
                </Box>
              </Box>
            </Box>
            <Typography
              sx={{
                fontSize: 12,
                lineHeight: "16px",
                color: youhaGrey[300],
                m: theme.spacing(1, 0, 0, 0),
                textAlign: "right",
              }}
            >
              {moment(item.date).format("MM/DD/YYYY")}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            m: theme.spacing(0, 0, 3, 0),
          }}
        >
          <User item={user} size={32} />
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "flex-end",
          p: theme.spacing(0, 2, 2, 2),
        }}
      >
        <Box
          sx={{
            m: theme.spacing(0, 0, 3, 0),
          }}
        >
          <User item={tempArtistUser} size={32} />
        </Box>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            m: theme.spacing(0, 0, 0, 2),
            maxWidth: "calc(100% - 120px)",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <VideoPlayer item={video && video} />
            <Typography
              sx={{
                fontSize: 12,
                lineHeight: "16px",
                color: youhaGrey[300],
                m: theme.spacing(1, 0, 0, 0),
              }}
            >
              {moment(item.completedDate).format("MM/DD/YYYY")}
            </Typography>
          </Box>
        </Box>
      </Box>
      {video && video.rated && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            p: theme.spacing(0, 2, 2, 2),
          }}
        >
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              m: theme.spacing(0, 2, 0),
              maxWidth: "calc(100% - 120px)",
            }}
          >
            <Stack spacing={2} sx={{ display: "flex", alignItems: "flex-end" }}>
              <Box
                sx={{
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                  borderBottomLeftRadius: 8,
                  borderBottomRightRadius: 0,
                  backgroundColor: youhaGrey[600],
                }}
              >
                <Box
                  sx={{
                    p: theme.spacing(2),
                    "& > *:not(:nth-of-type(1))": {
                      m: theme.spacing(1, 0, 0, 0),
                    },
                  }}
                >
                  <Box>
                    <Icon name="thumbs-up" color={youhaBlue[500]} size={24} />
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                  borderBottomLeftRadius: 8,
                  borderBottomRightRadius: 0,
                  backgroundColor: youhaGrey[600],
                }}
              >
                <Box
                  sx={{
                    p: theme.spacing(2),
                    "& > *:not(:nth-of-type(1))": {
                      m: theme.spacing(1, 0, 0, 0),
                    },
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontSize: 14,
                        lineHeight: "20px",
                      }}
                    >
                      {review.contents}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Typography
                sx={{
                  fontSize: 12,
                  lineHeight: "16px",
                  color: youhaGrey[300],
                  m: theme.spacing(1, 0, 0, 0),
                  textAlign: "right",
                }}
              >
                {moment(review.date).format("MM/DD/YYYY")}
              </Typography>
            </Stack>
          </Box>
          <Box
            sx={{
              m: theme.spacing(0, 0, 3, 0),
            }}
          >
            <User item={user} size={32} />
          </Box>
        </Box>
      )}
    </>
  );
}
