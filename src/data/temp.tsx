import { atom } from "recoil";

export const tempUser = {
  name: "Guny Lee",
  nickname: "",
  thumbnail: "",
  bio: "",
  nation: "",
  gender: "",
  birthDate: "",
  type: "user",
};

export const tempUserState = atom({
  key: "tempUser",
  default: tempUser,
});


export const tempArtist = {
  name: 'Skye Park',
  thumbnail: 'https://yt3.googleusercontent.com/qQnZkZ5ve2AtE4Ep5fau_RFPOCFOChVLHDY7C4qJWxEubaL3yLpZ5CrTMv_A0U5ltdRaYnz8_w=s176-c-k-c0x00ffffff-no-rj'
}