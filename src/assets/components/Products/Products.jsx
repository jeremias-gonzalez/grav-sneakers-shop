import React, { useContext } from 'react';
import { DataContext } from '../Context/DataContext';

const Products = () => {
  const { data ,cart ,setCart } = useContext(DataContext);
  
  const addProduct = (product) =>{
    setCart([...cart,product]);
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((product) => (
        <div key={product.id} className="border p-4 rounded-lg shadow-lg">
          <img className="w-full h-48 object-cover" src={product.image} alt={product.model} />
          <h1 className="text-xl font-bold">{product.brand}</h1>
          <p className="text-gray-700">{product.model}</p>
          <h3 className="text-lg font-semibold">${product.price}</h3>
          <button onClick={()=> addProduct(product)} className="mt-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Agregar al carrito
          </button>
        </div>
      ))}
    </div>
  );
};

export default Products;
