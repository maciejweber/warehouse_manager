import React, {useState, useEffect, useMemo} from 'react'
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { fetchOrders } from '../../actions/orders';

export const OrderDetail = () => {
    const loading = useSelector(state => state.orders.loading)
    const orders = useSelector(state => state.orders.orders);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchOrders());
    }, [])
  
    return (
      <div>
          <h1>OrderDetail</h1>
          <Link to='/'>Przejdz na strone glowna</Link>
          { loading ? <h1>Loading...</h1>:
          orders.map(order=><h1 key={order.id}>{order.title}</h1>)
          }
    </div>
    )
}