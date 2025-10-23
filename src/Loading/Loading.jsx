import { Loader2, Package, CheckCircle } from "lucide-react";

// Custom CSS for staggered pulse animation using arbitrary values
// This is necessary to create the sequential loading effect inherent in the design.
 const Loading = ({ loadingText = "Loading  Data..." }) => {
	return (
		<div className="flex flex-col items-center justify-center  backdrop-blur-md rounded-xl shadow-2xl  h-screen w-full">
			{/* Loading Icon and Text */}
			<div className="flex items-center space-x-3 mb-6">
				<Package className="w-6 h-6 text-blue-600 dark:text-blue-400" />
				<p className="text-xl font-semibold text-gray-700 dark:text-gray-200 tracking-wider">
					{loadingText}
				</p>
			</div>

			{/* The Staggered Pulse Loader */}
			{/* The '[animation-delay]' is using Tailwind's arbitrary value feature for the pulse delay. */}
			<div className="flex space-x-3">
				<div className="w-4 h-4 bg-blue-600 dark:bg-blue-400 rounded-full animate-pulse [animation-duration:1.5s] [animation-delay:0ms]"></div>
				<div className="w-4 h-4 bg-blue-600 dark:bg-blue-400 rounded-full animate-pulse [animation-duration:1.5s] [animation-delay:200ms]"></div>
				<div className="w-4 h-4 bg-blue-600 dark:bg-blue-400 rounded-full animate-pulse [animation-duration:1.5s] [animation-delay:400ms]"></div>
			</div>
		</div>
	);
};
export default Loading