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
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Input, { InputLabel } from "../../components/atoms/Input";
import { genders } from "../../constants";
import { contries } from "../../constants/contries";
import _ from "lodash";
import { tempUserState } from "../../data/temp";
import { isBirthday, isName } from "../../utils";
import Visual from "../../components/atoms/Visual";
import Icon from "../../components/atoms/Icon";
import { deepPurple, indigo, pink } from "@mui/material/colors";
import IconButton from "../../components/atoms/IconButton";

export default function Page() {
  const router = useRouter();
  const { url } = router.query;
  const [login, setLogin] = useRecoilState(loginRecoilState);
  const [file, setFile] = useState<any>(null);
  const [tempUser, setTempUser] = useRecoilState(tempUserState);
  const [thumbnail, setThumbnail] = useState<string | undefined>(
    tempUser.thumbnail
  );
  const [name, setName] = useState<string>(tempUser.name);
  const [bio, setBio] = useState<string>(tempUser.bio);
  const [nation, setNation] = useState<string>(tempUser.nation);
  const [gender, setGender] = useState<string>(tempUser.gender);
  const [birthDate, setBirthDate] = useState<string>(tempUser.birthDate);
  const [prevData, setPrevData] = useState<any>(tempUser);
  const newData = {
    ...tempUser,
    name: name,
    bio: bio,
    nation: nation,
    gender: gender,
    birthDate: birthDate,
  };
  useEffect(() => {
    setPrevData(prevData);
  }, [tempUser]);
  const changable =
    newData.name !== prevData.name ||
    newData.bio !== prevData.bio ||
    newData.nation !== prevData.nation ||
    newData.gender !== prevData.gender ||
    newData.birthDate !== prevData.birthDate;
  const onChangeThumbnail = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    const limitSize = 50; //50MB로 제한.
    if (file.size > 1024 * 1024 * limitSize) {
      // 용량 초과시 경고후 해당 파일의 용량도 보여줌
      const currentFileSize =
        Math.round((file.size / 1024 / 1024) * 100) / 100 + "MB";
      alert(
        `${limitSize}MB 이하 파일만 등록할 수 있습니다.\n\n` +
          "현재파일 용량 : " +
          currentFileSize
      );
    }
    event.target.value = "";
    const timestamp = +new Date();
    const url = URL.createObjectURL(file);
    // Preview
    const isImg = file.type.split("/")[0] === "image"; //Img or clip
    // POST
    const data = new FormData();
    data.append("file", file);
    //로딩 끝내야함
    setFile(file);
    setThumbnail(url);
  };
  const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setName(value);
  };
  const onChangeBio = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setBio(value);
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
  const onClickSave = () => {
    setTempUser({
      ...tempUser,
      name: name,
      nation: nation,
      gender: gender,
      birthDate: birthDate,
    });
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
        <Stack spacing={3}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              p: theme.spacing(0, 0, 4, 0),
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: 180,
                height: 180,
                "& *": { cursor: "pointer" },
              }}
            >
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="file-picker"
                type="file"
                onInput={onChangeThumbnail}
              />
              <label
                htmlFor="file-picker"
                // onClick={() => {
                //   setMessageLoader((prevState) => {
                //     return {
                //       ...prevState,
                //       open: true,
                //     };
                //   });
                // }}
              >
                {thumbnail ? (
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <Visual
                      src={thumbnail}
                      sx={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "50%",
                        overflow: "hidden",
                        backgroundColor: youhaGrey[800],
                        border: `1px solid ${youhaGrey[600]}`,
                      }}
                      absolute
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        right: 0,
                        bottom: 0,
                        border: `1px solid ${youhaGrey[600]}`,
                        backgroundColor: youhaGrey[900],
                        borderRadius: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: 48,
                        height: 48,
                      }}
                    >
                      <Icon name="camera-retro" size={24} prefix="fas" />
                    </Box>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "50%",
                        overflow: "hidden",
                        backgroundColor:
                          tempUser.gender === "M"
                            ? indigo["A400"]
                            : tempUser.gender === "M"
                            ? pink["A400"]
                            : deepPurple["A400"],
                        border: `1px solid ${youhaGrey[600]}`,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Icon
                        name="user"
                        prefix="fas"
                        color={youhaGrey[100]}
                        size={80}
                      />
                    </Box>
                    <Box
                      sx={{
                        position: "absolute",
                        right: 0,
                        bottom: 0,
                        border: `1px solid ${youhaGrey[600]}`,
                        backgroundColor: youhaGrey[900],
                        borderRadius: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: 48,
                        height: 48,
                      }}
                    >
                      <Icon name="camera-retro" size={24} prefix="fas" />
                    </Box>
                  </Box>
                )}
              </label>
            </Box>
          </Box>
          <Input
            label="Your Email"
            value="lghjazzzz@naver.com"
            onChange={() => {}}
            uneditable
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
          />
          <Input
            label="Your bio"
            value={bio}
            onChange={onChangeBio}
            multiline
            maxLength={200}
            showMaxLength
            maxRows={10}
          />
          <FormControl fullWidth>
            <InputLabel>Nation</InputLabel>
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
                {nation ? (
                  <>
                    <img
                      src={`https://img.mobiscroll.com/demos/flags/${nation}.png`}
                    />
                    {contries[
                      _.findIndex(contries, (el) => el.value === nation)
                    ].text ?? ""}
                  </>
                ) : (
                  ""
                )}
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
            <InputLabel>Gender</InputLabel>
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
          disabled={!changable|| !isName(name) || nation === "" || !isBirthday(birthDate)}
          onClick={onClickSave}
        >
          Save changes
        </Button>
      </Stack>
    </>
  );
}
