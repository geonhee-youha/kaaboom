import useSWR, { mutate } from "swr";
import useSWRInfinite, { SWRInfiniteKeyLoader } from "swr/infinite";
import axios, { AxiosRequestConfig } from "axios";
import { sendMessage } from "../utils/sendMessage";
// export const API_URL = `http://172.30.1.3:8000/api`;
export const API_URL = `https://test.circlin.co.kr/api`;
export const API_URL_K = `https://api-python.circlin.co.kr/api`;
// `http://test.circlin.co.kr/api`;
const options = {
  refreshInterval: 0,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};
export default function useAxios(url: string, config?: AxiosRequestConfig, withCredentials = true) {
  return axios(`${API_URL}${url}`, {
    ...config,
    withCredentials: withCredentials,
    headers: {
      "Content-Type": "application/json",
      ...config?.headers,
      Accept: "application/json",
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
export function useAxiosKunwoo(url: string, config?: AxiosRequestConfig, withCredentials = true) {
  return axios(`${API_URL_K}${url}`, {
    ...config,
    withCredentials: withCredentials,
    headers: {
      "Content-Type": "application/json",
      ...config?.headers,
      Accept: "application/json",
    },
  }).catch((res) => {
    return res.response;
  });
}
export const fetcherKunwoo = (url: string, options?: any) =>
  useAxiosKunwoo(url, options)
    .then((res) => res.data)
    .catch((e) => {
      alert("fetch error " + e);
      history.back();
    });
export function useCustomSWR(apiUrl: string | null, name: string, kunwoo?: boolean) {
  const url = apiUrl === null ? null : `${apiUrl}`;
  const { data, error, isValidating, mutate } = useSWR(url, kunwoo ? fetcherKunwoo : fetcher, options);
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
  const url =
    typeof limit === "number"
      ? url_origin?.includes("?")
        ? `${url_origin}&limit=${limits}`
        : `${url_origin}?limit=${limits}`
      : url_origin;
  const getKey: SWRInfiniteKeyLoader = (index, previousPageData) => {
    if (url === null) return null;
    if (previousPageData && (!previousPageData.data.length || previousPageData.next === null)) return null; // 끝에 도달
    if (index === 0) return `${url}`;
    return `${url}${url?.includes("?") ? `&page=${index}` : `?page=${index}`}&cursor=${previousPageData.next}`;
  };
  return getKey;
};
export function useCustomSWRInfinite(getKey: any, name: string, kunwoo?: boolean) {
  const { data, error, isValidating, mutate, size, setSize } = useSWRInfinite(getKey, kunwoo ? fetcherKunwoo : fetcher, options);
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
