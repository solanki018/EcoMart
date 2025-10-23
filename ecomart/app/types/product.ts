export interface Product {
  _id?: string;
  id?: string;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  ownerId: string;
  ownerName: string;
  sold: boolean;
}
