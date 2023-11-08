import _ from "lodash";
import React from "react";
import createCache from "@emotion/cache";
import { useEffect, useState } from "react";
import { CountryCode } from "../constants/country";
export function createEmotionCache() {
  return createCache({ key: "css" });
}
export const deviceTokenUpdateToServer = async (
  deviceToken: any,
  platform: "ios" | "android"
) => {
  // const parsedToken = isIOS ? deviceToken.slice(deviceToken.indexOf('Optional(') + 10, deviceToken.length - 2) : deviceToken.detail.token;
  // fetch(`${API_URL}/user/profile/token`, {
  //   method: 'POST',
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json',
  //     token: parsedToken,
  //   },
  //   body: JSON.stringify({
  //     token: isLogout ? '' : fcmToken,
  //     platform: Platform.OS,
  //   }),
  // })
  //   .then((d) => d.json())
  //   .then((d) => {
  //     if (d.success) {
  //     }
  //   });
};
export function isEmail(asValue: string | null) {
  if (typeof asValue !== "string") return false;
  var regExp =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
}
export function isCelluar(asValue: string | null) {
  if (typeof asValue !== "string") return false;
  var regExp = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/;
  return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
}
export function isPassword(asValue: string | null) {
  if (typeof asValue !== "string") return false;
  var regExp =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d$!@#$%^&*()]{6,}$/; //  6 ~ 20자 영문, 숫자 조합
  return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
}
export function isPhone(asValue: string | null) {
  if (typeof asValue !== "string") return false;
  var regExp = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
  return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
}
export function isNumber(asValue: string | null) {
  if (typeof asValue !== "string") return false;
  var regExp = /\d{6}/;
  return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
}
export function isNickname1(asValue: string | null) {
  if (typeof asValue !== "string") return false;
  var regExp = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-z|A-Z|0-9|]+$/;
  return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
}
export function isNickname2(asValue: string | null) {
  if (typeof asValue !== "string") return false;
  var regExp = /^[가-힣|a-z|A-Z|0-9|]+$/;
  return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
}
export function isByte(str: string, maxByte: number) {
  var str_len = str.length;
  var rbyte = 0;
  var rlen = 0;
  var one_char = "";
  for (var i = 0; i < str_len; i++) {
    one_char = str.charAt(i);
    if (escape(one_char).length > 4) {
      rbyte += 2; //한글2Byte
    } else {
      rbyte++; //영문 등 나머지 1Byte
    }
    if (rbyte <= maxByte) {
      rlen = i + 1; //return할 문자열 갯수
    }
  }
  return rbyte <= maxByte;
}
export function getByte(str: string) {
  var str_len = str.length;
  var rbyte = 0;
  var one_char = "";
  for (var i = 0; i < str_len; i++) {
    one_char = str.charAt(i);
    if (escape(one_char).length > 4) {
      rbyte += 2; //한글2Byte
    } else {
      rbyte++; //영문 등 나머지 1Byte
    }
  }
  return rbyte;
}
export const comma = (num: any) => {
  var len, point, str, rest;
  num = (num + "").split(".")[0];
  point = num.length % 3;
  len = num.length;
  str = num.substring(0, point);
  rest = (num + "").split(".")[1];
  while (point < len) {
    if (str != "") str += ",";
    str += num.substring(point, point + 3);
    point += 3;
  }
  return str + (typeof rest === "undefined" ? "" : rest);
};
export function formatDate(str: string | null) {
  if (!str) return null;
  const date = new Date(str.replace(/-/g, "/"));
  let day = ["일", "월", "화", "수", "목", "금", "토"][date.getDay()] + "요일";
  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
}
export function formatDateTime(str: string | null) {
  if (!str) return null;
  const date = new Date(str.replace(/-/g, "/"));
  let day = ["일", "월", "화", "수", "목", "금", "토"][date.getDay()] + "요일";
  return `${date.getHours()}시 ${date.getMinutes()}분`;
}
export function formatDateFull(str: string | null) {
  if (!str) return null;
  const date = new Date(str.replace(/-/g, "/"));
  let day = ["일", "월", "화", "수", "목", "금", "토"][date.getDay()] + "요일";
  return ` ${date.getFullYear()}년 ${
    date.getMonth() + 1
  }월 ${date.getDate()}일 ${date.getHours()}시 ${date.getMinutes()}분`;
}

