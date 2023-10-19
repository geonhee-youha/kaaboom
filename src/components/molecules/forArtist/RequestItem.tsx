import { Box, ButtonBase, Stack, Typography, alpha } from "@mui/material";
import { theme } from "../../../themes/theme";
import youhaGrey from "../../../constants/youhaGrey";
import youhaBlue from "../../../constants/youhaBlue";
import Icon from "../../../components/atoms/Icon";
import { OrderProps, tempUsers } from "../../../constants/recoils";
import _ from "lodash";
import moment from "moment";
import { videoTypes } from "../../../data";
import { comma } from "../../../utils";
import Typo from "../../../components/atoms/Typo";
import Button from "../../../components/atoms/Button";
import {
  cyan,
  deepOrange,
  deepPurple,
  indigo,
  pink,
  red,
} from "@mui/material/colors";
import { tempUser } from "../../../data/temp";
import Visual from "../../../components/atoms/Visual";
import { useRouter } from "next/router";
import User from "../../atoms/forArtist/User";
import { MouseEvent } from "react";

export default function RequestItem({
  shown,
  item,
}: {
  shown?: boolean;
  item: OrderProps;
}) {
  const router = useRouter();
  const id = item.id;
  const { orderId } = router.query;
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
  const onClick = () => {
    router.push(
      `${router.asPath}${
        router.asPath.includes("?") ? "&orderId=" : "?orderId="
      }${id}`,
      undefined,
      { shallow: true }
    );
  };
  const onClickSend = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.stopPropagation();
  };
  const onClickDecline = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.stopPropagation();
  };
  return (
    <Box
      sx={{
        maxHeight: shown ? 400 : 0,
        opacity: shown ? 1 : 0,
        transition: "all 0.35s ease",
        overflow: "visible",
      }}
    >
      <Box
        sx={{
          p: theme.spacing(0, 0, 2, 0),
        }}
      >
        <ButtonBase
          sx={{
            borderRadius: 1,
            backgroundColor: youhaGrey[700],
            flexDirection: "column",
            overflow: "hidden",
            "& > *": {
              width: "100%",
            },
          }}
          disableRipple
          onClick={onClick}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              p: theme.spacing(2),
              borderBottom: `1px solid ${youhaGrey[400]}`,
            }}
          >
            <Box
              sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
              }}
            >
              <User item={user} />
              <Box
                sx={{
                  m: theme.spacing(0, 0, 0, 2),
                }}
              >
                <Typo
                  lines={1}
                  sx={{
                    flex: 1,
                    fontSize: 14,
                    lineHeight: "20px",
                  }}
                >
                  {user.name}
                </Typo>
                <Typography
                  sx={{
                    fontSize: 12,
                    lineHeight: "16px",
                    color: youhaGrey[300],
                    m: theme.spacing(0.5, 0, 0, 0),
                  }}
                >
                  {date}
                </Typography>
              </Box>
            </Box>
          </Box>
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
          <Box
            sx={{
              p: theme.spacing(0, 2, 2, 2),
            }}
          >
            <Typo
              lines={3}
              sx={{
                // textAlign: "center",
                fontSize: 12,
                lineHeight: "16px",
                color:
                  state === "requested"
                    ? youhaBlue[300]
                    : state === "completed"
                    ? cyan[300]
                    : state === "expired" ||
                      state === "declined" ||
                      state === "canceled"
                    ? deepOrange[500]
                    : youhaGrey[300],
              }}
            >
              {state === "requested"
                ? `this request will be expired at ${expiredDate}`
                : state === "completed"
                ? `this request was completed at ${completedDate}`
                : state === "expired"
                ? `this request was expired at ${expiredDate}`
                : state === "declined"
                ? `this request was declined at ${declinedDate}`
                : state === "canceled"
                ? `this request was canceled at ${canceledDate}`
                : ""}
            </Typo>
          </Box>
          {state === "requested" ? (
            <Stack
              direction={"row"}
              spacing={1.5}
              sx={{
                p: theme.spacing(0, 2, 2, 2),
              }}
            >
              <Button fullWidth size="md" onClick={onClickSend}>
                Send video
              </Button>
              <Button
                fullWidth
                size="md"
                backgroundColor={youhaGrey[600]}
                color={youhaGrey[300]}
                onClick={onClickDecline}
              >
                Decline
              </Button>
            </Stack>
          ) : state === "completed" ? (
            <Stack
              direction={"row"}
              spacing={1.5}
              sx={{
                p: theme.spacing(0, 2, 2, 2),
              }}
            >
              <Button
                fullWidth
                size="md"
                backgroundColor={cyan[500]}
                // color={youhaGrey[200]}
              >
                View sent video
              </Button>
            </Stack>
          ) : (
            <></>
          )}
        </ButtonBase>
      </Box>
    </Box>
  );
}
