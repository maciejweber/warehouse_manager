import React, {useState, useEffect, useMemo} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from '../../actions/orders';
import { Link } from 'react-router-dom';

import Pagination from '../table/Pagination';
import TableList from '../orders/TableList';
import SearchList from '../table/SearchList';
import FilterList from '../orders/FilterList';
import HeaderList from '../orders/HeaderList';
import ListLoader from '../loaders/ListLoader';



const OrdersPage = () => {
  const loading = useSelector(state => state.orders.ordersList.loading)
  const orders = useSelector(state => state.orders.ordersList.orders);
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState('');
  const [completed, setCompleted] = useState(false);

  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sorting, setSorting] = useState({ field: "", order: "" });
  
  const ITEMS_PER_PAGE = 10;

  const headers = [
    {name:"Klient", field:"client", sortable: false},
    {name:"Tytuł", field:"title", sortable: false},
    {name:"Status", field:"status", sortable: false},
    {name:"Planowana data dostawy", field:"scheduled_date", sortable: true},
    {name:"Data ostatniej aktualizacji", field:"updated_at", sortable: true}
  ]

  useEffect(()=>{
    dispatch(fetchOrders());
  }, [])

  const ordersData = useMemo(() => {
    let computedOrders = orders;

    computedOrders = computedOrders.filter(obj => obj.status !== '3');

    if (searchTerm){
      computedOrders = computedOrders.filter((row) =>
        row.title.toLowerCase().indexOf(searchTerm) > -1 ||
        row.title.toLowerCase().indexOf(searchTerm) > -1

        
      );
    }

    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedOrders = computedOrders.sort(
          (a, b) =>
              reversed * a[sorting.field].localeCompare(b[sorting.field])
      );
    }

    setTotalItems(computedOrders.length);

    return computedOrders.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [orders, searchTerm, currentPage, completed, sorting])

  return (
    <div>
      <div className="flex items-center justify-between h-16">
          <div className="flex">
              <SearchList
              onSearch={(value)=>{
                setSearchTerm(value);
                setCurrentPage(1);
              }}/>
              <FilterList
                onCompleted={()=>{
                  setCompleted(!completed)
                  setCurrentPage(1);
                }}/>
          </div>
          <Link to='/orders/add' type="button" className="bg-gray-100 text-gray-700 text-base px-6 py-2 rounded-lg">Dodaj zlecenie</Link>
      </div>
      <div className="flex flex-col ">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <HeaderList 
                  headers={headers}
                  onSorting={(field, order) =>
                    setSorting({ field, order })
                }
                />
                {loading ? 
                <ListLoader/>
                :
                <TableList data={ordersData}/>
                }
              </table>
            </div>
          </div>
        </div>
      </div>
      <Pagination
        total={totalItems}
        itemsPerPage={ITEMS_PER_PAGE}
        currentPage={currentPage}
        onPageChange={page => setCurrentPage(page)}/>
    </div>
        
    )
}

export default OrdersPage;
