import React from 'react'

const OrdersListLoader = () => {
    return (
        <tbody className="bg-white animate-pulse divide-y divide-gray-200">
        <tr className="bg-gray-50">
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center">
            <div className="rounded-full bg-gray-300 h-10 w-10"></div>
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
          <div className="h-4 bg-gray-300 rounded w-4/6"></div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
          <div className="h-4 bg-gray-300 rounded w-4/6"></div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="h-4 bg-gray-300 rounded w-4/6"></div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
          <div className="h-4 bg-gray-300 rounded w-4/6"></div>
          </td>
        </tr>
      </tbody>
    )
}

export default OrdersListLoader
