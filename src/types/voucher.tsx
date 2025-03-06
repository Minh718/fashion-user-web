export interface Voucher {
  id: number;
  code: string;
  type: "PERCENT" | "FIXED"; // Define possible voucher types
  discount: number;
  minPrice: number;
  maxDiscount: number;
  description: string;
  startDate: string;
  forNewUser: boolean;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  active: boolean;
  title: string;
  validity: string;
  image: string;
}
