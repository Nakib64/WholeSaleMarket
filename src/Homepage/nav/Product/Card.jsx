
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { FaStar, FaRegStar } from "react-icons/fa";

const Card = ({ product }) => {
	const { image, name, brand, price, rating, _id } = product;

	// Generate stars based on rating
	const renderStars = (rating) => {
		return Array.from({ length: 5 }, (_, i) =>
			i < rating ? (
				<FaStar key={i} className="text-yellow-400 text-sm" />
			) : (
				<FaRegStar key={i} className="text-gray-300 text-sm" />
			)
		);
	};

	return (
		<div className="w-full bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
			{/* Image */}
			<div className="h-40 sm:h-46 md:h-54 flex items-center justify-center bg-gray-50">
				<img
					className="w-full h-full object-contain p-2"
					src={image}
					onError={(e) => {
						e.target.onerror = null;
						e.target.src =
							"https://i.ibb.co/tpFRRSSV/depositphotos-531920820-stock-illustration-photo-available-vector-icon-default.webp";
					}}
					alt={name}
				/>
			</div>

			{/* Content */}
			<div className="p-2 flex flex-col gap-2">
				<h5
					className="text-lg font-semibold text-gray-800 truncate"
					title={name}
				>
					{name}
				</h5>
				<p className="text-sm text-gray-500">
					Brand: <span className="italic">{brand}</span>
				</p>
				<div className="flex items-center gap-1">{renderStars(rating)}</div>

				{/* Price + Button */}
				<div className=" flex items-center justify-between">
					<span className="text-xl font-bold text-[#8dc63f]">
						${price}
					</span>
					
				</div>
				<div className="p-2">
					<Link to={`/details/${_id}`}>
						<Button className={'w-full'}>Details</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Card;
