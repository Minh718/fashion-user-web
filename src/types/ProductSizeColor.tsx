export interface ProductSizeColor {
  id: number;
  quantity: number;
  color: {
    id: number;
    name: string;
    color: string;
  };
}
