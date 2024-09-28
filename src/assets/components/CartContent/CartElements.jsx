import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../Context/DataContext';

const CartElements = () => {
  const { cart, setCart } = useContext(DataContext);
  const [total, setTotal] = useState(0);

  // Función para calcular el total
  useEffect(() => {
    const calculateTotal = () => {
      const newTotal = cart.reduce((acc, product) => acc + product.price * product.quantity, 0);
      setTotal(newTotal);
    };

    calculateTotal(); // Calcula el total cuando cambia el carrito
  }, [cart]);

  // Función para eliminar un producto del carrito
  const removeProduct = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
  };

  // Función para vaciar el carrito
  const clearCart = () => {
    setCart([]);
  };

  return (
    <div>
      {cart.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <>
          {cart.map((product) => (
            <div className='flex items-center justify-between mb-4' key={product.id}>
              <img className='w-16' src={product.image} alt={product.model} />
              <div className="flex flex-col">
                <h1>{product.brand}</h1>
                <p>{product.model}</p>
                <h3>${product.price * product.quantity}</h3> {/* Precio basado en la cantidad */}
                <p>Color: {typeof product.color === 'object' ? product.color.name : product.color}</p>
                <h4>Talla: {typeof product.size === 'object' ? product.size.name : product.size}</h4>
                <p>Cantidad: {product.quantity}</p> {/* Mostrar la cantidad */}
              </div>
              <button
                onClick={() => removeProduct(product.id)}
                className='bg-red-500 text-white p-2 rounded'
              >
                Eliminar
              </button>
            </div>
          ))}

          {/* Mostrar el total del carrito */}
          <div className='mt-50 z-100'>
          <div className="border-t flex justify-between text-base font-medium text-gray-900">
                                            <p>Subtotal</p>
                                            <p>${total}</p>
                                        </div>
          {/* Botón para vaciar el carrito */}
          <button
            onClick={clearCart}
            className='mt-4 bg-red-600 text-white p-2 rounded'
          >
            Vaciar Carrito
          </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartElements;
