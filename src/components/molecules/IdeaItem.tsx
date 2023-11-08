import { Box, ButtonBase, Paper, Typography, alpha } from "@mui/material";
import Visual from "../atoms/Visual";
import Typo from "../atoms/Typo";
import { theme } from "../../themes/theme";
import React from "react";
import { useRouter } from "next/router";
import { grey, pink } from "@mui/material/colors";
import {
  comma,
  displayedAt,
  getCountryFlagEmoji,
  getDiffDay,
} from "../../utils";
import Icon from "../atoms/Icon";
import { testCelebs } from "../../pages/home";
import _ from "lodash";
import FanItem, { tempFans } from "./FanItem";

export type IdeaProps = {
  id: string;
  celeb: {
    id: string;
  };
  thumbnail: string;
  title: { ko: React.ReactNode; en: React.ReactNode };
  description: { ko: React.ReactNode; en: React.ReactNode };
  story: { ko: React.ReactNode; en: React.ReactNode };
  likeCount: number;
  commentCount: number;
  viewCount: number;
  liked?: boolean;
  writtenDate: Date;
  fan: {
    id: string;
  };
};

export default function IdeaItem({ item }: { item: IdeaProps }) {
  const router = useRouter();
  const { en } = router.query;
  const celeb =
    testCelebs[_.findIndex(testCelebs, (el) => el.id === item.celeb.id)];
  const fan = tempFans[_.findIndex(tempFans, (el) => el.id === item.fan.id)];
  const handleClick = () => {
    router.push({ pathname: `/project/${item.id}`, query: router.query });
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
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "flex-start",
          //   background: `linear-gradient(${alpha("#121212", 0.4)}, ${alpha(
          //     "#121212",
          //     0.8
          //   )})`,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            p: theme.spacing(2),
          }}
        >
          {/* <Box
            sx={{
              m: theme.spacing(0, 0, 1, 0),
              display: "flex",
              "& > *:not(:nth-of-type(1))": {
                m: theme.spacing(0, 0, 0, 1),
              },
            }}
          >
            <Box
              sx={{
                height: 24,
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                p: theme.spacing(0, 1),
                backgroundColor: pink[500],
              }}
            >
              <Typography
                sx={{
                  fontSize: 10,
                  lineHeight: "14px",
                }}
              >
                {en === "true" ? "HOT" : "인기"}
              </Typography>
            </Box>
            <Box
              sx={{
                height: 24,
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                p: theme.spacing(0, 1),
                backgroundColor: grey[800],
              }}
            >
              <Typography
                sx={{
                  fontSize: 10,
                  lineHeight: "14px",
                }}
              >
                {celeb.name[en === "true" ? "en" : "ko"]}
              </Typography>
            </Box>
          </Box> */}
          <Typography
            sx={{
              fontSize: 12,
              lineHeight: "16px",
              color: grey[400],
              // fontWeight: '300',
              m: theme.spacing(0, 0, 1, 0),
            }}
          >
            {celeb.name[en === "true" ? "en" : "ko"]}
          </Typography>
          <Typo
            lines={1}
            sx={{
              fontSize: 14,
              lineHeight: "20px",
              fontWeight: "400",
              m: theme.spacing(0, 0, 1, 0),
            }}
          >
            {item.title[en === "true" ? "en" : "ko"]}
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
            {item.description[en === "true" ? "en" : "ko"]}
          </Typo>
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
              width: "100%",
              m: theme.spacing(1.25, -0.25, -0.25, -0.25),
              display: "flex",
            }}
          >
            <Box
              sx={{
                flex: 1,
                display: "flex",
                "& > *:not(:nth-of-type(1))": {
                  m: theme.spacing(0, 0, 0, 1.5),
                },
              }}
            >
              <Typo
                sx={{
                  flex: 1,
                  fontSize: 12,
                  lineHeight: "16px",
                  // fontWeight: "300",
                  color: grey[600],
                  m: theme.spacing(0.25),
                }}
              >
                {`${displayedAt(item.writtenDate, en ==='true')} · ${en ==='true' ? `${comma(item.viewCount)} view` : `조회수 ${comma(item.viewCount)}`}`}
              </Typo>
            </Box>
            <Box
              sx={{
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
        </Box>
      </Paper>
    </ButtonBase>
  );
}

