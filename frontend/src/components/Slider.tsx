import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper";
import { Icon } from "@iconify/react";
import SliderItem from "./SliderItem";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-coverflow";

export default function Slider() {
  return (
    <div className="w-4/5 float-left">
      <Swiper
        modules={[Autoplay, EffectCoverflow]}
        spaceBetween={10}
        slidesPerView={1}
        centeredSlides={true}
        loop={true}
        effect={"coverflow"}
        coverflowEffect={{
          rotate: 70,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide className="pt-10">
          <SliderItem
            title="زمان کارهات رو داشته باش!"
            color="#3B82F6"
            icon={<Icon icon="clarity:alarm-clock-line" color="white" />}
          >
            برای اینکه بتونی کارهات رو بهتر مدیریت کنی، می‌تونی زمانی که براشون صرف می‌کنی رو با افزونه ساعت بگیری و
            ثبتشون کنی. اینطوری بهتر میفهمی برای هر کاری چقدر وقت میزاری!
          </SliderItem>
        </SwiperSlide>
        <SwiperSlide className="pt-10">
          <SliderItem
            title="برای کارهات یادآور بزار!"
            color="#22C55E"
            icon={<Icon icon="clarity:notification-outline-badged" color="white" />}
          >
            اگه از اون دسته آدم‌ها هستی که سرت شلوغه و اعصابت از اینکه کارها رو به خاطر بسپاری، خورد میشه میتونی به
            سادگی با ثبت یادآور، با خاطر آسوده به کارهات برسی.
          </SliderItem>
        </SwiperSlide>
        <SwiperSlide className="pt-10">
          <SliderItem
            title="از عملکردت گزارش بگیر!"
            color="#DC2626"
            icon={<Icon icon="bi:file-earmark-bar-graph" color="white" />}
          >
            بعد از اینکه روی کارهای مختلف در طول هفته یا ماه وقت گذاشتی، می‌تونی به سادگی از نحوه عملکردت در بازه‌های
            زمانی مختلف گزارش بگیری! خیلی سریع و کاربرپسند:)
          </SliderItem>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
