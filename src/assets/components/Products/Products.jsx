// Products.jsx
import React, { useContext, useState } from 'react';
import { DataContext } from '../Context/DataContext';
import ProductDialog from '../ProductDialog/ProductDialog';

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
    <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
      <div className="grid grid-cols-2 gap-6 mt-10 lg:mt-16 lg:gap-4 lg:grid-cols-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="relative group bg-white p-4 transition-all">
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
          ))
        ) : (
          <p className="text-center text-gray-500">No hay productos disponibles.</p>
        )}
      </div>

      {selectedProduct && (
        <ProductDialog
          product={selectedProduct}
          open={open}
          closeDialog={closeDialog}
        />
      )}
    </div>
  );
};

export default Products;
