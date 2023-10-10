import { Box, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { theme } from "../../themes/theme";
import { grey } from "@mui/material/colors";
import Link from "next/link";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import youhaGrey from "../../constants/youhaGrey";
import { ChangeEvent, useState } from "react";
import Icon from "../atoms/Icon";

const navs = [
  {
    link: "",
    label: "FAQ",
  },
  {
    link: "",
    label: "Privacy",
  },
  {
    link: "",
    label: "Terms",
  },
  {
    link: "",
    label: "Guidelines",
  },
  {
    link: "",
    label: "About",
  },
];

export default function GlobalFooter() {
  const router = useRouter();
  const pathnames = router.pathname.split("/");
  const focused = `/${pathnames[1]}` !== "/auth";
  const [value, setValue] = useState<string>("");
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setValue(value);
  };
  return (
    <Box
      sx={{
        backgroundColor: youhaGrey[800],
        borderTop: `1px solid ${youhaGrey[700]}`,
      }}
    >
      <Stack
        spacing={3}
        sx={{
          position: "relative",
          maxWidth: 1280,
          m: theme.spacing(0, "auto"),
          p: theme.spacing(4, 2),
          "@media(min-width: 768px)": {
            p: theme.spacing(6, 2),
          },
        }}
      >
        <Stack
          className="Section"
          spacing={3}
          sx={{
            // "@media(min-width: 768px)": {
            //   position: "absolute",
            //   top: 24,
            //   right: 16,
            //   "& > *": {
            //     alignItems: "flex-end",
            //   },
            // },
            p: theme.spacing(0, 0, 4, 0),
          }}
        >
          <Stack alignItems={"flex-start"} spacing={1}>
            <Typography
              sx={{
                fontSize: 14,
                lineHeight: "20px",
              }}
            >
              Ready to become a artist on KAABOOM?
            </Typography>
            <Button type="outlined" borderColor={"#ffffff"} color={"#ffffff"}>
              Join as artist
            </Button>
          </Stack>
          <Stack alignItems={"flex-start"} spacing={1}>
            <Typography
              sx={{
                fontSize: 14,
                lineHeight: "20px",
              }}
            >
              Are you an agent, manager or publicist?
            </Typography>
            <Button type="outlined" borderColor={"#ffffff"} color={"#ffffff"}>
              Register as a Partner
            </Button>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={2}>
          {navs.map((item, index) => {
            return (
              <Typography
                key={index}
                sx={{
                  fontSize: 14,
                  lineHeight: "20px",
                }}
              >
                {item.label}
              </Typography>
            );
          })}
        </Stack>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            m: theme.spacing(2, 0, 0, 0),
            p: theme.spacing(0, 0, 4, 0),
            "& img": {
              color: "#ffffff",
              width: "auto",
              height: 20,
            },
          }}
        >
          <img src="/icons/x-twitter.svg" />
          <img src="/icons/youtube.svg" />
          <img src="/icons/facebook.svg" />
          <img src="/icons/instagram.svg" />
        </Stack>
        <Typography
          sx={{
            fontSize: 14,
            lineHeight: "20px",
            color: youhaGrey[300],
            p: theme.spacing(0, 0, 4, 0),
          }}
        >
          Copyright © Ticketplace. All rights reserved.
        </Typography>
      </Stack>
    </Box>
  );
}
