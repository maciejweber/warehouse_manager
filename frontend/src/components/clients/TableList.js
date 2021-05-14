import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const TableList = ({ data }) => {
  let history = useHistory();

  const onClick = (id, user) => {
    history.push({
      pathname: "/clients/" + id,
      state: {
        client: user,
      },
    });
  };

  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {data.map((obj) => (
        <tr
          className="bg-gray-50 hover:bg-gray-100"
          key={obj.id}
          onClick={() => onClick(obj.id, obj)}
        >
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="text-gray-400"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-900">
                  {obj.email}
                </div>
              </div>
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">{obj.name}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">{obj.phone}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">
              {obj.is_active === true ? (
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Aktywny
                </span>
              ) : (
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                  Usunięto
                </span>
              )}
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableList;
