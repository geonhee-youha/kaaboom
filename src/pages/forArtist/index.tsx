import { Box, ButtonBase, Stack, Typography, alpha } from "@mui/material";
import Screen from "../../components/atoms/forArtist/Screen";
import { MouseEventHandler, useState } from "react";
import { orderStates } from "../../constants";
import { theme } from "../../themes/theme";
import youhaGrey from "../../constants/youhaGrey";
import youhaBlue from "../../constants/youhaBlue";
import Icon from "../../components/atoms/Icon";
import { OrderProps, tempOrders } from "../../constants/recoils";
import _ from "lodash";
import moment from "moment";
import { videoTypes } from "../../data";
import { comma } from "../../utils";
import Typo from "../../components/atoms/Typo";
import Button from "../../components/atoms/Button";
import {
  cyan,
  deepOrange,
  deepPurple,
  indigo,
  pink,
  red,
} from "@mui/material/colors";
import { tempUser } from "../../data/temp";
import Visual from "../../components/atoms/Visual";

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
            p: theme.spacing(0, 2),
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

function OrderItem({ shown, item }: { shown?: boolean; item: OrderProps }) {
  const state = item.state;
  const date = moment(item.date).format("MM/DD/YYYY");
  const videoType =
    videoTypes[_.findIndex(videoTypes, (el) => el.value === item.videoType)]
      .label;
  const price = item.price;
  const user = tempUser;
  const whomType = item.whomType;
  const toWhom = item.toFirstName;
  const fromWhom = item.fromFirstName;
  const instructions = item.instructions;
  const expiredDate = moment(
    new Date(item.date.getTime() + 7 * 24 * 60 * 60 * 1000)
  ).format("MM/DD/YYYY");
  const declinedDate = moment(item.declinedDate).format("MM/DD/YYYY");
  const canceledDate = moment(item.canceledDate).format("MM/DD/YYYY");
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
        <Box
          sx={{
            borderRadius: 1,
            backgroundColor: youhaGrey[700],
            overflow: "hidden",
          }}
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
              {user.thumbnail ? (
                <Visual
                  src={user.thumbnail}
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    overflow: "hidden",
                    backgroundColor: youhaGrey[800],
                    border: `1px solid ${youhaGrey[600]}`,
                  }}
                />
              ) : (
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    overflow: "hidden",
                    backgroundColor:
                      tempUser.gender === "M"
                        ? indigo["A400"]
                        : tempUser.gender === "M"
                        ? pink["A400"]
                        : deepPurple["A400"],
                    border: `1px solid ${youhaGrey[600]}`,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Icon
                    name="user"
                    prefix="fas"
                    color={youhaGrey[100]}
                    size={24}
                  />
                </Box>
              )}
              <Box
                sx={{
                  p: theme.spacing(0, 1.5),
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
                ? `this request was completed at ${expiredDate}`
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
              <Button fullWidth size="md">
                Send video
              </Button>
              <Button
                fullWidth
                size="md"
                backgroundColor={youhaGrey[600]}
                color={youhaGrey[300]}
              >
                Decline request
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
                backgroundColor={youhaGrey[400]}
                color={youhaGrey[200]}
              >
                View sent video
              </Button>
            </Stack>
          ) : (
            <></>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default function Index() {
  const [filter, setFilter] = useState<FilterItemProps | undefined>(undefined);
  const focused = filter !== undefined;
  const shownLength = _.filter(tempOrders, (el) =>
    focused ? el.state === filter?.value : el.state === "requested"
  ).length;
  const onClickReset = () => {
    setFilter(undefined);
  };
  return (
    <Screen>
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
            p: theme.spacing(2, 2.5, 2, 0),
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              position: "relative",
              minWidth: focused ? 52 : 8,
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
          p: theme.spacing(2, 2.5),
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
          {tempOrders.map((item, index) => {
            const shown = focused
              ? item.state === filter?.value
              : item.state === "requested";
            return <OrderItem key={index} shown={shown} item={item} />;
          })}
        </Box>
      </Box>
    </Screen>
  );
}

// function OrderItem({ shown, item }: { shown?: boolean; item: OrderProps }) {
//     const state = item.state;
//     const date = moment(item.date).format("MM/DD/YYYY");
//     const videoType =
//       videoTypes[_.findIndex(videoTypes, (el) => el.value === item.videoType)]
//         .label;
//     const price = `$${comma(item.price)}.00`;
//     const user = tempUser
//     const userName = `For ${user.name}`;
//     const instructions = item.instructions;
//     return (
//       <Box
//         sx={{
//           maxHeight: shown ? 300 : 0,
//           opacity: shown ? 1 : 0,
//           transition: "all 0.35s ease",
//           overflow: "visible",
//         }}
//       >
//         <Box
//           sx={{
//             p: theme.spacing(0, 0, 2, 0),
//           }}
//         >
//           <Box
//             sx={{
//               borderRadius: 1,
//               backgroundColor: youhaGrey[700],
//               overflow: "hidden",
//             }}
//           >
//             <Box
//               sx={{
//                 p: theme.spacing(2),
//                 borderBottom: `1px solid ${youhaGrey[400]}`,
//               }}
//             >
//               <Typography
//                 sx={{
//                   fontSize: 14,
//                   lineHeight: "20px",
//                   color: youhaGrey[300],
//                 }}
//               >
//                 {date}
//               </Typography>
//             </Box>
//             <Box
//               sx={{
//                 p: theme.spacing(2),
//                 "& > *:not(:nth-of-type(1))": {
//                   m: theme.spacing(1, 0, 0, 0),
//                 },
//               }}
//             >
//               <Box
//                 sx={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                 }}
//               >
//                 <Typography
//                   sx={{
//                     fontSize: 14,
//                     lineHeight: "20px",
//                     fontWeight: "700",
//                   }}
//                 >
//                   {videoType}
//                 </Typography>
//                 <Typography
//                   sx={{
//                     fontSize: 14,
//                     lineHeight: "20px",
//                     fontWeight: "700",
//                   }}
//                 >
//                   {price}
//                 </Typography>
//               </Box>
//               <Box>
//                 <Typography
//                   sx={{
//                     fontSize: 14,
//                     lineHeight: "20px",
//                   }}
//                 >
//                   {userName}
//                 </Typography>
//               </Box>
//               <Box>
//                 <Typo
//                   lines={3}
//                   sx={{
//                     fontSize: 14,
//                     lineHeight: "20px",
//                     color: youhaGrey[300],
//                   }}
//                 >
//                   {instructions}
//                 </Typo>
//               </Box>
//             </Box>
//             {state === "requested" ? (
//               <Stack
//                 direction={"row"}
//                 spacing={1.5}
//                 sx={{
//                   p: theme.spacing(0, 2, 2, 2),
//                 }}
//               >
//                 <Button fullWidth size="md">
//                   Send video
//                 </Button>
//                 <Button
//                   fullWidth
//                   size="md"
//                   backgroundColor={youhaGrey[600]}
//                   color={youhaGrey[300]}
//                 >
//                   Decline request
//                 </Button>
//               </Stack>
//             ) : state === "completed" ? (
//               <Stack
//                 direction={"row"}
//                 spacing={1.5}
//                 sx={{
//                   p: theme.spacing(0, 2, 2, 2),
//                 }}
//               >
//                 <Button
//                   fullWidth
//                   size="md"
//                   backgroundColor={youhaGrey[400]}
//                   color={youhaGrey[200]}
//                 >
//                   View sent video
//                 </Button>
//               </Stack>
//             ) : (
//               <></>
//             )}
//           </Box>
//         </Box>
//       </Box>
//     );
//   }
