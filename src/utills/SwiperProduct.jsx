// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const SwiperProduct = ({ children }) => {
  return (
    <div>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        centeredSlides={true}
        loop={true} // Enable infinite loop
        autoplay={{ delay: 2000, disableOnInteraction: false }} // Enable autoplay
        modules={[Autoplay, Pagination, Navigation]} // Include necessary modules
        className="mySwiper mb-5"
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {children}
      </Swiper>
    </div>
  );
};

export default SwiperProduct;
