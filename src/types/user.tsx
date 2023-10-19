export type FanProps = {
  id: number;
  email: string;
  name: string;
  nickname: string | null;
  thumbnail: string | null;
  gender: string | null;
  birthDate: Date | null;
};

export const fanDefaultProps = {
  id: -1,
  email: "",
  name: "",
  nickname: null,
  thumbnail: null,
  gender: null,
  birthDate: null,
};

export type ArtistProps = {
  id: number;
  email: string;
  name: string;
  nickname: string | null;
  thumbnail: string | null;
  gender: string | null;
  birthDate: Date | null;
};
export const artistDefaultProps = {
  id: -1,
  email: "",
  name: "",
  nickname: null,
  thumbnail: null,
  gender: null,
  birthDate: null,
};
