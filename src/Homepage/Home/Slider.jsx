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
			// install Swiper modules
			modules={[Navigation, Pagination, Scrollbar, A11y]}
			spaceBetween={50}
			slidesPerView={1}
			navigation
			pagination={{ clickable: true }}
			className="w-full "
		>
      <SwiperSlide>
				<div className="w-full">
					<img
						src="https://i.ibb.co/k6wx2HSp/18731150.jpg"
						alt=""
						className="w-full object-cover"
					/>
          <h1 className="text-2xl md:text-6xl text-center absolute top-1/2 right-1/6 font-bold">Up to 60% Off!</h1>
				</div>
			</SwiperSlide>
			<SwiperSlide>
				<div className="w-full">
					<img
						src="https://i.ibb.co/GvQm3vPH/11371020.jpg"
						alt=""
						className="w-full h-full"
					/>
				</div>
			</SwiperSlide>
			<SwiperSlide>
				<div className="w-full">
					<img
						src="https://i.ibb.co/zWRpj3Dj/SL-042921-42480-57.jpg"
						alt=""
						className="w-full"
					/>
				</div>
			</SwiperSlide>
			
		</Swiper>
	);
};
export default Slider;