export const dateToString = (date: Date) => {
  let year = date.getFullYear().toString();
  let month =
    (date.getMonth() + 1 < 10 ? "0" : "") + (date.getMonth() + 1).toString();
  let day = (date.getDate() < 10 ? "0" : "") + date.getDate().toString();
  return year + month + day;
};

export function displayedAt(value: Date, en?: boolean) {
  const date = value.getTime();
  const milliSeconds = new Date().getTime() - date;
  const seconds = milliSeconds / 1000;
  if (seconds < 60) return en ? `Just before` : `방금 전`;
  const minutes = seconds / 60;
  if (minutes < 60) return `${Math.floor(minutes)}m ago`;
  const hours = minutes / 60;
  if (hours < 24) return `${Math.floor(hours)}h ago`;
  const days = hours / 24;
  if (days < 4) return `${Math.floor(days)}d ago`;
  const weeks = days / 7;
  if (weeks < 5) return `${Math.floor(weeks)}W ago`;
  const months = days / 30;
  if (months < 12) return `${Math.floor(months)}M 전`;
  const years = days / 365;
  return `${Math.floor(years)}Y 전`;
}

export const messagedAt = (str: string | null) => {
  if (!str) return "";
  const timestamp = new Date(str.replace(/-/g, "/"));
  const milliSeconds = new Date().getTime() - timestamp.getTime();
  const seconds = milliSeconds / 1000;
  // if (seconds < 60) return `방금 전`;
  const minutes = seconds / 60;
  // if (minutes < 10) return `${Math.floor(minutes)}분 전`;
  const ampm = timestamp.getHours() < 12 ? "오전" : "오후";
  const hour = ((timestamp.getHours() - 1) % 12) + 1;
  return `${ampm} ${hour}:${("0" + timestamp.getMinutes()).slice(-2)}`;
};

export const messagedDate = (str: string | null) => {
  if (!str) return null;
  const date = new Date(str.replace(/-/g, "/"));
  let day = ["일", "월", "화", "수", "목", "금", "토"][date.getDay()] + "요일";
  return `${date.getFullYear()}년 ${
    date.getMonth() + 1
  }월 ${date.getDate()}일 ${day}`;
};

