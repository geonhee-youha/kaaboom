import { Box, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import Button from "../../components/atoms/Button";
import youhaGrey from "../../constants/youhaGrey";
import { theme } from "../../themes/theme";

export default function Page() {
  const router = useRouter();
  const { url } = router.query;
  const onClickGoogleLogin = () => {
    window.alert(
      "구글 로그인 창 띄운 뒤 사인업 완료. 현재는 국적/언어/성별/출생일이 입력되어 있지 않다는 가정하에 /auth/detail로 이동시켰고 만약 정보들이 입력되어 있으면 바로 뒤로 혹은 query의 url로 이동시키면 됩니다."
    );
    router.push(`/auth/signup?url=${url}`);
  };
  return (
    <>
      <Stack
        spacing={4}
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
        <Box
          className="SectionTitle"
          sx={{
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
        </Box>
        <Stack spacing={2}>
          <Button
            size="lg"
            fullWidth
            borderColor={"#ffffff"}
            onClick={onClickGoogleLogin}
            color={"#ffffff"}
            type="outlined"
            sx={{
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
            }}
          >
            By continuing you agree to KAABOOM's{" "}
            <a target="_blank">Terms of Service</a>, including{" "}
            <a target="_blank">Additional Terms</a>, and{" "}
            <a target="_blank">Privacy Policy</a>.
          </Typography>
        </Stack>
      </Stack>
    </>
  );
}
