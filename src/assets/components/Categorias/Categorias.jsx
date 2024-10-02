import React, { useState, useEffect } from "react";
import { FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import data from "../../../../public/data.json"; // Asegúrate de que la ruta sea correcta

const Categorias = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("popularity");
  const [filters, setFilters] = useState({
    category: "",
    priceRange: "",
    size: "",
    color: "",
  });

  const productsPerPage = 8;

  useEffect(() => {
    // Set products from the data.json file
    setProducts(data);
    setFilteredProducts(data);
  }, []);

  useEffect(() => {
    let result = products;

    // Apply filters
    if (filters.category) {
      result = result.filter((product) => product.category === filters.category);
    }
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split("-");
      result = result.filter(
        (product) => product.price >= Number(min) && product.price <= Number(max)
      );
    }
    if (filters.size) {
      result = result.filter((product) => product.size.includes(filters.size));
    }
    if (filters.color) {
      result = result.filter((product) => product.color === filters.color);
    }

    // Apply search
    if (searchTerm) {
      result = result.filter((product) =>
        product.name && product.name.toLowerCase().includes(searchTerm.toLowerCase()) // Asegúrate de que product.name esté definido
      );
    }

    // Apply sorting
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

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl climate-crisis mb-8">Categorias</h1>

        {/* Search and Sort */}
        <div className="flex flex-col md:flex-row justify-between mb-6">
          <div className="relative mb-4 md:mb-0 md:w-1/3">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full montserrat pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={handleSearch}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <select
            className="w-full md:w-auto px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={sortOption}
            onChange={handleSortChange}
          >
            <option value="popularity">Mas vendido</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
          </select>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <select
            name="category"
            className="px-4 w-[10rem] py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.category}
            onChange={handleFilterChange}
          >
            <option value="">Todas las marcas</option>
            <option value="Running">Nike</option>
            <option value="Training">Vans</option>
            <option value="Lifestyle">New Balance</option>
            <option value="Basketball">Puma</option>
            <option value="Skateboarding">Adidas</option>
          </select>
          <select
            name="priceRange"
            className="px-4 py-2 w-[10rem] border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.priceRange}
            onChange={handleFilterChange}
          >
            <option value="">Precios</option>
            <option value="0-100">$0 - $100</option>
            <option value="101-150">$101 - $150</option>
            <option value="151-200">$151 - $200</option>
          </select>
          <select
            name="size"
            className="px-4 py-2 w-[10rem] border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.size}
            onChange={handleFilterChange}
          >
            <option value="">Talles</option>
            <option value="35">35</option>
            <option value="36">36</option>
            <option value="37">37</option>
            <option value="38">38</option>
            <option value="39">39</option>
            <option value="40">40</option>
          </select>
          {/* <select
            name="color"
            className="px-4 py-2 w-[10rem] border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.color}
            onChange={handleFilterChange}
          >
            <option value="">All Colors</option>
            <option value="Black">Black</option>
            <option value="White">White</option>
            <option value="Blue">Blue</option>
            <option value="Red">Red</option>
            <option value="Gray">Gray</option>
            <option value="Green">Green</option>
          </select> */}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {currentProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{product.model}</h2>
                <p className="text-gray-600 mb-2">${product.price}</p>
                <p className="text-sm text-gray-500 mb-4">{product.brand}</p>
                <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300">
                  Quick View
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <nav className="inline-flex rounded-md shadow">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <FaChevronLeft />
            </button>
            {Array.from(
              { length: Math.ceil(filteredProducts.length / productsPerPage) },
              (_, i) => (
                <button
                  key={i}
                  onClick={() => paginate(i + 1)}
                  className={`px-3 py-2 border border-gray-300 bg-white text-sm font-medium ${
                    currentPage === i + 1
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {i + 1}
                </button>
              )
            )}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={
                currentPage ===
                Math.ceil(filteredProducts.length / productsPerPage)
              }
              className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <FaChevronRight />
            </button>
          </nav>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Categorias;

