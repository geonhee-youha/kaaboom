import { Box, ButtonBase, Typography } from "@mui/material";
import { theme } from "../../themes/theme";
import _ from "lodash";
import youhaGrey from "../../constants/youhaGrey";
import { artists } from "../../data/artist";
import Visual from "../../components/atoms/Visual";
import { MessageProps } from "../../data/message";
import Typo from "../../components/atoms/Typo";
import { MouseEventHandler } from "react";
import moment from "moment";
import Link from "next/link";

export default function MessageArtistItem({
  focused,
  item,
  onClick,
}: {
  focused?: boolean;
  item: MessageProps;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}) {
  const artist =
    artists[
      _.findIndex(artists, (el) => {
        return el.name === item.artist.name;
      })
    ];
  return (
    <ButtonBase
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        "& *": {
          cursor: "pointer !important",
        },
        p: theme.spacing(1, 0),
        m: theme.spacing(0, 0, 2, 0),
        "@media(min-width: 960px)": {
          p: theme.spacing(2),
          backgroundColor: focused ? youhaGrey[700] : "transparent",
          m: theme.spacing(0),
        },
      }}
      onClick={onClick}
    >
      <Box
        sx={{
          position: "relative",
          width: 72,
          height: 72,
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
            display: "flex",
            width: "100%",
            alignItems: "center",
            m: theme.spacing(0, 0, 0.5, 0),
          }}
        >
          <Typo
            lines={1}
            sx={{
              flex: 1,
              fontSize: 16,
              lineHeight: "24px",
              fontWeight: "700",
              color: `#ffffff !important`,
            }}
          >
            {artist.name}
          </Typo>
          <Typography
            sx={{
              fontSize: 12,
              lineHeight: "16px",
              color: youhaGrey[200],
            }}
          >
            {moment(item.date).format("MM/DD/YYYY")}
          </Typography>
        </Box>
        <Typo
          lines={2}
          sx={{
            fontSize: 14,
            lineHeight: "20px",
            color: youhaGrey[300],
          }}
        >
          {item.text}
        </Typo>
      </Box>
    </ButtonBase>
  );
}
