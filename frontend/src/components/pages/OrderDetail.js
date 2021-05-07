import React, {useEffect, useState} from 'react'
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchDetailOrder } from '../../actions/orders';
import { changeStatus } from '../../actions/orders';


export const OrderDetail = ({ match }) => {
    const { orderId } = match.params
    const history = useHistory();
    const dispatch = useDispatch();
    
    const order = useSelector(state => state.orders.orders.find((order) => order.id === Number(orderId)))
    const is_staff = useSelector(state => state.auth.user.is_staff)
    
    const [status, setStatus] = useState(order.status)

    const onChange = (e) => {
      setStatus(e.target.value)
      const order = JSON.stringify({status: e.target.value})
      dispatch(changeStatus(orderId, order))
    }
  

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
          {is_staff &&
            <select value={status} onChange={onChange} className="bg-gray-100 border border-white p-2 rounded-lg text-gray-700 flex items-center">
              <option value='1'>Oczekiewanie na dostawę</option>
              <option value='2'>W magazynie</option>
              <option value='3'>Wydano</option>
            </select>
          }
        </div>
          <div className="border-b border-gray-200 sm:rounded-lg bg-gray-50 p-4 mb-4">
              {/* Details order */}
              <h1 className="m-2 font-bold text-gray-600 border-b border-gray-200 p-2">Informacje</h1>
              <div className="grid grid-cols-3">
                <div className="col-span-2 p-2">
                  <div className="px-2 py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500">
                      Nazwa
                    </dt>
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

                  {!is_staff &&
                  <div className="px-2 py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500">
                      Status
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {order.status === '1' ?
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Oczekiwanie na dostawe
                        </span> : order.status === '2' ?
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        W magazynie
                        </span> : 
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        Wydano
                        </span>                           
                      }
                    </dd>
                  </div>
                  }
                </div>
  
                <div className="border-l border-gray-200 p-2">
                  <div className="px-2 py-3">
                      <dt className="mb-1 text-sm font-medium text-gray-500">
                        Imię
                      </dt>
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
              </div>
              {/* End detail orders */}
  
              Comments
              <h1 className="m-2 font-bold text-gray-600 border-b border-gray-200 p-2">Komentarze ({order.comments.length})</h1>


                {order.comments.map((comment)=>
                <div className="flex items-center p-2" key={comment.id}>
                  <span className="inline-block h-10 w-10 rounded-full overflow-hidden bg-gray-100">
                    <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </span>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {comment.author}
                    </div>
                    <div className="text-sm text-gray-500">
                      {comment.content}
                    </div>
                    <div className="text-sm text-gray-500 font-normal">
                      {comment.created_date}
                    </div>
                  </div>
                </div>
                )}

                {/* End Comments */}
  
              {/* Documents */}
              <h1 className="m-2 font-bold text-gray-600 border-b border-gray-200 p-2">Dokumenty ({order.documents.length})</h1>

              {order.documents.map((document)=>
              <div className="flex items-center p-2">
                <span className="inline-block h-6 w-6 rounded-full overflow-hidden bg-gray-100">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-400">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                </span>
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">
                    {document.author}
                  </div>
                  <div className="text-sm text-gray-500">
                    {document.document}
                  </div>
                </div>
              </div>
              )}

              {/* End Documents */}
  
          </div>
    
      </div>
    )
}