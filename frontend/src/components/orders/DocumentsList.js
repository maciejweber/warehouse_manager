import React from "react";
import { useSelector } from "react-redux";

const DocumentsList = ({ documents }) => {
  const user = useSelector((state) => state.auth.user);
  return (
    <div className="bg-white">
      {documents.map((obj, i) => (
        <div key={i} className="flex">
          <div className="flex px-6 py-4 whitespace-nowrap">
            <span className="inline-block h-6 w-6 rounded-full overflow-hidden bg-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                />
              </svg>
            </span>
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-900">
                {obj.author}
              </div>
              <a href={obj.document} className="text-sm text-gray-500">
                {obj.document}
              </a>
            </div>
          </div>
          {user.is_staff || user.email === obj.author ? (
            <div className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <a href="#" className="text-indigo-600 hover:text-indigo-900">
                Usuń
              </a>
            </div>
          ) : (
            ""
          )}
        </div>
      ))}
    </div>
  );
};

export default DocumentsList;
