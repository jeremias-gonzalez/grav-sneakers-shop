import React, { useState, useEffect, lazy, Suspense} from "react";
import { FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import data from "../../../../public/data.json";
import Products from "../Products/Products";
import Skeleton from "../Skeleton/Skeleton";
import { Link } from "react-router-dom";
const Categorias = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("popularity");
  const [isLoading, setIsLoading] = useState(true); // Estado para manejar la carga

  const [filters, setFilters] = useState({
    brand: "",
    priceRange: "",
    sizes: "",
    color: "",
  });

  const productsPerPage = 8;

  useEffect(() => {
    setProducts(data);
    setFilteredProducts(data);
  }, []);

  useEffect(() => {
    let result = [...products];

    // Filtro por marca
    if (filters.brand) {
      result = result.filter((product) => product.brand === filters.brand);
    }

    // Filtro por rango de precios
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split("-");
      result = result.filter(
        (product) => product.price >= Number(min) && product.price <= Number(max)
      );
    }

    // Filtro por talle (si el producto tiene varias tallas)
    if (filters.sizes) {
      result = result.filter((product) =>
        product.sizes.some((size) => size.name === filters.sizes && size.inStock)
      );
    }

    // Filtro por color
    if (filters.color) {
      result = result.filter((product) => product.color === filters.color);
    }

    // Aplicar búsqueda
    if (searchTerm) {
      result = result.filter((product) =>
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.model.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Ordenar resultados
    switch (sortOption) {
      case "price-low-high":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        result.sort((a, b) => b.price - a.price);
        break;
      case "popularity":
        result.sort((a, b) => b.popularity - a.popularity);
        break;
      default:
        break;
    }

    setFilteredProducts(result);
    setCurrentPage(1);
  }, [products, filters, searchTerm, sortOption]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Cambia el estado a false después de 3 segundos
    }, 2000);

    // Limpiar el timer si el componente se desmonta
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-10 py-8">
      <nav aria-label="Breadcrumb">
      <ol role="list" class="mx-auto flex max-w-2xl mt-[-1rem] ml-[-1.5rem] mb-[2rem] items-center space-x-2 px-1 sm:px-6 lg:max-w-7xl lg:px-8">
        <li>
          <div class="flex items-center">
           <Link to="/"> <a href="#" className="mr-2 text-xs montserrat text-gray-900">Inicio</a></Link>
            <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" aria-hidden="true" className="h-5 w-4 text-gray-300">
              <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
            </svg>
          </div>
        </li>
        <li>
          <div className="flex items-center">
            <a href="#" className="mr-2 text-xs montserrat text-gray-900">Productos</a>
            <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" aria-hidden="true" className="h-5 w-4 text-gray-300">
              <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
            </svg>
          </div>
        </li>
      </ol>
    </nav>
        <h1 className="text-2xl climate-crisis text-center mb-8">Todos los productos</h1>

        <div className="flex flex-col md:flex-row">
  {/* Left Sidebar: Filters and Search */}
  <div className="flex flex-col md:w-1/4 space-y-6 md:mr-6">
    {/* Search and Sort */}
    <div className="relative mb-4">
      <input
        type="text"
        placeholder="Buscar productos..."
        className="w-full montserrat pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={searchTerm}
        onChange={handleSearch}
      />
      <FaSearch className="absolute left-3 top-3 text-gray-400" />
    </div>
    <select
      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={sortOption}
      onChange={handleSortChange}
    >
      <option value="popularity">Más vendidos</option>
      <option value="price-low-high">Precio: bajo a alto</option>
      <option value="price-high-low">Precio: alto a bajo</option>
    </select>

    {/* Filters */}
    <div className="space-y-4">
      <select
        name="brand"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={filters.brand}
        onChange={handleFilterChange}
      >
        <option value="">Todas las marcas</option>
        <option value="Nike">Nike</option>
        <option value="Vans">Vans</option>
        <option value="New Balance">New Balance</option>
        <option value="Puma">Puma</option>
        <option value="Adidas">Adidas</option>
      </select>

      <select
        name="priceRange"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={filters.priceRange}
        onChange={handleFilterChange}
      >
        <option value="">Precios</option>
        <option value="0-100">$0 - $100</option>
        <option value="101-150">$101 - $150</option>
        <option value="151-200">$151 - $200</option>
      </select>

      <select
        name="sizes"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={filters.sizes}
        onChange={handleFilterChange}
      >
        <option value="">Talles</option>
        <option value="35">35</option>
        <option value="36">36</option>
        <option value="37">37</option>
        <option value="38">38</option>
        <option value="39">39</option>
        <option value="40">40</option>
        <option value="41">41</option>
      </select>
    </div>
  </div>

  {/* Right Sidebar: Products */}
  <div className="md:w-3/4">
    {/* Displaying Products */}
    
    <Suspense fallback={<Skeleton />}>
            {!isLoading ? (
              <div className='animate__fadeInUp'>
              <Products filteredProducts={currentProducts} />
              </div>
            ) : (
              <Skeleton />
            )}
          </Suspense>

    {/* Pagination */}
    <div className="flex justify-center mt-8">
      {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, index) => (
        <button
          key={index + 1}
          className={`px-4 py-2 mx-1 border rounded-lg ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-white text-blue-500"}`}
          onClick={() => paginate(index + 1)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  </div>
</div>
</div>
      <Footer />
    </>
  );
};

export default Categorias;
