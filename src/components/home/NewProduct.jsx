import { useEffect, useState } from "react";
import { listProductBy } from "../../api/product";
import ProductCard from "../ProductCard";
import SwiperProduct from "../../utills/SwiperProduct";
import { SwiperSlide } from "swiper/react";
const NewProduct = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const res = await listProductBy("created", "desc", 30);
      console.log("🚀 ~ Raw data:", res.data);

      // กรองข้อมูลที่มี 'created' และเรียงลำดับใหม่
      const sortedData = res.data
        .sort((a, b) => new Date(b.created) - new Date(a.created))
        .slice(0, 4); // เลือกแค่ 4 รายการแรก
      console.log("🚀 ~ Sorted data:", sortedData);

      setData(sortedData);
    } catch (error) {
      console.log("🚀 ~ getProduct ~ error:", error);
    }
  };

  return (
    <div className="m-10 ">
      <div className="mb-10">
        <p className="text-center text-4xl  text-gray-700">
          🌟 New Arrivals 🌟
        </p>
        <p className="text-center text-gray-600 mt-2">
          Discover the latest additions to our collection!
        </p>
      </div>
      <SwiperProduct>
        {data?.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full flex flex-col items-center justify-between bg-white p-5 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <span className="absolute top-3 right-20 bg-green-400 text-white text-xs font-bold py-1 px-2 rounded-full z-10">
                NEW
              </span>
              <ProductCard item={item} />
            </div>
          </SwiperSlide>
        ))}
      </SwiperProduct>
    </div>
  );
};

export default NewProduct;
