import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { newOrder } from "../../actions/orders";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const AddOrder = () => {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = () => {
    if (title && startDate) {
      const scheduled_date = moment(startDate).format("YYYY-MM-DD");
      const order = { title, scheduled_date };
      dispatch(newOrder(order));
      history.push("/");
    }
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
      </div>
      <div className="border-b border-gray-200 sm:rounded-lg bg-gray-50 p-4">
        <h1 className="m-2 font-bold text-gray-600 border-b border-gray-200 p-2">
          Nowe zlecenie
        </h1>
        <div className="m-4 relative rounded-md">
          <input
            className="focus:ring-indigo-500 focus:border-indigo-500 block px-6 py-2 sm:text-sm rounded-md"
            type="text"
            name="title"
            id="title"
            placeholder="Tytuł"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="m-4 relative rounded-md">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="dd/MM/yyyy"
            className="focus:ring-indigo-500 focus:border-indigo-500 block px-6 py-2 sm:text-sm rounded-md"
          />
        </div>
        <button
          onClick={onSubmit}
          type="button"
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 text-base px-6 py-2 m-2 rounded-lg"
        >
          Dodaj zlecenie
        </button>
      </div>
    </div>
  );
};

export default AddOrder;
