import { isAndroid, isIOS } from 'react-device-detect';
import { AxiosResponse } from 'axios';
import useAxios, { API_URL } from '../hooks';
import { AndroidProps, MessageProps } from '../types/andoid';
//#region iOS/Android Native Common Functions

//#endregion
//#region Android Native Functions
export const deviceTokenUpdateToServer = async (deviceToken: any, platform: 'ios' | 'android') => {
  //string | {token:string}
  const parsedToken = isIOS ? deviceToken.slice(deviceToken.indexOf('Optional(') + 10, deviceToken.length - 2) : deviceToken.detail.token;
  useAxios(`${API_URL}/user`, { method: 'POST', data: { _method: 'PATCH', firebase_token: parsedToken, device_type: platform } });
  setDeviceToken(parsedToken);
};

export const AndroidSendMessage = (m: string) => {
  if (typeof window !== 'undefined') {
    const android: AndroidProps = window.Android;
    if (android) {
      android.postMessage(m);
      // 아래두줄 테스트 끝나면 지우기 안드로이드 LOGCAT 전용
      // const m_log = JSON.stringify({ name: 'log', body: m });
      // android.postMessage(m_log);
    }
  }
};

export const sendMessage = (message: MessageProps) => {
  const m = JSON.stringify({ name: message.name, body: message.body });
  if (isAndroid) {
    AndroidSendMessage(m);
    // AndroidSendMessage(' dhideStatus');
  } else if (isIOS) {
    window.webkit?.messageHandlers[message.name].postMessage(message.body); //LOCAL
  }
};

export const getDeviceToken = () => {
  return localStorage.getItem('deviceToken');
};
const setDeviceToken = (deviceToken: string) => {
  localStorage.setItem('deviceToken', deviceToken);
};
export const getAndroidPushMessage = async (data: any, func: any) => {
  //string | {token:string}
  const notificationId: string = data.detail.notificationId; //숫자로옴
  const type: 'message' = data.detail.type;
  const id: string = data.detail.id; //메세지 방 아이디
  const isPush: boolean = Boolean(data.detail.isPush); //push noti로 앱 켰으면 true
  func(id, isPush);
};
export const getAndroidIsWifi = async (data: any, after: (isWifi: boolean) => void) => {
  // "true" | "false"로 관리합니다. (iOS랑 통일))
  //"true"이면 wifi입니다.
  const t: any = ''; //아래 isWifi type 맞추려고 t선언
  const isWifi: 'true' | 'false' = t + data.detail.isWifi;
  localStorage.setItem('isWifi', isWifi);
  after(isWifi === 'true');
};
//#endregion
//#region iOS Native Functions
export const getiOSPushMessage = async (data: any, func: any) => {
  //string | {token:string}
  if (data === '') return;
  window.webkit?.messageHandlers['resetNotiData'].postMessage('');
  const parsedData = JSON.parse(data);
  //{"type":"Option(message)","id":"Option(2051)"}
  const type = parsedData.type.split('(')[1].slice(0, parsedData.type.split('(')[1].length - 1);
  const id = parsedData.id.split('(')[1].slice(0, parsedData.id.split('(')[1].length - 1);
  func(id, true);
};
export const onNotiPush = async (func: any) => {
  func();
};
export const getiOSIsWifi = async (data: any) => {
  //"true"이면 wifi입니다.
  const parsedData = JSON.parse(data);
  //{"isWifi":"true"}
  const isWifi: 'true' | 'false' = parsedData.isWifi; //=> "true" | "false" type:string입니다.
  localStorage.setItem('isWifi', isWifi);
};
//#endregion
