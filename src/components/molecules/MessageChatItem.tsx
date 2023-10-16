import _ from "lodash";
import { artists } from "../../data/artist";
import { MessageProps } from "../../data/message";
import { Box, ButtonBase, Stack, Typography, alpha } from "@mui/material";
import youhaGrey from "../../constants/youhaGrey";
import Visual from "../atoms/Visual";
import { theme } from "../../themes/theme";
import moment from "moment";
import Link from "next/link";
import MessageItem from "./MessageItem";
import { useEffect, useState } from "react";
import IconButton from "../atoms/IconButton";
import youhaBlue from "../../constants/youhaBlue";
import { useRouter } from "next/router";

export default function MessageChatItem({
  type,
  item,
}: {
  type?: string;
  item: MessageProps;
}) {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const artist =
    artists[
      _.findIndex(artists, (el) => {
        return el.name === item.artist.name;
      })
    ];
  return (
    <Box
      sx={{
        p: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <Link href={`/detail/artist/${artist.id}`} passHref>
          <ButtonBase
            sx={{
              position: "relative",
              width: 40,
              height: 40,
              m: theme.spacing(0, 1.5, 0, 0),
            }}
            disableRipple
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
          </ButtonBase>
        </Link>
        <Box>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <MessageItem
              index={1}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              item={item}
              type="chat"
            />
          </Box>
          <Box
            sx={{
              maxWidth: 420,
              p: theme.spacing(2),
              m: theme.spacing(2, 0, 0, 0),
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 8,
              border: `1px solid ${youhaGrey[400]}`,
            }}
          >
            <Typography
              sx={{
                fontSize: 14,
                lineHeight: "20px",
              }}
            >
              {item.text}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          m: theme.spacing(1, 0, 0, 6.5),
        }}
      >
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
    </Box>
  );
}
