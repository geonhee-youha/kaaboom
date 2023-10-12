import { useRouter } from "next/router";
import Page from "../../components/atoms/Page";
import { Box, ButtonBase, Stack, Typography, alpha } from "@mui/material";
import { ChangeEvent, useState } from "react";
import {
  deliverySpeeds,
  howKaboomOrder,
  videoTypes,
  paymentMethods,
  toOrFromTypes,
  whomTypes,
} from "../../data";
import youhaBlue from "../../constants/youhaBlue";
import youhaGrey from "../../constants/youhaGrey";
import { theme } from "../../themes/theme";
import Icon from "../../components/atoms/Icon";
import { comma } from "../../utils";
import Input, { InputLabel } from "../../components/atoms/Input";
import Button from "../../components/atoms/Button";
import Checkbox from "../../components/atoms/Checkbox";
import Chip from "../../components/atoms/Chip";
import _, { random } from "lodash";
import { ArtistProps, artists } from "../../data/artist";
import Typo from "../../components/atoms/Typo";
import { GroupProps, groups } from "../../data/group";
import Visual from "../../components/atoms/Visual";
import IconButton from "../../components/atoms/IconButton";
import { yellow } from "@mui/material/colors";
import { useRecoilState } from "recoil";
import { ordersState, tempOrders } from "../../constants/recoils";

function Header({
  artist,
  paymentMode,
}: {
  artist: ArtistProps;
  paymentMode?: boolean;
}) {
  const router = useRouter();
  const { id, videoType } = router.query;
  const onClickBack = () => {
    if (paymentMode) {
      router.replace(`${router.pathname}?id=${id}&videoType=${videoType}`);
    } else {
      router.back();
    }
  };
  return (
    <>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          borderBottom: `1px solid ${youhaGrey[700]}`,
          backgroundColor: alpha(youhaGrey[900], 0.8),
          backdropFilter: `blur(8px)`,
          zIndex: 999,
          "@media(min-width: 961px)": {
            display: "flex",
          },
        }}
        className="Header"
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            height: 56,
            width: "100%",
            maxWidth: "1280px",
            m: theme.spacing(0, "auto"),
            p: theme.spacing(0, 2, 0, 1),
          }}
        >
          <IconButton name="chevron-left" onClick={onClickBack} size={20} />
          <Stack
            direction={"row"}
            alignItems={"center"}
            spacing={2}
            sx={{
              p: theme.spacing(0, 2),
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: 40,
                height: 40,
                "@media(min-width: 961px)": {
                  display: "none",
                },
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  border: `1px solid ${youhaGrey[700]}`,
                  borderRadius: "50%",
                  overflow: "hidden",
                  aspectRatio: `1`,
                }}
              >
                <Visual src={artist.thumbnail} absolute noScale={false} />
              </Box>
            </Box>
            <Typo
              lines={1}
              sx={{
                fontSize: 16,
                lineHeight: "24px",
                fontWeight: "700",
              }}
            >
              {artist.name && `New request for ${artist.name}`}
            </Typo>
          </Stack>
        </Box>
      </Box>
    </>
  );
}

export default function Index() {
  return (
    <Page needId asideReverse>
      <Inner />
    </Page>
  );
}

