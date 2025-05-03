import { useSelector } from "react-redux";
import { useLoaderData } from "react-router-dom";
import LoadingBigger from "../../components/LoadingBigger";
import FashionSlideshow from "./components/FashionSlideshow";
import ProductsSlide from "./components/ProductsSlide";
import VouchersSlide from "./components/VouchersSlide";
export default function HomePage() {
  const listProductsForHomePage = (useLoaderData() as any[]) || null;
  const { isAuthenticated } = useSelector((state: any) => state.user);
  return (
    <div className="py-4">
      <FashionSlideshow />

      {isAuthenticated ? <VouchersSlide /> : ""}

      {listProductsForHomePage ? (
        listProductsForHomePage.map((item, index) => (
          <div
            key={item.name}
            className="py-4 mt-8 shadow-lg shadow-[rgba(50,50,93,0.25)] bg-[#FEF9E1]"
          >
            <h1 className={`text-center font-bold  text-[26px] pb-5 uppercase`}>
              Newest {item.name}
            </h1>
            <ProductsSlide products={item.products} key={index} />
          </div>
        ))
      ) : (
        <LoadingBigger />
      )}
    </div>
  );
}
