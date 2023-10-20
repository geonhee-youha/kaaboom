import { useRouter } from "next/router";
import { Box, ButtonBase, Stack, Typography, alpha } from "@mui/material";
import { theme } from "../../../themes/theme";
import youhaGrey from "../../../constants/youhaGrey";
import IconButton from "../../atoms/IconButton";
import {
  OrderProps,
  TempUserProps,
  requestsState,
  tempMessageIdsState,
  tempOrders,
  tempUsers,
} from "../../../constants/recoils";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import moment from "moment";
import Slider from "../../atoms/forArtist/Slider";
import { atom, useRecoilState } from "recoil";
import { genders } from "../../../constants";
import User from "../../atoms/forArtist/User";
import { DataRow } from "./RequestSlide";
import { nations } from "../../../constants/nations";
import Typo from "../../atoms/Typo";
import Icon from "../../atoms/Icon";
import ChatItem from "../../molecules/forArtist/ChatItem";

export default function MessageSlide() {
  const [requests, setRequests] = useRecoilState(requestsState);
  const [tempMessageIds, setTempMessageIds] =
    useRecoilState(tempMessageIdsState);
  const router = useRouter();
  const { messageId } = router.query;
  const open = typeof messageId === "string";
  const [item, setItem] = useState<OrderProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  function getZIndex(query: string) {
    let queryArr = Object.entries(query);
    const index = _.findIndex(queryArr, (el) => el[0] === query);
    return index;
  }
  const user = tempUsers[_.findIndex(tempUsers, (el) => el.id === messageId)];
  useEffect(() => {
    if (messageId !== undefined && messageId?.length > 0) {
      const newOrderId = messageId.slice(messageId.length - 1, 1);
      router.push({
        query: { ...router.query, messageId: newOrderId },
      });
    }
  }, []);
  useEffect(() => {
    if (open) {
      if (requests.length === 0) setRequests(tempOrders);
      setLoading(true);
      if (messageId !== undefined) {
        const item = _.filter(
          requests,
          (el) => el.user.id === messageId && el.state === "completed"
        );
        if (_.findIndex(tempMessageIds, (el) => el === messageId) !== -1) {
          setItem(item);
          setLoading(false);
        } else {
          setTimeout(() => {
            setItem(item);
            setLoading(false);
            setTempMessageIds([...tempMessageIds, messageId]);
          }, 350);
        }
      }
    }
  }, [open, router, requests]);
  return (
    <Slider
      open={open}
      header={<Header id={messageId} user={user} />}
      loading={loading}
      zIndex={getZIndex("messageId")}
      reverse
    >
      {item ? <Inner item={item} /> : <></>}
    </Slider>
  );
}

function Inner({ item }: { item: OrderProps[] }) {
  const messages = item;
  return (
    <>
      <Stack
        spacing={2}
        sx={{
          p: theme.spacing(16, 0, 4, 0),
          minHeight: "100vh",
        }}
      >
        {messages.map((item, index) => {
          return <ChatItem key={index} item={item} />;
        })}
      </Stack>
    </>
  );
}

function Header({
  user,
  id,
}: {
  user: TempUserProps;
  id: string | string[] | undefined;
}) {
  const router = useRouter();
  const nation = user
    ? nations[_.findIndex(nations, (el) => el.value === user.nation)]
    : null;
  const gender = user
    ? genders[_.findIndex(genders, (el) => el.value === user.gender)]
    : null;
  const onClickUser = () => {
    router.push(
      {
        query: { ...router.query, userId: user.id },
      },
      undefined,
      { shallow: true }
    );
  };
  const onClickBack = () => {
    router.back();
  };
  return (
    <>
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
            positoin: "relative",
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
              {/* {id && user?.name} */}
              Message
            </Typography>
          </Box>
        </Box>
      </Box>
      {user && (
        <Box
          sx={{
            position: "fixed",
            top: `calc(var(--sait) + 56px)`,
            left: 0,
            right: 0,
            zIndex: 999,
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: `100%`,
              minWidth: "280px",
              maxWidth: `480px`,
              m: theme.spacing(0, "auto"),
              p: theme.spacing(2),
              background: `linear-gradient(${alpha(
                youhaGrey[900],
                1
              )} 75%, ${alpha(youhaGrey[900], 0)})`,
            }}
          >
            <ButtonBase
              sx={{
                width: "100%",
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
                    {nation && (
                      <img
                        src={`https://img.mobiscroll.com/demos/flags/${nation.value}.png`}
                        style={{
                          width: "auto",
                          height: "12px",
                          marginRight: 4,
                        }}
                      />
                    )}
                    {gender && ` / ${gender.label}`}
                  </Typography>
                </Box>
                <Icon name={"chevron-right"} color={youhaGrey[500]} size={24} />
              </Box>
            </ButtonBase>
          </Box>
        </Box>
      )}
    </>
  );
}
