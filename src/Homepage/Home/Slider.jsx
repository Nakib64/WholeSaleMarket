import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Slider = () => {
	return (
		<Swiper
			modules={[Navigation, Pagination, Scrollbar, A11y]}
			spaceBetween={50}
			slidesPerView={1}
			navigation
			pagination={{ clickable: true }}
			className="w-full rounded-2xl"
		>
			<SwiperSlide>
				<div className="relative w-full h-[250px] md:h-[500px]">
					<img
						src="https://i.ibb.co/Swm4ZwSq/18731150.jpg"
						alt=""
						className="w-full h-full object-cover rounded-2xl"
					/>
					<h1 className="absolute top-1/2 right-1/6 transform -translate-y-1/2 text-xl md:text-5xl font-bold text-white shadow-md">
						Up to 60% Off!
					</h1>
				</div>
			</SwiperSlide>

			<SwiperSlide>
				<div className="relative w-full h-[250px] md:h-[500px]">
					<img
						src="https://i.ibb.co/N23NkwdD/11371020.jpg"
						alt=""
						className="w-full h-full object-cover rounded-2xl"
					/>
				</div>
			</SwiperSlide>

			<SwiperSlide>
				<div className="relative w-full h-[250px] md:h-[500px]">
					<img
						src="https://i.ibb.co/35RwBppM/SL-042921-42480-57.jpg"
						alt=""
						className="w-full h-full object-cover rounded-2xl"
					/>
				</div>
			</SwiperSlide>
		</Swiper>
	);
};

export default Slider;
