// ProductDialog.jsx
import React, { useState, useContext } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, Radio, RadioGroup } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { DataContext } from '../Context/DataContext';
import classNames from 'classnames';

const ProductDialog = ({ product, open, closeDialog }) => {
  const { cart, setCart } = useContext(DataContext);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false); // Estado para mostrar la alerta

  const addProduct = () => {
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

    // Mensaje de alerta
    setAlertMessage('¡Producto agregado al carrito!');
    setShowAlert(true); // Muestra la alerta
    setTimeout(() => {
      setShowAlert(false); // Oculta la alerta después de 3 segundos
      setAlertMessage('');
    }, 3000);
    closeDialog();
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      setAlertMessage('Por favor, selecciona un color y un talle antes de agregar al carrito.');
      setShowAlert(true); // Muestra la alerta si falta información
      setTimeout(() => {
        setShowAlert(false);
        setAlertMessage('');
      }, 3000);
    } else {
      addProduct();
    }
  };

  return (
    <Dialog open={open} onClose={closeDialog} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen text-center">
          <DialogPanel className="relative w-full max-w-md mt-[15rem] p-6 overflow-hidden text-left bg-white shadow-xl rounded-2xl">
            <button
              type="button"
              onClick={closeDialog}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
            >
              <XMarkIcon aria-hidden="true" className="w-6 h-6" />
            </button>
            <div>
              <h2 className="text-2xl montserrat text-gray-900">{product.brand} - {product.model}</h2>
              <p className="text-2xl montserrat text-gray-900">${product.price}</p>

              {/* Selección de Color */}
              <fieldset aria-label="Choose a color" className="mt-4">
                <legend className="text-sm montserrat text-gray-900">Color</legend>
                <RadioGroup value={selectedColor} onChange={setSelectedColor} className="flex items-center space-x-3">
                  {product.colors && product.colors.length > 0 ? (
                    product.colors.map((color) => (
                      <Radio key={color.name} value={color} className={classNames(
                        'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none',
                        color === selectedColor ? `ring-2 ring-offset-2 ${color.selectedClass}` : ''
                      )}>
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
                    <p>Modelo color de la imagen</p>
                  )}
                </RadioGroup>
              </fieldset>

              {/* Selección de Talle */}
              <fieldset aria-label="Choose a size" className="mt-4">
                <legend className="text-sm montserrat text-gray-900">Talles</legend>
                <RadioGroup value={selectedSize} onChange={setSelectedSize} className="grid grid-cols-4 gap-4 mt-2">
                  {product.sizes && product.sizes.length > 0 ? (
                    product.sizes.map((size) => (
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
                    <p>No hay tallas disponibles</p>
                  )}
                </RadioGroup>
              </fieldset>

              {/* Cantidad */}
              <div className="mt-4 border border-gray-300 rounded-xl w-[30%] flex items-center justify-between">
  <div className="border-r border-gray-300 pr-2">
    <button
      onClick={() => setQuantity(prev => Math.max(prev - 1, 1))}
      className=" text-custom-blue p-1 rounded-lg "
    >
      -
    </button>
  </div>
  <span className="mx-2 font-semibold text-lg montserrat text-gray-800">{quantity}</span>
  <div className="border-l border-gray-300 pl-2">
    <button
      onClick={() => setQuantity(prev => prev + 1)}
      className=" text-custom-blue p-1 rounded-lg "
    >
      +
    </button>
  </div>
</div>



              <button
                onClick={handleAddToCart}
                className="w-full bg-custom-blue text-white rounded-md mt-6 p-2"
              >
                Añadir al carrito
              </button>

              {/* Alerta de producto agregado al carrito */}
              {showAlert && (
                <div className="mt-1 bg-green-500 text-white p-4 rounded-md shadow-md">
                  {alertMessage}
                </div>
              )}
              
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default ProductDialog;
