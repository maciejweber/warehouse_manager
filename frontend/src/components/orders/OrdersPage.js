import React, {useState, useEffect, useMemo} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

const OrdersPage = () => {
  return (
    <div className="bg-green-500">
      <h1 className="text-xl leading-tight">OrderPage</h1>
      <Link to='/orders'>Przejdz do detali</Link>
    </div>
        
    )
}

export default OrdersPage;
