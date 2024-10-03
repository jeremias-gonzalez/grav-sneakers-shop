import { useState, lazy, Suspense } from 'react';

import CartContent from './assets/components/CartContent/CartContent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DataProvider from './assets/components/Context/DataContext';
import ProductDetail from './assets/components/ProductDetail/ProductDetail';
import Loader from './assets/components/ui/loader'; // Importa el componente Loader

// Lazy loading del componente Categorias
const Categorias = lazy(() =>
  // Agrega un retardo de 2 segundos antes de resolver la promesa
  new Promise((resolve) => {
    setTimeout(() => resolve(import('./assets/components/Categorias/Categorias' )), 2000);
    
  })
  
);
const Home = lazy(() =>
  // Agrega un retardo de 2 segundos antes de resolver la promesa
  new Promise((resolve) => {
    setTimeout(() => resolve(import('./assets/components/Home/Home' )), 2000);
    
  })
  
);

function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/'
           element={
           <Suspense fallback={<div className="flex justify-center items-center h-screen"><Loader/></div>}>
           <Home />
            </Suspense>
            } 
          />
          <Route path='/cart' element={<CartContent />} />
          <Route path='/detail' element={<ProductDetail />} />
          
          {/* Suspense envuelve la ruta /categories con el Loader como fallback */}
          <Route
            path='/categories'
            element={
              <Suspense fallback={<div className="flex justify-center items-center h-screen"><Loader/></div>}>
                <Categorias />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;

