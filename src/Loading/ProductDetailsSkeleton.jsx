import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ProductDetailsSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-lg shadow-md animate-pulse">
      {/* Product Image & Info */}
      <div className="mb-10">
        <Skeleton className="w-full max-w-full h-64 md:h-[400px] md:w-[400px] rounded-lg mx-auto mb-4" />
        <Skeleton className="h-8 w-3/4 mx-auto mb-2 rounded" /> {/* Name */}
        <Skeleton className="h-4 w-5/6 mx-auto mb-2 rounded" /> {/* Description */}
        <Skeleton className="h-4 w-1/2 mx-auto mb-1 rounded" /> {/* Brand */}
        <Skeleton className="h-4 w-1/3 mx-auto mb-1 rounded" /> {/* Rating */}
        <Skeleton className="h-6 w-1/4 mx-auto mb-1 rounded" /> {/* Price */}
        <Skeleton className="h-4 w-2/3 mx-auto mb-1 rounded" /> {/* Available Quantity */}
        <Skeleton className="h-4 w-2/3 mx-auto mb-1 rounded" /> {/* Minimum Quantity */}
      </div>

      {/* Order Form */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
        <Skeleton className="h-8 w-1/3 mb-6 rounded" /> {/* Confirm Your Order Title */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Read-only fields */}
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex flex-col">
              <Skeleton className="h-4 w-2/3 mb-1 rounded" /> {/* Label */}
              <Skeleton className="h-10 w-full rounded" /> {/* Input */}
            </div>
          ))}

          {/* Buying Quantity Input */}
          <div className="flex flex-col">
            <Skeleton className="h-4 w-2/3 mb-1 rounded" /> {/* Label */}
            <Skeleton className="h-10 w-full rounded" /> {/* Input */}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex flex-col md:flex-row gap-4 mt-6">
          <Skeleton className="h-12 w-full md:w-1/2 rounded" />
          <Skeleton className="h-12 w-full md:w-1/2 rounded" />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
