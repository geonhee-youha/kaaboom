export type ShopCategoryItemProps = {
  product_category_id: number;
  title: string;
  products_count: number;
};
export type ShopProductItemProps = {
  SHIP_FREE_YN: string;
  code: string;
  discount_rate: string;
  name_ko: string;
  price: number;
  prod_name: string;
  product_id: number;
  sale_price: number;
  status: string;
  thumbnail_image: string;
};
export type ShopBannerProps = {
  ended_at: string | null;
  id: number;
  image: string;
  link_url: string | null;
  product_id: number;
  started_at: string | null;
};
export type ShopProductProps = {
  options: ShopProductOptionProps[][];
  product_image: {
    image: string;
    order: number;
    product_id: number;
    type: string;
  }[];
  product_info: {
    CART_YN: string;
    brand_name: string;
    discount_rate: string;
    price: number;
    product_id: number;
    product_name: string;
    sale_price: number;
    shipping_fee: number;
    status: string;
    thumbnail_image: string;
  }[];
};
export type ShopProductOptionProps = {
  group: number;
  name_ko: string;
  option_id: number;
  price: number;
  product_id: number;
  status: string;
  checked?: boolean;
};
export type ShopCartItemProps = {
  brand_id: number;
  brand_name: string;
  cart_id: number;
  opt1: number | null;
  opt2: number | null;
  opt3: number | null;
  opt4: number | null;
  opt5: number | null;
  opt6: number | null;
  opt_name1: string;
  opt_name2: string;
  opt_name3: string;
  opt_name4: string;
  opt_name5: string;
  opt_name6: string;
  price: number;
  price1: number;
  price2: number;
  price3: number;
  price4: number;
  price5: number;
  product_id: number;
  product_name: string;
  qty: number;
  sale_price: number;
  shipping_fee: number;
  status: string;
  thumbnail_image: string;
  user_id: number;
  original_price: number;
  checked?: boolean;
};
