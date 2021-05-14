import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteComment } from "../../actions/comments";

const CommentsList = ({ comments }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="bg-white">
      {comments.map((obj, i) => (
        <div key={i} className="flex">
          <div className="flex px-6 py-4 whitespace-nowrap">
            <span className="inline-block h-10 w-10 rounded-full overflow-hidden bg-gray-100">
              <svg
                className="h-full w-full text-gray-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </span>
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-900">
                {obj.author}
              </div>
              <div className="text-sm text-gray-500">{obj.content}</div>
              <div className="text-sm text-gray-500 font-normal">
                {obj.created_date}
              </div>
            </div>
          </div>
          {user.is_staff || user.email === obj.author ? (
            <div className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button
                onClick={() => dispatch(deleteComment(obj.id))}
                type="submit"
                className="text-indigo-600 hover:text-indigo-900"
              >
                Usuń
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentsList;
