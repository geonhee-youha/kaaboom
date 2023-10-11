import _ from "lodash";
import createCache from "@emotion/cache";
import { pink } from "@mui/material/colors";
export function createEmotionCache() {
  return createCache({ key: "css" });
}
export function getIsEmail(value: string | null) {
  if (typeof value !== "string") return false;
  var regExp =
    /^([\w\.\_\-])*[a-zA-Z0-9]+([\w\.\_\-])*([a-zA-Z0-9])+([\w\.\_\-])+@(([a-zA-Z0-9])+([\w\.\_\-])+\.)+[a-zA-Z0-9]{2,8}$/;
  return regExp.test(value);
}

export const comma = (num: number) => {
  var regexp = /\B(?=(\d{3})+(?!\d))/g;
  return num.toString().replace(regexp, ",");
};

export function splitBold(text: string) {
  const textArr = text.split("{");
  if (textArr.length === 1) return text;
  const newTextArr = textArr[1].split("}");
  return (
    <span>
      {textArr[0]}
      <b>
        <span className="bar" />
        {newTextArr[0]}
      </b>
      {newTextArr[1]}
    </span>
  );
}

function numberFormat(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function numberToKorean(number: number) {
  var inputNumber = number < 0 ? null : number;
  var unitWords = ["", "만", "억", "조", "경"];
  var splitUnit = 10000;
  var splitCount = unitWords.length;
  var resultArray = [];
  var resultString = "";
  if (inputNumber !== null && number !== 0) {
    for (var i = 0; i < splitCount; i++) {
      var unitResult =
        (inputNumber % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
      unitResult = Math.floor(unitResult);
      if (unitResult > 0) {
        resultArray[i] = unitResult;
      }
    }

    for (var i = 0; i < resultArray.length; i++) {
      if (!resultArray[i]) continue;
      if (resultArray.length === 1) return String(numberFormat(resultArray[i]));
      resultString =
        unitWords[i] === ""
          ? ""
          : " " +
            String(numberFormat(resultArray[i])) +
            unitWords[i] +
            resultString;
    }

    return resultString;
  } else if (number === 0) {
    return 0;
  } else {
    return number;
  }
}
export function isName(asValue: string | null) {
  if (typeof asValue !== "string") return false;
  var regExp = /^(?=.*[a-z0-9A-Z\s])[a-z0-9A-Z\s]{2,16}$/i;
  return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
}

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
  var regExp = /^[A-Za-z0-9]{6,999}$/;
  return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
}
export function isPhone(asValue: string | null) {
  if (typeof asValue !== "string") return false;
  var regExp = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
  return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
}

export function isBirthday(date: string) {
  if (date === "") return false;
  const dateStr = date.replaceAll("/", "");
  var year = Number(dateStr.substr(4, 4)); // 입력한 값의 0~4자리까지 (연)
  var month = Number(dateStr.substr(2, 2)); // 입력한 값의 4번째 자리부터 2자리 숫자 (월)
  var day = Number(dateStr.substr(0, 2)); // 입력한 값 6번째 자리부터 2자리 숫자 (일)
  var today = new Date(); // 날짜 변수 선언
  var yearNow = today.getFullYear(); // 올해 연도 가져옴
  if (dateStr.length <= 8) {
    // 연도의 경우 1900 보다 작거나 yearNow 보다 크다면 false를 반환합니다.
    if (1900 > year || year > yearNow) {
      return false;
    } else if (month < 1 || month > 12) {
      return false;
    } else if (day < 1 || day > 31) {
      return false;
    } else if (
      (month == 4 || month == 6 || month == 9 || month == 11) &&
      day == 31
    ) {
      return false;
    } else if (month == 2) {
      var isleap = year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);
      if (day > 29 || (day == 29 && !isleap)) {
        return false;
      } else {
        return true;
      } //end of if (day>29 || (day==29 && !isleap))
    } else {
      return true;
    } //end of if
  } else {
    //1.입력된 생년월일이 8자 초과할때 :  auth:false
    return false;
  }
}

export const colored = (text: string, query?: string) => {
  if (
    query !== undefined &&
    query !== "" &&
    text.toLowerCase().includes(query.toLowerCase())
  ) {
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <span key={index} className="pink">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </>
    );
  }
  return text;
};
