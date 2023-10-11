import {
  Box,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
  alpha,
} from "@mui/material";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import Button from "../../components/atoms/Button";
import { loginRecoilState } from "../../constants/recoils";
import youhaGrey from "../../constants/youhaGrey";
import { theme } from "../../themes/theme";
import { ChangeEvent, useRef, useState } from "react";
import Input, { InputLabel } from "../../components/atoms/Input";
import { genders } from "../../constants";
import { contries } from "../../constants/contries";
import _ from "lodash";
import { tempUserState } from "../../data/temp";
import { isBirthday, isName } from "../../utils";

export default function Page() {
  const router = useRouter();
  const { url } = router.query;
  const [login, setLogin] = useRecoilState(loginRecoilState);
  const [tempUser, setTempUser] = useRecoilState(tempUserState);
  const [name, setName] = useState<string>(tempUser.name);
  const [nation, setNation] = useState<string>("US");
  const [gender, setGender] = useState<string>("M");
  const [birthDate, setBirthDate] = useState<string>("");
  const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setName(value);
  };
  const onChangeNation = (event: SelectChangeEvent) => {
    setNation(event.target.value as string);
  };
  const onChangeGender = (event: SelectChangeEvent) => {
    setGender(event.target.value as string);
  };
  const onChangeBirthDate = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const text = value
      .replace(/[^0-9]/g, "")
      .replace(/^(\d{0,2})(\d{0,2})(\d{0,4})$/g, "$1/$2/$3")
      .replace(/(\/{1,2})$/g, "");
    setBirthDate(text);
  };
  const onClickSignup = () => {
    setLogin(true),
      setTempUser({
        ...tempUser,
        name: name,
        nation: nation,
        gender: gender,
        birthDate: birthDate,
      });
    if (typeof url === "string" && url !== "") {
      router.replace(`${url.replaceAll("^", "/")}`);
    } else {
      router.replace("/");
    }
  };
  return (
    <>
      <Stack
        spacing={6}
        sx={{
          width: `100%`,
          minWidth: "280px",
          maxWidth: `480px`,
          m: theme.spacing(0, "auto"),
          p: theme.spacing(8, 2, 24, 2),
          "@media(min-width: 960px)": {
            p: theme.spacing(12, 2, 32, 2),
          },
        }}
      >
        <Box className="SectionTitle" sx={{}}>
          <Typography
            sx={{
              fontSize: 20,
              lineHeight: "32px",
              fontWeight: "700",
              m: theme.spacing(0, 0, 1, 0),
            }}
          >
            Finish signing up
          </Typography>
          <Typography
            sx={{
              fontSize: 14,
              lineHeight: "20px",
              color: youhaGrey[200],
            }}
          >
            You'll need a free Cameo account in order to follow your favorite
            celebrities and get other Cameo news & special offers
          </Typography>
        </Box>
        <Stack spacing={3}>
          <Input
            label="Your Email"
            value="lghjazzzz@naver.com"
            onChange={() => {}}
            uneditable
            essential
          />
          <Input
            label="Your name"
            value={name}
            onChange={onChangeName}
            error={!isName(name)}
            helperText={
              !isName(name)
                ? "2 to 16 characters, composed of English or numbers"
                : ""
            }
            essential
          />
          <FormControl fullWidth>
            <InputLabel>
              Nation<span>*</span>
            </InputLabel>
            <Box
              sx={{
                position: "relative",
                background: youhaGrey[700],
                borderRadius: 1,
              }}
            >
              <Typography
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: 16,
                  transform: "translateY(-50%)",
                  "& img": {
                    width: "auto",
                    height: "16px !important",
                    marginRight: 1,
                  },
                }}
              >
                <img
                  src={`https://img.mobiscroll.com/demos/flags/${nation}.png`}
                />
                {
                  contries[_.findIndex(contries, (el) => el.value === nation)]
                    .text
                }
              </Typography>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={nation}
                onChange={onChangeNation}
                sx={{
                  fontSize: 16,
                  lineHeight: "24px",
                  fontFamily: "Poppins !important",
                  height: 48,
                  display: "flex",
                  alignItems: "center",
                  color: "transparent",
                  "& .MuiOutlinedInput-input": {
                    p: theme.spacing(0, 2),
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    display: "none",
                  },
                  "& *": { border: "none !important" },
                  boxShadow: `${youhaGrey[600]} 0px 0px 0px 1px inset !important`,
                  "&:hover": {
                    boxShadow: `${youhaGrey[400]} 0px 0px 0px 1px inset !important`,
                  },
                  "&.Mui-focused": {
                    outline: "none !important",
                    boxShadow: `${"#ffffff"} 0px 0px 0px 2px inset !important`,
                    "& input": {
                      "&::placeholder": {
                        color: youhaGrey[400],
                      },
                    },
                    "& textarea": {
                      "&::placeholder": {
                        color: youhaGrey[400],
                      },
                    },
                  },
                }}
              >
                {contries.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.value}>
                      {item.text}
                    </MenuItem>
                  );
                })}
              </Select>
            </Box>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>
              Gender<span>*</span>
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={gender}
              onChange={onChangeGender}
              sx={{
                fontSize: 16,
                lineHeight: "24px",
                fontFamily: "Poppins !important",
                height: 48,
                display: "flex",
                alignItems: "center",
                position: "relative",
                background: youhaGrey[700],
                borderRadius: 1,
                "& .MuiOutlinedInput-input": {
                  p: theme.spacing(0, 2),
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  display: "none",
                },
                "& *": { border: "none !important" },
                boxShadow: `${youhaGrey[600]} 0px 0px 0px 1px inset !important`,
                "&:hover": {
                  boxShadow: `${youhaGrey[400]} 0px 0px 0px 1px inset !important`,
                },
                "&.Mui-focused": {
                  outline: "none !important",
                  boxShadow: `${"#ffffff"} 0px 0px 0px 2px inset !important`,
                  "& input": {
                    "&::placeholder": {
                      color: youhaGrey[400],
                    },
                  },
                  "& textarea": {
                    "&::placeholder": {
                      color: youhaGrey[400],
                    },
                  },
                },
              }}
            >
              {genders.map((item, index) => {
                return (
                  <MenuItem key={index} value={item.value}>
                    {item.text}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <Input
            label={"Date of Birth"}
            value={birthDate}
            onChange={onChangeBirthDate}
            maxLength={10}
            showMaxLength={false}
            placeholder="02/28/1994"
            essential
            error={birthDate.length === 10 && !isBirthday(birthDate)}
            helperText={
              birthDate.length === 10 && !isBirthday(birthDate)
                ? "Your date of birth is incorrect"
                : ""
            }
          />
          <Typography
            sx={{
              color: youhaGrey[300],
              fontSize: 12,
              lineHeight: "20px",
              "& a": {
                color: "#ffffff",
                textDecoration: "underline",
              },
            }}
          >
            By continuing you agree to KAABOOM's{" "}
            <a target="_blank">Terms of Service</a>, including{" "}
            <a target="_blank">Additional Terms</a>, and{" "}
            <a target="_blank">Privacy Policy</a>.
          </Typography>
        </Stack>
        <Button
          fullWidth
          size="lg"
          disabled={!isName(name) || nation === "" || !isBirthday(birthDate)}
          onClick={onClickSignup}
        >
          Sign up
        </Button>
      </Stack>
    </>
  );
}
