import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddOrder = () => {
    const [title, setTitle] = useState();
    const [startDate, setStartDate] = useState(new Date());
    return (
        <div>
        <div className="flex items-center justify-between h-16">
            <div className="flex">
            <button onClick={() => history.goBack()} className="bg-gray-100 border border-white p-2 rounded-lg text-gray-700 flex items-center">
              <svg width="24" height="24" viewBox="0 0 16 16">
                <path d="M9 4 L5 8 L9 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
              </svg>
              <span className="mx-2">Wróć</span>
            </button>
            </div>
        </div>
        <div className="border-b border-gray-200 sm:rounded-lg bg-gray-50 p-4">
          <h1 className="m-2 font-bold text-gray-600 border-b border-gray-200 p-2">Dodaj klienta</h1>
            <div className="m-4 relative rounded-md">
              <input 
                className="focus:ring-indigo-500 focus:border-indigo-500 block pl-7 pr-12 sm:text-sm rounded-md"
                type="text"
                name="title"
                id="title"
                placeholder="Tytuł"
                />
            </div>
            <div className="m-4 relative rounded-md">
              <DatePicker
                  selected={startDate}
                  onChange={date => setStartDate(date)}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block pl-7 pr-12 sm:text-sm rounded-md"
              />
            </div>
            <button type="button" className="bg-gray-300 hover:bg-gray-400 text-gray-700 text-base px-6 py-2 m-2 rounded-lg">Dodaj klienta</button>
  
        </div>
        </div>
    )
}

export default AddOrder;
