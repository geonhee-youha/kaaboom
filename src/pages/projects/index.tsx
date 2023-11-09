import { Box, ButtonBase, Container, Typography, alpha } from "@mui/material";
import { theme } from "../../themes/theme";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import ProjectItem from "../../components/molecules/ProjectItem";
import { testCelebs, testProjects } from "../../constants/temp";
import Chip from "../../components/atoms/Chip";
import _ from "lodash";
import { comma } from "../../utils";
import { grey } from "@mui/material/colors";
import Icon from "../../components/atoms/Icon";
import SortDialog from "../../components/templates/SortDialog";

export type SortProps = {
  value: string;
  label: { [key in string]: string };
};

export const sorts: SortProps[] = [
  {
    value: "newest",
    label: { us: "Newest", kr: "최신순" },
  },
  {
    value: "endDate",
    label: { us: "End Date", kr: "마감일순" },
  },
  {
    value: "mostLiked",
    label: { us: "Most liked", kr: "좋아요순" },
  },
  {
    value: "mostCommented",
    label: { us: "Most Commented", kr: "댓글순" },
  },
];

export default function Projects() {
  const router = useRouter();
  const { lang } = router.query;
  const [swiper, setSwiper] = useState<SwiperCore>();
  const handleSlideChange = () => {};
  const [open, setOpen] = useState<boolean>(false);
  const [filters, setFilters] = useState<string[]>([]);
  const [sort, setSort] = useState<SortProps>(sorts[0]);
  const projects =
    filters.length < 1
      ? testProjects
      : _.filter(testProjects, (el) => filters.includes(el.celeb.id));
  const handleClickSort = () => {
    setOpen(true);
  };
  useEffect(() => {
    var headerBackgroundEl: any = document.querySelector(`.HeaderBackground`);
    var navBackgroundEl: any = document.querySelector(`.navBackground`);
    var targetContentsEl: any = document.querySelector(`.MainContents`);
    const listener1 = (e: any) => {
      var targetLineOffsetTop =
        targetContentsEl.getBoundingClientRect().top + 32;
      var top = targetLineOffsetTop < 1 ? 1 : targetLineOffsetTop;
      var headerBackgroundOffsetBottom =
        headerBackgroundEl.getBoundingClientRect().bottom;
      var headerBlur: number = Number(
        (1 - (top - headerBackgroundOffsetBottom) / top).toFixed(1)
      );
      headerBackgroundEl.style.setProperty(
        "background",
        alpha("#121212", headerBlur > 1 ? 1 : headerBlur < 0 ? 0 : headerBlur)
      );
      navBackgroundEl.style.setProperty(
        "background",
        alpha("#121212", headerBlur > 1 ? 1 : headerBlur < 0 ? 0 : headerBlur)
      );
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
      <Container
        sx={{
          pb: `calc(56px + 128px)`,
        }}
      >
        <Box
          sx={{
            p: theme.spacing(4, 0, 0, 0),
          }}
        >
          <Box>
            <Box
              sx={{
                p: theme.spacing(8, 0, 0, 0),
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  "@media(min-width: 600px)": {
                    flexDirection: "row",
                    alignItems: "flex-end",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: 20,
                    lineHeight: "32px",
                    fontWeight: "700",
                  }}
                >
                  {lang === "us" ? "All projects" : "전체 프로젝트"}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 14,
                    lineHeight: "20px",
                    color: grey[600],
                    m: theme.spacing(0.5, 0, 0, 0),
                    "@media(min-width: 600px)": {
                      m: theme.spacing(0, 0, 0.5, 1.5),
                    },
                  }}
                >
                  {lang?.toString() === "us"
                    ? `${comma(projects.length)} results`
                    : `총 ${comma(projects.length)}개의 결과`}
                </Typography>
              </Box>
              <Box
                sx={{
                  position: "sticky",
                  top: `calc(var(--sait) + 56px)`,
                  display: "flex",
                  m: theme.spacing(2, 0, 0, 0),
                  p: theme.spacing(1, 0, 1, 0),
                  height: 36 + 16,
                  alignItems: "flex-end",
                  zIndex: 99,
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                  }}
                  className="navBackground"
                />
                <Box
                  sx={{
                    m: theme.spacing(0, -2, 0, -2),
                    overflowX: "scroll",
                    whiteSpace: "nowrap",
                    "@media(min-width: 600px)": {
                      m: theme.spacing(0, -3, 0, -3),
                    },
                  }}
                >
                  <Box
                    sx={{
                      p: theme.spacing(0, 2),
                      "@media(min-width: 600px)": {
                        p: theme.spacing(0, 3),
                      },
                    }}
                  >
                    {testCelebs.map((item, index) => {
                      const checked = filters.includes(item.id);
                      const handleClick = () => {
                        setFilters((prev) => {
                          let newPrev = _.cloneDeep(prev);
                          if (newPrev.includes(item.id)) {
                            newPrev = _.filter(newPrev, (el) => el !== item.id);
                          } else {
                            newPrev = [...newPrev, item.id];
                          }
                          return newPrev;
                        });
                      };
                      return (
                        <Chip
                          key={index}
                          checked={checked}
                          onClick={handleClick}
                          thumbnail={item.thumbnail}
                        >
                          {item.name[lang?.toString() ?? "kr"]}
                        </Chip>
                      );
                    })}
                    <Box
                      sx={{
                        display: `inline-flex`,
                        width: 128,
                        height: "100%",
                      }}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    display: "flex",
                    alignItems: "center",
                    background: `linear-gradient(90deg, ${alpha(
                      "#121212",
                      0
                    )}, ${alpha("#121212", 1)} 48px)`,
                    right: -16,
                    p: theme.spacing(0, 2, 0, 6),
                    "@media(min-width: 600px)": {
                      right: -24,
                      p: theme.spacing(0, 3, 0, 6),
                    },
                  }}
                >
                  <ButtonBase
                    disableRipple
                    sx={{
                      alignItems: "center",
                    }}
                    onClick={handleClickSort}
                  >
                    <Typography
                      sx={{
                        fontSize: 12,
                        lineHeight: "16px",
                        color: "#ffffff",
                      }}
                    >
                      {lang === "us"
                        ? `Sort by ${sort.label[lang?.toString() ?? "kr"]}`
                        : `${sort.label[lang?.toString() ?? "kr"]}`}
                    </Typography>
                    <Icon
                      name="angles-up-down"
                      prefix="far"
                      color="#ffffff"
                      size={12}
                      sx={{
                        m: theme.spacing(0, 0, 0, 0.5),
                      }}
                    />
                  </ButtonBase>
                </Box>
              </Box>
              <Box className="MainContents">
                <Box
                  sx={{
                    m: theme.spacing(4, 0, 0, 0),
                    display: "grid",
                    gridTemplateColumns: `repeat(2, 1fr)`,
                    gridAutoRows: "1fr",
                    gridTemplateRows: "auto",
                    gridColumnGap: 8,
                    gridRowGap: 16,
                    "@media(min-width: 480px)": {
                      gridTemplateColumns: `repeat(2, 1fr)`,
                    },
                    "@media(min-width: 600px)": {
                      gridTemplateColumns: `repeat(3, 1fr)`,
                      gridColumnGap: 12,
                      gridRowGap: 24,
                    },
                    "@media(min-width: 720px)": {
                      gridTemplateColumns: `repeat(3, 1fr)`,
                    },
                    "@media(min-width: 840px)": {
                      gridTemplateColumns: `repeat(4, 1fr)`,
                    },
                    "@media(min-width: 960px)": {
                      gridTemplateColumns: `repeat(4, 1fr)`,
                    },
                    "@media(min-width: 1080px)": {
                      gridTemplateColumns: `repeat(5, 1fr)`,
                    },
                    "@media(min-width: 1200px)": {
                      gridTemplateColumns: `repeat(5, 1fr)`,
                    },
                  }}
                >
                  {projects.map((item, index) => {
                    return <ProjectItem key={index} item={item} />;
                  })}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
      <SortDialog open={open} setOpen={setOpen} sort={sort} setSort={setSort} />
    </>
  );
}
