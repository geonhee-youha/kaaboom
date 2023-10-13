import { Box, ButtonBase, Typography } from "@mui/material";
import { theme } from "../../themes/theme";
import _ from "lodash";
import youhaGrey from "../../constants/youhaGrey";
import Visual from "../../components/atoms/Visual";
import Typo from "../../components/atoms/Typo";
import { MouseEventHandler } from "react";
import moment from "moment";
import Link from "next/link";
import { colored } from "../../utils";
import { pink } from "@mui/material/colors";

export default function SearchItem({
  searchText,
  item,
  type,
}: {
  searchText?: string;
  item: {
    id: string;
    name: string;
    description?: string;
    thumbnail: string;
  };
  type: string;
}) {
  return (
    <Link href={`/detail/${type}/${item.id}`} passHref>
      <ButtonBase
        sx={{
          borderRadius: 1,
          position: "relative",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          "& *": {
            cursor: "pointer !important",
          },
          p: theme.spacing(1, 3, 1, 2),
          "@media(min-width: 960px)": {
            p: theme.spacing(1, 3, 1, 2),
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: 48,
            height: 48,
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: "100%",
              border: `1px solid ${youhaGrey[700]}`,
              borderRadius: type === "agency" ? 1 : "50%",
              overflow: "hidden",
              aspectRatio: `1`,
            }}
          >
            <Visual src={item.thumbnail} absolute noScale={false} />
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
            }}
          >
            <Typo
              lines={1}
              sx={{
                flex: 1,
                fontSize: 16,
                lineHeight: "24px",
                fontWeight: "700",
                "& .pink": {
                  color: pink[400],
                },
              }}
            >
              {colored(item.name, searchText)}
            </Typo>
          </Box>
          <Typo
            lines={1}
            sx={{
              fontSize: 12,
              lineHeight: "16px",
              color: youhaGrey[300],
            }}
          >
            {item.description ?? ""}
          </Typo>
        </Box>
        <Typography
          sx={{
            fontSize: 12,
            lineHeight: "16px",
            color: youhaGrey[200],
          }}
        >
          {type}
        </Typography>
      </ButtonBase>
    </Link>
  );
}
