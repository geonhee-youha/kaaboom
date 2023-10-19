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

export type TempArtistUserProps = {
  name: string;
  email: string;
  group: string;
  thumbnail: string;
  bio?: string;
};

export const tempArtistUser: TempArtistUserProps = {
  name: "GABI",
  email: "gabi.blackswan@gmail.com",
  group: "BLACKSWAN",
  thumbnail:"/temp/artists/3.webp",
  bio: "Hey army💜 I want to invite you to a wonderful group on 𝐓𝐄-𝐋𝐄 𝐆𝐑𝐌メFINALDREAM_BTS~🥂🥀 𝗦𝗲𝗮𝗿𝗰𝗵:- @Bull3tproofArmy on 𝗧𝗲-𝗹𝗲 𝗴𝗿𝗺 nd join us. here we talk about our 𝗕𝗔𝗡𝗚𝗧𝗔𝗡 𝗕𝗢𝗬𝗦 with army's all over the world🦋 𝗧𝗛𝗘𝗚𝗥𝗢𝗨𝗣 𝗜𝗦 𝗢𝗡𝗟𝗬 𝗙𝗢𝗥 𝗚𝗜𝗥𝗟𝗦... & 𝗜𝗧'𝗦 𝗖𝗢𝗠𝗣𝗟𝗘𝗧𝗘𝗟𝗬 𝗦𝗔𝗙𝗘 !! ✨ 𝗕𝗢𝗥𝗔𝗛𝗔𝗘💜 We would be very appreciate to see you there💗",
};
