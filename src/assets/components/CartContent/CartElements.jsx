import React, { useContext } from 'react';
import { DataContext } from '../Context/DataContext';

const CartElements = () => {
  const {cart} = useContext(DataContext);
    return cart.map((product) => {
    return(
    <div className='flex' key={product.id}>
    <img src={product.image} alt="" /> 
    <h1>{product.brand}</h1>
    <p>{product.model}</p>
    <h3>${product.price}</h3>
    </div>
    )
    }  
  )
}

export default CartElements