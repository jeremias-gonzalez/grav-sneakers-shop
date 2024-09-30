import { useState } from 'react';
import Navbar from "../Navbar/Navbar"
import Products from '../Products/Products'
import SLiderDetail from '../SliderDetail/SliderDetail';
const Home = () => {
  const  [countProducts,setCountProducts] = useState (0);
  const [allProducts, setAllProducts] = useState([]);
	const [total, setTotal] = useState(0);


  return (
    <div>
      <Navbar/>
    
        {/* <Carrito
       allProducts={allProducts}
       setAllProducts={setAllProducts}
       total={total}
       setTotal={setTotal}
       countProducts={countProducts}
       setCountProducts={setCountProducts} /> */}
        <Products
        allProducts={allProducts}
				setAllProducts={setAllProducts}
				total={total}
				setTotal={setTotal}
				countProducts={countProducts}
				setCountProducts={setCountProducts}/>
    </div>
  )
}

export default Home