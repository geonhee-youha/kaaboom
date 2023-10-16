import {
  Box,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useRecoilState } from "recoil";
import Button from "../../components/atoms/Button";
import youhaGrey from "../../constants/youhaGrey";
import { theme } from "../../themes/theme";
import { ChangeEvent, useEffect, useState } from "react";
import Input, { InputLabel } from "../../components/atoms/Input";
import {
  FileProps,
  InputProps,
  inputDefaultProps,
  fileDefaultProps,
  genders,
  SelectProps,
  selectDefaultProps,
} from "../../constants";
import { nations } from "../../constants/nations";
import _ from "lodash";
import { tempUserState } from "../../data/temp";
import { isBirthday, isName } from "../../utils";
import Visual from "../../components/atoms/Visual";
import Icon from "../../components/atoms/Icon";
import { deepPurple, indigo, pink } from "@mui/material/colors";
import Page from "../../components/atoms/Page";

export default function Index() {
  //#region [recoil state] 유저데이터(임시)
  const [tempUser, setTempUser] = useRecoilState(tempUserState);
  //#endregion [recoil state] 유저데이터(임시)
  //#region [state] 썸네일
  const [thumbnail, setThumbnail] = useState<FileProps>({
    ...fileDefaultProps,
    value: tempUser.thumbnail,
  });
  //#endregion [state] 썸네일
  //#region [state] 이름/바이오/국적/젠더/생년월일
  const [name, setName] = useState<InputProps>({
    ...inputDefaultProps,
    value: tempUser.name,
  });
  const [bio, setBio] = useState<InputProps>({
    ...inputDefaultProps,
    value: tempUser.bio,
  });
  const [nation, setNation] = useState<SelectProps>(
    nations[_.findIndex(nations, (el) => el.value === tempUser.nation)] ??
      selectDefaultProps
  );
  const [gender, setGender] = useState<SelectProps>(
    genders[_.findIndex(genders, (el) => el.value === tempUser.gender)] ??
      selectDefaultProps
  );
  const [birthDate, setBirthDate] = useState<InputProps>({
    ...inputDefaultProps,
    value: tempUser.birthDate,
  });
  //#endregion [state] 이름/바이오/국적/젠더/생년월일
  //#region [state] 메인 액션 검증
  const [prevData, setPrevData] = useState<any>(tempUser);
  const newData = {
    ...tempUser,
    name: name.value,
    bio: bio.value,
    nation: nation.value,
    gender: gender.value,
    birthDate: birthDate.value,
  };
  const changable =
    newData.name !== prevData.name ||
    newData.bio !== prevData.bio ||
    newData.nation !== prevData.nation ||
    newData.gender !== prevData.gender ||
    newData.birthDate !== prevData.birthDate;
  const buttonDisabled =
    !changable ||
    name.error ||
    bio.error ||
    nation.value === "" ||
    gender.value === "" ||
    birthDate.error;
  //#endregion [state] 메인 액션 검증
  //#region [function] 썸네일
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
    const value = URL.createObjectURL(file);
    // Preview
    const isImg = file.type.split("/")[0] === "image"; //Img or clip
    // POST
    const data = new FormData();
    data.append("file", file);
    setThumbnail({
      value: value,
      file: file,
    });
  };
  //#endregion [function] 썸네일
  //#region [function] 이름/바이오/국적/젠더/생년월일
  const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const error = !isName(value);
    const helperText = error
      ? value === ""
        ? "Required"
        : "2 to 16 characters, composed of English or numbers"
      : "";
    const input = {
      value: value,
      error: error,
      helperText: helperText,
    };
    setName(input);
  };
  const onChangeBio = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const error = value.length > 200;
    const helperText = error ? "Must be no less than 200 characters" : "";
    const input = {
      value: value,
      error: error,
      helperText: helperText,
    };
    setBio(input);
  };
  const onChangeNation = (event: SelectChangeEvent) => {
    const value = event.target.value as string;
    const array = nations;
    const select = array[_.findIndex(array, (el) => el.value === value)];
    setNation(select);
  };
  const onChangeGender = (event: SelectChangeEvent) => {
    const value = event.target.value as string;
    const array = genders;
    const select = array[_.findIndex(array, (el) => el.value === value)];
    setGender(select);
  };
  const onChangeBirthDate = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const replacedValue = event.target.value
      .replace(/[^0-9]/g, "")
      .replace(/^(\d{0,2})(\d{0,2})(\d{0,4})$/g, "$1/$2/$3")
      .replace(/(\/{1,2})$/g, "");
    const error = !isBirthday(value);
    const helperText = error
      ? value === ""
        ? "Required"
        : "Your date of birth is incorrect"
      : "";
    const input = {
      value: replacedValue,
      error: error,
      helperText: helperText,
    };
    setBirthDate(input);
  };
  //#endregion [function] 이름/바이오/국적/젠더/생년월일
  //#region [function] 메인 액션
  const onClickSave = () => {
    setTempUser({
      ...tempUser,
      name: name.value,
      nation: nation.value,
      gender: gender.value,
      birthDate: birthDate.value,
    });
  };
  //#endregion [function] 메인 액션
  //#region [side effect] 유저값 변할때마다 변경 검증용 값 저장
  useEffect(() => {
    setPrevData(prevData);
  }, [tempUser]);
  //#endregion [side effect] 유저값 변할때마다 변경 검증용 값 저장
  return (
    <Page narrow>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          p: theme.spacing(6, 2, 0, 2),
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
            {thumbnail.value ? (
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <Visual
                  src={thumbnail.value}
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
        sx={{
          m: theme.spacing(6, 0, 0, 0),
        }}
      />
      <Input
        label="Your name"
        value={name.value}
        onChange={onChangeName}
        error={name.error}
        helperText={name.helperText}
        sx={{
          m: theme.spacing(3, 0, 0, 0),
        }}
      />
      <Input
        label="Your bio"
        value={bio.value}
        onChange={onChangeBio}
        multiline
        maxLength={200}
        showMaxLength
        maxRows={10}
        sx={{
          m: theme.spacing(3, 0, 0, 0),
        }}
        error={bio.error}
        helperText={bio.helperText}
        allowtMaxLength={true}
      />
      <FormControl
        fullWidth
        sx={{
          m: theme.spacing(3, 0, 0, 0),
        }}
      >
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
                  src={`https://img.mobiscroll.com/demos/flags/${nation.value}.png`}
                />
                {nation.value}
              </>
            ) : (
              ""
            )}
          </Typography>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={nation.value}
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
            {nations.map((item, index) => {
              return (
                <MenuItem key={index} value={item.value}>
                  {item.label}
                </MenuItem>
              );
            })}
          </Select>
        </Box>
      </FormControl>
      <FormControl
        fullWidth
        sx={{
          m: theme.spacing(3, 0, 0, 0),
        }}
      >
        <InputLabel>Gender</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={gender.value}
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
                {item.label}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <Input
        label={"Date of Birth"}
        value={birthDate.value}
        onChange={onChangeBirthDate}
        maxLength={10}
        showMaxLength={false}
        placeholder="02/28/1994"
        error={birthDate.error}
        helperText={birthDate.helperText}
        sx={{
          m: theme.spacing(3, 0, 0, 0),
        }}
        type="demical"
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
          m: theme.spacing(2, 0, 0, 0),
        }}
      >
        By continuing you agree to KAABOOM's{" "}
        <a target="_blank" tabIndex={0}>
          Terms of Service
        </a>
        , including{" "}
        <a target="_blank" tabIndex={0}>
          Additional Terms
        </a>
        , and{" "}
        <a target="_blank" tabIndex={0}>
          Privacy Policy
        </a>
        .
      </Typography>
      <Button
        fullWidth
        size="lg"
        disabled={buttonDisabled}
        onClick={onClickSave}
        sx={{
          m: theme.spacing(6, 0, 0, 0),
        }}
      >
        Save changes
      </Button>
    </Page>
  );
}
