import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../Context/DataContext';
import trashicon from '/public/imgs/trash-bin-icon.png';

const CartElements = () => {
  const { cart, setCart } = useContext(DataContext);
  const [total, setTotal] = useState(0);
  const [discountedTotal, setDiscountedTotal] = useState(0); // Total con descuento
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
        setDiscountedTotal(discountedTotal); // Guardar el total con descuento
        setDiscountMessage(`Has superado el límite de compra minorista. Se aplica un 20% de descuento.`);
      } else {
        setDiscountedTotal(newTotal); // Sin descuento
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

  // Función para generar el enlace de WhatsApp
  const generateWhatsAppLink = (cart, discountedTotal) => {
    const baseUrl = 'https://api.whatsapp.com/send?phone=543585181780';
    let message = 'Aquí están los productos en mi carrito:\n';

    // Sumar el total de los productos en el carrito
    cart.forEach((product) => {
      message += `- ${product.brand} ${product.model}, Precio: $${product.price}, Color: ${product.color.name}, Talle: ${product.size.name}, Cantidad: ${product.quantity}\n`;
    });

    // Agregar el total con descuento al mensaje
    message += `\nTotal de la compra: $${discountedTotal.toFixed(2)}`;

    const encodedMessage = encodeURIComponent(message);
    return `${baseUrl}&text=${encodedMessage}`;
  };

  const handleWhatsAppShare = () => {
    const link = generateWhatsAppLink(cart, discountedTotal); // Pasa discountedTotal
    window.open(link, '_blank');
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
                <div className='flex'>
                  <h1 className='montserrat mx-1 text-xs'>{product.brand}</h1>
                  <p className='montserrat text-xs'>{product.model}</p>
                </div>
                <div className='flex'>
                  <p className='montserrat text-xs mx-1'>Color: {typeof product.color === 'object' ? product.color.name : product.color}</p>
                  <h4 className='montserrat text-xs'>Talle: {typeof product.size === 'object' ? product.size.name : product.size}</h4>
                </div>
                {/* Botones de incrementar y decrementar */}
                <div className="flex border w-20 rounded-xl items-center space-x-5">
                  <button
                    onClick={() => updateQuantity(product.id, product.color.name, product.size.name, 'decrement')}
                    className="text-gray-800 p-1 rounded hover:bg-gray-400"
                  >
                    -
                  </button>
                  <p className='montserrat'>{product.quantity}</p> {/* Mostrar la cantidad */}
                  <button
                    onClick={() => updateQuantity(product.id, product.color.name, product.size.name, 'increment')}
                    className="text-gray-800 rounded hover:bg-gray-400"
                  >
                    +
                  </button>
                </div>
              </div>
              <div>
                <button
                  onClick={() => removeProduct(product.id, product.color.name, product.size.name)}
                  className='p-2 rounded'
                >
                  <img src={trashicon} className='w-5' alt="" />
                </button>
                <h3 className='montserrat text-xs'>${(product.price * product.quantity).toLocaleString()}</h3>
              </div>
            </div>
          ))}

          {/* Mostrar el mensaje de descuento si corresponde */}
          {discountMessage && <p className="text-green-600 climate-crisis uppercase mt-20 text-xs">{discountMessage}</p>}

          {/* Mostrar el total del carrito */}
          <div className='mt-50 z-100'>
            <div className="border-t flex justify-between text-base font-medium text-gray-900">
              <p className='montserrat'>Subtotal</p>
              <p className='montserrat'>${discountedTotal.toFixed(2)}</p> {/* Mostrar total con descuento */}
            </div>

            {/* Botón para vaciar el carrito */}
            <button
              onClick={clearCart}
              className='mt-4 bg-custom-blue montserrat text-white p-2 rounded'
            >
              Vaciar Carrito
            </button>

            {/* Botón para compartir en WhatsApp */}
            <button
              onClick={handleWhatsAppShare}
              className='mt-4 bg-green-600 montserrat text-white p-2 rounded'
            >
              Enviar carrito a WhatsApp
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartElements;
