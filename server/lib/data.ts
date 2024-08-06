export type Series = {
  seriesId: number;
  name: string;
  imageUrl: string;
};
export type Smiskis = {
  smiskisId: number;
  seriesId: number;
  bodyType: string;
  pose: string;
  found: string;
  description: string;
  imageUrl: string;
};

export type ShoppingCartItem = {
  shoppingCartItemsId: number;
  seriesId: number;
  quantity: number;
  imageUrl: string;
  createdAt: string;
};
