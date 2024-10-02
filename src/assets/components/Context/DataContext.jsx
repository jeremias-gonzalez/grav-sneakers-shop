import { createContext, useState, useEffect } from "react";
import axios from "axios";

// Crear el contexto
export const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [cart,setCart] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false); // Nuevo estado para el carrito
  const [filters, setFilters] = useState({
    brand: '',
    priceRange: [0, 1000],
    size: '',
    color: '',
  });
  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
  };

  useEffect(() => {
    // Cargar los datos desde el archivo JSON
    axios("data.json").then((res) => setData(res.data));
  }, []);

  return (
    <DataContext.Provider value={{ data, cart , setCart , selectedProduct, setSelectedProduct, isCartOpen, toggleCart , filters, setFilters }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
