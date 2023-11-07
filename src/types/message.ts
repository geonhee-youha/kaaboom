export type MessageItemProps = {
  chat_room_id: number;
  gender: string;
  is_block: number;
  latest_at: string | null;
  latest_message: string | null;
  latest_nickname: string | null;
  nickname: string;
  profile: string;
  unread_total: number;
  user_id: number;
};
export type MessageProps = {
  created_at: string;
  feed_content: string;
  feed_id: number;
  feed_user_id: number;
  gender: string;
  id: number;
  imaeg_type: string;
  image: string;
  image_type: string | null;
  link: string | null;
  message: string;
  mission: {
    id: number | null;
    title: string | null;
    description: string | null;
    thumbnail_image: string | null;
  };
  nickname: string;
  profile: string;
  type: string;
  user_id: number;
};
