import { useState } from 'react'
import Home from './assets/components/Home/Home'
import CartContent from './assets/components/CartContent/CartContent'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DataProvider  from './assets/components/Context/DataContext'
import ProductDetail from './assets/components/ProductDetail/ProductDetail'
import Categorias from './assets/components/Categorias/Categorias'
function App() {

  return (
    <DataProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/cart' element={<CartContent/>}></Route>
        <Route path='/detail' element={<ProductDetail/>}></Route>
        <Route path='/categories' element={<Categorias/>}></Route>
        </Routes>
    </BrowserRouter>
    </DataProvider>
  )
}

export default App
