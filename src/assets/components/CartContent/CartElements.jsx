import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../Context/DataContext';

const CartElements = () => {
  const { cart, setCart } = useContext(DataContext);
  const [total, setTotal] = useState(0);
  const [discountMessage, setDiscountMessage] = useState('');
  const discountThreshold = 2; // Cantidad mínima para el descuento
  const discountPercentage = 0.2; // 20% de descuento

  // Función para calcular el total y aplicar el descuento
  useEffect(() => {
    const calculateTotal = () => {
      const newTotal = cart.reduce((acc, product) => acc + product.price * product.quantity, 0);
      setTotal(newTotal);
      
      // Contar la cantidad total de productos en el carrito
      const totalQuantity = cart.reduce((acc, product) => acc + product.quantity, 0);
      
      // Aplicar descuento si supera el umbral
      if (totalQuantity > discountThreshold) {
        const discountedTotal = newTotal - (newTotal * discountPercentage);
        setTotal(discountedTotal);
        setDiscountMessage(`Has superado el límite de compra minorista. Se aplica un 20% de descuento.`);
      } else {
        setDiscountMessage('');
      }
    };

    calculateTotal(); // Calcula el total cuando cambia el carrito
  }, [cart]);

  // Función para eliminar un producto del carrito
  const removeProduct = (productId, productColor, productSize) => {
    const updatedCart = cart.filter(
      item => !(item.id === productId && item.color.name === productColor && item.size.name === productSize)
    );
    setCart(updatedCart);
  };

  // Función para actualizar la cantidad de un producto
  const updateQuantity = (productId, productColor, productSize, action) => {
    const updatedCart = cart.map((item) => {
      if (item.id === productId && item.color.name === productColor && item.size.name === productSize) {
        // Aumentar o disminuir la cantidad
        let newQuantity = item.quantity;
        if (action === 'increment') {
          newQuantity += 1;
        } else if (action === 'decrement' && newQuantity > 1) {
          newQuantity -= 1;
        }
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCart(updatedCart); // Actualizar el carrito con la nueva cantidad
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
            <div className='flex items-center justify-between mb-4' key={`${product.id}-${product.color.name}-${product.size.name}`}>
              <img className='w-16' src={product.image} alt={product.model} />
              <div className="flex flex-col">
                <h1 className='montserrat'>{product.brand}</h1>
                <p className='montserrat'>{product.model}</p>
                <h3 className='montserrat'>${(product.price * product.quantity).toLocaleString()}</h3>
                <p className='montserrat'>Color: {typeof product.color === 'object' ? product.color.name : product.color}</p>
                <h4 className='montserrat'>Talle: {typeof product.size === 'object' ? product.size.name : product.size}</h4>

                {/* Botones de incrementar y decrementar */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(product.id, product.color.name, product.size.name, 'decrement')}
                    className="bg-gray-300 text-gray-800 p-2 rounded hover:bg-gray-400"
                  >
                    -
                  </button>
                  <p className='montserrat'>{product.quantity}</p> {/* Mostrar la cantidad */}
                  <button
                    onClick={() => updateQuantity(product.id, product.color.name, product.size.name, 'increment')}
                    className="bg-gray-300 text-gray-800 p-2 rounded hover:bg-gray-400"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => removeProduct(product.id, product.color.name, product.size.name)}
                className='bg-red-500 text-white p-2 rounded'
              >
                Eliminar
              </button>
            </div>
          ))}

          {/* Mostrar el mensaje de descuento si corresponde */}
          {discountMessage && <p className="text-green-600 font-semibold">{discountMessage}</p>}

          {/* Mostrar el total del carrito */}
          <div className='mt-50 z-100'>
            <div className="border-t flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>${total.toFixed(2)}</p> {/* Mostrar total formateado */}
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
