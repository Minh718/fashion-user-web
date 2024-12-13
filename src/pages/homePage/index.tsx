import React from "react";
import ProductDisplay from "../../components/ProductDisplay";
import FashionSlideshow from "./components/FashionSlideshow";
import VouchersSlide from "./components/VouchersSlide";
import ProductsSlide from "./components/ProductsSlide";

export default function HomePage() {
    return (
        <div>
            <FashionSlideshow />
            <VouchersSlide  />
            <ProductsSlide />
        </div>
    )
}
