import { Box, ButtonBase, Stack, Typography, alpha } from "@mui/material";
import Screen from "../../components/atoms/forArtist/Screen";
import { useEffect, useState } from "react";
import { theme } from "../../themes/theme";
import { OrderProps, tempOrders } from "../../constants/recoils";
import _ from "lodash";
import { atom, useRecoilState } from "recoil";
import MessageItem from "../../components/molecules/forArtist/MessageItem";
import { ArtistProps } from "../../types/user";
import { TempArtistUserProps, tempArtistUser } from "../../data/temp";
import User from "../../components/atoms/forArtist/User";
import youhaGrey from "../../constants/youhaGrey";
import youhaBlue from "../../constants/youhaBlue";
import Icon from "../../components/atoms/Icon";

const tempLoadedState = atom({
  key: "tempLoaded/profile",
  default: false,
});

export default function Index() {
  const [tempLoaded, setTempLoaded] = useRecoilState(tempLoadedState);
  const [item, setItem] = useState<TempArtistUserProps | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  function getMessagesByUser() {
    let arr = [];
    const userIds = _.uniq(
      _.filter(tempOrders, (el) => el.state === "completed").flatMap(
        (el) => el.user.id
      )
    );
    arr = userIds.map((el) => {
      const id = el;
      return {
        id: id,
        requests: _.filter(tempOrders, (el) => el.user.id === id),
      };
    });
    return arr;
  }
  useEffect(() => {
    setLoading(true);
    if (!tempLoaded) {
      setTimeout(() => {
        setItem(tempArtistUser);
        setTempLoaded(true);
        setLoading(false);
      }, 350);
    } else {
      setItem(tempArtistUser);
      setLoading(false);
    }
  }, []);
  return <Screen loading={loading}>{item && <Page item={item} />}</Screen>;
}

function Page({ item }: { item: TempArtistUserProps }) {
  const requestPrices = _.filter(
    tempOrders,
    (el) => el.state === "completed"
  ).flatMap((el) => el.price);
  function getPriceSum() {
    let result = requestPrices.reduce((prev, cur) => {
      return (prev += cur);
    }, 0);
    return result;
  }
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
            color: youhaGrey[200],
            textAlign: "center",
            m: theme.spacing(0, 0, 0, 0),
          }}
        >
          {item.group}
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
        <ButtonBase
          sx={{
            position: "relative",
            borderRadius: 1,
            // backgroundColor: alpha(youhaBlue[500], 0.4),
            backgroundColor: youhaGrey[700],
            border: `1px solid ${youhaBlue[500]}`,
            p: theme.spacing(2),
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Icon
            name="sack-dollar"
            color={youhaBlue[500]}
            prefix="fad"
            sx={{
              position: "absolute",
              right: 0,
              bottom: -16,
              transform: `rotate(-15deg)`,
              opacity: 0.4,
            }}
            size={144}
          />
          <Box sx={{ flex: 1 }}>
            <Typography
              sx={{
                fontSize: 14,
                lineHeight: "20px",
                fontWeight: "700",
              }}
            >
              Your earns
            </Typography>
            <Box>
              <Typography
                sx={{
                  fontSize: 12,
                  lineHeight: "16px",
                  color: youhaGrey[300],
                  m: theme.spacing(4, 0, 0, 0),
                }}
              >
                Balance
              </Typography>
              <Typography
                sx={{
                  fontSize: 16,
                  lineHeight: "20px",
                  m: theme.spacing(0.5, 0, 0, 0),
                }}
              >
                ${getPriceSum()}.00
              </Typography>
            </Box>
          </Box>
          <Icon name={"chevron-right"} color={youhaBlue[500]} size={24} />
        </ButtonBase>
      </Stack>
      <Box
        sx={{
          p: theme.spacing(2, 0),
        }}
      >
        <ButtonBase
          sx={{
            width: "100%",
            p: theme.spacing(1.5, 2),
          }}
        >
          <Icon name="pen" prefix="far" size={20} />
          <Typography
            sx={{
              flex: 1,
              m: theme.spacing(0, 0, 0, 2),
              fontSize: 14,
              lineHeight: "20px",
            }}
          >
            Edit profile
          </Typography>
          <Icon
            name={"chevron-right"}
            color={youhaGrey[300]}
            size={20}
            prefix="far"
          />
        </ButtonBase>
        <ButtonBase
          sx={{
            width: "100%",
            p: theme.spacing(1, 2),
          }}
        >
          <Icon name="circle-dollar" prefix="far" size={20} />
          <Typography
            sx={{
              flex: 1,
              m: theme.spacing(0, 0, 0, 2),
              fontSize: 14,
              lineHeight: "20px",
            }}
          >
            Availability and pricing
          </Typography>
          <Icon
            name={"chevron-right"}
            color={youhaGrey[300]}
            size={20}
            prefix="far"
          />
        </ButtonBase>
      </Box>
    </>
  );
}
