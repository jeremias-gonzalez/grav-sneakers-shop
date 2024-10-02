import { useState } from 'react';
import Navbar from "../Navbar/Navbar"
import Products from '../Products/Products'

import Footer from '../Footer/Footer';
import SliderDetail from '../SliderDetail/SliderDetail';
const Home = () => {
  const  [countProducts,setCountProducts] = useState (0);
  const [allProducts, setAllProducts] = useState([]);
	const [total, setTotal] = useState(0);


  return (
    <div>
      <Navbar/>
      <div className='flex justify-center my-5 mx-5'>

        <div className='flex'>
        <div className=''>
      <svg width="50%" height="50%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path d="M14 7H16.3373C16.5818 7 16.7041 7 16.8192 7.02763C16.9213 7.05213 17.0188 7.09253 17.1083 7.14736C17.2092 7.2092 17.2957 7.29568 17.4686 7.46863L21.5314 11.5314C21.7043 11.7043 21.7908 11.7908 21.8526 11.8917C21.9075 11.9812 21.9479 12.0787 21.9724 12.1808C22 12.2959 22 12.4182 22 12.6627V15.5C22 15.9659 22 16.1989 21.9239 16.3827C21.8224 16.6277 21.6277 16.8224 21.3827 16.9239C21.1989 17 20.9659 17 20.5 17M15.5 17H14M14 17V7.2C14 6.0799 14 5.51984 13.782 5.09202C13.5903 4.71569 13.2843 4.40973 12.908 4.21799C12.4802 4 11.9201 4 10.8 4H5.2C4.0799 4 3.51984 4 3.09202 4.21799C2.71569 4.40973 2.40973 4.71569 2.21799 5.09202C2 5.51984 2 6.0799 2 7.2V15C2 16.1046 2.89543 17 4 17M14 17H10M10 17C10 18.6569 8.65685 20 7 20C5.34315 20 4 18.6569 4 17M10 17C10 15.3431 8.65685 14 7 14C5.34315 14 4 15.3431 4 17M20.5 17.5C20.5 18.8807 19.3807 20 18 20C16.6193 20 15.5 18.8807 15.5 17.5C15.5 16.1193 16.6193 15 18 15C19.3807 15 20.5 16.1193 20.5 17.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
 </svg>
      </div>
      <div>
          <p className='montserrat'>
            Enviamos tus zapatillas
          </p>
          <span className='text-xs montserrat'>A todo el pais</span>
        </div>
        </div>
        <svg width="50%" height="50%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
 <path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
 <path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
 </svg>
        <div className='flex'>
        <div>
        <svg width="50%" height="40%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path d="M16 18L18 20L22 16M22 10H2M22 12V8.2C22 7.0799 22 6.51984 21.782 6.09202C21.5903 5.7157 21.2843 5.40974 20.908 5.21799C20.4802 5 19.9201 5 18.8 5H5.2C4.0799 5 3.51984 5 3.09202 5.21799C2.7157 5.40973 2.40973 5.71569 2.21799 6.09202C2 6.51984 2 7.0799 2 8.2V15.8C2 16.9201 2 17.4802 2.21799 17.908C2.40973 18.2843 2.71569 18.5903 3.09202 18.782C3.51984 19 4.0799 19 5.2 19H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
 </svg>
      </div>

      <div>
          <p className='montserrat'>
            Metodos de pago
          </p>
          <span className='text-xs montserrat'>tarjetas de credito o efectivo</span>
        </div>
        <div>
        <img src="" alt="" />
      </div>
      </div>
        
      </div>
       <SliderDetail/>
        {/* <Carrito
       allProducts={allProducts}
       setAllProducts={setAllProducts}
       total={total}
       setTotal={setTotal}
       countProducts={countProducts}
       setCountProducts={setCountProducts} /> */}
       <div>
         
      <div className='text-center mt-10'> 
       <h1 className='climate-crisis uppercase'>Bienvenidos a <span className='text-custom-blue'>Grav</span></h1>
       <p className='mt-3 text-md montserrat text-gray-400'>Te invitamos que explores todo lo mejor que tenemos para vos!</p>
       </div>      
        <Products
        allProducts={allProducts}
				setAllProducts={setAllProducts}
				total={total}
				setTotal={setTotal}
				countProducts={countProducts}
				setCountProducts={setCountProducts}/>
        </div>
      <Footer/>      
       </div>
  )
}

export default Home