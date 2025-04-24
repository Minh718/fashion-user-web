import React, { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { getUserVouchers } from "../../../services/voucherService";
import VoucherBox from "./VoucherBox";
import { Voucher } from "../../../types/voucher";
import Loading from "../../../components/Loading";
const vouchers2: Voucher[] = [
  {
    id: 0,
    code: "ELEC20",
    type: "PERCENT",
    discount: 20,
    minPrice: 100,
    maxDiscount: 500,
    description: "Get amazing discounts on all electronic items",
    startDate: "2023-09-01",
    forNewUser: false,
    endDate: "2023-12-31",
    createdAt: "2023-08-15",
    updatedAt: "2023-08-15",
    active: true,
    title: "20% Off on Electronics",
    validity: "Valid till 31st Dec 2023",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: 1,
    code: "BOGO",
    type: "PERCENT",
    discount: 50,
    minPrice: 50,
    maxDiscount: 200,
    description: "Special offer on selected clothing items",
    startDate: "2023-10-01",
    forNewUser: false,
    endDate: "2023-11-15",
    createdAt: "2023-09-15",
    updatedAt: "2023-09-15",
    active: true,
    title: "Buy 1 Get 1 Free",
    validity: "Valid till 15th Nov 2023",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
  },
  {
    id: 2,
    code: "FIRST50",
    type: "PERCENT",
    discount: 50,
    minPrice: 0,
    maxDiscount: 1000,
    description: "Exclusive discount for new customers",
    startDate: "2023-09-01",
    forNewUser: true,
    endDate: "2024-09-01",
    createdAt: "2023-08-15",
    updatedAt: "2023-08-15",
    active: true,
    title: "50% Off on First Order",
    validity: "Valid for 30 days from registration",
    image:
      "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: 3,
    code: "FIRST50",
    type: "PERCENT",
    discount: 50,
    minPrice: 0,
    maxDiscount: 1000,
    description: "Exclusive discount for new customers",
    startDate: "2023-09-01",
    forNewUser: true,
    endDate: "2024-09-01",
    createdAt: "2023-08-15",
    updatedAt: "2023-08-15",
    active: true,
    title: "50% Off on First Order",
    validity: "Valid for 30 days from registration",
    image:
      "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  },
];
const VouchersSlide = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(1);
  const [copiedCode, setCopiedCode] = React.useState(null);
  const [vouchers, setVouchers] = React.useState<Voucher[]>([]);
  // Track how many items are visible

  // Function to detect the screen size and update itemsPerSlide
  const handleResize = () => {
    if (window.innerWidth >= 1024) {
      setItemsPerSlide(3); // For large screens
    } else if (window.innerWidth >= 768) {
      setItemsPerSlide(2); // For medium screens
    } else {
      setItemsPerSlide(1); // For small screens
    }
  };

  useEffect(() => {
    handleResize(); // Set initial value based on screen size
    window.addEventListener("resize", handleResize); // Update on resize
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let interval;
    if (!isLoading) {
      interval = setInterval(() => {
        nextSlide();
      }, 10000);
    }
    return () => clearInterval(interval);
  }, [currentIndex, itemsPerSlide, isLoading]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + itemsPerSlide >= vouchers.length
        ? 0
        : prevIndex + itemsPerSlide
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0
        ? vouchers.length - itemsPerSlide
        : prevIndex - itemsPerSlide
    );
  };
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const res: Voucher[] = await getUserVouchers({ page: 0, size: 4 });
      setVouchers(res);
      setIsLoading(false);
    })();
  }, []);
  if (isLoading) {
    return (
      <div className="relative h-60 bg-white">
        <Loading />
      </div>
    );
  } else if (vouchers.length === 0) {
    return <></>;
  }
  return (
    <div className="relative w-full  max-w-6xl mx-auto overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${(currentIndex / itemsPerSlide) * 100}%)`,
        }}
      >
        {vouchers?.map((voucher: Voucher) => (
          <VoucherBox
            key={voucher.id}
            voucher={voucher}
            copiedCode={copiedCode}
            setCopiedCode={setCopiedCode}
          />
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full shadow-md hover:bg-opacity-75 transition-all duration-300"
        aria-label="Previous voucher"
      >
        <IoIosArrowBack className="text-2xl text-gray-800" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full shadow-md hover:bg-opacity-75 transition-all duration-300"
        aria-label="Next voucher"
      >
        <IoIosArrowForward className="text-2xl text-gray-800" />
      </button>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {Array.from({ length: Math.ceil(vouchers.length / itemsPerSlide) }).map(
          (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index * itemsPerSlide)}
              className={`w-3 h-3 rounded-full ${
                Math.floor(currentIndex / itemsPerSlide) === index
                  ? "bg-blue-500"
                  : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          )
        )}
      </div>
    </div>
  );
};

export default VouchersSlide;
