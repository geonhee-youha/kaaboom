import {
  Box,
  ButtonBase,
  Paper,
  Stack,
  Typography,
  alpha,
} from "@mui/material";
import { ArtistProps } from "../../data/artist";
import { theme } from "../../themes/theme";
import youhaGrey from "../../constants/youhaGrey";
import Visual from "../atoms/Visual";
import IconButton from "../atoms/IconButton";
import Link from "next/link";
import youhaBlue from "../../constants/youhaBlue";
import Icon from "../atoms/Icon";
import { cyan, pink, yellow } from "@mui/material/colors";
import _ from "lodash";
import { groups } from "../../data/group";
import { MouseEvent, useState } from "react";

export default function ArtistItem({ item }: { item: ArtistProps }) {
  const [favorite, setFavorite] = useState<boolean>(false);
  const group =
    groups[
      _.findIndex(groups, (e) => {
        return item.group !== undefined && e.name === item.group.name;
      })
    ];
  const onClickFavorite = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    setFavorite(!favorite);
  };
  return (
    <Link href={`/artist/${item.id}`} passHref>
      <ButtonBase
        sx={{
          flexDirection: "column",
          borderRadius: 1,
        }}
        disableRipple
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "100%",
            border: `1px solid ${youhaGrey[700]}`,
            borderRadius: 1,
            overflow: "hidden",
            aspectRatio: `5 / 6`,
            // "&:after": {
            //   position: "absolute",
            //   content: "''",
            //   top: 0,
            //   left: 0,
            //   right: 0,
            //   bottom: 0,
            //   background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0))`,
            // },
          }}
        >
          <Visual src={item.thumbnail} absolute noScale={false} />
          <IconButton
            name={"heart"}
            sx={{
              position: "absolute",
              top: 4,
              right: 4,
              zIndex: 99,
              boxShadow:
                "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12)",
            }}
            backgroundColor={alpha(youhaGrey[800], 1)}
            borderColor={youhaGrey[700]}
            prefix={favorite ? "fas" : "far"}
            onClick={onClickFavorite}
            color={favorite ? pink[400] : "#ffffff"}
            // disableRipple
          />
          {/* <IconButton
            size={20}
            name={"heart"}
            sx={{
              position: "absolute",
              top: 4,
              right: 4,
              zIndex: 99,
              width: 32,
              height: 32,
              borderRadius: 0.75,
              boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12)'
            }}
            backgroundColor={alpha(youhaGrey[800], 1)}
            borderColor={youhaGrey[700]}
            prefix="far"
            onClick={(e) => {
              e.preventDefault();
              console.log("1");
            }}
            disableRipple
          /> */}
          {/* <IconButton
            name={"heart"}
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              zIndex: 99,
            }}
            //   backgroundColor={alpha(youhaGrey[100], 0.4)}
            //   borderColor={'#ffffff'}
            prefix="far"
            onClick={(e) => {
              e.preventDefault();
              console.log("1");
            }}
            disableRipple
          /> */}
          {group && (
            <ButtonBase
              sx={{
                position: "absolute",
                top: 4,
                left: 4,
                zIndex: 99,
              }}
            >
              <Paper
                elevation={5}
                sx={{
                  background: `linear-gradient(${
                    group.colors.backgrounds[0]
                  }, ${
                    group.colors.backgrounds[1] ?? group.colors.backgrounds[0]
                  })`,
                  borderRadius: 1,
                  width: 40,
                  height: 40,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: `1px solid ${youhaGrey[700]}`,
                }}
              >
                <Visual
                  src={group.thumbnail}
                  sx={{
                    width: 24,
                  }}
                />
              </Paper>
            </ButtonBase>
          )}
        </Box>
        <Box
          sx={{
            m: theme.spacing(1, 0, 0, 0),
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
            {item.name}
          </Typography>
          <Typography
            sx={{
              fontSize: 12,
              lineHeight: "16px",
              color: youhaGrey[300],
            }}
          >
            {item.group?.name ?? "SOLO"}
          </Typography>
        </Box>
        <Stack
          direction={"row"}
          spacing={1}
          sx={{
            m: theme.spacing(1, 0, 0, 0),
          }}
        >
          <Stack direction={"row"} spacing={0.5} alignItems={"center"}>
            <Icon name="heart" color={youhaBlue[400]} size={16} prefix="fas" />
            <Typography
              sx={{
                fontSize: 12,
                lineHeight: "16px",
                fontFamily: "Poppins",
                // fontWeight: '700',
                color: youhaGrey[200],
              }}
            >
              283
            </Typography>
          </Stack>
          <Stack direction={"row"} spacing={0.5} alignItems={"center"}>
            <Icon
              name="thumbs-up"
              color={youhaBlue[400]}
              size={16}
              prefix="fas"
            />
            <Typography
              sx={{
                fontSize: 12,
                lineHeight: "16px",
                fontFamily: "Poppins",
                // fontWeight: '700',
                color: youhaGrey[200],
              }}
            >
              1,230
            </Typography>
          </Stack>
        </Stack>
        <Stack
          direction={"row"}
          spacing={0.75}
          alignItems={"center"}
          sx={{
            m: theme.spacing(1, 0, 0, 0),
          }}
        >
          <Stack direction={"row"}>
            {/* <Typography
              sx={{
                fontSize: 14,
                lineHeight: "20px",
                m: theme.spacing(0, 0.25, "auto", 0),
                // fontWeight: '700',
              }}
            >
              $
            </Typography> */}
            <Typography
              sx={{
                fontSize: 14,
                lineHeight: "20px",
                fontFamily: "Poppins",
                // fontWeight: '700',
              }}
            >
              $250.00
            </Typography>
          </Stack>
        </Stack>
      </ButtonBase>
    </Link>
  );
}

// <Stack
// direction={"row"}
// spacing={0.75}
// alignItems={"center"}
// sx={{
//   m: theme.spacing(0.5, 0, 0, 0),
// }}
// >
// {/* <Icon
//   name="circle-dollar"
//   color={youhaBlue[400]}
//   size={20}
//   prefix="fas"
// /> */}
// <Stack direction={"row"}>
//   <Typography
//     sx={{
//       fontSize: 8,
//       lineHeight: "20px",
//       m: theme.spacing(0, 0.25, "auto", 0),
//     }}
//   >
//     $
//   </Typography>
//   <Typography
//     sx={{
//       fontSize: 16,
//       lineHeight: "24px",
//       fontFamily: "Poppins",
//     }}
//   >
//     250.00
//   </Typography>
// </Stack>
// </Stack>
