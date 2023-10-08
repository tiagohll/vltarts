import { register } from "swiper/element/bundle";

register();

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { Swiper, SwiperSlide } from "swiper/react";

export default function BannerSlide() {
  const Banners = [
    {
      id: 1,
      desktop:
        "https://firebasestorage.googleapis.com/v0/b/design-6a54f.appspot.com/o/images%2Fpublic%2Fbanner-vlt.png?alt=media&token=7ac192aa-54a6-40ba-aeeb-bd3792eff030&_gl=1*c8j75z*_ga*MTQwNzE3NjA5NS4xNjg3MTI3OTA2*_ga_CW55HF8NVT*MTY5Njc2OTUzMS4xMzYuMS4xNjk2NzY5ODAxLjQxLjAuMA..",
      tablet:
        "https://firebasestorage.googleapis.com/v0/b/design-6a54f.appspot.com/o/images%2Fpublic%2Fbanner-vlt.png?alt=media&token=7ac192aa-54a6-40ba-aeeb-bd3792eff030&_gl=1*c8j75z*_ga*MTQwNzE3NjA5NS4xNjg3MTI3OTA2*_ga_CW55HF8NVT*MTY5Njc2OTUzMS4xMzYuMS4xNjk2NzY5ODAxLjQxLjAuMA..",
      mobile:
        "https://firebasestorage.googleapis.com/v0/b/design-6a54f.appspot.com/o/images%2Fpublic%2Fbanner-vlt-mobile.png?alt=media&token=69697449-d760-4023-ba0c-5a1c3c757886&_gl=1*1j63uo1*_ga*MTQwNzE3NjA5NS4xNjg3MTI3OTA2*_ga_CW55HF8NVT*MTY5Njc2OTUzMS4xMzYuMS4xNjk2NzY5NjI4LjQ5LjAuMA..",
    },
  ];

  return (
    <div>
      <Swiper
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 8000 }}
        loop
      >
        {Banners.map((item) => (
          <SwiperSlide key={item.id} className="flex justify-center">
            <img
              src={item.desktop}
              alt={`Banner ${item.id}`}
              className="w-[1280px] h-[468px] lg:block hidden"
            />
            <img
              src={item.tablet}
              alt={`Banner ${item.id}`}
              className="w-full h-[468px] lg:hidden sm:block hidden"
            />
            <img
              src={item.mobile}
              alt={`Banner ${item.id}`}
              className="w-full h-[468px] sm:hidden block"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
