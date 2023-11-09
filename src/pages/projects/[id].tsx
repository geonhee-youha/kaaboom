import { useRouter } from "next/router";
import BackHeader from "../../components/organisms/BackHeader";
import { testCelebs, testProjects } from "../../constants/temp";
import Visual from "../../components/atoms/Visual";
import _ from "lodash";
import { Box, ButtonBase, Container, Typography, alpha } from "@mui/material";
import { useEffect } from "react";
import { theme } from "../../themes/theme";
import { grey } from "@mui/material/colors";

export default function Project() {
  const router = useRouter();
  const { id, en } = router.query;
  const contents =
    testProjects[_.findIndex(testProjects, (el) => el.id === id)];
  useEffect(() => {
    var headerBackgroundEl: any = document.querySelector(
      `.BackHeaderBackground`
    );
    var contentsEl: any = document.querySelector(`.BackgroundContents`);
    var targetContentsEl: any = document.querySelector(
      `.Project .MainContents`
    );
    var targetLineEl: any = document.querySelector(`.TargetLine`);
    var imageEl: any = document.querySelector(`.ImageContainer`);
    var backgroundEl: any = document.querySelector(`.Background`);
    const listener1 = (e: any) => {
      var scrollY = Number(window.scrollY.toFixed(0));
      var targetLineOffsetBottom = targetLineEl.getBoundingClientRect().bottom;
      var targetOffsetTop = targetContentsEl.getBoundingClientRect().top;
      var backgroundOpacity: number = Number(
        (targetOffsetTop / targetLineOffsetBottom).toPrecision(2)
      );
      var headerBlur: number = Number(
        (1 - targetOffsetTop / targetLineOffsetBottom).toPrecision(2)
      );
      headerBackgroundEl.style.setProperty(
        "background",
        alpha("#121212", headerBlur > 1 ? 1 : headerBlur < 0 ? 0 : headerBlur)
      );
      imageEl.style.transform = `translateY(-${scrollY / 3}px)`;
      contentsEl.style.transform = `translateY(-${scrollY / 2}px)`;
      backgroundEl.style.setProperty(
        "opacity",
        backgroundOpacity > 1
          ? 1
          : backgroundOpacity < 0
          ? 0
          : backgroundOpacity
      );
      console.log(targetOffsetTop, targetLineOffsetBottom);
    };
    window.addEventListener("scroll", listener1);
    window.addEventListener("resize", listener1);
    return () => {
      window.removeEventListener("scroll", listener1);
      window.removeEventListener("resize", listener1);
    };
  }, []);
  return (
    <>
      <BackHeader />
      {contents && <Page />}
    </>
  );
}

function Page() {
  const router = useRouter();
  const { id, lang } = router.query;
  const project = testProjects[_.findIndex(testProjects, (el) => el.id === id)];
  const celeb =
    testCelebs[_.findIndex(testCelebs, (el) => el.id === project.celeb.id)];
  return (
    <>
      <Box
        sx={{
          p: theme.spacing(`calc(var(--sait) + 56px)`, 0, 0, 0),
          width: "100%",
        }}
      >
        <Container
          sx={{
            maxWidth: "600px !important",
          }}
        >
          <Box sx={{ aspectRatio: `1` }} />
        </Container>
      </Box>
      <Box
        sx={{
          position: "fixed",
          top: `calc(var(--sait) + 56px)`,
          left: 0,
          right: 0,
        }}
      >
        <Container
          sx={{
            maxWidth: "600px !important",
          }}
        >
          <Box
            sx={{
              aspectRatio: `1`,
            }}
            className="TargetLine"
          />
        </Container>
      </Box>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        className="Background"
      >
        <Container
          sx={{
            p: `0 !important`,
            maxWidth: `600px !important`,
          }}
        >
          <Box
            sx={{
              width: "100%",
              position: "relative",
              aspectRatio: `16 / 16`,
            }}
          >
            <Visual src={project.thumbnail} absolute forceShow />
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "100vh",
              }}
              className="BackgroundContents"
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    aspectRatio: `1`,
                    background: `linear-gradient(${alpha(
                      "#121212",
                      0.4
                    )}, ${alpha("#121212", 1)})`,
                  }}
                />
                <Box
                  sx={{
                    width: "100%",
                    flex: 1,
                    backgroundColor: "#121212",
                  }}
                />
              </Box>
              <Container
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  aspectRatio: `1`,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                }}
              >
                <ButtonBase
                  disableRipple
                  sx={{
                    width: "100%",
                    m: theme.spacing(0, 0, 2, 0),
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      borderRadius: "50%",
                      width: 56,
                      height: 56,
                      overflow: "hidden",
                      backgroundColor: grey[900],
                    }}
                  >
                    <Visual src={celeb.thumbnail} />
                  </Box>
                  <Box
                    sx={{
                      m: theme.spacing(0, 0, 0, 1.5),
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 16,
                        lineHeight: "24px",
                        // color: grey[400],
                        // fontWeight: '300',
                        m: theme.spacing(0, 0, 0.5, 0),
                      }}
                    >
                      {celeb.name[lang?.toString() ?? "kr"]}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 12,
                        lineHeight: "16px",
                        color: grey[400],
                        fontWeight: "300",
                      }}
                    >
                      12개의 프로젝트 진행중
                    </Typography>
                  </Box>
                </ButtonBase>
                <Typography
                  sx={{
                    fontSize: 24,
                    lineHeight: "36px",
                    fontWeight: "700",
                    width: `80%`,
                    minWidth: "240px",
                    wordBreak: "keep-all",
                  }}
                >
                  {project.title[lang?.toString() ?? "kr"]}
                </Typography>
              </Container>
            </Box>
          </Box>
        </Container>
      </Box>
      <Container
        sx={{
          maxWidth: `600px !important`,
          zIndex: 99
        }}
        className="Project"
      >
        <Box
          sx={{ width: "100%", height: "200vh", backgroundColor: "#ffffff" }}
          className="MainContents"
        />
      </Container>
    </>
  );
}
