import { useRouter } from "next/router";
import { Box, ButtonBase, Stack, Typography, alpha } from "@mui/material";
import { theme } from "../../../themes/theme";
import youhaGrey from "../../../constants/youhaGrey";
import IconButton from "../../atoms/IconButton";
import {
  OrderProps,
  dialogState,
  tempOrders,
  tempUsers,
} from "../../../constants/recoils";
import _ from "lodash";
import React, { MouseEvent, useEffect, useState } from "react";
import moment from "moment";
import { toOrFromTypes, videoTypes } from "../../../data";
import Slider from "../../atoms/forArtist/Slider";
import { atom, useRecoilState } from "recoil";
import { orderStates } from "../../../constants";
import youhaBlue from "../../../constants/youhaBlue";
import { cyan, deepOrange } from "@mui/material/colors";
import Typo from "../../atoms/Typo";
import User from "../../atoms/forArtist/User";
import { comma } from "../../../utils";
import Button from "../../atoms/Button";
import Icon from "../../atoms/Icon";
import { requestsState } from "../../../pages/forArtist/requests";

const tempOrderIdsState = atom<string[]>({
  key: "tempOrderIdsState",
  default: [],
});

export default function RequestSlide() {
  const [requests, setRequests] = useRecoilState(requestsState);
  const [tempOrderIds, setTempOrderIds] = useRecoilState(tempOrderIdsState);
  const router = useRouter();
  const { orderId } = router.query;
  const open = typeof orderId === "string";
  const [item, setItem] = useState<OrderProps | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  function getZIndex(query: string) {
    let queryArr = Object.entries(query);
    const index = _.findIndex(queryArr, (el) => el[0] === query);
    return index;
  }
  useEffect(() => {
    if (orderId !== undefined && orderId?.length > 0) {
      const newOrderId = orderId.slice(orderId.length - 1, 1);
      router.push({
        query: { ...router.query, orderId: newOrderId },
      });
    }
    if (open) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "scroll";
    }
  }, []);
  useEffect(() => {
    if (open) {
      document.body.style.overflowY = "hidden";
      setLoading(true);
      if (orderId !== undefined) {
        const item = requests[_.findIndex(requests, (el) => el.id === orderId)];
        if (_.findIndex(tempOrderIds, (el) => el === orderId) !== -1) {
          setItem(item);
          setLoading(false);
        } else {
          setTimeout(() => {
            setItem(item);
            setLoading(false);
            setTempOrderIds([...tempOrderIds, orderId]);
          }, 350);
        }
      }
    } else {
      document.body.style.overflowY = "scroll";
    }
  }, [open, requests]);
  return (
    <Slider
      open={open}
      header={<Header />}
      loading={loading}
      zIndex={getZIndex("orderId")}
      pb={20}
    >
      {item ? <Inner item={item} /> : <></>}
    </Slider>
  );
}

