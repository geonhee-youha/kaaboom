import { Box, ButtonBase, Typography, alpha } from "@mui/material";
import Screen from "../../components/atoms/forArtist/Screen";
import {
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { orderStates } from "../../constants";
import { theme } from "../../themes/theme";
import youhaGrey from "../../constants/youhaGrey";
import youhaBlue from "../../constants/youhaBlue";
import Icon from "../../components/atoms/Icon";
import {
  OrderProps,
  requestsState,
  tempLoadedRequestsState,
  tempOrders,
} from "../../constants/recoils";
import _ from "lodash";
import { atom, useRecoilState } from "recoil";
import RequestItem from "../../components/molecules/forArtist/RequestItem";

type FilterItemProps = {
  value: string;
  label: string;
};

function FilterItem({
  focused,
  shown,
  item,
  onClick,
}: {
  focused?: boolean;
  shown?: boolean;
  item: FilterItemProps;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}) {
  const borderColor = focused ? youhaBlue[500] : "transparent";
  const backgroundColor = focused ? alpha(youhaBlue[500], 0.4) : youhaGrey[700];
  return (
    <Box
      sx={{
        maxWidth: shown ? 120 : 0,
        opacity: shown ? 1 : 0,
        transition: "all 0.35s ease",
        overflow: "visible",
      }}
    >
      <Box
        sx={{
          p: theme.spacing(0, 0, 0, 1.5),
        }}
      >
        <ButtonBase
          onClick={onClick}
          sx={{
            border: `1px solid ${borderColor}`,
            backgroundColor: backgroundColor,
            borderRadius: 1,
            height: 32,
            p: theme.spacing(0, 1.5),
            alignItems: "center",
          }}
          disableRipple
        >
          {item.label}
        </ButtonBase>
      </Box>
    </Box>
  );
}

export default function Index() {
  const [tempLoaded, setTempLoaded] = useRecoilState(tempLoadedRequestsState);
  const [filter, setFilter] = useState<FilterItemProps | undefined>(undefined);
  const [data, setData] = useRecoilState(requestsState);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    if (!tempLoaded) {
      setTimeout(() => {
        setData(tempOrders);
        setTempLoaded(true);
        setLoading(false);
      }, 350);
    } else {
      setData(tempOrders);
      setLoading(false);
    }
  }, []);
  return (
    <Screen loading={loading}>
      {data && <Page filter={filter} setFilter={setFilter} data={data} />}
    </Screen>
  );
}

function Page({
  filter,
  setFilter,
  data,
}: {
  filter: FilterItemProps | undefined;
  setFilter: Dispatch<SetStateAction<FilterItemProps | undefined>>;
  data: OrderProps[];
}) {
  const focused = filter !== undefined;
  const shownLength = _.filter(tempOrders, (el) =>
    focused ? el.state === filter?.value : el.state === "requested"
  ).length;
  const onClickReset = () => {
    setFilter(undefined);
  };
  return (
    <>
      <Box
        sx={{
          width: "100%",
          overflowX: "scroll",
          whiteSpace: "nowrap",
          "&::-webkit-scrollbar": { display: "none !important" },
        }}
      >
        <Box
          sx={{
            p: theme.spacing(2, 2, 2, 0),
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              position: "relative",
              minWidth: focused ? 48 : 4,
              opacity: focused ? 1 : 0,
              height: 32,
              transition: "all 0.35s ease",
              overflow: "visible",
            }}
          >
            <ButtonBase
              onClick={onClickReset}
              sx={{
                position: "absolute",
                top: 0,
                bottom: 0,
                right: 0,
                backgroundColor: youhaGrey[700],
                borderRadius: 16,
                width: 32,
                height: 32,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              disableRipple
            >
              <Icon name="xmark-large" size={16} />
            </ButtonBase>
          </Box>
          {_.filter(orderStates, (el) => el.value !== "requested").map(
            (item, index) => {
              const focused = item.value === filter?.value;
              const shown = filter !== undefined ? focused : true;
              const onClick = () => {
                if (!shown) return;
                setFilter(focused ? undefined : item);
              };
              return (
                <FilterItem
                  key={index}
                  focused={focused}
                  shown={shown}
                  item={item}
                  onClick={onClick}
                />
              );
            }
          )}
          <Box sx={{ minWidth: 24, height: 32 }} />
        </Box>
      </Box>
      <Box
        sx={{
          p: theme.spacing(2),
        }}
      >
        <Typography
          sx={{
            fontSize: 14,
            lineHeight: `20px`,
          }}
        >
          {`${shownLength} ${filter?.value ?? "requested"}`}
          {filter?.value === "completed" &&
            ` for $${_.filter(tempOrders, (el) =>
              focused ? el.state === filter?.value : el.state === "completed"
            ).map((el) => {
              let price = 0;
              price = price + el.price;
              return el.price;
            })}`}
        </Typography>
        <Box
          sx={{
            p: theme.spacing(1.5, 0),
          }}
        >
          {data.map((item, index) => {
            const shown = focused
              ? item.state === filter?.value
              : item.state === "requested";
            return <RequestItem key={index} shown={shown} item={item} />;
          })}
        </Box>
      </Box>
    </>
  );
}
