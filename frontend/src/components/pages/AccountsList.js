import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccounts } from "../../actions/accounts";
import { NavLink } from "react-router-dom";

import TableList from "../accounts/TableList";
import FilterList from "../accounts/FilterList";
import HeaderList from "../accounts/HeaderList";
import Pagination from "../table/Pagination";
import SearchList from "../table/SearchList";
import ListLoader from "../loaders/ListLoader";

const AccountsList = () => {
  const loading = useSelector((state) => state.accounts.loading);
  const accounts = useSelector((state) => state.accounts.accountsList);
  const dispatch = useDispatch();

  const [filterList, setFilterList] = useState("clients");

  const [searchTerm, setSearchTerm] = useState("");
  const [deleted, setDeleted] = useState(false);

  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    dispatch(fetchAccounts());
  }, []);

  const accountsData = useMemo(() => {
    let computedAccounts = accounts;

    if (filterList === "clients") {
      computedAccounts = computedAccounts.filter(
        (obj) => obj.is_staff === false
      );
    } else if (filterList === "employees") {
      computedAccounts = computedAccounts.filter(
        (obj) => obj.is_staff === true
      );
    }

    computedAccounts = computedAccounts.filter(
      (obj) => obj.is_active !== deleted
    );

    if (searchTerm) {
      computedAccounts = computedAccounts.filter(
        (row) =>
          row.email.toLowerCase().indexOf(searchTerm) > -1 ||
          row.name.toLowerCase().indexOf(searchTerm) > -1 ||
          row.phone.toLowerCase().indexOf(searchTerm) > -1
      );
    }

    setTotalItems(computedAccounts.length);

    return computedAccounts.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [filterList, accounts, searchTerm, currentPage, deleted]);
  return (
    <div>
      <div className="flex items-center justify-between h-16">
        <div className="flex">
          <SearchList
            onSearch={(value) => {
              setSearchTerm(value);
              setCurrentPage(1);
            }}
          />
          <FilterList
            onDeleted={() => {
              setDeleted(!deleted);
              setCurrentPage(1);
            }}
          />
          <select
            className="bg-gray-100 border border-white p-2 rounded-lg text-gray-700 flex items-center"
            value={filterList}
            onChange={(e) => setFilterList(e.target.value)}
          >
            <option value="clients">Klienci</option>
            <option value="employees">Pracownicy</option>
          </select>
        </div>
        <NavLink
          to="/add"
          type="button"
          className="bg-gray-100 text-gray-700 text-base px-6 py-2 rounded-lg"
        >
          Nowy klient
        </NavLink>
      </div>
      <div className="flex flex-col ">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <HeaderList />
                {loading ? <ListLoader /> : <TableList data={accountsData} />}
              </table>
            </div>
          </div>
        </div>
      </div>
      <Pagination
        total={totalItems}
        itemsPerPage={ITEMS_PER_PAGE}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default AccountsList;
