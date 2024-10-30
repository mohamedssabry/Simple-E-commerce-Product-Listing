import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch products");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center"
        >
          <img
            src={product.image}
            alt={product.title}
            className="w-24 h-24 object-contain mb-4"
          />
          <h3 className="text-lg font-bold">{product.title}</h3>
          <p className="text-gray-700">${product.price}</p>
          <div className="flex items-center mt-2">
            <span className="text-yellow-500">
              {"★".repeat(Math.round(product.rating.rate))}
            </span>
            <span className="text-gray-600 ml-2">({product.rating.count})</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
