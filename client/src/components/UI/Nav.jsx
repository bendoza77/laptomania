import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { useCart } from "../../context/Cart.content";

const Nav = () => {
  const { user, logout } = useAuth();
  const { cart, deleteCart, handleMinus, handlePlus, handleClearCart, side, setSide } = useCart();

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      {/* Cart Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300
        ${side ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">Your Cart</h2>
          <button
            onClick={() => setSide(false)}
            className="text-2xl font-bold hover:text-red-500 transition-colors"
          >
            ×
          </button>
        </div>

        {/* Empty Cart */}
        {cart.length === 0 && (
          <div className="p-4 text-center text-gray-500">Add laptops to your cart!</div>
        )}

        {/* Cart Items */}
        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-64px)]">
          {cart.map((el) => (
            <div
              key={el._id}
              className="flex gap-4 border rounded-xl p-3 hover:shadow-md transition-shadow"
            >
              {/* Image */}
              <img
                src={el.images[0].url}
                alt={el.model}
                className="w-24 h-20 object-cover rounded-lg"
              />

              {/* Info */}
              <div className="flex flex-col justify-between w-full">
                <div>
                  <h3 className="font-semibold text-lg">
                    {el.brand} {el.model}
                  </h3>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => handleMinus(el)}
                      className="px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors disabled:opacity-50"
                      disabled={el.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-3 font-medium">{el.quantity}</span>
                    <button
                      onClick={() => handlePlus(el)}
                      className="px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                    >
                      +
                    </button>
                  </div>

                  <p className="text-sm text-gray-500 mt-1">{el.processor}</p>
                  <p className="text-sm text-gray-500">
                    RAM {el.ram}GB · SSD {el.storage}GB
                  </p>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <span className="text-lg font-bold text-green-600">
                    ${el.price * el.quantity}
                  </span>
                  <button
                    onClick={() => deleteCart(el._id)}
                    className="text-sm text-red-500 hover:underline transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Total Price & Clear Cart */}
          {cart.length > 0 && (
            <div className="mt-4 border-t pt-4 flex flex-col sm:flex-row items-center justify-between gap-2">
              <h2 className="text-xl font-bold">
                Full Price: ${totalPrice}
              </h2>
              <button
                onClick={handleClearCart}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
              >
                Clear Cart
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Bar */}
      <header className="flex items-center justify-between bg-gray-800 text-white px-6 py-4 shadow-lg sticky top-0 z-40">
        <Link
          to="/"
          className="text-white text-xl font-bold hover:text-blue-400 transition-colors"
        >
          Laptomania
        </Link>

        <nav className="flex items-center space-x-3">
          {user === null && (
            <>
              <Link to="/signup">
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors">
                  Sign Up
                </button>
              </Link>
              <Link to="/login">
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors">
                  Login
                </button>
              </Link>
            </>
          )}

          <Link to="/">
            <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition-colors">
              Home
            </button>
          </Link>

          {user !== null && (
            <>
              <button
                onClick={() => setSide(true)}
                className="relative px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition-colors"
              >
                🛒 Cart
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cart.length}
                  </span>
                )}
              </button>
              <Link to="/profile">
                <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition-colors">
                  Profile
                </button>
              </Link>
              <Link to="/products">
                <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition-colors">
                  Products
                </button>
              </Link>
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-colors"
              >
                Log Out
              </button>
            </>
          )}
        </nav>
      </header>
    </>
  );
};

export default Nav;
