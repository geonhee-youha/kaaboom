import { Box, Stack, Typography } from "@mui/material";
import { OrderProps } from "../../constants/recoils";
import youhaGrey from "../../constants/youhaGrey";
import { theme } from "../../themes/theme";
import { artists } from "../../data/artist";
import _ from "lodash";
import Visual from "../atoms/Visual";
import { cyan, deepOrange, red, yellow } from "@mui/material/colors";
import youhaBlue from "../../constants/youhaBlue";
import moment from "moment";
import Button from "../atoms/Button";
import Icon from "../atoms/Icon";
import { comma } from "../../utils";
import { useRouter } from "next/router";
import Link from "next/link";

export function OrderItem({ item }: { item: OrderProps }) {
  const router = useRouter();
  const artist =
    artists[_.findIndex(artists, (el) => el.id === item.artist.id)];
  const data = [
    {
      label: "Order date",
      value: moment(item.date).format("MM/DD/YYYY"),
    },
    {
      label: "Total Price",
      value: `$${comma(item.price)}.00`,
    },
    {
      label: "Video type",
      value: item.videoType,
    },
    {
      label: "To",
      value: `${item.toFirstName}${item.toType && ` / ${item.toType}`}`,
    },
    {
      label: "from",
      value:
        item.whomType === "myself"
          ? ""
          : `${item.fromFirstName}${item.fromType && ` / ${item.fromType}`}`,
    },
    {
      label: "Hide video",
      value: true ? "YES" : "NO",
    },
    {
      label: "Instructions",
      value: item.instructions,
    },
  ];
  const onClickView = () => {
    router.push(`/user/messages?id=${item.id}`);
  };
  const onClickModify = () => {
    alert("고객센터 메일로 연결");
  };
  return (
    <Box
      sx={{
        borderRadius: 1,
        border: `1px solid ${youhaGrey[600]}`,
        backgroundColor: youhaGrey[800],
        display: "flex",
        flexDirection: "column",
        "@media(min-width: 960px)": {
          flexDirection: "row",
        },
      }}
    >
      <Box sx={{ flex: 1, p: theme.spacing(2) }}>
        <Link href={`/detail/artist/${artist.id}`} passHref>
          <Box
            sx={{
              position: "relative",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              "& *": {
                cursor: "pointer !important",
              },
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: 80,
                height: 80,
              }}
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
            </Box>
            <Box
              sx={{
                flex: 1,
                p: theme.spacing(0, 2),
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Box
                sx={{
                  m: theme.spacing(0, 0, 1, 0),
                }}
              >
                <Typography
                  sx={{
                    fontSize: 20,
                    lineHeight: "32px",
                    fontWeight: "700",
                    color: `#ffffff !important`,
                  }}
                >
                  {artist.name}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 14,
                    lineHeight: "20px",
                    color: youhaGrey[300],
                  }}
                >
                  {artist.group?.name ?? "SOLO"}
                </Typography>
              </Box>
              <Box
                sx={{
                  height: 24,
                  display: "flex",
                  alignItems: "center",
                  p: theme.spacing(0, 1.25),
                  backgroundColor:
                    item.state === "In progress"
                      ? cyan[700]
                      : item.state === "Canceled" ||
                        item.state === "Declined" ||
                        item.state === "Expired"
                      ? red[700]
                      : youhaBlue[700],
                  borderRadius: 0.5,
                }}
              >
                <Typography
                  sx={{
                    fontSize: 10,
                    lineHeight: "14px",
                    fontWeight: "700",
                  }}
                >
                  {item.state}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Link>
      </Box>
      <Box
        sx={{
          flex: 2,
          p: theme.spacing(0, 2, 2, 2),
        }}
      >
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {_.filter(data, (el) => el.value !== "").map((item, index) => {
            return (
              <Box
                key={index}
                sx={{
                  p: theme.spacing(2, 4, 0, 0),
                  width:
                    item.label === "Total Price"
                      ? "calc(75%)"
                      : item.label === "Instructions"
                      ? "100%"
                      : "auto",
                  minWidth: 120,
                }}
              >
                <Typography
                  sx={{
                    fontSize: 12,
                    lineHeight: "16px",
                    fontWeight: "500",
                  }}
                >
                  {item.label}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 14,
                    lineHeight: "20px",
                    color: youhaGrey[200],
                  }}
                >
                  {item.value}
                </Typography>
              </Box>
            );
          })}
          {(item.state === "Canceled" ||
            item.state === "Declined" ||
            item.state === "Expired") && (
            <Box
              sx={{
                m: theme.spacing(2, 4, 0, 0),
              }}
            >
              <Typography
                sx={{
                  fontSize: 12,
                  lineHeight: "16px",
                  fontWeight: "500",
                  color: red[700],
                }}
              >
                {item.state} date
              </Typography>
              <Typography
                sx={{
                  fontSize: 14,
                  lineHeight: "20px",
                  color: red[700],
                }}
              >
                10/12/2023
              </Typography>
            </Box>
          )}
        </Box>
        {!(
          item.state === "Canceled" ||
          item.state === "Declined" ||
          item.state === "Expired"
        ) && (
          <Stack
            direction={"row"}
            spacing={1.5}
            sx={{
              width: "100%",
              m: theme.spacing(4, 0, 0, 0),
              "@media(min-width: 960px)": {
                m: theme.spacing(2, 0, 0, 0),
                "& > *": {
                  flex: `initial !important`,
                  width: "auto !important",
                },
              },
            }}
          >
            {item.state === "Completed" ? (
              <Button fullWidth onClick={onClickView}>
                <Icon
                  name="play"
                  size={16}
                  prefix="fas"
                  sx={{ m: theme.spacing(0, 1, 0, 0) }}
                />
                View message
              </Button>
            ) : (
              <Button
                fullWidth
                backgroundColor={youhaGrey[600]}
                color={youhaGrey[200]}
                onClick={onClickModify}
              >
                Modify or cancel order
              </Button>
            )}
          </Stack>
        )}
      </Box>
    </Box>
  );
}
