import React, {useState, useEffect, useMemo} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { fetchClients } from '../../actions/clients';
import { Link } from 'react-router-dom';

import TableList from '../clients/TableList';
import FilterList from '../clients/FilterList';
import HeaderList from '../clients/HeaderList';
import Pagination from '../table/Pagination';
import SearchList from '../table/SearchList';
import ListLoader from '../loaders/ListLoader';

const Clients = () => {
    const loading = useSelector(state => state.clients.loading)
    const clients = useSelector(state => state.clients.clientsList);
    const dispatch = useDispatch();
  
    const [searchTerm, setSearchTerm] = useState('');
    const [deleted, setDeleted] = useState(false);
  
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    
    const ITEMS_PER_PAGE = 10;
  
    useEffect(()=>{
      dispatch(fetchClients());
    }, [])
  
    const clientsData = useMemo(() => {
      let computedClients = clients;
  
      computedClients = computedClients.filter(obj => obj.is_active !== deleted);
  
      if (searchTerm){
        computedClients = computedClients.filter((row) =>
          row.email.toLowerCase().indexOf(searchTerm) > -1 ||
          row.name.toLowerCase().indexOf(searchTerm) > -1 ||
          row.phone.toLowerCase().indexOf(searchTerm) > -1
        );
      }
  
      setTotalItems(computedClients.length);
  
      return computedClients.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
      );
    }, [clients, searchTerm, currentPage, deleted])
  
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
                  onDeleted={()=>{
                    setDeleted(!deleted)
                    setCurrentPage(1);
                  }}/>
            </div>
            <Link to='/orders/add' type="button" className="bg-gray-100 text-gray-700 text-base px-6 py-2 rounded-lg">Nowy klient</Link>
        </div>
        <div className="flex flex-col ">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <HeaderList/>
                  {loading ? 
                  <ListLoader/>
                  :
                  <TableList data={clientsData}/>
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

export default Clients;
