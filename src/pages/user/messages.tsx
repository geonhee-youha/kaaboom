import { Box, ButtonBase, Typography, alpha } from "@mui/material";
import { theme } from "../../themes/theme";
import _, { throttle } from "lodash";
import ExploreHeader from "../../components/organisms/ExploreHeader";
import Page from "../../components/atoms/Page";
import Link from "next/link";
import Empty from "../../components/atoms/Empty";
import TextButton from "../../components/atoms/TextButton";
import youhaBlue from "../../constants/youhaBlue";
import youhaGrey from "../../constants/youhaGrey";
import { useRecoilState } from "recoil";
import { messagesState, ordersState } from "../../constants/recoils";
import { useEffect, useState } from "react";
import MessageArtistItem from "../../components/molecules/MessageArtistItem";
import MessageChatItem from "../../components/molecules/MessageChatItem";
import { useRouter } from "next/router";
import IconButton from "../../components/atoms/IconButton";

export default function Index() {
  const router = useRouter();
  const { id } = router.query;
  const [orders, setOrders] = useRecoilState(ordersState);
  const [messages, setMessages] = useRecoilState(messagesState);
  const data = _.filter(messages, (el) => {
    return _.flatMap(orders, (el) => el.id).includes(el.id);
  });
  const selectedData = data[_.findIndex(data, (el) => el.id === `${id}`)];
  const onClickReset = () => {
    router.push(`/user/messages`, undefined, {
      shallow: false,
    });
  };
  useEffect(() => {
    const handleResize = throttle(() => {
      let bodyEl = document.querySelector("body");
      if (bodyEl && bodyEl?.clientWidth > 960) {
        router.push(`/user/messages?id=${data[0].id}`, undefined, {
          shallow: false,
        });
      }
    }, 20);
    window.addEventListener("orientationchange", handleResize);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("orientationchange", handleResize);
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <Page fixed>
      <Box
        sx={{
          p: theme.spacing(6, 2, 12, 2),
          height: "100%",
        }}
        className="Section"
      >
        <Box
          sx={{
            display: selectedData ? "none" : "block",
            "@media(min-width: 960px)": {
              display: "block",
            },
          }}
        >
          <ExploreHeader title="My Messages" data={data} label="results" />
        </Box>
        {data.length === 0 ? (
          <Empty>
            <Typography
              sx={{
                fontSize: 16,
                lineHeight: "24px",
                textAlign: "center",
                fontWeight: "500",
              }}
            >
              You don’t have any messages.
            </Typography>
            <Link href="/explore/artists" passHref>
              <TextButton
                size="lg"
                label={"Browse artists"}
                color={youhaBlue[400]}
              />
            </Link>
            <Typography
              sx={{
                fontSize: 14,
                lineHeight: "20px",
                color: youhaGrey[200],
                textAlign: "center",
              }}
            >
              Get started by sending a DM or booking a personalized video.
            </Typography>
          </Empty>
        ) : (
          <Box
            sx={{
              "@media(min-width: 960px)": {
                borderRadius: 1,
                overflow: "hidden",
                display: "flex",
                // height: "calc(100vh - 56px - 130px - 96px)",
                maxHeight: 840,
                height: "100%",
                border: `1px solid ${youhaGrey[400]}`,
                backgroundColor: youhaGrey[800],
              },
            }}
          >
            <Box
              sx={{
                display: selectedData ? "none" : "block",
                "@media(min-width: 960px)": {
                  display: "block",
                  width: 420,
                  borderRight: `1px solid ${youhaGrey[400]}`,
                  overflowY: "scroll",
                },
              }}
            >
              {data.map((item, index) => {
                const focused = id === item.id;
                const onClick = () => {
                  router.push(`/user/messages?id=${item.id}`, undefined, {
                    shallow: false,
                  });
                };
                return (
                  <MessageArtistItem
                    key={index}
                    focused={focused}
                    item={item}
                    onClick={onClick}
                  />
                );
              })}
            </Box>
            <Box
              sx={{
                display: selectedData ? "block" : "none",
                "@media(min-width: 960px)": {
                  display: "flex",
                  flexDirection: "column-reverse",
                  flex: 1,
                  overflowY: "scroll",
                },
              }}
              className="scroller"
            >
              <Box
                sx={{
                  m: theme.spacing(0, -2),
                  "@media(min-width: 960px)": {
                    m: theme.spacing(0),
                    p: theme.spacing(2, 0),
                  },
                }}
              >
                {selectedData && <MessageChatItem item={selectedData} />}
              </Box>
            </Box>
          </Box>
        )}
      </Box>
      <IconButton
        name="chevron-left"
        sx={{
          position: "fixed",
          top: 144,
          left: 16,
          zIndex: 97,
          borderRadius: "50%",
          display: selectedData ? "flex" : "none",
          "@media(min-width: 960px)": {
            display: "none",
          },
        }}
        size={20}
        backgroundColor={alpha(youhaGrey[700], 0.9)}
        borderColor={youhaGrey[400]}
        onClick={onClickReset}
      />
    </Page>
  );
}
