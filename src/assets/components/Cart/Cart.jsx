import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from '../Context/DataContext';
import CartContent from '../CartContent/CartContent'; // Asegúrate de tener tu componente de CartContent importado

const Cart = () => {
  const { cart } = useContext(DataContext);
  const [active, setActive] = useState(false);
  const [totalItems, setTotalItems] = useState(0);

  // Función para calcular el número total de productos en el carrito
  useEffect(() => {
    const calculateTotalItems = () => {
      const total = cart.reduce((acc, product) => acc + product.quantity, 0);
      setTotalItems(total);
    };

    calculateTotalItems(); // Calcula el total cada vez que cambia el carrito
  }, [cart]);

  return (
    <header>
      <div className='container-icon'>
        <div
          className='container-cart-icon'
          onClick={() => setActive(!active)}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.2'
            stroke='currentColor'
            className='icon-cart'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
            />
          </svg>

          {/* Número total de productos en el carrito */}
          {totalItems > 0 && (
            <div className="absolute top-0 right-0 w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center text-xs">
              {totalItems}
            </div>
          )}
        </div>

        {/* Slide-over con CartContent */}
        <div className={`fixed inset-0 overflow-hidden z-10 transition-transform duration-500 ${active ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="absolute inset-0 overflow-hidden">
            <div className="fixed inset-0 transition-opacity"></div>
            <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
              <div className="pointer-events-auto w-screen max-w-md">
                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between">
                      <h2 className="text-lg font-medium text-gray-900 climate-crisis">Mi carrito</h2>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                          onClick={() => setActive(false)}
                        >
                          <span className="sr-only">Close panel</span>
                          <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Aquí va el contenido del carrito */}
                    <CartContent />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Cart;


   {/* {Array.isArray(allProducts) && allProducts.length ? ( // Verifica si es un array y tiene elementos
                        <>
                            <div className='row-product'>
                                {allProducts.map(product => (
                                    <div className='cart-product' key={product.id}>
                                        <div className='info-cart-product'>
                                            <span className='cantidad-producto-carrito'>
                                                {product.quantity}
                                            </span>
                                            <p className='titulo-producto-carrito'>
                                                {product.nameProduct}
                                            </p>
                                            <span className='precio-producto-carrito'>
                                                ${product.price}
                                            </span>
                                        </div>
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            fill='none'
                                            viewBox='0 0 24 24'
                                            strokeWidth='1.5'
                                            stroke='currentColor'
                                            className='icon-close'
                                            onClick={() => onDeleteProduct(product)}
                                        >
                                            <path
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                d='M6 18L18 6M6 6l12 12'
                                            />
                                        </svg>
                                    </div>
                                ))}
                            </div>

                            <div className='cart-total'>
                                <h3>Total:</h3>
                                <span className='total-pagar'>${total}</span>
                            </div>

                            <button className='btn-clear-all' onClick={onCleanCart}>
                                Vaciar Carrito
                            </button>
                        </>
                    ) : (
                        <p className='cart-empty'>El carrito está vacío</p>
                    )} */}