import React, { useContext, useState } from 'react';
import { DataContext } from '../Context/DataContext';
import { Dialog, DialogBackdrop, DialogPanel, Radio, RadioGroup } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import "./cart.css";
import classNames from 'classnames';

const Products = () => {
  const { data, cart, setCart } = useContext(DataContext);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null); 
  const [selectedSize, setSelectedSize] = useState(null); 
  const [showAlert, setShowAlert] = useState(false); // Estado para la alerta

  // Función para añadir productos al carrito
  const addProduct = (product) => {
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
      // Si el producto ya existe, aumenta la cantidad
      const updatedCart = cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
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
        quantity: 1,
     };
      // Si el producto no existe, añádelo con cantidad 1
      setCart([...cart, { ...product, quantity: 1 }]);
    }

    // Mostrar la alerta y luego ocultarla después de 3 segundos
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000); // La alerta se ocultará después de 3 segundos
  };

  const openDialog = (product) => {
    setSelectedProduct(product);
    setSelectedColor(product.colors[0]); 
    setSelectedSize(product.sizes.find(size => size.inStock) || null); 
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
    setSelectedProduct(null);
    setSelectedColor(null); 
    setSelectedSize(null); 
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
            className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity"
          />
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-stretch justify-center text-center">
              <DialogPanel
                transition
                className="flex w-full transform text-left text-base transition"
              >
                <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                  <button
                    type="button"
                    onClick={closeDialog}
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-500"
                  >
                    <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                  </button>

                  <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                    <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                      <img alt={selectedProduct.imageAlt} src={selectedProduct.image} className="object-cover object-center" />
                    </div>
                    <div className="sm:col-span-8 lg:col-span-7">
                      <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">{selectedProduct.brand} - {selectedProduct.model}</h2>
                      <p className="text-2xl text-gray-900">${selectedProduct.price}</p>
                      <form>
                        {/* Colors */}
                        <fieldset aria-label="Choose a color">
                          <legend className="text-sm font-medium text-gray-900">Color</legend>
                          <RadioGroup
                            value={selectedColor}
                            onChange={setSelectedColor}
                            className="mt-4 flex items-center space-x-3"
                          >
                            {selectedProduct.colors.length > 0 ? (
                              selectedProduct.colors.map((color) => (
                                <Radio
                                  key={color.name}
                                  value={color}
                                  className={classNames(
                                    color.selectedClass,
                                    'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5'
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
                            <div className="text-sm font-medium text-gray-900">Talla</div>
                          </div>

                          <RadioGroup
                            value={selectedSize}
                            onChange={setSelectedSize}
                            className="mt-4 grid grid-cols-4 gap-4"
                          >
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
                                    'group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium'
                                  )}
                                >
                                  <span>{size.name}</span>
                                </Radio>
                              ))
                            ) : (
                              <p>No hay tallas disponibles</p>
                            )}
                          </RadioGroup>
                        </fieldset>
                      </form>

                      <button
                        onClick={() => {
                          addProduct(selectedProduct);
                          closeDialog();
                        }}
                        disabled={!selectedSize}
                        className="mt-6 w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 disabled:opacity-50"
                      >
                        Añadir al carrito
                      </button>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      )}

      {/* Alerta animada */}
      {showAlert && (
         <div className="fixed bottom-4 right-4 p-4 bg-green-500 text-white rounded-lg shadow-lg transition transform animate-slide-in">
         ¡Tu producto se agregó al carrito!
       </div>
        
      )}
    </div>
  );
};

export default Products;
