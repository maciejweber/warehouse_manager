import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../actions/comments";
import { changeStatus } from "../../actions/orders";
import CommentsList from "../orders/CommentsList";
import DocumentsList from "../orders/DocumentsList";

export const OrderDetail = ({ match }) => {
  const { orderId } = match.params;
  const history = useHistory();
  const dispatch = useDispatch();

  const order = useSelector((state) =>
    state.orders.orders.find((order) => order.id === Number(orderId))
  );
  const is_staff = useSelector((state) => state.auth.user.is_staff);

  const [status, setStatus] = useState(order.status);
  const [comment, setComment] = useState("");

  const onChange = (e) => {
    setStatus(e.target.value);
    const order = JSON.stringify({ status: e.target.value });
    dispatch(changeStatus(orderId, order));
  };

  const newComment = (e) => {
    e.preventDefault();
    const data = JSON.stringify({ content: comment, order: order.id });
    dispatch(addComment(data));
    setComment("");
  };

  return (
    <div>
      <div className="flex items-center justify-between h-16">
        <div className="flex">
          <button
            onClick={() => history.goBack()}
            className="bg-gray-100 border border-white p-2 rounded-lg text-gray-700 flex items-center"
          >
            <svg width="24" height="24" viewBox="0 0 16 16">
              <path
                d="M9 4 L5 8 L9 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>
            <span className="mx-2">Wróć</span>
          </button>
        </div>
        {is_staff && (
          <select
            value={status}
            onChange={onChange}
            className="bg-gray-100 border border-white p-2 rounded-lg text-gray-700 flex items-center"
          >
            <option value="1">Oczekiewanie na dostawę</option>
            <option value="2">W magazynie</option>
            <option value="3">Wydano</option>
          </select>
        )}
      </div>
      <div className="border-b border-gray-200 sm:rounded-lg bg-gray-50 p-4 mb-4">
        {/* Details order */}
        <h1 className="m-2 font-bold text-gray-600 border-b border-gray-200 p-2">
          Informacje
        </h1>
        <div className="grid grid-cols-3">
          <div className="col-span-2 p-2">
            <div className="px-2 py-3 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Nazwa</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {order.title}
              </dd>
            </div>

            <div className="p-2 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">
                Data utworzenia
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {order.created_date}
              </dd>
            </div>
            <div className="px-2 py-3 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">
                Planowana data dostawy
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {order.scheduled_date}
              </dd>
            </div>

            {!is_staff && (
              <div className="px-2 py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Status</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {order.status === "1" ? (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      Oczekiwanie na dostawe
                    </span>
                  ) : order.status === "2" ? (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      W magazynie
                    </span>
                  ) : (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      Wydano
                    </span>
                  )}
                </dd>
              </div>
            )}
          </div>

          {is_staff && (
            <div className="border-l border-gray-200 p-2">
              <div className="px-2 py-3">
                <dt className="mb-1 text-sm font-medium text-gray-500">Imię</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {order.author.name}
                </dd>
              </div>
              <div className="px-2 py-3">
                <dt className="mb-1 text-sm font-medium text-gray-500">
                  E-mail
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {order.author.email}
                </dd>
              </div>
              <div className="px-2 py-3">
                <dt className="mb-1 text-sm font-medium text-gray-500">
                  Ostatnie logowanie
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {order.author.last_login}
                </dd>
              </div>
            </div>
          )}
        </div>
        {/* End detail orders */}
        <h1 className="m-2 font-bold text-gray-600 border-b border-gray-200 p-2">
          Komentarze ({order.comments.length})
        </h1>
        <CommentsList comments={order.comments} />

        <form className="w-full max-w-sm" onSubmit={newComment}>
          <div className="flex items-center border-b border-teal-500 py-2">
            <input
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              placeholder="Komentarz"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              type="submit"
              className="bg-gray-100 border border-white p-2 rounded-lg text-gray-700 flex items-center"
            >
              Dodaj
            </button>
          </div>
        </form>

        {/* End Comments */}
        {/* Documents */}
        <h1 className="m-2 font-bold text-gray-600 border-b border-gray-200 p-2">
          Dokumenty ({order.documents.length})
        </h1>
        <DocumentsList documents={order.documents} />
        {/* End Documents */}
      </div>
    </div>
  );
};