export function getDDay(date: string, go?: boolean) {
  const [day, setDay] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const doThing = (date: string) => {
    setInterval(() => {
      setDays(date);
    }, 1000);
  };
  const setDays = (date: string) => {
    // D-Day 날짜 지정
    const setDate = new Date(date);
    // D-day 날짜의 연,월,일 구하기
    const setDateYear = setDate.getFullYear();
    // getMonth 메서드는 0부터 세기 때문에 +1 해준다.
    const setDateMonth = setDate.getMonth() + 1;
    const setDateDay = setDate.getDate();

    // 현재 날짜를 new 연산자를 사용해서 Date 객체를 생성
    const now = new Date();

    // D-Day 날짜에서 현재 날짜의 차이를 getTime 메서드를 사용해서 밀리초의 값으로 가져온다.
    const distance = setDate.getTime() - now.getTime();

    // Math.floor 함수를 이용해서 근접한 정수값을 가져온다.
    // 밀리초 값이기 때문에 1000을 곱한다.
    // 1000*60 => 60초(1분)*60 => 60분(1시간)*24 = 24시간(하루)
    // 나머지 연산자(%)를 이용해서 시/분/초를 구한다.
    setDay(Math.floor(distance / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
    setSeconds(Math.floor((distance % (1000 * 60)) / 1000));
  };
  // D-Day 날짜를 가져오고,
  // 삼항 연산자를 사용해서 값이 10보다 작을 경우에 대해 조건부 렌더링을 해준다.
  useEffect(() => {
    if (go === true) doThing(date);
  }, [date, go]);
  return { day, hours, minutes, seconds };
}
export const scrollToEl = (
  from: string,
  to: string | number,
  after?: () => void,
  more?: number,
  behavior?: boolean
) => {
  var fromEl: any = document.querySelector(`.${from}`);
  if (fromEl !== null) {
    if (typeof to === "string") {
      if (to === "end") {
        fromEl.scrollTo({
          top: fromEl.scrollHeight,
          left: 0,
          behavior: behavior ? "auto" : "smooth",
        });
        if (after !== undefined) after();
      } else {
        var toEl: any = document.querySelector(`${to}`);
        if (toEl !== null) {
          fromEl.scrollBy({
            top:
              toEl.getBoundingClientRect().top +
              (typeof more === "number" ? more : 0),
            behavior: behavior ? "auto" : "smooth",
          });
          if (after !== undefined) after();
        }
      }
    } else if (typeof to === "number") {
      fromEl.scrollTo({
        top: to,
        left: 0,
        behavior: behavior ? "auto" : "smooth",
      });
      if (after !== undefined) after();
    }
  }
};
export const scrollTo = (
  from: string,
  to: number | null,
  after?: () => void
) => {
  var fromEl: any = document.querySelector(`.${from}`);
  if (fromEl !== null) {
    if (to !== null) console.log(fromEl);
    fromEl.scrollTo({
      top: fromEl.scrollTop + to,
      left: 0,
      behavior: "smooth",
    });
    if (after !== undefined) after();
  }
};

export const storeDataObject = async (key: string, value: any) => {
  const jsonValue = JSON.stringify(value);
  localStorage.setItem(key, jsonValue);
};

export function viewSplitLine(message: string) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const boldRegex = /{(.*?)}/;
  // 링크를 감지하여 a 태그로 감싸기
  const replace = (message: string) => {
    const convertContent1 = message.replace(boldRegex, function (text: string) {
      return "<b>" + text.replace("{", "").replace("}", "") + "</b>";
    });
    const convertContent = convertContent1.replace(
      urlRegex,
      function (text: string) {
        return '<a href="' + text + '" target="_blank">' + text + "</a>";
      }
    );

    const htmlArr: any = [];
    convertContent.split("\n").forEach(function (text: string) {
      const textHtml = text !== "" ? "<p>" + text + "</p>" : "";
      htmlArr.push(textHtml);
    });
    return { __html: htmlArr.join("") };
  };

  return <div dangerouslySetInnerHTML={replace(message)}></div>;
}

export const queryToObj = (query: string) => {
  // 1. "&" 로 텍스트를 나눈 배열을 만들어준다.
  const list = query.split("&");
  // 2. 배열 값을 map 함수를 통해 "="로 다시 나눈 뒤 이걸 [key, val] 형태라 하자.
  // 3. 각각의 key, val 값을 {property:key, value:val} 값으로 반환해준다.
  // 4. map함수의 결과값인 각각의 객체를 reduce를 통해 하나의 결과값으로 축약해준다.

  const objQuery = list
    .map((item: any) => {
      const [key, val] = item.split("=");
      return { property: key, value: val };
    })
    .reduce((acc: any, cur: any) => {
      acc[cur.property] = cur.value;
      return acc;
    }, {});

  return objQuery;
};

export const objToQuery = (objQuery: any) => {
  let stringQuery = Object.entries(objQuery)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  return "?" + stringQuery;
};

export const checkHasIncode = (keyword: any) => {
  const decoded = decodeURI(keyword); // 한글 인코딩
  return decoded;
};

export function round(value: number, precision: number) {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}

export const formatTimer = (sec: number) => {
  let hours = Math.floor(sec / 3600); // get hours
  let minutes = Math.floor((sec - hours * 3600) / 60); // get minutes
  let seconds = Math.floor(sec - hours * 3600 - minutes * 60); //  get seconds
  // add 0 if value < 10; Example: 2 => 02
  let stringHours = hours.toString();
  let stringMinuites = minutes.toString();
  let stringSeconds = seconds.toString();
  if (hours < 10) {
    stringHours = "0" + stringHours;
  }
  if (minutes < 10) {
    stringMinuites = "0" + stringMinuites;
  }
  if (seconds < 10) {
    stringSeconds = "0" + stringSeconds;
  }
  return stringMinuites + ":" + stringSeconds; // Return is HH : MM : SS
};

export function getDiffDay(date: Date) {
  const todayTime = new Date();
  const diff = date.getTime() - todayTime.getTime();
  const diffDay = Math.floor(diff / (1000 * 60 * 60 * 24));
  const diffHour = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const diffMin = Math.floor((diff / (1000 * 60)) % 60);
  const diffSec = Math.floor((diff / 1000) % 60);
  return diffDay > 0 ? `D-${diffDay}` : `Completed`;
}

export const getCountryFlagEmoji = (countryCode: CountryCode) => {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};
