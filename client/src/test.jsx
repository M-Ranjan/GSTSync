import React, { useState } from "react";
import { Link } from "react-router-dom";

function HomeDashboardContainer() {
  const [products, setProducts] = useState([
    { name: "Product 1", price: 100, stock: 10 },
    { name: "Product 2", price: 200, stock: 5 },
    { name: "Product 3", price: 300, stock: 8 },
  ]);

  const [customerName, setCustomerName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [newProduct, setNewProduct] = useState({
    name: "",
    stock: 0,
    price: 0,
    tax: 0,
  }); // New product state

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle adding product to the selected list
  const addProductToCart = (product) => {
    setSelectedProducts([
      ...selectedProducts,
      { ...product, quantity: 1 }, // Set default quantity to 1
    ]);
  };

  // Calculate grand total
  const grandTotal = selectedProducts.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  // Handle form submission for POS
  const handleSubmit = (e) => {
    e.preventDefault();
    const saleDetails = {
      customerName,
      products: selectedProducts,
      grandTotal,
    };
    console.log("Sale Details:", saleDetails);

    // Clear the form after submission
    setCustomerName("");
    setSelectedProducts([]);
    setSearchTerm("");
  };

  // Handle form input change for new product
  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // Handle adding new product to inventory
  const handleAddProduct = () => {
    setProducts([
      ...products,
      {
        name: newProduct.name,
        price: newProduct.price * (1 + newProduct.tax / 100), // Apply tax to price
        stock: newProduct.stock, // Add stock to the product
      },
    ]);
    setIsModalOpen(false); // Close modal after adding the product
    setNewProduct({
      name: "",
      stock: 0,
      price: 0,
      tax: 0,
    }); // Reset the product form
  };

  return (
    <>
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-center text-base/7 font-semibold text-indigo-600">
            GST Sync
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-gray-950 sm:text-5xl">
            Dashboard
          </p>
          <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
            {/* Other sections... */}

            {/* Add or View Products Section */}
            <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
              <div className="absolute inset-px rounded-lg bg-white"></div>
              <div className="relative flex h-full flex-col gap-10 overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
                <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                    Add or View Products
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                    Easily add products to your inventory by entering key
                    details like name, price, and quantity.
                  </p>
                </div>
                <div className="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
                  <div className="flex flex-wrap justify-center gap-y-4 gap-x-6">
                    {/* View Products */}
                    <a
                      onClick={() => setIsModalOpen(true)} // Open modal when clicked
                      className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
                    >
                      <span className="relative text-base font-semibold text-white">
                        Add Products
                      </span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5"></div>
            </div>

            {/* POS Section with Customer Info and Search Bar */}
            {/* Other sections... */}
          </div>
        </div>
      </div>

      {/* Modal for adding new product */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-lg font-semibold mb-4">Add New Product</h2>
            <div className="flex flex-col gap-4">
              <label htmlFor="productName" className="text-sm font-medium">
                Product Name
              </label>
              <input
                id="productName"
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleProductChange}
                className="px-4 py-2 border rounded-md text-gray-800"
                placeholder="Enter product name"
                required
              />

              <label htmlFor="productPrice" className="text-sm font-medium">
                Price
              </label>
              <input
                id="productPrice"
                type="number"
                name="price"
                value={newProduct.price}
                onChange={handleProductChange}
                className="px-4 py-2 border rounded-md text-gray-800"
                placeholder="Enter price"
                required
              />

              <label htmlFor="productStock" className="text-sm font-medium">
                Stock
              </label>
              <input
                id="productStock"
                type="number"
                name="stock"
                value={newProduct.stock}
                onChange={handleProductChange}
                className="px-4 py-2 border rounded-md text-gray-800"
                placeholder="Enter stock"
                required
              />

              <label htmlFor="productTax" className="text-sm font-medium">
                Tax (%) 
              </label>
              <input
                id="productTax"
                type="number"
                name="tax"
                value={newProduct.tax}
                onChange={handleProductChange}
                className="px-4 py-2 border rounded-md text-gray-800"
                placeholder="Enter tax percentage"
              />

              <div className="mt-4 flex justify-between">
                <button
                  className="px-6 py-2 bg-blue-500 text-white rounded-md"
                  onClick={handleAddProduct}
                >
                  Add Product
                </button>
                <button
                  className="px-6 py-2 bg-gray-300 text-black rounded-md"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default HomeDashboardContainer;
