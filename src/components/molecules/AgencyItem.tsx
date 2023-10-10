import { Box, ButtonBase, Stack, Typography } from "@mui/material";
import { theme } from "../../themes/theme";
import youhaGrey from "../../constants/youhaGrey";
import Visual from "../atoms/Visual";
import Link from "next/link";
import _ from "lodash";
import { groups } from "../../data/group";
import { AgencyProps } from "../../data/agency";
import { artists } from "../../data/artist";
import Icon from "../atoms/Icon";
import youhaBlue from "../../constants/youhaBlue";

export default function AgencyItem({ item }: { item: AgencyProps }) {
  const agencyGroups = _.filter(groups, (el) => {
    return el.agency !== undefined && el.agency.name === item.name;
  });
  const agencyArtists = _.filter(artists, (el) => {
    return (
      el.agencies !== undefined &&
      _.flatMap(el.agencies, (el) => el.name).includes(item.name)
    );
  });
  return (
    <Link href={`/agency/${item.id}`} passHref>
      <ButtonBase
        sx={{
          flexDirection: "column",
          borderRadius: 1,
          alignItems: "center",
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
            aspectRatio: `1`,
            p: theme.spacing(2),
          }}
        >
          <Visual src={item.thumbnail} absolute noScale={false} />
        </Box>
        <Box
          sx={{
            width: "100%",
            m: theme.spacing(1, 0, 0, 0),
            "& *": {
              width: "100%",
              textAlign: "center",
            },
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
          {/* <Typography
            sx={{
              fontSize: 12,
              lineHeight: "16px",
              color: youhaGrey[300],
            }}
          >
            {item.agency?.name ?? "SOLO"}
          </Typography> */}
        </Box>
        <Stack
          direction={"column"}
          spacing={1}
          sx={{
            m: theme.spacing(1, 0, 0, 0),
          }}
        >
          <Stack
            direction={"row"}
            spacing={0.5}
            alignItems={"center"}
            flexWrap={"wrap"}
          >
            <Icon name="users" color={youhaBlue[400]} size={16} prefix="fas" />
            <Typography
              sx={{
                fontSize: 12,
                lineHeight: "16px",
                fontFamily: "Poppins",
                color: youhaGrey[200],
              }}
            >
              {agencyGroups.length} Groups
            </Typography>
          </Stack>
          <Stack direction={"row"} spacing={0.5} alignItems={"center"}>
            <Icon name="user" color={youhaBlue[400]} size={16} prefix="fas" />
            <Typography
              sx={{
                fontSize: 12,
                lineHeight: "16px",
                fontFamily: "Poppins",
                color: youhaGrey[200],
              }}
            >
              {agencyArtists.length} Artists
            </Typography>
          </Stack>
        </Stack>
      </ButtonBase>
    </Link>
  );
}