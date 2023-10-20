import { useRouter } from "next/router";
import { Box, Stack, Typography } from "@mui/material";
import { theme } from "../../../themes/theme";
import youhaGrey from "../../../constants/youhaGrey";
import IconButton from "../../atoms/IconButton";
import {
  TempUserProps,
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

const tempUserIdsState = atom<string[]>({
  key: "tempUserIdsState",
  default: [],
});

export default function UserSlide() {
  const [tempUserIds, setTempUserIds] = useRecoilState(tempUserIdsState);
  const router = useRouter();
  const { userId } = router.query;
  const open = typeof userId === "string";
  const [item, setItem] = useState<TempUserProps | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  function getZIndex(query: string) {
    let queryArr = Object.entries(query);
    const index = _.findIndex(queryArr, (el) => el[0] === query);
    return index;
  }
  useEffect(() => {
    if (userId !== undefined && userId?.length > 0) {
      const newOrderId = userId.slice(userId.length - 1, 1);
      router.push({
        query: { ...router.query, userId: newOrderId },
      });
    }
  }, []);
  useEffect(() => {
    if (open) {
      setLoading(true);
      if (userId !== undefined) {
        const item =
          tempUsers[_.findIndex(tempOrders, (el) => el.id === userId)];
        if (_.findIndex(tempUserIds, (el) => el === userId) !== -1) {
          setItem(item);
          setLoading(false);
        } else {
          setTimeout(() => {
            setItem(item);
            setLoading(false);
            setTempUserIds([...tempUserIds, userId]);
          }, 350);
        }
      }
    }
  }, [open, router]);
  return (
    <Slider
      open={open}
      header={<Header id={userId} />}
      loading={loading}
      zIndex={getZIndex("userId")}
    >
      {item ? <Inner item={item} /> : <></>}
    </Slider>
  );
}

function Inner({ item }: { item: TempUserProps }) {
  const name = item.name;
  const bio = item.bio;
  const nation =
    nations[_.findIndex(nations, (el) => el.value === item.nation)];
  const gender =
    genders[_.findIndex(genders, (el) => el.value === item.gender)];
  const birthDate = item.birthDate;
  return (
    <>
      <Box
        sx={{
          p: theme.spacing(2),
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <User item={item} size={120} />
        <Typography
          sx={{
            fontSize: 24,
            lineHeight: "36px",
            fontWeight: "700",
            textAlign: "center",
            m: theme.spacing(1, 0, 0, 0),
          }}
        >
          {item.name}
        </Typography>
        <Typography
          sx={{
            fontSize: 14,
            lineHeight: "20px",
            color: youhaGrey[300],
            textAlign: "center",
            m: theme.spacing(0.5, 0, 0, 0),
          }}
        >
          {item.email}
        </Typography>
        <Typography
          sx={{
            fontSize: 14,
            lineHeight: "20px",
            textAlign: "center",
            m: theme.spacing(2, 0, 0, 0),
          }}
        >
          {item.bio}
        </Typography>
      </Box>
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
          }}
        >
          <Box
            sx={{
              p: theme.spacing(2, 2, 2, 2),
              "& > *:not(:nth-of-type(1))": {
                m: theme.spacing(2, 0, 0, 0),
              },
              // borderBottom: `1px solid ${youhaGrey[400]}`,
            }}
          >
            <DataRow
              label={"Nation"}
              value={
                <>
                  <img
                    src={`https://img.mobiscroll.com/demos/flags/${nation.value}.png`}
                    style={{ width: "auto", height: "16px", marginRight: 4 }}
                  />
                  {nation.label}
                </>
              }
              flexDirection="column"
            />
            <DataRow
              label={"Gender"}
              value={gender.label}
              flexDirection="column"
            />
            <DataRow
              label={"Date of birth"}
              value={moment(birthDate).format("DD/MM/YYYY")}
              flexDirection="column"
            />
          </Box>
        </Box>
      </Stack>
    </>
  );
}

function Header({ id }: { id: string | string[] | undefined }) {
  const router = useRouter();
  const user = tempUsers[_.findIndex(tempUsers, (el) => el.id === id)];
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
            User details
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
