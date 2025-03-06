import React, { useEffect } from "react";
import ProductDisplay from "../../components/ProductDisplay";
import FashionSlideshow from "./components/FashionSlideshow";
import VouchersSlide from "./components/VouchersSlide";
import ProductsSlide from "./components/ProductsSlide";
import { useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserVouchers } from "../../services/voucherService";

const listProductsForHomePage = [
  {
    name: "aos thun",
    products: [
      {
        id: 1,
        name: "Complete your look with our trendy",
        price: 129.99,
        percent: 10,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc",
      },
      {
        id: 2,
        name: "Summer Collection our trendy accessoriess",
        price: 199.99,
        percent: 15,
        rating: 4.2,
        image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e",
      },
      {
        id: 3,
        name: "Elegant and breezy outfits for the season",
        price: 999.99,
        percent: 5,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c",
      },
      {
        id: 4,
        name: "Sophisticated suits for any occasion",
        price: 699.99,
        percent: 20,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d",
      },
      {
        id: 5,
        name: "Wireless Earbuds",
        price: 89.99,
        percent: 25,
        rating: 4.3,
        image:
          "https://images.unsplash.com/photo-1590658165737-15a047b7c0b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
      },
      {
        id: 6,
        name: "Tablet",
        price: 349.99,
        percent: 8,
        rating: 4.4,
        image:
          "https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      },
      {
        id: 7,
        name: "Gaming Console dsa dá dá dsa dá dsa dsa dá dá dá dá fas",
        price: 499.99,
        percent: 12,
        rating: 4.7,
        image:
          "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      },
      {
        id: 8,
        name: "Smart Speaker",
        price: 79.99,
        percent: 18,
        rating: 4.1,
        image:
          "https://images.unsplash.com/photo-1543512214-318c7553f230?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
      },
    ],
  },
  {
    name: "quans thun",
    products: [
      {
        id: 1,
        name: "Complete your look with our trendy",
        price: 129.99,
        percent: 10,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc",
      },
      {
        id: 2,
        name: "Summer Collection our trendy accessoriess",
        price: 199.99,
        percent: 15,
        rating: 4.2,
        image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e",
      },
      {
        id: 3,
        name: "Elegant and breezy outfits for the season",
        price: 999.99,
        percent: 5,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c",
      },
      {
        id: 4,
        name: "Sophisticated suits for any occasion",
        price: 699.99,
        percent: 20,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d",
      },
      {
        id: 5,
        name: "Wireless Earbuds",
        price: 89.99,
        percent: 25,
        rating: 4.3,
        image:
          "https://images.unsplash.com/photo-1590658165737-15a047b7c0b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
      },
      {
        id: 6,
        name: "Tablet",
        price: 349.99,
        percent: 8,
        rating: 4.4,
        image:
          "https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      },
      {
        id: 7,
        name: "Gaming Console dsa dá dá dsa dá dsa dsa dá dá dá dá fas",
        price: 499.99,
        percent: 12,
        rating: 4.7,
        image:
          "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      },
      {
        id: 8,
        name: "Smart Speaker",
        price: 79.99,
        percent: 18,
        rating: 4.1,
        image:
          "https://images.unsplash.com/photo-1543512214-318c7553f230?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
      },
    ],
  },
];
export default function HomePage() {
  //   const listProductsForHomePage = useLoaderData();
  const { isAuthenticated } = useSelector((state: any) => state.user);
  return (
    <div className="py-4">
      <FashionSlideshow />

      {isAuthenticated ? <VouchersSlide /> : ""}

      {listProductsForHomePage?.map((item, index) => (
        <div className="py-4 mt-8 shadow-lg shadow-[rgba(50,50,93,0.25)] bg-[#FEF9E1]">
          <h1 className={`text-center font-bold  text-[26px] pb-5 uppercase`}>
            Newest {item.name}
          </h1>
          <ProductsSlide products={item.products} key={index} />
        </div>
      ))}
    </div>
  );
}