function Inner({ item }: { item: OrderProps }) {
  const [dialog, setDialog] = useRecoilState(dialogState);
  const [requests, setRequests] = useRecoilState(requestsState);
  const router = useRouter();
  const id = item.id;
  const state = item.state;
  const date = moment(item.date).format("hh:mm A MM/DD/YYYY");
  const videoType =
    videoTypes[_.findIndex(videoTypes, (el) => el.value === item.videoType)]
      .label;
  const price = item.price;
  const earned = state === "completed" ? price : 0;
  const user =
    tempUsers[_.findIndex(tempUsers, (el) => el.id === item.user.id)];
  const whomType = item.whomType;
  const toWhom = item.toFirstName;
  const toType =
    toOrFromTypes[_.findIndex(toOrFromTypes, (el) => el.value === item.toType)];
  const fromWhom = item.fromFirstName;
  const fromType =
    toOrFromTypes[_.findIndex(toOrFromTypes, (el) => el.value === item.toType)];
  const instructions = item.instructions;
  const expiredDate = moment(
    new Date(item.date.getTime() + 7 * 24 * 60 * 60 * 1000)
  ).format("hh:mm A MM/DD/YYYY");
  const declinedDate = moment(item.declinedDate).format("hh:mm A MM/DD/YYYY");
  const canceledDate = moment(item.canceledDate).format("hh:mm A MM/DD/YYYY");
  const completedDate = moment(item.completedDate).format("hh:mm A MM/DD/YYYY");
  const histories = [
    {
      label: "Request submitted",
      value: date,
    },
  ];
  function getHistories() {
    let histories: HistoryProps[] = [
      {
        label: "Request submitted",
        value: date,
        backgroundColor: youhaBlue[500],
      },
    ];
    if (item.declinedDate)
      histories = [
        ...histories,
        {
          label: "Request declined",
          value: declinedDate,
          backgroundColor: deepOrange[500],
        },
      ];
    if (item.canceledDate)
      histories = [
        ...histories,
        {
          label: "Request canceled",
          value: canceledDate,
          backgroundColor: deepOrange[500],
        },
      ];
    if (
      !item.declinedDate &&
      !item.canceledDate &&
      !item.completedDate &&
      new Date().getTime() >= new Date(expiredDate).getTime()
    )
      histories = [
        ...histories,
        {
          label: "Request expired",
          value: expiredDate,
          backgroundColor: deepOrange[500],
        },
      ];
    if (item.completedDate)
      histories = [
        ...histories,
        {
          label: "Request completed",
          value: expiredDate,
          backgroundColor: cyan[500],
        },
      ];
    return histories;
  }
  const onClickUser = () => {
    router.push(
      {
        query: { ...router.query, userId: user.id },
      },
      undefined,
      { shallow: true }
    );
  };
  const onClickSend = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.stopPropagation();
    router.push(
      {
        query: { ...router.query, sendVideoId: item.id },
      },
      undefined,
      { shallow: true }
    );
  };
  const onClickDecline = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.stopPropagation();
    setDialog((prev) => {
      return {
        ...prev,
        open: true,
        title: "Are you sure you want to decline?",
        description:
          "If you decline now, there is no going back, your fan will be notified of your rejection, and a refund will be issued.",
        cancel: {
          ...prev.cancel,
        },
        confirm: {
          ...prev.confirm,
          color: deepOrange[500],
          onClick: () => {
            setRequests((prev) => {
              let next = _.cloneDeep(prev);
              let target = next[_.findIndex(next, (el) => el.id === id)];
              target.state = "declined";
              return next;
            });
          },
        },
      };
    });
  };
  return (
    <>
      <Stack
        spacing={2}
        sx={{
          p: theme.spacing(2),
        }}
      >
        <Box
          sx={{
            borderRadius: 1,
            backgroundColor: youhaGrey[700],
            display: "flex",
          }}
        >
          <Box
            sx={{
              flex: 1,
              display: "flex",
              p: theme.spacing(2),
              borderRight: `1px solid ${youhaGrey[400]}`,
              // justifyContent:'space-between',
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: 14,
                lineHeight: "20px",
                color: youhaGrey[300],
                m: theme.spacing(0, 2, 0, 0),
              }}
            >
              Earned
            </Typography>
            <Typography
              sx={{
                fontSize: 14,
                lineHeight: "20px",
                fontWeight: "700",
                color: state === "completed" ? cyan[500] : "#ffffff",
              }}
            >
              ${earned}
            </Typography>
          </Box>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              p: theme.spacing(2),
              // justifyContent:'space-between',
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: 14,
                lineHeight: "20px",
                color: youhaGrey[300],
                m: theme.spacing(0, 2, 0, 0),
              }}
            >
              Status
            </Typography>
            <Typography
              sx={{
                fontSize: 14,
                lineHeight: "20px",
                fontWeight: "700",
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
              {
                orderStates[
                  _.findIndex(orderStates, (el) => el.value === state)
                ].label
              }
            </Typography>
          </Box>
        </Box>
        <ButtonBase
          sx={{
            borderRadius: 1,
            backgroundColor: youhaGrey[700],
          }}
          onClick={onClickUser}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              p: theme.spacing(2),
              // borderBottom: `1px solid ${youhaGrey[400]}`,
            }}
          >
            <User item={user} />
            <Box
              sx={{
                flex: 1,
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
            <Icon name={"chevron-right"} color={youhaGrey[500]} size={24} />
          </Box>
        </ButtonBase>
        <Box
          sx={{
            borderRadius: 1,
            backgroundColor: youhaGrey[700],
          }}
        >
          <Box
            sx={{
              p: theme.spacing(2, 2, 0, 2),
              "& > *:not(:nth-of-type(1))": {
                m: theme.spacing(2, 0, 0, 0),
              },
              // borderBottom: `1px solid ${youhaGrey[400]}`,
            }}
          >
            <DataRow
              label={"Video type"}
              value={videoType}
              flexDirection="column"
            />
            <DataRow
              label={"Price"}
              value={`$${comma(price)}.00`}
              flexDirection="column"
            />
            <DataRow
              label={"For"}
              value={`${toWhom}${toType ? ` (${toType.label})` : ``}`}
              flexDirection="column"
            />
            {whomType !== "myself" && (
              <DataRow
                label={"From"}
                value={`${fromWhom}${fromType ? ` (${fromType.label})` : ``}`}
                flexDirection="column"
              />
            )}
          </Box>
          <Box
            sx={{
              p: theme.spacing(2),
              "& > *:not(:nth-of-type(1))": {
                m: theme.spacing(1, 0, 0, 0),
              },
            }}
          >
            <DataRow
              label={"Instructions"}
              value={instructions}
              flexDirection="column"
            />
          </Box>
        </Box>
        <Box
          sx={{
            borderRadius: 1,
            backgroundColor: youhaGrey[700],
            p: theme.spacing(2),
          }}
        >
          <Typography
            sx={{
              fontSize: 14,
              lineHeight: "20px",
              color: youhaGrey[300],
            }}
          >
            History
          </Typography>
          <Box
            sx={{
              m: theme.spacing(1, 0, 0, 0),
              p: theme.spacing(1, 0),
              "& > div:not(:nth-of-type(1))": {
                m: theme.spacing(2, 0, 0, 0),
                position: "relative",
                ":after": {
                  position: "absolute",
                  content: '""',
                  top: -32,
                  left: 11.5,
                  height: 32,
                  width: "1px",
                  border: `1px dashed ${youhaGrey[300]}`,
                  zIndex: 0,
                },
              },
            }}
          >
            {getHistories().map((item, index) => (
              <HistoryRow key={index} item={item} />
            ))}
          </Box>
        </Box>
      </Stack>
      <Box
        sx={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          p: theme.spacing(0, 0, `calc(vat(--saib))`, 0),
          background: `linear-gradient(${alpha(youhaGrey[900], 0)}, ${alpha(
            youhaGrey[900],
            1
          )} 75%)`,
        }}
      >
        <Box
          sx={{
            minWidth: "280px",
            maxWidth: `480px`,
            m: theme.spacing(0, "auto"),
          }}
        >
          {state === "requested" ? (
            <Stack
              direction={"row"}
              spacing={1.5}
              sx={{
                p: theme.spacing(2, 2, 2, 2),
              }}
            >
              <Button fullWidth size="lg" onClick={onClickSend}>
                Send video
              </Button>
              <Button
                fullWidth
                size="lg"
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
                p: theme.spacing(2, 2, 2, 2),
              }}
            >
              <Button
                fullWidth
                size="lg"
                backgroundColor={cyan[500]}
                // color={youhaGrey[200]}
              >
                View sent video
              </Button>
            </Stack>
          ) : (
            <></>
          )}
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
            textAlign: "center",
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
    </>
  );
}

