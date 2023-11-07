// import { useRouter } from "next/router";
// import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
// import useAxios from "../../hooks/swrs";
// import { Box, Container, Typography } from "@mui/material";
// import { Swiper, SwiperSlide } from "swiper/react";
// import SwiperCore, { Navigation } from "swiper";
// import Screen from "../../components/atoms/Screen";
// import { theme } from "../../themes/theme";
// import VideoItem from "../../components/molecules/VideoItem";
// import { MissionProps } from "../../components/molecules/MissionItem";
// import { missions } from "../../constants/temp";

// let pageVideo: any;
// let pageVideoElement: any;
// let pageElement: any;

// export default function App() {
//   const router = useRouter();
//   const [focused, setFocused] = useState<boolean>(false);
//   const [loaded, setLoaded] = useState<string[]>([]);
//   const [focusedIndex, setFocusedIndex] = useState<number>(0);
//   useEffect(() => {
//     if (router.asPath === "/contents") {
//       setFocused(true);
//     } else {
//       setFocused(false);
//     }
//   }, [router]);
//   useEffect(() => {
//     setFocusedIndex(loaded.indexOf("true"));
//   }, [loaded]);
//   useEffect(() => {
//     pageVideo = document.querySelectorAll(".PageLine");
//     pageVideoElement = document.querySelectorAll(".PageVideo video");
//     pageElement = document.querySelectorAll(".Page");
//     const io = new IntersectionObserver((entries, observer) => {
//       entries.forEach((entry: any) => {
//         if (!focused) return null;
//         if (entry.intersectionRatio > 0.9) {
//           const index = entry.target.className.split(" ")[1];
//           if (loaded[index] === "true") return null;
//           setLoaded((prevState) => {
//             prevState[index] = "true";
//             return [...prevState];
//           });
//           return;
//         } else {
//           const index = entry.target.className.split(" ")[1];
//           if (loaded[index] === "false") return null;
//           setLoaded((prevState) => {
//             prevState[index] = "false";
//             return [...prevState];
//           });
//         }
//       });
//     });
//     pageVideo.forEach((pageVideo: any) => io.observe(pageVideo));
//     return () => {
//       pageVideo.forEach((pageVideo: any) => io.unobserve(pageVideo));
//     };
//   }, [router, loaded, focused]);
//   return (
//     <Screen>
//       <Box
//         sx={{
//           m: theme.spacing(5, 0, 0, 0),
//         }}
//       >
//         <Box
//           sx={{
//             m: theme.spacing(0, 0, 2, 0),
//           }}
//         >
//           <Typography
//             sx={{
//               fontSize: 16,
//               lineHeight: "24px",
//               fontWeight: "700",
//             }}
//           >
//             실시간 인기 영상
//           </Typography>
//         </Box>
//         <Box
//           sx={{
//             "& > *:not(:nth-of-type(1))": {
//               m: theme.spacing(1.5, 0, 0, 0),
//             },
//           }}
//         >
//           {[
//             missions[3],
//             missions[3],
//             missions[3],
//             missions[3],
//             missions[3],
//             missions[3],
//             missions[3],
//             missions[3],
//             missions[3],
//             missions[3],
//             missions[3],
//             missions[3],
//           ].map((item, index) => {
//             return (
//               <VideoItem
//                 key={index}
//                 item={item}
//                 index={index}
//                 focusedIndex={focusedIndex}
//                 setFocusedIndex={setFocusedIndex}
//                 focused={focused}
//               />
//             );
//           })}
//         </Box>
//       </Box>
//     </Screen>
//   );
// }

// type SectionProps = {
//   title: string;
//   children?: React.ReactNode;
// };

// function Section({ title, children }: SectionProps) {
//   return (
//     <Box
//       sx={{
//         m: theme.spacing(8, 0, 0, 0),
//       }}
//     >
//       <Box
//         sx={{
//           m: theme.spacing(0, 0, 2, 0),
//         }}
//       >
//         <Typography
//           sx={{
//             fontSize: 16,
//             lineHeight: "24px",
//             fontWeight: "700",
//           }}
//         >
//           {title}
//         </Typography>
//       </Box>
//       <Box>{children}</Box>
//     </Box>
//   );
// }

export default function Index() {
  return <></>;
}
