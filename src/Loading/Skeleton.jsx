import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const CardSkeleton = () => {
  return (
    <div
      className="w-full bg-white border border-gray-200 rounded-lg shadow-sm 
                 grid grid-rows-[auto_1fr_auto] h-auto sm:h-[450px] md:h-[420px] lg:h-[400px] p-3 animate-pulse"
    >
      {/* Image Skeleton */}
      <Skeleton className="rounded-lg w-full h-44 sm:h-48 md:h-52 mb-3" />

      {/* Product Info Skeleton */}
      <div className="px-5 flex flex-col gap-2 overflow-hidden">
        <Skeleton className="h-6 w-3/4 rounded" /> {/* Product name */}
        <Skeleton className="h-4 w-1/2 rounded" /> {/* Brand */}
        <Skeleton className="h-5 w-1/3 rounded mt-2" /> {/* Rating */}
      </div>

      {/* Price + Button Skeleton */}
      <div className="px-5 pb-5 mt-auto flex items-center justify-between">
        <Skeleton className="h-6 w-16 rounded" /> {/* Price */}
        <Skeleton className="h-10 w-24 rounded" /> {/* Button */}
      </div>
    </div>
  );
};

export default CardSkeleton;
