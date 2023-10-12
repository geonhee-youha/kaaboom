import { Box, Stack, Typography } from "@mui/material";
import { theme } from "../../themes/theme";
import Button from "../../components/atoms/Button";
import Icon from "../../components/atoms/Icon";
import youhaGrey from "../../constants/youhaGrey";
import { useRecoilState } from "recoil";
import { sortDialogRecoilState } from "../../constants/recoils";
import { useRouter } from "next/router";
import { sorts } from "../../constants";
import _ from "lodash";

export default function ExploreHeader({
  title,
  data,
  size,
  label = 'results',
}: {
  title: string;
  data: any;
  size?: string;
  label?: string;
}) {
  const router = useRouter();
  const currentValue = router.query.sortBy ?? "featured";
  const [sortDialog, setSortDialog] = useRecoilState(sortDialogRecoilState);
  const onClickSort = () => {
    setSortDialog({ open: true });
  };
  return (
    <Box>
      <Box
        className="SectionTitle"
      >
        <Typography
          sx={{
            fontSize: size === "sm" ? 20 : 28,
            lineHeight: size === "sm" ? '32px' : "44px",
            fontWeight: "700",
            "@media(min-width: 600px)": {
              "& br": {
                display: "none",
              },
            },
          }}
        >
          {title}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          m: theme.spacing(0, 0, 2, 0),
          "@media(min-width: 961px)": {
            flexDirection: "row",
            alignItems: "center",
          },
        }}
      >
        <Typography
          sx={{
            flex: 1,
            fontSize: 14,
            lineHeight: "20px",
            color: youhaGrey[300],
          }}
        >
          {data.length}{' '}{label}
        </Typography>
        {/* <Stack
          sx={{
            m: theme.spacing(1, 0, 0, 0),
            "@media(min-width: 961px)": {
              m: theme.spacing(0, 0, 0, 0),
            },
          }}
        >
          <Button
            type="outlined"
            borderColor={youhaGrey[300]}
            color={youhaGrey[300]}
            onClick={onClickSort}
          >
            {
              sorts[
                _.findIndex(sorts, (el) => {
                  return el.value === currentValue;
                })
              ].label
            }
            <Icon
              name="angle-down"
              size={16}
              color={youhaGrey[300]}
              sx={{
                m: theme.spacing(0, 0, 0, 1),
              }}
            />
          </Button>
        </Stack> */}
      </Box>
    </Box>
  );
}
