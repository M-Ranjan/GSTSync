import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function HomeDashboardContainer() {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [sales, setSales] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [grandTotal, setGrandTotal] = useState(0);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProductsModalOpen, setIsProductsModalOpen] = useState(false);
  const [isSalesModalOpen, setIsSalesModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    stock: 0,
    price: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const gstin = decodedToken.gstin;
      setUser(gstin);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get("http://localhost:8000/sales/get-sales", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("Sales data:", response.data); // Log the data to verify
          // Access the sales array inside the response
          if (Array.isArray(response.data.sales)) {
            setSales(response.data.sales); // Set the sales data
          } else {
            setSales([]); // If sales is not an array, set it to empty array
          }
        })
        .catch((error) => {
          console.error("Error fetching sales:", error);
          setSales([]); // Set empty array if there is an error
        });
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:8000/products/get-products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const results = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]);
    }
  }, [searchTerm]);

  const addProductToCart = (product) => {
    const updatedProducts = [...selectedProducts];
    const existingProduct = updatedProducts.find(
      (item) => item.name === product.name
    );
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      updatedProducts.push({ ...product, quantity: 1 });
    }
    setSelectedProducts(updatedProducts);
    updateGrandTotal(updatedProducts);
  };

  const updateGrandTotal = (products) => {
    const total = products.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );
    setGrandTotal(total);
  };

  const handleAddSales = (e) => {
    e.preventDefault();

    const saleDetails = {
      customerName,
      products: selectedProducts,
      grandTotal,
    };

    const token = localStorage.getItem("token");

    if (token) {
      axios
        .post("http://localhost:8000/sales/add-sales", saleDetails, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setCustomerName("");
          setSelectedProducts([]);
          setSearchTerm("");
          toast.success("Sale processed successfully!", {
            position: "top-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        })
        .catch((error) => {
          toast.error(`Something went wrong during signup.${error}`, {
            position: "top-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    } else {
      console.log("No token found in localStorage.");
    }
  };

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleAddProduct = () => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = jwtDecode(token);
      const gstin = decodedToken.gstin;
      const productData = {
        name: newProduct.name,
        price: newProduct.price * (1 + newProduct.tax / 100),
        stock: newProduct.stock,
        gstin: gstin,
      };

      axios
        .post("http://localhost:8000/products/add-product", productData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setProducts([...products, response.data]);
          setIsModalOpen(false);
          setNewProduct({
            name: "",
            stock: 0,
            price: 0,
          });
        })
        .catch((error) => {
          console.error("Error adding product:", error);
        });
    } else {
      console.log("No token found in localStorage.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth/signin");
  };

  const handleViewProducts = () => {
    setIsProductsModalOpen(true);
  };

  const handleProductCloseModal = () => {
    setIsProductsModalOpen(false);
  };

  const handleViewSales = () => {
    setIsSalesModalOpen(true);
  };

  const handleSalesCloseModal = () => {
    setIsSalesModalOpen(false);
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
            <div className="relative lg:row-span-2">
              <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-[2rem]"></div>
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
                <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                    GST & User Details
                  </p>
                  <div className="mt-6 flex flex-col gap-4">
                    <label className="text-sm font-medium text-gray-700">
                      Your GST Number:
                    </label>
                    <input
                      type="text"
                      value={user}
                      className="px-4 py-2 border rounded-md text-gray-800"
                      disabled
                    />
                  </div>

                  <div className="flex flex-1 mt-10 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
                    <div className="flex flex-wrap justify-center gap-y-4 gap-x-6">
                      <a
                        className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800 sm:w-max cursor-pointer"
                        onClick={handleLogout}
                      >
                        Logout
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 lg:rounded-l-[2rem]"></div>
            </div>

            {/* Sales Report Section */}
            <div className="relative max-lg:row-start-1">
              <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem]"></div>
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
                <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                    Sales Report
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                    View detailed sales reports to track your business
                    performance and analyze transactions, all in one
                    easy-to-navigate dashboard.
                  </p>
                </div>
                <div className="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
                  <div className="flex flex-wrap justify-center gap-y-4 gap-x-6">
                    <a
                      onClick={handleViewSales}
                      className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800 sm:w-max cursor-pointer"
                    >
                      View Sales
                    </a>
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 max-lg:rounded-t-[2rem]"></div>
            </div>

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
                      className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max cursor-pointer"
                    >
                      <span className="relative text-base font-semibold text-white">
                        Add Products
                      </span>
                    </a>
                    <a
                      onClick={handleViewProducts}
                      className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800 sm:w-max cursor-pointer"
                    >
                      View Products
                    </a>
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5"></div>
            </div>

            {/* POS Section with Customer Info and Search Bar */}
            <div className="relative lg:row-span-2">
              <div className="absolute inset-px rounded-lg bg-white lg:rounded-r-[2rem]"></div>
              <div className="relative flex h-full flex-col gap-10 overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
                <form onSubmit={handleAddSales}>
                  {" "}
                  {/* Wrap the form in a submit handler */}
                  <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                    <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                      Point of Sale (POS)
                    </p>
                    <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                      Manage customer sales transactions, add products, and
                      generate invoices.
                    </p>

                    {/* Customer Info Form */}
                    <div className="mt-6 flex flex-col gap-4">
                      <label className="text-sm font-medium text-gray-700">
                        Customer Name
                      </label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="px-4 py-2 border rounded-md text-gray-800"
                        placeholder="Enter customer name"
                        required
                      />
                    </div>

                    {/* Search Bar for Products */}
                    <div className="mt-4 relative">
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md"
                        placeholder="Search for products..."
                      />

                      {/* Dropdown for filtered products */}
                      {searchTerm && filteredProducts.length > 0 && (
                        <div className="absolute w-full bg-white border rounded-md mt-1 shadow-lg max-h-48 overflow-y-auto z-10">
                          {filteredProducts.map((product, index) => (
                            <div
                              key={index}
                              onClick={() => addProductToCart(product)}
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            >
                              {product.name} - ₹{product.price}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Added Products */}
                    <div className="mt-6 max-h-30 overflow-y-scroll">
                      {selectedProducts.map((product, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center py-2"
                        >
                          <span>
                            {product.name} - ₹{product.price}
                          </span>
                          <input
                            type="number"
                            value={product.quantity}
                            onChange={(e) => {
                              const updatedProducts = [...selectedProducts];
                              updatedProducts[index].quantity = Math.max(
                                1,
                                parseInt(e.target.value, 10)
                              ); // Prevent quantity below 1
                              setSelectedProducts(updatedProducts);
                            }}
                            className="w-16 p-1 border rounded-md"
                            min="1"
                          />
                        </div>
                      ))}
                    </div>

                    {/* Grand Total */}
                    <div className="mt-6 flex justify-between items-center">
                      <span className="font-semibold text-xl">Grand Total</span>
                      <span className="font-semibold text-xl">
                        ₹{grandTotal.toFixed(2)}
                      </span>
                    </div>

                    {/* Submit Button */}
                    <div className="flex items-center justify-center p-8">
                      <button
                        type="submit"
                        className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
                      >
                        <span className="relative text-base font-semibold text-white">
                          Process Sale
                        </span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 lg:rounded-r-[2rem]"></div>
            </div>
          </div>
        </div>
        <ToastContainer />
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

      {/* Modal to display products */}
      {isProductsModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-1/2 max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Product List</h2>
            <table className="min-w-full border-collapse">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2">Product Name</th>
                  <th className="border border-gray-300 p-2">Price</th>
                  <th className="border border-gray-300 p-2">Stock</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? (
                  products.map((product) => (
                    <tr key={product.id}>
                      <td className="border border-gray-300 p-2">
                        {product.name}
                      </td>
                      <td className="border border-gray-300 p-2">
                        ₹{product.price}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {product.stock}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="3"
                      className="border border-gray-300 p-2 text-center"
                    >
                      No products found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <a
              onClick={handleProductCloseModal}
              className="relative mt-10 flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800 sm:w-max cursor-pointer"
            >
              Close
            </a>
          </div>
        </div>
      )}

      {/* Modal to display sales */}
      {isSalesModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-1/2 max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Sales Details</h2>
            <table className="min-w-full border-collapse">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2">Customer Name</th>
                  <th className="border border-gray-300 p-2">Product</th>
                  <th className="border border-gray-300 p-2">Quantity</th>
                  <th className="border border-gray-300 p-2">Grand Total</th>
                </tr>
              </thead>
              <tbody>
                {sales.length > 0 ? (
                  sales.map((sale, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 p-2">
                        {sale.customerName}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {sale.products.map((product, idx) => (
                          <div key={idx}>
                            {product.name} - {product.quantity} x{" "}
                            {product.price}
                          </div>
                        ))}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {sale.products.reduce(
                          (acc, product) => acc + product.quantity,
                          0
                        )}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {sale.grandTotal}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="border border-gray-300 p-2 text-center"
                    >
                      No sales found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <a
              onClick={handleSalesCloseModal}
              className="relative mt-10 flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800 sm:w-max cursor-pointer"
            >
              Close
            </a>
          </div>
        </div>
      )}
    </>
  );
}

export default HomeDashboardContainer;
