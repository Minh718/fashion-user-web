import { ProductSizeColor } from "./ProductSizeColor";

export interface ProductDetails {
  id: number;
  name: string;
  price: number;
  percent: number;
  brand: {
    name: string;
  };
  subCategory: {
    name: string;
  };
  image: string;
  description: string;
  productSizes: {
    id: number;
    quantity: number;
    size: any;
    productSizeColors: ProductSizeColor[];
  }[];
  detailProduct: {
    description: string;
    material: string;
    origin: string;
    warranty: string;
    madeIn: string;
    model: string;
    images: string[];
  };
  rating: number;
  reviews: number;
}
