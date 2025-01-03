// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { listProductBy } from "../../api/product";

const Content = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    handleImg();
  }, []);

  const handleImg = async () => {
    try {
      const res = await listProductBy("created", "desc", 30);
      console.log("🚀 ~ Raw data:", res.data);

      // สุ่มเลือกข้อมูล 5 รายการ
      const shuffledData = res.data.sort(() => 0.5 - Math.random()); // สุ่มเรียงลำดับใหม่
      const randomData = shuffledData.slice(0, 5); // เลือกแค่ 5 รายการแรก

      console.log("🚀 ~ Random data:", randomData);

      setData(randomData);
    } catch (error) {
      console.log("🚀 ~ getProduct ~ error:", error);
    }
  };

  return (
    <div className="m-10">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper mb-5"
      >
        {data?.map((item, index) => (
          <SwiperSlide key={index}>
            {item.images && item.images.length > 0 ? (
              <img
                src={item.images[0].url}
                alt="Product"
                  className="w-full h-96 object-cover"
              />
            ) : (
              <span className="text-white text-lg">No Image</span>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        centeredSlides={true}
        loop={true} // Enable infinite loop
        className="mySwiper mb-5"
      >
        {data?.map((item, index) => (
          <SwiperSlide key={index}>
            {item.images && item.images.length > 0 ? (
              <img
                src={item.images[0].url}
                alt="Product"
                className="w-full h-60 object-cover rounded-md"
              />
            ) : (
              <span className="text-white text-lg">No Image</span>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Content;
