// Products.jsx
import React, { useContext, useState } from 'react';
import { DataContext } from '../Context/DataContext';
import ProductDialog from '../ProductDialog/ProductDialog';
import './animate.css';

const Products = ({ filteredProducts }) => {
  const { data } = useContext(DataContext);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [open, setOpen] = useState(false);

  const openDialog = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="mx-6 sm:px-6 sm:mx-auto sm:px-26 lg:px-8 max-w-7xl">
      <div className="grid grid-cols-1 gap-6 mt-10 lg:mt-16 lg:gap-4 lg:grid-cols-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="relative group bg-white  transition-all">
              <div className="overflow-hidden my-10 rounded-md">
                <img
                  className="object-cover w-full h-full rounded-md transition-transform duration-300 group-hover:scale-105"
                  src={product.image}
                  alt={product.model}
                />
              </div>
              <div className="mt-4">
                <div className='flex justify-center mt-7'>
                <h3 className="text-2xl md:text-lg montserrat text-gray-800 group-hover:text-custom-blue">
                  {product.brand}
                </h3>
                <p className="text-2xl md:text-lg montserrat text-gray-500 ml-[.5rem] ">{product.model}</p>
                </div>
                <p className="text-2xl md:text-lg montserrat2 text-gray-900 mt-2 md:mt-2">${product.price}</p>
                <div className='my-5 md:my-2'>
                  <span className='montserrat mx-auto text-custom-blue text-lg md:text-sm'>Abonando solo en Efectivo o Transferencia</span>
                </div>
              </div>
              <div className="mt-7 md:mt-3">
                <button
                
                  onClick={() => openDialog(product)}
                  className="w-70 md:w-30 p-2  text-custom-blue rounded-xl text-xl md:text-sm montserrat hover:bg-white hover:text-custom-blue border border-custom-blue transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom-blue"
                >
                  Añadir Producto al Carrito
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No hay productos disponibles.</p>
        )}
      </div>
      {selectedProduct && (
  <div className=" animate__fadeInUp">
    <ProductDialog
      product={selectedProduct}
      open={open}
      closeDialog={closeDialog}
    />
  </div>
)}
    </div>
  );
};

export default Products;
