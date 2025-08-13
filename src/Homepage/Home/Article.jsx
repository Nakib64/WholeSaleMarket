import { Button } from "@/components/ui/button";
import React from "react";
import { FaStar, FaChartBar, FaBoxOpen, FaMobileAlt } from "react-icons/fa";
import { Link } from "react-router";

const features = [
	{
		icon: <FaStar size={50} className="text-yellow-400" />,
		title: "Happy Customer Reviews",
		button: "Read Reviews",
	},
	{
		icon: <FaChartBar size={50} className="text-orange-400" />,
		title: "Grow Your Own Business",
		button: "View Seminar",
	},
	{
		icon: <FaBoxOpen size={50} className="text-green-400" />,
		title: "Great Offers",
		button: "See Your Offers",
	},
	{
		icon: <FaMobileAlt size={50} className="text-blue-400" />,
		title: "Easy Order Process",
		button: "How to Order?",
	},
];

const Features = () => {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
			{features.map((feature, index) => (
				<div
					key={index}
					className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition"
				>
					{feature.icon}
					<h3 className="text-lg font-bold mt-4 mb-2">{feature.title}</h3>
					<Button
						onClick={() => {
							document
								.getElementById("review")
								?.scrollIntoView({ behavior: "smooth" });
						}}
					>
						{feature.button}
					</Button>
				</div>
			))}
		</div>
	);
};

export default Features;
