import { Box, ButtonBase, Paper, Typography, alpha } from "@mui/material";
import Visual from "../atoms/Visual";
import Typo from "../atoms/Typo";
import { theme } from "../../themes/theme";
import React from "react";
import { useRouter } from "next/router";
import { grey, pink } from "@mui/material/colors";
import { comma, getCountryFlagEmoji, getDiffDay } from "../../utils";
import Icon from "../atoms/Icon";
import { testCelebs } from "../../constants/temp";
import _ from "lodash";
import { tempFans } from "./FanItem";

export type ProjectProps = {
  id: string;
  celeb: {
    id: string;
  };
  thumbnail: string;
  title: { [key in string]: React.ReactNode };
  description: { [key in string]: React.ReactNode };
  story: { [key in string]: React.ReactNode };
  likeCount: number;
  commentCount: number;
  viewCount: number;
  liked?: boolean;
  dueDate: Date;
  fan: {
    id: string;
  };
};

export default function ProjectItem({
  item,
  aspectRatio = `10 / 16`,
}: {
  item: ProjectProps;
  aspectRatio?: string;
}) {
  const router = useRouter();
  const { lang } = router.query;
  const celeb =
    testCelebs[_.findIndex(testCelebs, (el) => el.id === item.celeb.id)];
  const fan = tempFans[_.findIndex(tempFans, (el) => el.id === item.fan.id)];
  const handleClick = () => {
    router.push({ pathname: `/projects/${item.id}`, query: router.query });
  };
  return (
    <ButtonBase
      sx={{
        position: "relative",
        width: "100%",
        flexDirection: "column",
        borderRadius: 1.5,
        overflow: "hidden",
      }}
      onClick={handleClick}
    >
      <Paper
        sx={{
          position: "relative",
          width: "100%",
          //   aspectRatio: `16 / 10`,
          aspectRatio: aspectRatio,
        }}
      >
        <Visual src={item.thumbnail} absolute forceShow />
      </Paper>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          p: theme.spacing(2),
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          background: `linear-gradient(${alpha("#121212", 0.4)}, ${alpha(
            "#121212",
            0.8
          )})`,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 8,
            left: 8,
          }}
        >
          <Box
            sx={{
              height: 24,
              borderRadius: 1,
              display: "flex",
              alignItems: "center",
              p: theme.spacing(0, 1),
              backgroundColor: grey[900],
            }}
          >
            <Typography
              sx={{
                fontSize: 10,
                lineHeight: "14px",
              }}
            >
              {getDiffDay(item.dueDate)}
            </Typography>
          </Box>
        </Box>
        <Typography
          sx={{
            fontSize: 12,
            lineHeight: "16px",
            color: grey[400],
            // fontWeight: '300',
            m: theme.spacing(0, 0, 1, 0),
          }}
        >
          {celeb.name[lang?.toString() ?? "kr"]}
        </Typography>
        <Typo
          lines={2}
          sx={{
            fontSize: 14,
            lineHeight: "20px",
            fontWeight: "400",
            m: theme.spacing(0, 0, 1, 0),
          }}
        >
          {item.title[lang?.toString() ?? "kr"]}
        </Typo>
        <Typo
          lines={2}
          sx={{
            fontSize: 12,
            lineHeight: "16px",
            fontWeight: "300",
            color: grey[400],
          }}
        >
          {item.description[lang?.toString() ?? "kr"]}
        </Typo>
        {/* <Typo
          sx={{
            fontSize: 10,
            lineHeight: "14px",
            // fontWeight: "300",
            color: grey[600],
            m: theme.spacing(1, 0, 0, 0),
          }}
        >
          {en ==='true' ? `${comma(item.viewCount)} view` : `조회수 ${comma(item.viewCount)}`}
        </Typo> */}
        {/* <Box
          sx={{
            m: theme.spacing(2, 0, 0, 0),
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              m: theme.spacing(0, 0, 1, 0),
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Icon
                prefix="fas"
                color={pink[500]}
                name="heart"
                size={12}
                sx={{ m: theme.spacing(0, 0.5, 0, 0) }}
              />
              <Typography
                sx={{
                  fontSize: 12,
                  lineHeight: "16px",
                  color: pink[500],
                }}
              >
                {`${comma(item.likeCount)}`}
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: 12,
                lineHeight: "16px",
                color: grey[800],
              }}
            >
              100
            </Typography>
          </Box>
          <Box
            sx={{
              position: "relative",
              borderRadius: 2,
              overflow: "hidden",
              backgroundColor: grey[900],
              height: 6,
              width: "100%",
              display: "none",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                width: `${(item.likeCount / 100) * 100}%`,
                backgroundColor: pink[500],
                borderRadius: 2,
              }}
            />
          </Box>
        </Box> */}
        <Box
          sx={{
            m: theme.spacing(1.25, -0.25, -0.25, -0.25),
            display: "flex",
            "& > *:not(:nth-of-type(1))": {
              m: theme.spacing(0, 0, 0, 1),
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Icon
              prefix="fas"
              color={item.liked ? pink[500] : grey[600]}
              name="heart"
              size={12}
              sx={{ m: theme.spacing(0, 0.5, 0, 0) }}
            />
            <Typography
              sx={{
                fontSize: 12,
                lineHeight: "16px",
                color: item.liked ? pink[500] : grey[600],
                fontWeight: 700,
              }}
            >
              {`${comma(item.likeCount)}`}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Icon
              prefix="fas"
              color={grey[600]}
              name="comment"
              size={12}
              sx={{ m: theme.spacing(0, 0.5, 0, 0) }}
            />
            <Typography
              sx={{
                fontSize: 12,
                lineHeight: "16px",
                color: grey[600],
                fontWeight: 700,
              }}
            >
              {`${comma(item.commentCount)}`}
            </Typography>
          </Box>
        </Box>
      </Box>
    </ButtonBase>
  );
}
