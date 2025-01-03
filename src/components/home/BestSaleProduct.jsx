import { useEffect, useState } from "react";
import { listProductBy } from "../../api/product";
import ProductCard from "../ProductCard";

const BestSaleProduct = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const res = await listProductBy("sold", "desc", 30); // ดึงข้อมูล 30 ตัวแรก
      // console.log("🚀 ~ getProduct ~ res:", res);

      // เรียงลำดับตาม 'sold' จากมากไปน้อย
      const sortedData = res.data
        .sort((a, b) => b.sold - a.sold) // เรียงจากมากไปน้อย
        .slice(0, 8); // เลือกแค่ 8 ตัวแรก

      setData(sortedData);
    } catch (error) {
      console.log("🚀 ~ getProduct ~ error:", error);
    }
  };

  return (
    <div className="m-10 bg-gradient-to-br  p-10 rounded-lg shadow-lg">
      <div className="mb-10">
        <p className="text-center text-4xl font-bold text-gray-700">
          Best Saler
        </p>
        <p className="text-center text-gray-600 mt-2">
          Check out our most popular products!
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {data?.map((item, index) => (
          <div
            key={index}
            className="relative w-full h-full flex flex-wrap items-center justify-center bg-white p-5 rounded-md shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <span className="absolute top-2 right-2 bg-red-400 text-white text-xs font-bold py-1 px-2 rounded-full z-10">
              HOT
            </span>
            <ProductCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSaleProduct;
