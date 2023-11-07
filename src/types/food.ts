export type FoodListItemProps = {
  brand: string | null;
  images: { width: number | null; height: number | null; mimeType: string | null; pathname: string | null }[];
  nutrition: { fat: number | null; calorie: number | null; protein: number | null; carbohydrate: number | null };
  container: string | null;
  id: number;
  title: string;
  totalAmount: number | null;
  unit: string;
  quantity?: number;
};
