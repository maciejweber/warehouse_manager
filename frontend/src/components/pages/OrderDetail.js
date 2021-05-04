import React, {useEffect} from 'react'
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchDetailOrder } from '../../actions/orders';

export const OrderDetail = () => {
    const order = useSelector(state => state.orders.activeOrder.order)
    const comments = useSelector(state => state.orders.activeOrder.order.comments)
    const documents = useSelector(state => state.orders.activeOrder.order.documents)
    const loading = useSelector(state => state.orders.activeOrder.loading)
    const dispatch = useDispatch();
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        dispatch(fetchDetailOrder(id));
    }, [])
    
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
        {loading ? 'loading':
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
  
              {/* Comments */}
              <h1 className="m-2 font-bold text-gray-600 border-b border-gray-200 p-2">Komentarze ({comments.length})</h1>


                {comments.map((comment)=>
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
              <h1 className="m-2 font-bold text-gray-600 border-b border-gray-200 p-2">Dokumenty ({documents.length})</h1>

              {documents.map((document)=>
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
    }
      </div>
    )
}