import { SlideProps } from "./../hooks/useNavigation";
import { SxProps } from "@mui/system";

export type DrawerProps = {
  open: boolean;
  title?: string;
  children?: React.ReactNode;
  onClose?: () => void;
  item?: SlideProps;
  id?: number;
  zIndex?: number;
};

export const drawerDefaultProps = {
  open: false,
};

export type InputProps = {
  value: string;
  error: boolean;
  helperText: string;
  byte: number;
  bCode?: number;
};

export const inputDefaultProps = {
  value: "",
  error: false,
  helperText: "",
  byte: 0,
};

export type DialogProps = {
  open: boolean;
  id?: string;
  title: React.ReactNode;
  content: React.ReactNode;
  pathname: string;
  cancel: {
    show: boolean;
    title: string;
    disabled: boolean;
    onClick: () => void;
  };
  confirm: {
    title: string;
    onClick: () => void;
    onConfirm: (e?: any) => void;
  };
  sx?: SxProps;
  backAble?: boolean;
  form?: boolean;
  value: string;
  children?: React.ReactNode;
  full?: boolean;
  order?: boolean;
  zIndex?: number,
  type?: string,
};

export const dialogDefaultProps = {
  open: false,
  id: '',
  title: "",
  content: "",
  pathname: "/",
  full: false,
  cancel: {
    show: true,
    title: "취소",
    disabled: false,
    onClick: () => { },
  },
  confirm: {
    title: "확인",
    onClick: () => { },
    onConfirm: () => { },
  },
  value: "",
};

