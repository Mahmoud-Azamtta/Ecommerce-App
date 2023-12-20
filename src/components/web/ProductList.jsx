import React, { useContext } from "react";
import { CartContext } from "../../Contexts/CartContext";
import Error from "../shared/Error";
import { Link } from "react-router-dom";

function ProductList({ products }) {
  const { addProductToCart } = useContext(CartContext);
  console.log(products);
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products?.length ? (
        products?.map((product) => (
          <div
            key={product._id}
            className="product flex flex-col justify-between rounded-lg border border-gray-600 bg-gray-300 p-5 shadow-lg dark:border-gray-700 dark:bg-gray-900"
          >
            <Link to={`/product/${product._id}`}>
              <img
                src={product.mainImage.secure_url}
                alt="product image"
                className="w-full rounded-lg"
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = "/images/image-not-found.png";
                }}
              />
            </Link>
            <div className="product-description">
              <Link to={`/product/${product._id}`}>
                <h2 className="hover:text-amber-500 active:text-amber-600 dark:active:text-orange-700 mt-2 text-lg font-bold dark:hover:text-orange-500">
                  {product.name}
                </h2>
              </Link>
              {product.discount ? (
                <React.Fragment>
                  <p className="discount inline-block rounded-full bg-amber-400 px-3 py-0.5 text-lg font-bold text-black">
                    {product.discount}%
                  </p>
                  <p className="price">
                    <span className="text-sm text-gray-500 line-through">
                      {product.price}$
                    </span>
                    <span className="ml-2 font-bold dark:text-amber-500">
                      {product.finalPrice}$
                    </span>
                  </p>
                </React.Fragment>
              ) : (
                <p className="text-lg font-bold dark:text-amber-500">
                  {product.price}$
                </p>
              )}
              <button
                className="mt-2 block w-full rounded-lg bg-amber-500 py-1 text-white shadow-lg transition hover:scale-105 active:scale-95 dark:bg-orange-500"
                onClick={() => addProductToCart(product._id)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))
      ) : (
        <Error message="Could not load products" />
      )}
    </div>
  );
}

export default ProductList;
