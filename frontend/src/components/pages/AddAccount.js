import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addAccount } from "../../actions/accounts";

const AddAccount = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [employee, setEmployee] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();
    if (email && name && phone) {
      const account = { email, name, phone, is_staff: employee };
      dispatch(addAccount(account));
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
          Nowy klient
        </h1>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="m-4 relative rounded-md">
            <input
              className="focus:ring-indigo-500 focus:border-indigo-500 block px-6 py-2 sm:text-sm rounded-md"
              type="text"
              name="email"
              id="email"
              placeholder="E-mail"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="m-4 relative rounded-md">
            <input
              className="focus:ring-indigo-500 focus:border-indigo-500 block px-6 py-2 sm:text-sm rounded-md"
              type="text"
              name="name"
              id="name"
              placeholder="Nazwa/Imię i nazwisko"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="m-4 relative rounded-md">
            <input
              className="focus:ring-indigo-500 focus:border-indigo-500 block px-6 py-2 sm:text-sm rounded-md"
              type="text"
              name="phone"
              id="phone"
              placeholder="Numer telefonu"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="m-4 relative rounded-md">
            <label>
              <input
                type="checkbox"
                className="form-checkbox px-6 py-2 my-auto"
                defaultChecked={employee}
                onChange={() => setEmployee(!employee)}
              />
              <span className="ml-2">Pracownik</span>
            </label>
          </div>
          <button
            type="submit"
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 text-base px-6 py-2 m-2 rounded-lg"
          >
            Dodaj użytkownika
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAccount;
