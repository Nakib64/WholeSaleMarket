import { Navigation, Pagination, A11y, EffectCoverflow, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { Button } from "@/components/ui/button";

const slides = [
  {
    img: "https://i.ibb.co/Swm4ZwSq/18731150.webp",
    title: "Up to 60% Off!",
    desc: "Grab your favorite items before the sale ends. Limited time only.",
    button: "Shop Now"
  },
  {
    img: "https://i.ibb.co/N23NkwdD/11371020.webp",
    title: "Summer Collection",
    desc: "Fresh styles and vibrant colors to make your summer shine.",
    button: "Explore"
  },
  {
    img: "https://i.ibb.co/35RwBppM/SL-042921-42480-57.webp",
    title: "New Arrivals",
    desc: "Discover the latest trends and must-have pieces.",
    button: "View Collection"
  },
    {
    img: "https://i.ibb.co/N23NkwdD/11371020.webp",
    title: "Summer Collection",
    desc: "Fresh styles and vibrant colors to make your summer shine.",
    button: "Explore"
  },
];

const Slider = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, A11y, EffectCoverflow, Autoplay]}
      effect="coverflow"
      centeredSlides
      grabCursor
      loop
      slidesPerView="auto"
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2,
        slideShadows: false,
      }}
      spaceBetween={30}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      className="w-full max-w-7xl mx-auto"
    >
      {slides.map((slide, idx) => (
        <SwiperSlide key={idx} className="max-w-[90%] md:max-w-[70%]">
          <div className="relative w-full h-[250px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg">
            {/* Background Image */}
            <img
              src={slide.img}
              alt={slide.title}
              className="w-full h-full object-cover"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

            {/* Text Content */}
            <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 text-white max-w-[80%] md:max-w-[50%]">
              <h1 className="text-2xl md:text-5xl font-bold mb-2 drop-shadow-lg">
                {slide.title}
              </h1>
              <p className="text-sm md:text-lg mb-4 opacity-90">
                {slide.desc}
              </p>
              <Button>
                {slide.button}
              </Button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
