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
  VideoTypeProps,
} from "../../data";
import youhaBlue from "../../constants/youhaBlue";
import youhaGrey from "../../constants/youhaGrey";
import { theme } from "../../themes/theme";
import Icon from "../../components/atoms/Icon";
import { comma } from "../../utils";
import Input from "../../components/atoms/Input";
import Button from "../../components/atoms/Button";
import Checkbox from "../../components/atoms/Checkbox";
import Chip from "../../components/atoms/Chip";
import _ from "lodash";
import { artists } from "../../data/artist";
import Typo from "../../components/atoms/Typo";
import Visual from "../../components/atoms/Visual";
import { useRecoilState } from "recoil";
import { ordersState, tempOrders } from "../../constants/recoils";
import OrderHeader from "../../components/organisms/OrderHeader";
import {
  InputProps,
  SelectProps,
  inputDefaultProps,
  selectDefaultProps,
} from "../../constants";

export default function Index() {
  return (
    <Page needId asideReverse>
      <Inner />
    </Page>
  );
}

function Inner() {
  //#region [router] 이동 및 쿼리
  const router = useRouter();
  const { id, videoType: type, state } = router.query;
  //#endregion [router] 이동 및 쿼리
  //#region [state] 주문 및 아티스트
  const artist = artists[_.findIndex(artists, (el) => el.id === id)];
  const [orders, setOrders] = useRecoilState(ordersState);
  //#endregion [state] 주문 및 아티스트
  //#region [state] 비디오타입/받는이타입/주는이/주는이타입/받는이/받는이타입/설명/비디오숨기기여부/배송기간/지불방법
  const [videoType, setVideoType] = useState<VideoTypeProps | null>(
    videoTypes[_.findIndex(videoTypes, (el) => el.value === type)] ?? null
  );
  const [whomType, setWhomType] = useState<SelectProps>(whomTypes[0]);
  const [toFirstName, setToFirstName] = useState<InputProps>(inputDefaultProps);
  const [toType, setToType] = useState<SelectProps>(selectDefaultProps);
  const [fromFirstName, setFromFirstName] =
    useState<InputProps>(inputDefaultProps);
  const [fromType, setFromType] = useState<SelectProps>(selectDefaultProps);
  const [instructions, setInstructions] =
    useState<InputProps>(inputDefaultProps);
  const [hideVideo, setHideVideo] = useState<boolean>(false);
  const [deliverySpeed, setDeliverySpeed] = useState<string>(
    deliverySpeeds[0].value
  ); // 추후 추가기능
  const [paymentMethod, setPaymentMethod] = useState<string>(
    paymentMethods[0].value
  );
  //#endregion [state] 비디오타입/받는이타입/주는이/주는이타입/받는이/받는이타입/설명/비디오숨기기여부/배송기간/지불방법
  //#region [state] 검증
  const videoTypeUnavailable = videoType === null || videoType === undefined;
  const instructionsMaxLength =
    videoTypeUnavailable || videoType?.value === "mini" ? 45 : 200;
  const toFirstNameUnavailable =
    toFirstName.value === "" || toFirstName.value.length > 40;
  const fromFirstNameUnavailable =
    fromFirstName.value === "" || fromFirstName.value.length > 40;
  const instructionsUnavailable =
    instructions.value === "" ||
    instructions.value.length > instructionsMaxLength;
  const orderUnavailable =
    videoTypeUnavailable ||
    toFirstNameUnavailable ||
    (whomType.value === "myself" ? false : fromFirstNameUnavailable) ||
    instructionsUnavailable;
  const paymentMode = orderUnavailable && state === "purchase";
  //#endregion [state] 검증
  //#region [function] 비디오타입/받는이타입/주는이/주는이타입/받는이/받는이타입/설명/비디오숨기기여부/배송기간/지불방법
  const onChangeVideoType = (value: string) => {
    const array = videoTypes;
    const select = array[_.findIndex(array, (el) => el.value === value)];
    setVideoType(select);
  };
  const onChangeWhomType = (value: string) => {
    const array = whomTypes;
    const select = array[_.findIndex(array, (el) => el.value === value)];
    setWhomType(select);
  };
  const onChangeToFirstName = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const error = value === "" || value.length > 40;
    const helperText = error
      ? value === ""
        ? "Required"
        : "Must be no more than 40 characters"
      : "";
    const input = {
      value: value,
      error: error,
      helperText: helperText,
    };
    setToFirstName(input);
  };
  const onChangeToType = (value: string) => {
    const array = toOrFromTypes;
    const select = array[_.findIndex(array, (el) => el.value === value)];
    setToType(select);
  };
  const onChangeFromFirstName = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const error = value === "" || value.length > 40;
    const helperText = error
      ? value === ""
        ? "Required"
        : "Must be no more than 40 characters"
      : "";
    const input = {
      value: value,
      error: error,
      helperText: helperText,
    };
    setFromFirstName(input);
  };
  const onChangeFromType = (value: string) => {
    const array = toOrFromTypes;
    const select = array[_.findIndex(array, (el) => el.value === value)];
    setFromType(select);
  };
  const onChangeInstructions = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const error = value === "" || value.length > instructionsMaxLength;
    const helperText = error
      ? value === ""
        ? "Required"
        : `Total character count cannot exceed ${instructionsMaxLength}`
      : "";
    const input = {
      value: value,
      error: error,
      helperText: helperText,
    };
    setInstructions(input);
  };
  const onClickHideVideo = () => {
    setHideVideo(!hideVideo);
  };
  const onChangeDeliverySpeed = (value: string) => {
    setDeliverySpeed(value);
  }; // 추후 추가기능
  const onChangePaymentMethod = (value: string) => {
    setPaymentMethod(value);
  };
  //#endregion [function] 비디오타입/받는이타입/주는이/주는이타입/받는이/받는이타입/설명/비디오숨기기여부/배송기간/지불방법
  //#region [function] 메인 액션 2가지
  const onClickContinue = () => {
    if (orderUnavailable) {
      setToFirstName({
        ...toFirstName,
        error: toFirstNameUnavailable,
        helperText: toFirstNameUnavailable
          ? toFirstName.value === ""
            ? "Required"
            : "Must be no more than 40 characters"
          : "",
      });
      setFromFirstName({
        ...fromFirstName,
        error: fromFirstNameUnavailable,
        helperText: fromFirstNameUnavailable
          ? fromFirstName.value === ""
            ? "Required"
            : "Must be no more than 40 characters"
          : "",
      });
      setInstructions({
        ...instructions,
        error: instructionsUnavailable,
        helperText: instructionsUnavailable
          ? instructions.value === ""
            ? "Required"
            : `Total character count cannot exceed ${instructionsMaxLength}`
          : "",
      });
    } else {
      router.replace(
        `${router.pathname}?id=${id}&videoType=${videoType}&state=purchase`
      );
    }
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
        price: videoType?.price ?? 0,
        videoType: videoType?.value ?? "",
        whomType: whomType.value,
        toFirstName: toFirstName.value,
        toType: toType?.value,
        fromFirstName: fromFirstName.value,
        fromType: fromType?.value,
        instructions: instructions.value,
        hideVideo: hideVideo,
      };
      setOrders([currentOrder, ...tempOrders]);
    }
  };
  //#endregion [function] 메인 액션 2가지
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
                  const focused = videoType && videoType?.value === item.value;
                  const onClick = () => {
                    onChangeVideoType(focused ? "" : item.value);
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
                              Min video length
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
                  const focused = item.value === whomType.value;
                  const onClick = () => {
                    const value = item.value;
                    onChangeWhomType(value);
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
                value={toFirstName.value}
                onChange={onChangeToFirstName}
                sx={{
                  m: theme.spacing(3, 0, 0, 0),
                }}
                error={toFirstName.error}
                helperText={toFirstName.helperText}
              />
              <Stack
                direction="row"
                spacing={1.5}
                sx={{
                  m: theme.spacing(2, 0, 0, 0),
                }}
              >
                {toOrFromTypes.map((item, index) => {
                  const focused = item.value === toType?.value;
                  const onClick = () => {
                    const value = focused ? "" : item.value;
                    onChangeToType(value);
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
                  display: whomType.value === "myself" ? "none" : "block",
                  m: theme.spacing(6, 0, 0, 0),
                }}
              >
                <Input
                  label="From (first name)"
                  placeholder="Kim"
                  value={fromFirstName.value}
                  onChange={onChangeFromFirstName}
                  sx={{
                    m: theme.spacing(3, 0, 0, 0),
                  }}
                  error={fromFirstName.error}
                  helperText={fromFirstName.helperText}
                />
                <Stack
                  direction="row"
                  spacing={1.5}
                  sx={{
                    m: theme.spacing(2, 0, 0, 0),
                  }}
                >
                  {toOrFromTypes.map((item, index) => {
                    const focused = item.value === fromType?.value;
                    const onClick = () => {
                      const value = focused ? "" : item.value;
                      onChangeFromType(value);
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
                  videoTypeUnavailable || videoType?.value === "mini"
                    ? `I had a very bad day today please cheer me up-[O]\nHappy birthday [star’s name]~, I'm your biggest fan -[O]\nPlease send me a dancing video -[X]`
                    : "Hi [star’s name]! How do you dance like that on the stage!!\ni hope this album hits million sales and i hope everyone in the world knows about this team!! "
                }
                value={instructions.value}
                onChange={onChangeInstructions}
                sx={{
                  m: theme.spacing(3, 0, 0, 0),
                }}
                multiline
                minRows={
                  videoTypeUnavailable || videoType?.value === "mini" ? 6 : 10
                }
                error={instructions.error}
                maxLength={instructionsMaxLength}
                helperText={instructions.helperText}
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
            {videoTypeUnavailable && (
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
                  ${videoType?.value}
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
                  ${videoType?.price}
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
              <a target="_blank" tabIndex={0}>
                Terms of Service
              </a>
              , including{" "}
              <a target="_blank" tabIndex={0}>
                Privacy Policy
              </a>
              . This video is for personal use only.
            </Typography>
          </Box>
        </Box>
      )}
      <OrderHeader artist={artist} paymentMode={paymentMode} />
    </>
  );
}
