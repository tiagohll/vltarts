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
        "https://cdn.discordapp.com/attachments/919607313139134484/1133398299810996294/bannersVLT.png",
      tablet:
        "https://cdn.discordapp.com/attachments/919607313139134484/1135581111909626007/bannersVLTtablet.png",
      mobile:
        "https://cdn.discordapp.com/attachments/919607313139134484/1135581111611822120/bannersVLTmbl.png",
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
              className="w-[1280px] h-[468px]"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
