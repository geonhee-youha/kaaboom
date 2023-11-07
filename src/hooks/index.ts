import useSWR, { mutate } from "swr";
import useSWRInfinite, { SWRInfiniteKeyLoader } from "swr/infinite";
import axios, { AxiosRequestConfig } from "axios";
import { sendMessage } from "../utils/sendMessage";
// export const API_URL = "http://34.64.248.255/v1_1";
export const API_URL = "https://api.circlin.co.kr/v1_1";
export const API_URL_2 = "https://api.circlin.co.kr/v2";
export const API_URL_TEST = `http://test.circlin.co.kr/api`;
const options = {
  refreshInterval: 0,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};
export default function useAxios(url: string, config?: AxiosRequestConfig, withCredentials = true) {
  return axios(url, {
    ...config,
    withCredentials: withCredentials,
    headers: {
      ...config?.headers,
      Accept: "application/json",
      "Content-Type": "application/json",
      // TEST: "1",
      token: `${localStorage.getItem("token")}`,
    },
  }).catch((res) => {
    return res.response;
  });
}
export const fetcher = (url: string, options?: any) =>
  useAxios(url, options)
    .then((res) => res.data)
    .catch((e) => {
      alert("fetch error " + e);
      history.back();
    });
export function useCustomSWR(apiUrl: string | null, name: string, v2?: boolean) {
  const api = v2 ? API_URL_2 : API_URL;
  const url = apiUrl === null ? null : `${api}${apiUrl}`;
  const { data, error, isValidating, mutate } = useSWR(url, fetcher, options);
  function returnStates(data: any, error: any, mutate: any, isValidating: any) {
    return {
      [`${name}`]: {
        data: data,
        isLoading: !error && !data,
        error: error || data === undefined ? true : false,
        mutate: mutate,
        isValidating: isValidating,
      },
    };
  }
  return returnStates(data, error, mutate, isValidating);
}

export const setInfiniteKey = (url_origin: string | null, limit?: number, api_url?: string) => {
  const limits = typeof limit === "number" ? limit : 20;
  const api = api_url === "v2" ? API_URL_2 : api_url === "test" ? API_URL_TEST : API_URL;
  const url =
    typeof limit === "number"
      ? url_origin?.includes("?")
        ? `${url_origin}&limit=${limits}`
        : `${url_origin}?limit=${limits}`
      : url_origin;
  const getKey: SWRInfiniteKeyLoader = (index, previousPageData) => {
    if (url === null) return null;
    if (
      previousPageData &&
      (url?.includes("feed") || url?.includes("check")
        ? !previousPageData.data.feeds.length
        : url?.includes("user") || url?.includes("follow")
        ? !previousPageData.data.users.length
        : url?.includes("notification")
        ? !previousPageData.data.notifies.length
        : !previousPageData.data.missions.length)
    )
      return null; // 끝에 도달
    if (index === 0) return `${api}${url}`;
    return `${api}${url}${url?.includes("?") ? `&page=${index}` : `?page=${index}`}`;
  };
  return getKey;
};

export function useCustomSWRInfinite(getKey: any, name: string) {
  const { data, error, isValidating, mutate, size, setSize } = useSWRInfinite(getKey, fetcher, options);
  function returnStates(data: any, error: any, mutate: any, isValidating: any, size: any, setSize: any) {
    return {
      [`${name}`]: {
        data: data,
        isLoading: !error && !data,
        error: error || data === [undefined] ? true : false,
        mutate: mutate,
        isValidating: isValidating,
        isLoadingMore: (!error && !data) || (size > 0 && data && typeof data[size - 1] === "undefined"),
        isRefreshing: isValidating && data && data.length === size,
        size: size,
        setSize: setSize,
      },
    };
  }
  return returnStates(data, error, mutate, isValidating, size, setSize);
}

export const goToCs = () => {
  //카카오톡 고객센터
  sendMessage({ name: "linking", body: "http://pf.kakao.com/_YQxgxij/chat" });
};
