import React, { useContext, useState } from 'react';
import { DataContext } from '../Context/DataContext';
import { Dialog, DialogBackdrop, DialogPanel, Radio, RadioGroup } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import "./cart.css";
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import SliderDetail from '../SliderDetail/SliderDetail';
import check from '../../../imgs/check.png'

const Products = () => {
  const { data, cart, setCart } = useContext(DataContext);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const addProduct = (product) => {
    const existingProduct = cart.find(item => 
      item.id === product.id && 
      item.color.name === selectedColor.name && 
      item.size.name === selectedSize.name
    );

    if (existingProduct) {
      const updatedCart = cart.map(item =>
        item.id === product.id && item.color.name === selectedColor.name && item.size.name === selectedSize.name
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      setCart(updatedCart);
    } else {
      const cartItem = {
        id: product.id,
        brand: product.brand,
        model: product.model,
        price: product.price,
        color: selectedColor,
        size: selectedSize,
        image: product.image,
        quantity: quantity,
      };
      setCart([...cart, cartItem]);
    }

    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
    setQuantity(1);
  };

  const openDialog = (product) => {
    setSelectedProduct(product);
    setSelectedColor(null);
    setSelectedSize(null);
    setQuantity(1);
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
    setSelectedProduct(null);
    setSelectedColor(null);
    setSelectedSize(null);
    setQuantity(1);
  };

  return (
    <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
<div className="grid grid-cols-2 gap-6 mt-10 lg:mt-16 lg:gap-4 lg:grid-cols-4">
  {data.map((product) => (
    <div key={product.id} className="relative group bg-white p-4 transition-all ">
      <div className="overflow-hidden rounded-md">
        <img
          className="object-cover w-full h-full rounded-md transition-transform duration-300 group-hover:scale-105"
          src={product.image}
          alt={product.model}
        />
      </div>
      <div className="mt-4">
        <h3 className="text-sm montserrat text-gray-800 group-hover:text-custom-blue">
          {product.brand}
        </h3>
        <p className="text-xs montserrat text-gray-500 mt-1">{product.model}</p>
        <p className="text-base montserrat text-gray-900 mt-2">${product.price}</p>
      </div>
      <div className="mt-4">
        <button
          onClick={() => openDialog(product)}
          className="w-full p-2 bg-custom-blue text-white rounded-md text-sm montserrat hover:bg-white hover:text-custom-blue border border-custom-blue transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom-blue"
        >
          Comprar
        </button>
      </div>
    </div>
  ))}



      {selectedProduct && (
        <Dialog open={open} onClose={closeDialog} className="relative z-10">
          <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75" />
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex   items-stretch justify-center text-center">
              <DialogPanel className="flex w-[90vw] transition  transform text-left text-base transition">
                <div className="relative flex w-full rounded-xl my-10 items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                  <button
                    type="button"
                    onClick={closeDialog}
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-500"
                  >
                    <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                  </button>
                  <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                  {/* <SliderDetail images={selectedProduct.images} /> */}
                  <img className='w-[100vw] h-[50vh]' src={selectedProduct.image}alt="" />
                    <div className="sm:col-span-8 lg:col-span-7">
                      <h2 className="text-2xl montserrat text-gray-900 sm:pr-12">{selectedProduct.brand} - {selectedProduct.model}</h2>
                      <p className="text-2xl montserrat text-gray-900">${selectedProduct.price}</p>

                      <form>
                                                {/* Colors */}
                     <fieldset aria-label="Choose a color">
                          <legend className="text-sm montserrat text-gray-900">Color</legend>
                          <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-4 flex items-center space-x-3">
                            {selectedProduct.colors && selectedProduct.colors.length > 0 ? (
                              selectedProduct.colors.map((color) => (
                                <Radio
                                  key={color.name}
                                  value={color}
                                  aria-label={color.name}
                                  className={classNames(
                                    'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none',
                                    color === selectedColor ? `ring-2 ring-offset-2 ${color.selectedClass}` : ''
                                  )}
                                >
                                  <span
                                    aria-hidden="true"
                                    className={classNames(
                                      color.class,
                                      'h-8 w-8 rounded-full border border-black border-opacity-10'
                                    )}
                                  />
                                </Radio>
                              ))
                            ) : (
                              <p>No hay colores disponibles</p>
                            )}
                          </RadioGroup>
                        </fieldset>

                        {/* Sizes */}
                        <fieldset aria-label="Choose a size" className="mt-10">
                          <div className="flex items-center justify-between">
                            <div className="text-sm montserrat text-gray-900">Talles</div>
                          </div>

                          <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4 grid grid-cols-4 gap-4">
                            {selectedProduct.sizes.length > 0 ? (
                              selectedProduct.sizes.map((size) => (
                                <Radio
                                  key={size.name}
                                  value={size}
                                  disabled={!size.inStock}
                                  className={classNames(
                                    size.inStock
                                      ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                                      : 'cursor-not-allowed bg-gray-50 text-gray-200',
                                    size === selectedSize ? 'ring-2 ring-offset-2 ring-custom-blue' : '',
                                    'group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium'
                                  )}
                                >
                                  <span className='montserrat'>{size.name}</span>
                                </Radio>
                              ))
                            ) : (
                              <p className='climate-crisis'>No hay tallas disponibles</p>
                            )}
                          </RadioGroup>
                        </fieldset>
                      </form>

                      {/* Cantidad */}
                      <div className="mt-4 border rounded-xl md:w-[20%] w-[30%] h-[20%] flex items-center space-x-7">
                        <button
                          onClick={() => setQuantity(prev => Math.max(prev - 1, 1))}
                          className="bg-gray-300  text-gray-800 p-1 rounded hover:bg-gray-400"
                        >
                          -
                        </button>
                        <span className="mx-2 montserrat">{quantity}</span>
                        <button
                          onClick={() => setQuantity(prev => prev + 1)}
                          className="bg-gray-300 text-gray-800 p-1 rounded hover:bg-gray-400"
                        >
                          +
                        </button>
                      </div>

                                        <button
                    onClick={() => {
                      if (!selectedColor || !selectedSize) {
                        setAlertMessage('Por favor, selecciona un color y un talle antes de agregar al carrito.');
                        setTimeout(() => setAlertMessage(''), 3000); // El mensaje se ocultará después de 3 segundos
                      } else {
                        addProduct(selectedProduct);
                        closeDialog();
                        setAlertMessage('¡Producto agregado al carrito!'); // Mensaje de éxito si se agrega correctamente
                        setTimeout(() => setAlertMessage(''), 3000);
                      }
                    }}
                    disabled={!selectedColor || !selectedSize}
                    className="mt-6 w-30 bg-custom-blue text-white montserrat py-2 px-4 rounded-xl hover:bg-custom-color hover:text-white hover:shadow-lg"
                  >
                    Añadir al carrito
                  </button>

                  {alertMessage && (
                    <div className="mt-2 text-red-500 montserrat">{alertMessage}</div>
                  )}
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      )}

      {showAlert && (
        <div className="fixed top-2 flex right-[4rem] transform -translate-x-1/2 p-4 bg-green-500 text-white montserrat rounded-lg shadow-lg transition animate-slide-in">
       <svg className='mt-1 mr-1' width="5%" height="5%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path d="M22 11.0857V12.0057C21.9988 14.1621 21.3005 16.2604 20.0093 17.9875C18.7182 19.7147 16.9033 20.9782 14.8354 21.5896C12.7674 22.201 10.5573 22.1276 8.53447 21.3803C6.51168 20.633 4.78465 19.2518 3.61096 17.4428C2.43727 15.6338 1.87979 13.4938 2.02168 11.342C2.16356 9.19029 2.99721 7.14205 4.39828 5.5028C5.79935 3.86354 7.69279 2.72111 9.79619 2.24587C11.8996 1.77063 14.1003 1.98806 16.07 2.86572M22 4L12 14.01L9 11.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
 </svg>  ¡Tu producto se agregó al carrito!
        </div>
      )}
      </div>
    </div>
  );
};

export default Products;
