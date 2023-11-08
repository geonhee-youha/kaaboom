import { Box, ButtonBase } from "@mui/material";
import { CountryCode } from "../../constants/country";
import { theme } from "../../themes/theme";
import Visual from "../atoms/Visual";
import Typo from "../atoms/Typo";
import { grey } from "@mui/material/colors";
import { getCountryFlagEmoji } from "../../utils";

export type FanProps = {
  id: string;
  name: string;
  nickname: string;
  thumbnail: string;
  bio?: string;
  country: CountryCode;
  gender: string;
  birthDate: Date;
  email: string;
};

export const tempFans: FanProps[] = [
  {
    id: "1",
    name: "Guny Lee",
    nickname: "",
    thumbnail: "",
    bio: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form",
    country: "US",
    gender: "F",
    birthDate: new Date("1988-12-08"),
    email: "lghjazz@gmail.com",
  },
  {
    id: "2",
    name: "Jinho Kim",
    nickname: "",
    thumbnail: "",
    bio: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form",
    country: "BR",
    gender: "M",
    birthDate: new Date("1993-03-17"),
    email: "lghjazz@gmail.com",
  },
  {
    id: "3",
    name: "Haerin Kang",
    nickname: "",
    thumbnail: "",
    bio: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form",
    country: "KR",
    gender: "F",
    birthDate: new Date("2004-06-22"),
    email: "lghjazz@gmail.com",
  },
  {
    id: "4",
    name: "Kunil Jeong",
    nickname: "",
    thumbnail: "",
    bio: "",
    country: "IN",
    gender: "O",
    birthDate: new Date("1999-11-02"),
    email: "lghjazz@gmail.com",
  },
];

export default function FanItem({ item }: { item: FanProps }) {
  const fan = item;
  return (
    <ButtonBase
      sx={{
        p: theme.spacing(2),
        alignItems: "center",
      }}
    >
      <FanVisual item={fan} />
      <Box
        sx={{
          m: theme.spacing(0, 0, 0, 1.5),
        }}
      >
        <Typo
          sx={{
            fontSize: 14,
            lineHeight: "20px",
          }}
        >
          {fan.name}
        </Typo>
        <Typo
          sx={{
            fontSize: 12,
            lineHeight: "16px",
            color: grey[600],
          }}
        >
          {getCountryFlagEmoji(fan.country)}
        </Typo>
      </Box>
    </ButtonBase>
  );
}

function FanVisual({ item }: { item: FanProps }) {
  const fan = item;
  return (
    <Box
      sx={{
        width: 40,
        height: 40,
        borderRadius: "50%",
        p: theme.spacing(0.25),
        border: `2px solid ${"#ffffff"}`,
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          backgroundColor: "#121212",
          overflow: "hidden",
        }}
      >
        <Visual
          absolute
          src={`https://source.unsplash.com/random/?${fan.id}`}
        />
      </Box>
    </Box>
  );
}
