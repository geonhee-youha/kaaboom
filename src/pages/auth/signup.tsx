import {
  Box,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import Button from "../../components/atoms/Button";
import { loginRecoilState } from "../../constants/recoils";
import youhaGrey from "../../constants/youhaGrey";
import { theme } from "../../themes/theme";
import { ChangeEvent, useState } from "react";
import Input, { InputLabel } from "../../components/atoms/Input";
import {
  InputProps,
  SelectProps,
  genders,
  inputDefaultProps,
} from "../../constants";
import { nations } from "../../constants/nations";
import _ from "lodash";
import { tempUserState } from "../../data/temp";
import { isBirthday, isName } from "../../utils";
import Page from "../../components/atoms/Page";

export default function Index() {
  //#region [router] 이동 및 쿼리
  const router = useRouter();
  const { url } = router.query;
  //#endregion [router] 이동 및 쿼리
  //#region [recoil state] 유저데이터 및 로그인여부 (임시)
  const [login, setLogin] = useRecoilState(loginRecoilState);
  const [tempUser, setTempUser] = useRecoilState(tempUserState);
  //#endregion [recoil state] 유저데이터 및 로그인여부 (임시)
  //#region [state] 이름/국적/젠더/생년월일
  const [name, setName] = useState<InputProps>({
    ...inputDefaultProps,
    value: tempUser.name,
  });
  const [nation, setNation] = useState<SelectProps>(
    nations[_.findIndex(nations, (el) => el.value === "US")]
  );
  const [gender, setGender] = useState<SelectProps>(
    genders[_.findIndex(genders, (el) => el.value === "M")]
  );
  const [birthDate, setBirthDate] = useState<InputProps>({
    ...inputDefaultProps,
    value: tempUser.birthDate,
  });
  //#endregion [state] 이름/국적/젠더/생년월일
  //#region [state] 메인 액션 검증
  const buttonDisabled =
    name.error || nation.value === "" || gender.value === "" || birthDate.error;
  //#endregion [state]메인 액션 검증
  //#region [function] 이름/국적/젠더/생년월일
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
  //#endregion [function] 이름/국적/젠더/생년월일
  //#region [function] 메인 액션
  const onClickSignup = () => {
    setLogin(true);
    setTempUser({
      ...tempUser,
      name: name.value,
      nation: nation.value,
      gender: gender.value,
      birthDate: birthDate.value,
    });
    if (typeof url === "string" && url !== "") {
      router.replace(`${url.replaceAll("^", "/")}`);
    } else {
      router.replace("/");
    }
  };
  //#endregion [function] 메인 액션
  return (
    <Page narrow>
      <Box
        className="SectionTitle"
        sx={{
          p: theme.spacing(6, 2, 3, 2),
        }}
      >
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
        <Input
          label="Your Email"
          value="lghjazzzz@naver.com"
          onChange={() => {}}
          uneditable
          essential
          sx={{
            m: theme.spacing(3, 0, 0, 0),
          }}
        />
        <Input
          label="Your name"
          value={name.value}
          onChange={onChangeName}
          error={name.error}
          helperText={name.helperText}
          essential
          sx={{
            m: theme.spacing(3, 0, 0, 0),
          }}
        />
        <FormControl
          fullWidth
          sx={{
            m: theme.spacing(3, 0, 0, 0),
          }}
        >
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
                src={`https://img.mobiscroll.com/demos/flags/${nation.value}.png`}
              />
              {nation.value}
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
          <InputLabel>
            Gender<span>*</span>
          </InputLabel>
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
          essential
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
          onClick={onClickSignup}
          sx={{
            m: theme.spacing(6, 0, 0, 0),
          }}
        >
          Sign up
        </Button>
      </Box>
    </Page>
  );
}
