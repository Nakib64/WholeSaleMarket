import {
	Navigation,
	Pagination,
	A11y,
	EffectCoverflow,
	Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { Button } from "@/components/ui/button";

const slides = [
	{
		img: "https://wholesalecart.com/static/media/offer_card_3.57b8457f.png",
	},
	{
		img: "https://wholesalecart.com/static/media/offer_card_2.00a962d8.jpg",
	},
]

const SideSlider = () => {
	return (
		<Swiper
			modules={[Navigation, Pagination, A11y, EffectCoverflow, Autoplay]}
			grabCursor
			loop
			slidesPerView="auto"
			 direction={'vertical'}

			autoplay={{ delay: 1000 }}
			className="h-90 w-xs mx-auto"
		>
			{slides.map((slide, idx) => (
				<SwiperSlide key={idx} className="">
					<div className="relative h-full w-auto  overflow-hidden shadow-lg">
						{/* Background Image */}
						<img src={slide.img} className="w-full h-full object-cover" />
					</div>
				</SwiperSlide>
			))}
		</Swiper>
	);
};

export default SideSlider;