export type UserProps = {
  badge: {
    feeds: number;
    messages: number;
    missions: number;
    notifies: number;
  };
  category: any[];
  result: boolean;
  today_paid_count: number;
  user: {
    access_token: string;
    agree1: number;
    agree2: number;
    agree3: number;
    agree4: number;
    agree5: number;
    agree_ad: number;
    agree_push: number;
    agree_push_mission: number;
    area: string;
    area_code: string;
    area_updated_at: string;
    background_image: string;
    birthday: string;
    created_at: string;
    deleted_at: string | null;
    device_token: string;
    device_type: string;
    email: string;
    email_verified_at: string | null;
    family_name: string | null;
    gender: string;
    given_name: string | null;
    greeting: string;
    id: number;
    last_login_at: string;
    last_login_ip: string;
    lat: number;
    lng: number;
    name: string | null;
    nickname: string;
    phone: string | null;
    phone_verified_at: string | null;
    point: number;
    profile: string;
    refresh_token: string | null;
    refresh_token_expire_in: string | null;
    socket_id: string;
    updated_at: string;
  };
  wallpapers: any[];
  yesterday_check: number;
  yesterday_feeds_count: number;
  yesterday_paid_count: number;
  yesterday_point: number;
};
export const userDefaultProps = {
  badge: {
    feeds: 0,
    messages: 0,
    missions: 0,
    notifies: 0,
  },
  category: [],
  result: false,
  today_paid_count: 0,
  user: {
    access_token: "",
    agree1: 0,
    agree2: 0,
    agree3: 0,
    agree4: 0,
    agree5: 0,
    agree_ad: 0,
    agree_push: 0,
    agree_push_mission: 0,
    area: "",
    area_code: "",
    area_updated_at: "",
    background_image: "",
    birthday: "",
    created_at: "", //2021-09-02T18:47:45.000000Z
    deleted_at: "", //null
    device_token: "",
    device_type: "", //ios
    email: "",
    email_verified_at: "", //null
    family_name: "", //null
    gender: "", //W
    given_name: "", //null
    greeting: "",
    id: 0,
    // id: 4083,
    last_login_at: "", //2021-09-03 07:52:11
    last_login_ip: "",
    lat: 37,
    lng: 127,
    name: "", //null
    nickname: "",
    phone: "", //null
    phone_verified_at: "", //null
    point: 0,
    profile: "",
    refresh_token: "", //null
    refresh_token_expire_in: "", //null
    socket_id: "",
    updated_at: "", //2021-09-02T23:04:02.000000Z
  },
  wallpapers: [],
  yesterday_check: 0,
  yesterday_feeds_count: 0,
  yesterday_paid_count: 0,
  yesterday_point: 0,
};
export type SomeoneProps = {
  area: string;
  bookmarks: number;
  comments: number;
  description: string;
  emoji: string;
  ended_at: string;
  event_type: string;
  feed_id: number;
  feeds_count: number;
  gender: string;
  has_check: number;
  id: number;
  is_bookmark: number;
  is_event: number;
  is_old_event: number;
  is_following: number;
  mission_category_id: number;
  mission_stat_id: number;
  mission_stat_user_id: number;
  nickname: string;
  place_address: string;
  place_description: string;
  place_image: string;
  place_title: string;
  place_url: string;
  product_brand: string;
  product_id: string;
  product_image: string;
  product_price: string;
  product_title: string;
  product_type: string;
  product_url: string;
  profile: string;
  started_at: string;
  success_count: number;
  thumbnail_image: string;
  title: string;
  today_upload: number;
  user_id: number;
  users: [
    {
      gender: string;
      id: number;
      mission_id: number;
      nickname: "0";
      profile: string;
    },
    {
      gender: string;
      id: number;
      mission_id: number;
      nickname: "0";
      profile: string;
    }
  ];
};
export const someoneDefaultProps = {
  area: "",
  bookmarks: 0,
  comments: 0,
  description: "",
  emoji: "",
  ended_at: "",
  event_type: "",
  feed_id: 0,
  feeds_count: 0,
  gender: "",
  has_check: 0,
  id: 0,
  is_bookmark: 0,
  is_event: 0,
  is_old_event: 0,
  is_following: 0,
  mission_category_id: 0,
  mission_stat_id: 0,
  mission_stat_user_id: 0,
  nickname: "",
  place_address: "",
  place_description: "",
  place_image: "",
  place_title: "",
  place_url: "",
  product_brand: "",
  product_id: "",
  product_image: "",
  product_price: "",
  product_title: "",
  product_type: "",
  product_url: "",
  profile: "",
  started_at: "",
  success_count: 0,
  thumbnail_image: "",
  title: "",
  today_upload: 0,
  user_id: 0,
  users: [
    {
      gender: "",
      id: 0,
      mission_id: 0,
      nickname: "0",
      profile: "",
    },
    {
      gender: "",
      id: 0,
      mission_id: 0,
      nickname: "0",
      profile: "",
    },
  ],
};
//
//
//
export type UserListItem2Props = {
  area: string;
  follower: number;
  gender: string;
  id: number;
  is_following: number;
  nickname: string;
  profile: string;
};
export type CommentProps = {
  comment: string;
  created_at: string;
  depth: number;
  gender: string;
  group: number;
  id: number;
  is_delete: number;
  nickname: string;
  profile: string;
  user_id: number;
};
export const commentDefaultProps = {
  comment: "",
  created_at: "",
  depth: 0,
  gender: "",
  group: 0,
  id: -1,
  is_delete: 0,
  nickname: "",
  profile: "",
  user_id: -1,
};
export type PlaceProps = {
  address: string | null;
  description: string | null;
  image: string | null;
  title: string | null;
  url: string | null;
};
export type ProductProps = {
  brand: string | null;
  id: string | null;
  image: string | null;
  price: string | null;
  title: string | null;
  type: string | null;
  url: string | null;
};
export type UserFeedProps = {
  emoji: string;
  id?: number;
  area: string;
  check_total: number;
  comment_total: number;
  content: string;
  created_at: string;
  emoji_total: number;
  feed_id: number;
  followers: number;
  gender: string;
  is_hidden?: boolean;
  has_check: number | boolean;
  has_comment: number;
  has_emoji: number;
  has_images: number;
  has_paid_check: number;
  image: string;
  image_type: string;
  is_following: number;
  mission_id: number;
  mission: string;
  missions: number;
  nickname: string;
  place: PlaceProps;
  product: ProductProps;
  profile: string | null;
  user_id: number;
  images: { type: string; image: string }[];
  users?: {
    feed_id: number;
    gender: string;
    id: number;
    nickname: string;
    profile: string | null;
  }[];
  checks: number;
  comments: number;
};
export type FeedProps = {
  id?: number;
  area: string;
  check_total: number;
  comment_total: number;
  content: string;
  created_at: string;
  emoji_total: number;
  feed_id: number;
  followers: number;
  gender: string;
  is_hidden?: boolean;
  has_check: number | boolean;
  has_comment: number;
  has_emoji: number;
  has_images: number;
  has_paid_check: number;
  image: string;
  image_type: string;
  is_following: number;
  missions: MissionProps[];
  nickname: string;
  place: PlaceProps;
  product: ProductProps;
  profile: string | null;
  user_id: number;
  images: { type: string; image: string }[];
  users?: {
    feed_id: number;
    gender: string;
    id: number;
    nickname: string;
    profile: string | null;
  }[];
  comments?: CommentProps[];
};
export const feedDefaultProps = {
  id: -1,
  area: "",
  check_total: 0,
  comment_total: 0,
  content: "",
  created_at: "",
  emoji_total: 0,
  feed_id: 0,
  followers: 0,
  gender: "",
  has_check: 0,
  has_comment: 0,
  has_emoji: 0,
  has_images: 0,
  has_paid_check: 0,
  image: "",
  image_type: "",
  is_following: 0,
  missions: [],
  nickname: "",
  place: {},
  product: {},
  profile: "",
  user_id: 0,
  images: [],
};

export type FeedDataProps = {
  data: {
    feeds: FeedProps[];
    feeds_count: number;
  };
};
export type MissionProps = {
  area: string;
  bookmarks: number;
  category_id: number;
  category_title: string;
  comments: number;
  description: string;
  emoji: string;
  ended_at: string | null;
  event_type: string | null;
  feed_id: number | null;
  feeds_count: number;
  gender: string;
  has_check: number;
  id: number;
  is_available: number;
  is_bookmark: number;
  is_event: number;
  is_ground: number;
  is_ocr: number;
  is_old_event: number;
  mission_stat_id: number;
  mission_stat_user_id: number;
  nickname: string;
  place_address: string | null;
  place_description: string | null;
  place_image: string | null;
  place_title: string | null;
  place_url: string | null;
  product_brand: string | null;
  product_id: number | null;
  product_image: string | null;
  product_price: number | null;
  product_title: string | null;
  product_type: string | null;
  product_url: string | null;
  profile: string | null;
  started_at: string | null;
  success_count: number | null;
  thumbnail_image: string | null;
  title: string;
  today_upload: number;
  user_id: number;
};
export type BookmarkProps = {
  emoji: string;
  id: number;
  missions: MissionProps[];
};
export type BookmarkDataProps = {
  data: {
    missions: BookmarkProps[];
  };
};
