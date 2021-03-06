import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateAccount } from "../../actions/accounts";

const AccountDetail = ({ match }) => {
  const { accountId } = match.params;
  const history = useHistory();
  const dispatch = useDispatch();

  const account = useSelector((state) =>
    state.accounts.accountsList.find(
      (account) => account.id === Number(accountId)
    )
  );

  const onClick = () => {
    if (account.is_active === true) {
      const client = JSON.stringify({ is_active: false });
      dispatch(updateAccount(account.id, client));
    } else {
      const client = JSON.stringify({ is_active: true });
      dispatch(updateAccount(account.id, client));
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between h-16">
        <div className="flex">
          <button
            onClick={() => history.goBack()}
            className="bg-gray-100 hover:bg-gray-200 border border-white p-2 rounded-lg text-gray-700 flex items-center"
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
        <button
          onClick={onClick}
          type="button"
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-base px-6 py-2 rounded-lg"
        >
          {account.is_active ? "Usuń" : "Przywróć"}
        </button>
      </div>
      <div className="border-b border-gray-200 sm:rounded-lg bg-gray-50 p-4 mb-4">
        <h1 className="m-2 font-bold text-gray-600 border-b border-gray-200 p-2">
          Informacje
        </h1>
        <div className="grid grid-cols-3">
          <div className="col-span-2 p-2">
            <div className="px-2 py-3 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">E-mail</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {account.email}
              </dd>
            </div>

            <div className="p-2 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Nazwa</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {account.name}
              </dd>
            </div>
            <div className="px-2 py-3 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Telefon</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {account.phone}
              </dd>
            </div>
          </div>

          <div className="border-l border-gray-200 p-2">
            <div className="px-2 py-3">
              <dt className="mb-1 text-sm font-medium text-gray-500">
                Data dołączenia
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {account.date_joined}
              </dd>
            </div>
            <div className="px-2 py-3">
              <dt className="mb-1 text-sm font-medium text-gray-500">
                Data ostatniego logowania
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {account.last_login}
              </dd>
            </div>
            <div className="px-2 py-3">
              <dt className="mb-1 text-sm font-medium text-gray-500">Status</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {account.is_active ? (
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Aktywny
                  </span>
                ) : (
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                    Nie aktywny
                  </span>
                )}
              </dd>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetail;