// export default function ContentsItem({ item }: { item: ContentsProps }) {
//     const router = useRouter();
//     const { en } = router.query;
//     const celeb =
//       testCelebs[_.findIndex(testCelebs, (el) => el.id === item.celeb.id)];
//     return (
//       <ButtonBase
//         sx={{
//           width: "100%",
//           flexDirection: "column",
//         }}
//         disableRipple
//       >
//         <Paper
//           sx={{
//             position: "relative",
//             width: "100%",
//             aspectRatio: `16 / 10`,
//           //   aspectRatio: `1`,
//             borderRadius: 1.5,
//             overflow: "hidden",
//           }}
//         >
//           <Visual src={item.thumbnail} absolute forceShow />
//         </Paper>
//         <Box
//           sx={{
//             m: theme.spacing(1.5, 0, 0, 0),
//             p: theme.spacing(0, 0.5, 0, 0),
//           }}
//         >
//           <Typography
//             sx={{
//               fontSize: 12,
//               lineHeight: "16px",
//               color: grey[600],
//               // fontWeight: '300',
//               m: theme.spacing(0, 0, 0.5, 0),
//             }}
//           >
//             {celeb.name[en === "true" ? "en" : "ko"]}
//           </Typography>
//           <Typo
//             sx={{
//               fontSize: 14,
//               lineHeight: "20px",
//               fontWeight: "400",
//               m: theme.spacing(0, 0, 1, 0),
//             }}
//           >
//             {item.title[en === "true" ? "en" : "ko"]}
//           </Typo>
//           <Typo
//             lines={2}
//             sx={{
//               fontSize: 12,
//               lineHeight: "16px",
//               fontWeight: "300",
//               color: grey[600],
//             }}
//           >
//             {item.description[en === "true" ? "en" : "ko"]}
//           </Typo>
//           {/* <Box
//             sx={{
//               m: theme.spacing(2, 0, 0, 0),
//               width: "100%",
//             }}
//           >
//             <Box
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 m: theme.spacing(0, 0, 1, 0),
//               }}
//             >
//               <Box
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                 }}
//               >
//                 <Icon
//                   prefix="fas"
//                   color={pink[500]}
//                   name="heart"
//                   size={12}
//                   sx={{ m: theme.spacing(0, 0.5, 0, 0) }}
//                 />
//                 <Typography
//                   sx={{
//                     fontSize: 12,
//                     lineHeight: "16px",
//                     color: pink[500],
//                   }}
//                 >
//                   {`${comma(item.likeCount)}`}
//                 </Typography>
//               </Box>
//               <Typography
//                 sx={{
//                   fontSize: 12,
//                   lineHeight: "16px",
//                   color: grey[800],
//                 }}
//               >
//                 100
//               </Typography>
//             </Box>
//             <Box
//               sx={{
//                 position: "relative",
//                 borderRadius: 2,
//                 overflow: "hidden",
//                 backgroundColor: grey[900],
//                 height: 6,
//                 width: "100%",
//                 display: "none",
//               }}
//             >
//               <Box
//                 sx={{
//                   position: "absolute",
//                   top: 0,
//                   left: 0,
//                   bottom: 0,
//                   width: `${(item.likeCount / 100) * 100}%`,
//                   backgroundColor: pink[500],
//                   borderRadius: 2,
//                 }}
//               />
//             </Box>
//           </Box> */}
//           <Box
//             sx={{
//               m: theme.spacing(1.25, -0.25, 0, -0.25),
//               display: "flex",
//               "& > *:not(:nth-of-type(1))": {
//                 m: theme.spacing(0, 0, 0, 1.5),
//               },
//             }}
//           >
//             <Box
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//               }}
//             >
//               <Icon
//                 prefix="fas"
//                 color={item.liked ? pink[500] : grey[700]}
//                 name="heart"
//                 size={12}
//                 sx={{ m: theme.spacing(0, 0.5, 0, 0) }}
//               />
//               <Typography
//                 sx={{
//                   fontSize: 12,
//                   lineHeight: "16px",
//                   color: item.liked ? pink[500] : grey[700],
//                   fontWeight: 700,
//                 }}
//               >
//                 {`${comma(item.likeCount)}`}
//               </Typography>
//             </Box>
//             <Box
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//               }}
//             >
//               <Icon
//                 prefix="fas"
//                 color={grey[700]}
//                 name="comment"
//                 size={12}
//                 sx={{ m: theme.spacing(0, 0.5, 0, 0) }}
//               />
//               <Typography
//                 sx={{
//                   fontSize: 12,
//                   lineHeight: "16px",
//                   color: grey[700],
//                   fontWeight: 700,
//                 }}
//               >
//                 {`${comma(item.commentCount)}`}
//               </Typography>
//             </Box>
//           </Box>
//         </Box>
//       </ButtonBase>
//     );
//   }
