import React, { useState, useEffect } from "react";
import { FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
const ProductList = () => {
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
    // Simulating API call to fetch products
    const fetchProducts = async () => {
      // In a real scenario, this would be an API call
      const dummyProducts = [
        {
          id: 1,
          name: "Nike Air Max 270",
          price: 150,
          description: "Iconic cushioning for all-day comfort.",
          image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
          category: "Running",
          size: ["7", "8", "9", "10"],
          color: "Black",
          popularity: 95,
        },
        {
          id: 2,
          name: "Nike React Infinity Run",
          price: 160,
          description: "Soft and responsive foam for miles of comfort.",
          image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa",
          category: "Running",
          size: ["8", "9", "10", "11"],
          color: "Blue",
          popularity: 88,
        },
        {
          id: 3,
          name: "Nike Air Zoom Pegasus 38",
          price: 120,
          description: "Responsive cushioning for your daily runs.",
          image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5",
          category: "Running",
          size: ["7", "8", "9", "10", "11"],
          color: "White",
          popularity: 92,
        },
        {
          id: 4,
          name: "Nike Metcon 6",
          price: 130,
          description: "Stable and durable for high-intensity workouts.",
          image: "https://images.unsplash.com/photo-1605348532760-6753d2c43329",
          category: "Training",
          size: ["8", "9", "10", "11", "12"],
          color: "Red",
          popularity: 87,
        },
        {
          id: 5,
          name: "Nike Air Force 1 '07",
          price: 90,
          description: "Timeless style with premium leather.",
          image: "https://images.unsplash.com/photo-1549298916-b41d501d3772",
          category: "Lifestyle",
          size: ["7", "8", "9", "10", "11", "12"],
          color: "White",
          popularity: 98,
        },
        {
          id: 6,
          name: "Nike Air Jordan 1 Mid",
          price: 115,
          description: "Iconic high-top style with premium materials.",
          image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb",
          category: "Basketball",
          size: ["8", "9", "10", "11", "12"],
          color: "Black",
          popularity: 96,
        },
        {
          id: 7,
          name: "Nike Free RN 5.0",
          price: 100,
          description: "Flexible and lightweight for natural movement.",
          image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
          category: "Running",
          size: ["7", "8", "9", "10", "11"],
          color: "Gray",
          popularity: 85,
        },
        {
          id: 8,
          name: "Nike SB Dunk Low",
          price: 100,
          description: "Skateboarding-inspired style for everyday wear.",
          image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a",
          category: "Skateboarding",
          size: ["8", "9", "10", "11"],
          color: "Green",
          popularity: 91,
        },
        {
          id: 9,
          name: "Nike Air Zoom Structure 23",
          price: 120,
          description: "Stable and supportive for overpronators.",
          image: "https://images.unsplash.com/photo-1606890658317-7d14490b76fd",
          category: "Running",
          size: ["8", "9", "10", "11", "12"],
          color: "Blue",
          popularity: 86,
        },
        {
          id: 10,
          name: "Nike Blazer Mid '77 Vintage",
          price: 100,
          description: "Retro basketball style with modern comfort.",
          image: "https://images.unsplash.com/photo-1597045566677-8cf032ed6634",
          category: "Lifestyle",
          size: ["7", "8", "9", "10", "11"],
          color: "White",
          popularity: 93,
        },
      ];
      setProducts(dummyProducts);
      setFilteredProducts(dummyProducts);
    };

    fetchProducts();
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
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
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
    <Navbar/>
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
          <option value="popularity">Sort by Popularity</option>
          <option value="price-low-high">Price: Low to High</option>
          <option value="price-high-low">Price: High to Low</option>
        </select>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <select
          name="category"
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filters.category}
          onChange={handleFilterChange}
        >
          <option value="">All Categories</option>
          <option value="Running">Running</option>
          <option value="Training">Training</option>
          <option value="Lifestyle">Lifestyle</option>
          <option value="Basketball">Basketball</option>
          <option value="Skateboarding">Skateboarding</option>
        </select>
        <select
          name="priceRange"
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filters.priceRange}
          onChange={handleFilterChange}
        >
          <option value="">All Prices</option>
          <option value="0-100">$0 - $100</option>
          <option value="101-150">$101 - $150</option>
          <option value="151-200">$151 - $200</option>
        </select>
        <select
          name="size"
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filters.size}
          onChange={handleFilterChange}
        >
          <option value="">All Sizes</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
        </select>
        <select
          name="color"
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        </select>
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
              <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-2">${product.price}</p>
              <p className="text-sm text-gray-500 mb-4">{product.description}</p>
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
    <Footer/>
    </>
  );
};

export default ProductList;
