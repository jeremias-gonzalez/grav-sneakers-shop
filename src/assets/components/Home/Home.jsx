import { useState, useContext, useEffect, lazy, Suspense } from 'react';
import Navbar from "../Navbar/Navbar";
import { DataContext } from '../Context/DataContext';
import Footer from '../Footer/Footer';
import SliderDetail from '../SliderDetail/SliderDetail';
import Skeleton from '../Skeleton/Skeleton'; // Asegúrate de que la importación sea correcta
import './animate.css';
import { Link } from 'react-router-dom';
// Lazy load del componente Products
const Products = lazy(() => import('../Products/Products')); // Cambia la ruta según tu estructura de carpetas

const Home = () => {
  const [countProducts, setCountProducts] = useState(0);
  const [allProducts, setAllProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const { data } = useContext(DataContext);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Estado para manejar la carga

  useEffect(() => {
    if (data && data.length > 0) {
      setFilteredProducts(data); // Reemplaza esto con tu lógica de filtrado si es necesario.
    }
  }, [data]);

  // Simular un tiempo de carga de 3 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Cambia el estado a false después de 3 segundos
    }, 2500);

    // Limpiar el timer si el componente se desmonta
    return () => clearTimeout(timer);
  }, []);
 
  return (
    <div>
      <Navbar />
      <SliderDetail />
      <div>
        <div className="flex flex-col md:flex-row justify-center items-center p-4 bg-white">
          <div className="flex flex-col items-center mb-4 md:mb-0">
            <div className="flex items-center justify-center mb-2">
              <svg width="10%" height="40%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 7H16.3373C16.5818 7 16.7041 7 16.8192 7.02763C16.9213 7.05213 17.0188 7.09253 17.1083 7.14736C17.2092 7.2092 17.2957 7.29568 17.4686 7.46863L21.5314 11.5314C21.7043 11.7043 21.7908 11.7908 21.8526 11.8917C21.9075 11.9812 21.9479 12.0787 21.9724 12.1808C22 12.2959 22 12.4182 22 12.6627V15.5C22 15.9659 22 16.1989 21.9239 16.3827C21.8224 16.6277 21.6277 16.8224 21.3827 16.9239C21.1989 17 20.9659 17 20.5 17M15.5 17H14M14 17V7.2C14 6.0799 14 5.51984 13.782 5.09202C13.5903 4.71569 13.2843 4.40973 12.908 4.21799C12.4802 4 11.9201 4 10.8 4H5.2C4.0799 4 3.51984 4 3.09202 4.21799C2.71569 4.40973 2.40973 4.71569 2.21799 5.09202C2 5.51984 2 6.0799 2 7.2V15C2 16.1046 2.89543 17 4 17M14 17H10M10 17C10 18.6569 8.65685 20 7 20C5.34315 20 4 18.6569 4 17M10 17C10 15.3431 8.65685 14 7 14C5.34315 14 4 15.3431 4 17M20.5 17.5C20.5 18.8807 19.3807 20 18 20C16.6193 20 15.5 18.8807 15.5 17.5C15.5 16.1193 16.6193 15 18 15C19.3807 15 20.5 16.1193 20.5 17.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="text-md montserrat text-gray-800">ENVIAMOS TU COMPRA</h3>
            <p className="text-gray-600 montserrat text-xs">Entregas a todo el país</p>
          </div>

          <div className="flex flex-col items-center mb-4 md:mb-0">
            <div className="flex items-center justify-center mb-2">
              <svg width="10%" height="40%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 18L18 20L22 16M22 10H2M22 12V8.2C22 7.0799 22 6.51984 21.782 6.09202C21.5903 5.7157 21.2843 5.40974 20.908 5.21799C20.4802 5 19.9201 5 18.8 5H5.2C4.0799 5 3.51984 5 3.09202 5.21799C2.7157 5.40973 2.40973 5.71569 2.21799 6.09202C2 6.51984 2 7.0799 2 8.2V15.8C2 16.9201 2 17.4802 2.21799 17.908C2.40973 18.2843 2.71569 18.5903 3.09202 18.782C3.51984 19 4.0799 19 5.2 19H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="text-md montserrat text-gray-900">PAGÁ COMO QUIERAS</h3>
            <p className="text-gray-600 montserrat text-xs">Tarjetas de crédito o efectivo</p>
          </div>
        </div>

        <div className='text-center mt-10'>
          <h1 className='climate-crisis uppercase'>Bienvenidos a <span className='text-custom-blue'>Grav</span></h1>
          <p className='mt-3 text-md montserrat text-gray-400'>Te invitamos a explorar todo lo mejor que tenemos para vos!</p>
          <Link to="/categories">
          <div className='flex my-10 justify-center  '>
             <p className='underline  text-custom-blue montserrat '>Ver todo en Productos</p>
             <svg width="3%" height="3%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-custom-blue svg-hover mt-1.5 mx-1 md:w-5 md:my-1 md:ml-[-.1rem]">
  <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>        
          </div>
          </Link>
          
          {/* Suspense y Skeleton para Products */}
          <Suspense fallback={<Skeleton />}>
            {!isLoading ? (
              <div className='animate__fadeInUp'>
              <Products filteredProducts={filteredProducts} />
              </div>
            ) : (
              <Skeleton />
            )}
          </Suspense>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Home;