function Header() {
  const router = useRouter();
  const onClickBack = () => {
    router.back();
  };
  return (
    <Box
      sx={{
        position: "fixed",
        left: 0,
        right: 0,
        top: 0,
        zIndex: 999,
        p: theme.spacing("var(--sait)", 0, 0, 0),
        backgroundColor: youhaGrey[900],
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: "480px",
          minWidth: "320px",
          m: theme.spacing(0, "auto"),
          p: theme.spacing(0, 1),
          height: 56,
          display: "flex",
          alignItems: "center",
        }}
      >
        <IconButton
          name="chevron-left"
          prefix="fas"
          size={20}
          onClick={onClickBack}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: `calc(100% - 108px)`,
            maxWidth: `calc(480px - 108px)`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: 16,
              lineHeight: "32px",
              fontWeight: "700",
            }}
          >
            Order detail
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export function DataRow({
  label,
  value,
  flexDirection = "row",
}: {
  label: string;
  value: React.ReactNode;
  flexDirection?: string;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: flexDirection,
      }}
    >
      <Typography
        sx={{
          fontSize: 14,
          lineHeight: "20px",
          minWidth: 100,
          color: youhaGrey[300],
        }}
      >
        {label}
      </Typography>
      <Typography
        sx={{
          fontSize: 14,
          lineHeight: flexDirection === "column" ? "24px" : "20px",
          m: theme.spacing(flexDirection === "column" ? 0.5 : 0, 0, 0, 0),
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}

type HistoryProps = {
  label: string;
  value: React.ReactNode;
  backgroundColor: string;
};

function HistoryRow({ item }: { item: HistoryProps }) {
  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <Box
        sx={{
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: 24,
          height: 24,
          m: theme.spacing(0, 2, 0, 0),
          backgroundColor: youhaBlue[500],
        }}
      >
        <Icon
          name="check"
          size={16}
          prefix="far"
          // color={item.backgroundColor}
        />
      </Box>
      <Box>
        <Typography
          sx={{
            fontSize: 14,
            lineHeight: "20px",
            m: theme.spacing(0, 2, 0, 0),
            minWidth: 100,
          }}
        >
          {item.label}
        </Typography>
        <Typography
          sx={{
            fontSize: 12,
            lineHeight: "16px",
            color: youhaGrey[300],
            m: theme.spacing(0.5, 0, 0, 0),
          }}
        >
          {item.value}
        </Typography>
      </Box>
    </Box>
  );
}
