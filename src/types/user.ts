export type WallpaperProps = {
  created_at: string;
  image: string;
  thumbnail_image: string;
  title: string;
};

export type UserInfoProps = {
  area: string | null;
  birthday: string | null;
  category?: string[];
  follow?: string[];
  gender: string | null;
  nickname: string | null;
  profile: string | null;
};

export const userInfoDefaultProps = {
  area: null,
  birthday: null,
  gender: null,
  nickname: null,
  profile: null,
};
//위로는 지울것
export type UserProps = {
  id: number;
  nickname: string | null;
  profile: string | null;
  email: string;
  gender: string | null;
  birth: string | null;
  followed?: boolean;
  circlin?: boolean;
};
export const userDefaultProps = {
  id: -1,
  nickname: "",
  profile: null,
  gender: null,
  birth: null,
  email: "",
};