function Inner() {
  const router = useRouter();
  const { id, videoType: type, state } = router.query;
  const artist = artists[_.findIndex(artists, (el) => el.id === id)];
  const [orders, setOrders] = useRecoilState(ordersState);
  const [videoType, setVideoType] = useState<string>(`${type}`);
  const [whomType, setWhomType] = useState<string>(whomTypes[0].value);
  const [toFirstName, setToFirstName] = useState<string>("");
  const [toType, setToType] = useState<string>("");
  const [fromFirstName, setFromFirstName] = useState<string>("");
  const [fromType, setFromType] = useState<string>("");
  const [instructions, setInstructions] = useState<string>("");
  const [hideVideo, setHideVideo] = useState<boolean>(false);
  const [toFirstNameError, setToFirstNameError] = useState<boolean>(false);
  const [fromFirstNameError, setFromFirstNameError] = useState<boolean>(false);
  const [instructionsError, setInstructionsError] = useState<boolean>(false);
  const [deliverySpeed, setDeliverySpeed] = useState<string>(
    deliverySpeeds[0].value
  ); // 추후 추가기능
  const [paymentMethod, setPaymentMethod] = useState<string>(
    paymentMethods[0].value
  );
  const instructionsMaxLength = videoType === "mini" ? 45 : 200;
  const videoTypeUnavailable = videoType === "";
  const toFirstNameUnavailable = toFirstName === "" || toFirstName.length > 40;
  const fromFirstNameUnavailable =
    fromFirstName === "" || fromFirstName.length > 40;
  const instructionsUnavailable =
    instructions === "" || instructions.length > instructionsMaxLength;
  const orderUnavailable =
    videoTypeUnavailable ||
    toFirstNameUnavailable ||
    (whomType === "myself" ? false : fromFirstNameUnavailable) ||
    instructionsUnavailable;

  const paymentMode = orderUnavailable && state === "purchase";
  const onChangevideoType = (value: string) => {
    setVideoType(value);
  };
  const onChangeWhomType = (value: string) => {
    setWhomType(value);
  };
  const onChangeToFirstName = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const error = value === "" || value.length > 40;
    setToFirstName(value);
    setToFirstNameError(error);
  };
  const onChangeFromFirstName = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const error = value === "" || value.length > 40;
    setFromFirstName(value);
    setFromFirstNameError(error);
  };
  const onChangeInstructions = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const error = value === "" || value.length > instructionsMaxLength;
    setInstructions(value);
    setInstructionsError(error);
  };
  const onClickHideVideo = () => {
    setHideVideo(!hideVideo);
  };
  const onClickContinue = () => {
    if (orderUnavailable) {
      setToFirstNameError(toFirstNameUnavailable);
      setFromFirstNameError(fromFirstNameUnavailable);
      setInstructionsError(instructionsUnavailable);
    } else {
      router.replace(
        `${router.pathname}?id=${id}&videoType=${videoType}&state=purchase`
      );
    }
  };
  const onChangeDeliverySpeed = (value: string) => {
    setDeliverySpeed(value);
  }; // 추후 추가기능
  const onChangePaymentMethod = (value: string) => {
    setPaymentMethod(value);
  };
  const onClickPurchase = () => {
    if (confirm("테스트를 위해 주문내역 3개 추가함")) {
      router.replace(`/user/orders`); //반드시 replace해서 결제중 상태로 못돌아가게
      //임시 추가
      const currentOrder = {
        id: `4`,
        artist: {
          id: `${id}`,
        },
        date: new Date(),
        state: "In progress",
        price:
          videoTypes[_.findIndex(videoTypes, (el) => el.value === videoType)]
            .price,
        videoType: videoType,
        whomType: whomType,
        toFirstName: toFirstName,
        toType: toType,
        fromFirstName: fromFirstName,
        fromType: fromType,
        instructions: instructions,
        hideVideo: hideVideo,
      };
      setOrders([currentOrder, ...tempOrders]);
    }
  };
  return (
    <>
      <Box
        sx={{
          display: "none !important",
          "@media(min-width: 961px)": {
            display: "block !important",
          },
        }}
      >
        <Box
          sx={{
            position: "sticky",
            top: 56,
            width: "100%",
          }}
        >
          <Box sx={{ p: theme.spacing(6, 2, 0, 2) }}>
            <Box>
              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    width: 64,
                    height: 64,
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      height: "100%",
                      border: `1px solid ${youhaGrey[700]}`,
                      borderRadius: "50%",
                      overflow: "hidden",
                      aspectRatio: `1`,
                    }}
                  >
                    <Visual src={artist.thumbnail} absolute noScale={false} />
                  </Box>
                </Box>
                <Box
                  sx={{
                    flex: 1,
                    p: theme.spacing(0, 7, 0, 2),
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontSize: 24,
                        lineHeight: "36px",
                        fontWeight: "700",
                        color: `#ffffff !important`,
                      }}
                    >
                      {artist.name}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 14,
                        lineHeight: "20px",
                        color: youhaGrey[300],
                      }}
                    >
                      {artist.group?.name ?? "SOLO"}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Typo
                lines={10}
                sx={{
                  m: theme.spacing(2, 0, 0, 0),
                  fontSize: 14,
                  lineHeight: "20px",
                  color: youhaGrey[200],
                  "@media(min-width: 960px)": {
                    m: theme.spacing(1.75, 0, 0, 0),
                  },
                }}
              >
                {artist.bio}
              </Typo>
            </Box>
          </Box>
          <Box
            sx={{
              p: theme.spacing(3, 2, 0, 2),
            }}
          >
            <Box
              sx={{
                borderTop: `1px solid ${youhaGrey[400]}`,
                p: theme.spacing(3, 0, 0, 0),
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  position: "relative",
                  flexDirection: "column",
                  "& > div:not(:nth-of-type(1))": {
                    m: theme.spacing(2, 0, 0, 0),
                  },
                  "&:before": {
                    position: "absolute",
                    top: 0,
                    left: 16,
                    bottom: paymentMode
                      ? `calc(25% - 20px)`
                      : `calc(50% + 16px)`,
                    content: '""',
                    width: "1px",
                    border: `1px dashed ${youhaBlue[500]}`,
                  },
                  "&:after": {
                    position: "absolute",
                    top: "calc(50%)",
                    left: 16,
                    bottom: `calc(25% - 20px)`,
                    content: '""',
                    width: "1px",
                    border: `1px dashed ${youhaGrey[500]}`,
                    display: paymentMode ? "none" : "block",
                  },
                }}
              >
                {howKaboomOrder.map((item, index) => {
                  return (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        zIndex: 9,
                      }}
                    >
                      <Box
                        sx={{
                          borderRadius: "50%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: 32,
                          height: 32,
                          border: `1px solid ${
                            index === 0 || index === 1
                              ? youhaBlue[500]
                              : paymentMode
                              ? youhaBlue[500]
                              : youhaGrey[500]
                          }`,
                          backgroundColor:
                            index === 0 || (index === 1 && paymentMode)
                              ? youhaBlue[500]
                              : youhaGrey[900],
                        }}
                      >
                        <Icon
                          name="check"
                          sx={{
                            display:
                              index === 0 || (index === 1 && paymentMode)
                                ? "flex"
                                : "none",
                          }}
                          size={20}
                          prefix="fas"
                        />
                      </Box>
                      <Box
                        sx={{
                          flex: 1,
                          m: theme.spacing(0, 0, 0, 2),
                          opacity:
                            index === 0 || (index === 1 && paymentMode)
                              ? 0.4
                              : 1,
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: 16,
                            lineHeight: "24px",
                            fontWeight: "500",
                            m: theme.spacing(0, 0, 0.5, 0),
                            color: youhaGrey[200],
                          }}
                        >
                          {item.title}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: 14,
                            lineHeight: "20px",
                            color: youhaGrey[200],
                          }}
                        >
                          {item.description}
                        </Typography>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      {state !== "purchase" ? (
        <Box>
          <Box
            sx={{
              p: theme.spacing(6, 2, 3, 2),
            }}
          >
            <Typography
              sx={{
                fontSize: 20,
                lineHeight: "32px",
                fontWeight: "700",
                "& span": {
                  fontWeight: "500",
                  m: theme.spacing(0, 0, 0, 1.5),
                },
                m: theme.spacing(0, 0, 2, 0),
              }}
            >
              STEP 01.<span>Select video type</span>
            </Typography>
            <Box
              sx={{
                display: "flex",
                "& > *:not(:nth-of-type(1))": {
                  m: theme.spacing(0, 0, 0, 1.5),
                },
              }}
            >
              <Stack
                direction={"row"}
                spacing={1.5}
                sx={{
                  width: "100%",
                  flex: 1,
                }}
              >
                {videoTypes.map((item, index) => {
                  const focused = videoType === item.value;
                  const onClick = () => {
                    onChangevideoType(focused ? "" : item.value);
                    router.push(
                      `${router.pathname}?id=${id}&videoType=${item.value}`,
                      undefined,
                      { shallow: true }
                    );
                  };
                  return (
                    <ButtonBase
                      key={index}
                      onClick={onClick}
                      sx={{
                        flex: 1,
                        border: `1px solid ${
                          focused ? youhaBlue[500] : youhaGrey[400]
                        }`,
                        backgroundColor: focused
                          ? alpha(youhaBlue[500], 0.4)
                          : youhaGrey[700],
                        borderRadius: 1,
                        flexDirection: "column",
                      }}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          display: "flex",
                          flexWrap: "wrap",
                          p: theme.spacing(1),
                        }}
                      >
                        <Stack
                          direction={"column"}
                          spacing={0.5}
                          sx={{
                            flex: 1,
                            p: theme.spacing(1),
                            minWidth: 120,
                          }}
                        >
                          <Icon
                            prefix="fas"
                            name={
                              item.value === "mini" ? "film" : "camera-movie"
                            }
                          />
                          <Typography
                            sx={{
                              fontSize: 16,
                              lineHeight: "24px",
                              fontWeight: "700",
                            }}
                          >
                            {item.label}
                          </Typography>
                        </Stack>
                        <Box
                          sx={{
                            p: theme.spacing(1),
                          }}
                        >
                          <Box
                            sx={{
                              m: theme.spacing(0, 0, 1, 0),
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: 12,
                                lineHeight: "16px",
                                color: youhaGrey[200],
                              }}
                            >
                              Max video length
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: 14,
                                lineHeight: "20px",
                                fontWeight: "500",
                              }}
                            >
                              {item.maxVideoLength} sec
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              m: theme.spacing(0, 0, 1, 0),
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: 12,
                                lineHeight: "16px",
                                color: youhaGrey[200],
                              }}
                            >
                              Max letter length
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: 14,
                                lineHeight: "20px",
                                fontWeight: "500",
                              }}
                            >
                              {item.maxLetters} letters
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          width: "100%",
                          borderTop: `1px solid ${youhaGrey[300]}`,
                          p: theme.spacing(1),
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: 16,
                              lineHeight: "24px",
                              p: theme.spacing(1),
                            }}
                          >{`$${comma(item.price)}.00`}</Typography>
                        </Box>
                      </Box>
                    </ButtonBase>
                  );
                })}
              </Stack>
            </Box>
          </Box>
          <Box
            sx={{
              position: "relative",
            }}
          >
            <Box
              className="InnerSection"
              sx={{
                m: theme.spacing(3, 0, 0, 0),
                p: theme.spacing(6, 2, 3, 2),
                position: "relative",
                "&:after": {
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  content: '""',
                  height: `1px`,
                  backgroundColor: youhaGrey[400],
                  "@media(min-width: 960px)": {
                    left: 16,
                    right: 16,
                  },
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: 20,
                  lineHeight: "32px",
                  fontWeight: "700",
                  "& span": {
                    fontWeight: "500",
                    m: theme.spacing(0, 0, 0, 1.5),
                  },
                }}
              >
                STEP 02.<span>Who's this video for?</span>
              </Typography>
              <Stack
                direction={"row"}
                spacing={1.5}
                sx={{
                  width: "100%",
                  p: theme.spacing(4, 0, 2, 0),
                }}
              >
                {whomTypes.map((item, index) => {
                  const focused = item.value === whomType;
                  const onClick = () => {
                    onChangeWhomType(focused ? "" : item.value);
                  };
                  return (
                    <Chip
                      key={index}
                      fullWidth
                      focused={focused}
                      onClick={onClick}
                      label={item.label}
                      sx={{
                        height: 40,
                      }}
                    />
                  );
                })}
              </Stack>
              <Input
                label="To (first name)"
                placeholder="Lee"
                value={toFirstName}
                onChange={onChangeToFirstName}
                sx={{
                  m: theme.spacing(3, 0, 0, 0),
                }}
                error={toFirstNameError}
                helperText={
                  toFirstNameError &&
                  (toFirstName === ""
                    ? "Required"
                    : "Must be no more than 40 characters")
                }
              />
              <Stack
                direction="row"
                spacing={1.5}
                sx={{
                  m: theme.spacing(2, 0, 0, 0),
                }}
              >
                {toOrFromTypes.map((item, index) => {
                  const focused = item.value === toType;
                  const onClick = () => {
                    setToType(focused ? "" : item.value);
                  };
                  return (
                    <Chip
                      key={index}
                      focused={focused}
                      onClick={onClick}
                      label={item.label}
                    />
                  );
                })}
              </Stack>
              <Box
                sx={{
                  display: whomType === "myself" ? "none" : "block",
                  m: theme.spacing(6, 0, 0, 0),
                }}
              >
                <Input
                  label="From (first name)"
                  placeholder="Kim"
                  value={fromFirstName}
                  onChange={onChangeFromFirstName}
                  sx={{
                    m: theme.spacing(3, 0, 0, 0),
                  }}
                  error={fromFirstNameError}
                  helperText={
                    fromFirstNameError &&
                    (fromFirstName === ""
                      ? "Required"
                      : "Must be no more than 40 characters")
                  }
                />
                <Stack
                  direction="row"
                  spacing={1.5}
                  sx={{
                    m: theme.spacing(2, 0, 0, 0),
                  }}
                >
                  {toOrFromTypes.map((item, index) => {
                    const focused = item.value === fromType;
                    const onClick = () => {
                      setFromType(focused ? "" : item.value);
                    };
                    return (
                      <Chip
                        key={index}
                        focused={focused}
                        onClick={onClick}
                        label={item.label}
                      />
                    );
                  })}
                </Stack>
              </Box>
            </Box>
            <Box
              className="InnerSection"
              sx={{
                m: theme.spacing(3, 0, 0, 0),
                p: theme.spacing(6, 2, 3, 2),
                position: "relative",
                "&:after": {
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  content: '""',
                  height: `1px`,
                  backgroundColor: youhaGrey[400],
                  "@media(min-width: 960px)": {
                    left: 16,
                    right: 16,
                  },
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: 20,
                  lineHeight: "32px",
                  fontWeight: "700",
                  "& span": {
                    fontWeight: "500",
                    m: theme.spacing(0, 0, 0, 1.5),
                  },
                }}
              >
                STEP 03.<span>Request details</span>
              </Typography>
              <Input
                label={`Instructions for ${artist.name}`}
                placeholder={
                  videoType === "mini"
                    ? `I had a very bad day today please cheer me up-[O]\nHappy birthday [star’s name]~, I'm your biggest fan -[O]\nPlease send me a dancing video -[X]`
                    : "Hi [star’s name]! How do you dance like that on the stage!!\ni hope this album hits million sales and i hope everyone in the world knows about this team!! "
                }
                value={instructions}
                onChange={onChangeInstructions}
                sx={{
                  m: theme.spacing(3, 0, 0, 0),
                }}
                multiline
                minRows={videoType === "mini" ? 6 : 10}
                error={instructionsError}
                maxLength={instructionsMaxLength}
                helperText={
                  instructionsError &&
                  (instructions === ""
                    ? "Required"
                    : `Total character count cannot exceed ${instructionsMaxLength}`)
                }
                showMaxLength
              />
            </Box>
            <Box
              className="InnerSection"
              sx={{
                p: theme.spacing(6, 2, 3, 2),
              }}
            >
              <Button fullWidth size="lg" onClick={onClickContinue}>
                Continue
              </Button>
              <Stack
                direction={"row"}
                alignItems={"center"}
                spacing={0.5}
                sx={{
                  m: theme.spacing(3, 0, 0, 0),
                }}
                onClick={onClickHideVideo}
              >
                <Checkbox focused={hideVideo} size="lg" />
                <Typography
                  sx={{
                    fontSize: 14,
                    lineHeight: "20px",
                  }}
                >{`Hide this video from ${artist.name}'s profile`}</Typography>
              </Stack>
            </Box>
            {videoType === "" && (
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: alpha(youhaGrey[900], 0.8),
                  zIndex: 99,
                }}
              />
            )}
          </Box>
        </Box>
      ) : (
        <Box>
          {/* <Box
            sx={{
              p: theme.spacing(6, 2, 3, 2),
            }}
          >
            <Typography
              sx={{
                fontSize: 20,
                lineHeight: "32px",
                fontWeight: "700",
                "& span": {
                  fontWeight: "500",
                  m: theme.spacing(0, 0, 0, 1.5),
                },
                m: theme.spacing(0, 0, 2, 0),
              }}
            >
              Delivery speed
            </Typography>
            <Box
              sx={{
                display: "flex",
                "& > *:not(:nth-of-type(1))": {
                  m: theme.spacing(0, 0, 0, 1.5),
                },
              }}
            >
              <Stack
                direction={"column"}
                spacing={1.5}
                sx={{
                  width: "100%",
                  flex: 1,
                }}
              >
                {deliverySpeeds.map((item, index) => {
                  const focused = deliverySpeed === item.value;
                  const onClick = () => {
                    onChangeDeliverySpeed(item.value);
                  };
                  return (
                    <ButtonBase
                      key={index}
                      onClick={onClick}
                      sx={{
                        flex: 1,
                        border: `1px solid ${
                          focused ? youhaBlue[500] : youhaGrey[400]
                        }`,
                        backgroundColor: focused
                          ? alpha(youhaBlue[500], 0.4)
                          : youhaGrey[700],
                        borderRadius: 1,
                        p: theme.spacing(2),
                        alignItems: "center",
                      }}
                    >
                      {item.value === "24hr" && (
                        <Icon
                          name="bolt"
                          color={yellow[400]}
                          size={20}
                          prefix="fas"
                          sx={{
                            m: theme.spacing(0, 2, 0, 0),
                          }}
                        />
                      )}
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          sx={{
                            fontSize: 16,
                            lineHeight: "24px",
                            fontWeight: "500",
                          }}
                        >
                          {item.label}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: 14,
                            lineHeight: "20px",
                            color: youhaGrey[200],
                          }}
                        >
                          {item.description}
                        </Typography>
                      </Box>
                    </ButtonBase>
                  );
                })}
              </Stack>
            </Box>
          </Box> 추후 추가 영역 */}
          <Box
            sx={{
              p: theme.spacing(6, 2, 3, 2),
            }}
          >
            <Typography
              sx={{
                fontSize: 20,
                lineHeight: "32px",
                fontWeight: "700",
                "& span": {
                  fontWeight: "500",
                  m: theme.spacing(0, 0, 0, 1.5),
                },
                m: theme.spacing(0, 0, 2, 0),
              }}
            >
              Payment methods
            </Typography>
            <Box
              sx={{
                display: "flex",
                "& > *:not(:nth-of-type(1))": {
                  m: theme.spacing(0, 0, 0, 1.5),
                },
              }}
            >
              <Stack
                direction={"column"}
                spacing={1.5}
                sx={{
                  width: "100%",
                }}
              >
                {paymentMethods.map((item, index) => {
                  const focused = paymentMethod === item.value;
                  const onClick = () => {
                    onChangePaymentMethod(item.value);
                  };
                  return (
                    <ButtonBase
                      key={index}
                      onClick={onClick}
                      sx={{
                        flex: 1,
                        border: `1px solid ${
                          focused ? youhaBlue[500] : youhaGrey[400]
                        }`,
                        backgroundColor: focused
                          ? alpha(youhaBlue[500], 0.4)
                          : youhaGrey[700],
                        borderRadius: 1,
                        p: theme.spacing(2),
                        flexDirection: "column",
                        justifyContent: "space-between",
                        minHeight: `80px !important`,
                      }}
                    >
                      {item.value === "card" ? (
                        <Icon name="credit-card" prefix="fas" />
                      ) : (
                        <Visual
                          src="/logos/paypal.svg"
                          sx={{
                            "& img": {
                              width: "auto",
                              height: `20px !important`,
                            },
                          }}
                        />
                      )}
                      <Typography
                        sx={{
                          fontSize: 14,
                          lineHeight: "20px",
                          fontWeight: "500",
                        }}
                      >
                        {item.label}
                      </Typography>
                    </ButtonBase>
                  );
                })}
              </Stack>
            </Box>
          </Box>
          <Box
            className="InnerSection"
            sx={{
              m: theme.spacing(3, 0, 0, 0),
              p: theme.spacing(6, 2, 3, 2),
              position: "relative",
              "&:after": {
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                content: '""',
                height: `1px`,
                backgroundColor: youhaGrey[400],
                "@media(min-width: 960px)": {
                  left: 16,
                  right: 16,
                },
              },
            }}
          >
            <Typography
              sx={{
                fontSize: 20,
                lineHeight: "32px",
                fontWeight: "700",
                "& span": {
                  fontWeight: "500",
                  m: theme.spacing(0, 0, 0, 1.5),
                },
              }}
            >
              Review and pay
            </Typography>
            <Typography
              sx={{
                fontSize: 14,
                lineHeight: "20px",
                color: youhaGrey[300],
              }}
            >
              Your completed video will be sent to you by email and text. Check
            </Typography>
            <Stack
              spacing={1}
              sx={{
                borderTop: `1px solid ${youhaGrey[600]}`,
                m: theme.spacing(4, 0, 0, 0),
                p: theme.spacing(2, 0, 0, 0),
              }}
            >
              <Typography
                sx={{
                  fontSize: 16,
                  lineHeight: `24px`,
                  color: youhaGrey[200],
                }}
              >
                Order details
              </Typography>
              <Typography
                sx={{
                  fontSize: 14,
                  lineHeight: "20px",
                  color: youhaGrey[300],
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>Personalized video</span>
                <span>
                  $
                  {comma(
                    videoTypes[
                      _.findIndex(videoTypes, (el) => el.value === videoType)
                    ].price
                  )}
                  .00
                </span>
              </Typography>
            </Stack>
            <Stack
              spacing={1}
              sx={{
                borderTop: `1px solid ${youhaGrey[600]}`,
                m: theme.spacing(2, 0, 0, 0),
                p: theme.spacing(2, 0, 0, 0),
              }}
            >
              <Typography
                sx={{
                  fontSize: 14,
                  lineHeight: "20px",
                  color: youhaGrey[300],
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>Service fee</span>
                <span>Free</span>
              </Typography>
              <Typography
                sx={{
                  fontSize: 14,
                  lineHeight: "20px",
                  color: youhaGrey[300],
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>Sales tax</span>
                <span>Free</span>
              </Typography>
            </Stack>
            <Stack
              spacing={1}
              sx={{
                borderTop: `1px solid ${youhaGrey[600]}`,
                m: theme.spacing(2, 0, 0, 0),
                p: theme.spacing(2, 0, 0, 0),
              }}
            >
              <Typography
                sx={{
                  fontSize: 18,
                  lineHeight: "28px",
                  fontWeight: "700",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>Total</span>
                <span>
                  $
                  {comma(
                    videoTypes[
                      _.findIndex(videoTypes, (el) => el.value === videoType)
                    ].price
                  )}
                  .00
                </span>
              </Typography>
            </Stack>
            <Button
              size="lg"
              fullWidth
              onClick={onClickPurchase}
              sx={{
                m: theme.spacing(4, 0, 0, 0),
              }}
            >
              paypal로 지불하기(paypal에서 제공하는 버튼 디자인으로 변경)
            </Button>
            <Typography
              sx={{
                color: youhaGrey[200],
                fontSize: 12,
                lineHeight: "20px",
                textAlign: "center",
                "& a": {
                  color: "#ffffff",
                  textDecoration: "underline",
                },
                m: theme.spacing(2, 0, 0, 0),
              }}
            >
              By ordering, you agree to KAABOOM's{" "}
              <a target="_blank">Terms of Service</a>, including{" "}
              <a target="_blank">Privacy Policy</a>. This video is for personal
              use only.
            </Typography>
          </Box>
        </Box>
      )}
      <Header artist={artist} paymentMode={paymentMode} />
    </>
  );
}
