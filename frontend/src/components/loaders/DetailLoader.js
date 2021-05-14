import React from "react";

const OrderDetailLoading = () => {
  return (
    <div className="border-b animate-pulse border-gray-200 sm:rounded-lg bg-gray-50 p-4 mb-4">
      <div class="h-4 bg-gray-200 rounded w-1/6 border-b border-gray-200 p-2 m-2"></div>
      <div className="grid grid-cols-3">
        <div className="col-span-2 p-2">
          <div className="px-2 py-3 sm:grid sm:grid-cols-3 sm:gap-4">
            <div class="h-4 bg-gray-200 rounded w-1/2 border-b border-gray-200"></div>
            <div class="h-4 bg-gray-200 rounded w-1/2 border-b border-gray-200"></div>
          </div>

          <div className="p-2 sm:grid sm:grid-cols-3 sm:gap-4">
            <div class="h-4 bg-gray-200 rounded w-1/2 border-b border-gray-200"></div>
            <div class="h-4 bg-gray-200 rounded w-1/2 border-b border-gray-200"></div>
          </div>
          <div className="px-2 py-3 sm:grid sm:grid-cols-3 sm:gap-4">
            <div class="h-4 bg-gray-200 rounded w-1/2 border-b border-gray-200"></div>
            <div class="h-4 bg-gray-200 rounded w-1/2 border-b border-gray-200"></div>
          </div>
        </div>

        <div className="border-l border-gray-200 p-2">
          <div className="px-2 py-3">
            <div class="my-1 h-4 bg-gray-200 rounded w-1/4 border-b border-gray-200"></div>
            <div class="my-1 h-4 bg-gray-200 rounded w-2/5 border-b border-gray-200"></div>
          </div>
          <div className="px-2 py-3">
            <div class="my-1 h-4 bg-gray-200 rounded w-1/4 border-b border-gray-200"></div>
            <div class="my-1 h-4 bg-gray-200 rounded w-2/5 border-b border-gray-200"></div>
          </div>
          <div className="px-2 py-3">
            <div class="my-1 h-4 bg-gray-200 rounded w-1/4 border-b border-gray-200"></div>
            <div class="my-1 h-4 bg-gray-200 rounded w-2/5 border-b border-gray-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailLoading;
