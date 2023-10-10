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
import { pink } from "@mui/material/colors";
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
          alignSelf: "flex-start",
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
          />
          {group && (
            <Link href={`/group/${group.id}`} passHref>
              <Paper
                elevation={5}
                sx={{
                  position: "absolute",
                  bottom: 4,
                  left: 4,
                  zIndex: 99,
                  overflow: "hidden",
                  borderRadius: 20,
                  width: 40,
                  height: 40,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: `1px solid ${youhaGrey[700]}`,
                  cursor: "pointer",
                }}
              >
                <Visual src={group.thumbnail} absolute noScale />
              </Paper>
            </Link>
          )}
        </Box>
        <Box
          sx={{
            m: theme.spacing(1, 0, 0, 0),
          }}
        >
          <Typography
            sx={{
              fontSize: 16,
              lineHeight: "24px",
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
            <Typography
              sx={{
                fontSize: 14,
                lineHeight: "20px",
                fontFamily: "Poppins",
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
