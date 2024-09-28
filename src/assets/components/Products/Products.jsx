import React, { useContext, useState } from 'react';
import { DataContext } from '../Context/DataContext';
import { Dialog, DialogBackdrop, DialogPanel, Radio, RadioGroup } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/20/solid';
import "./cart.css"
const Products = () => {
  const { data, cart, setCart } = useContext(DataContext);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const addProduct = (product) => {
    setCart([...cart, product]);
  };

  const openDialog = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((product) => (
        <div key={product.id} className="border p-4 rounded-lg shadow-lg">
          <img className="w-full h-48 object-cover" src={product.image} alt={product.model} />
          <h1 className="text-xl font-bold">{product.brand}</h1>
          <p className="text-gray-700">{product.model}</p>
          <h3 className="text-lg font-semibold">${product.price}</h3>
          <button onClick={() => openDialog(product)} className="mt-2 p-2 bg-green-500 text-white rounded hover:bg-green-600">
            Ver detalles
          </button>
        </div>
      ))}

      {selectedProduct && (
        <Dialog open={open} onClose={closeDialog} className="relative z-10">
          <DialogBackdrop
            transition
            className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in md:block"
          />
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
              <DialogPanel
                transition
                className="flex w-full transform text-left text-base transition data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in md:my-8 md:max-w-2xl md:px-4 data-[closed]:md:translate-y-0 data-[closed]:md:scale-95 lg:max-w-4xl"
              >
                <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                  <button
                    type="button"
                    onClick={closeDialog}
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                  </button>

                  <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                    <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                      <img alt={selectedProduct.imageAlt} src={selectedProduct.image} className="object-cover object-center" />
                    </div>
                    <div className="sm:col-span-8 lg:col-span-7">
                      <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">{selectedProduct.brand} - {selectedProduct.model}</h2>
                      <p className="text-2xl text-gray-900">${selectedProduct.price}</p>

                      {/* Agrega aquí más detalles del producto si es necesario */}
                      <button
                        onClick={() => addProduct(selectedProduct)}
                        className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent CartBtn px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        <span class="IconContainer"> 
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512" fill="rgb(17, 17, 17)" class="cart"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path></svg>
  </span>
  <p class="text">Add to Cart</p> 
                      </button>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default Products;
