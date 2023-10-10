import { Box, ButtonBase, Paper, Stack, Typography } from "@mui/material";
import { theme } from "../../themes/theme";
import youhaGrey from "../../constants/youhaGrey";
import Visual from "../atoms/Visual";
import Link from "next/link";
import _ from "lodash";
import { GroupProps } from "../../data/group";
import { agencies } from "../../data/agency";
import Icon from "../atoms/Icon";
import youhaBlue from "../../constants/youhaBlue";
import { artists } from "../../data/artist";
import { useRouter } from "next/router";

export default function GroupItem({ item }: { item: GroupProps }) {
  const router = useRouter();
  const agency =
    agencies[
      _.findIndex(agencies, (e) => {
        return item.agency !== undefined && e.name === item.agency.name;
      })
    ];
  const groupArtists = _.filter(artists, (el) => {
    return el.group !== undefined && el.group.name === item.name;
  });
  return (
    <Link href={`/group/${item.id}`} passHref>
      <ButtonBase
        sx={{
          width: "100%",
          flexDirection: "column",
          borderRadius: 1,
          alignItems: "center",
          alignSelf: "flex-start",
        }}
        disableRipple
      >
        <>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: "100%",
              aspectRatio: `1`,
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
              }}
            >
              <Visual src={item.thumbnail} absolute noScale={false} />
            </Box>
            {agency && (
              <Paper
                elevation={5}
                onClick={(e) => {
                  e.preventDefault()
                  router.push(`/agency/${agency.id}`);
                }}
                sx={{
                  position: "absolute",
                  bottom: 4,
                  left: 4,
                  zIndex: 99,
                  borderRadius: 1,
                  width: 40,
                  height: 40,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: `1px solid ${youhaGrey[700]}`,
                  overflow: "hidden",
                  cursor: "pointer",
                }}
              >
                <Visual src={agency.thumbnail} absolute noScale />
              </Paper>
            )}
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
            <Typography
              sx={{
                fontSize: 12,
                lineHeight: "16px",
                color: youhaGrey[300],
              }}
            >
              {item.agency?.name ?? "SOLO"}
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
              <Icon name="user" color={youhaBlue[400]} size={16} prefix="fas" />
              <Typography
                sx={{
                  fontSize: 12,
                  lineHeight: "16px",
                  fontFamily: "Poppins",
                  color: youhaGrey[200],
                }}
              >
                {groupArtists.length} artists
              </Typography>
            </Stack>
          </Stack>
        </>
      </ButtonBase>
    </Link>
  );
}
