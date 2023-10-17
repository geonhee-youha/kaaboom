import { Box, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import Button from "../../components/atoms/Button";
import youhaGrey from "../../constants/youhaGrey";
import { theme } from "../../themes/theme";
import { useRecoilState } from "recoil";
import { tempUserState } from "../../data/temp";
import { isBirthday, isName } from "../../utils";
import { loginRecoilState } from "../../constants/recoils";
import Page from "../../components/atoms/Page";

export default function Index() {
  const router = useRouter();
  const { url } = router.query;
  const [tempUser, setTempUser] = useRecoilState(tempUserState);
  const [login, setLogin] = useRecoilState(loginRecoilState);
  const onClickGoogleLogin = () => {
    if (
      confirm(
        "구글 로그인 창 띄운 뒤 사인업 완료. 현재는 국적/언어/성별/출생일이 입력되어 있지 않다는 가정하에 /auth/detail로 이동시켰고 만약 회원가입되어있고, 정보들이 입력되어 있으면 바로 뒤로 혹은 query의 url로 이동시키면 됩니다."
      )
    ) {
      if (
        !isName(tempUser.name) ||
        tempUser.nation === "" ||
        tempUser.gender === "" ||
        !isBirthday(tempUser.birthDate)
      ) {
        router.push(`/auth/signup?url=${url}`);
      } else {
        setLogin(true);
        if (typeof url === "string" && url !== "" && url !== "undefined") {
          router.replace(`${url.replaceAll("^", "/")}`);
        } else {
          router.replace("/");
        }
      }
    }
  };
  return (
    <Page narrow>
      <Box
        className="SectionTitle"
        sx={{
          p: theme.spacing(6, 2, 3, 2),
          textAlign: "center",
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
          Log in or Sign up to KAABOOM!
        </Typography>
        <Typography
          sx={{
            fontSize: 14,
            lineHeight: "20px",
            color: youhaGrey[200],
          }}
        >
          Log in and get personal video
        </Typography>
        <Button
          size="lg"
          fullWidth
          borderColor={"#ffffff"}
          onClick={onClickGoogleLogin}
          color={"#ffffff"}
          type="outlined"
          sx={{
            m: theme.spacing(4, 0, 0, 0),
            backgroundColor: `${youhaGrey[700]} !important`,
          }}
        >
          <Box
            sx={{
              width: 24,
              height: 24,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mr: 2,
              "& img": {
                width: 20,
                height: 20,
              },
            }}
          >
            <img src="/logos/google.png" />
          </Box>
          Sign in with Google
        </Button>
        <Typography
          sx={{
            color: youhaGrey[300],
            fontSize: 14,
            lineHeight: "20px",
            textAlign: "center",
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
      </Box>
    </Page>
  );
}
