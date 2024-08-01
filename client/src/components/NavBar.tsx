// import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

export function Navbar() {
  return (
    <>
      <div className="flex items-center justify-between p-4 bg-purple-200">
        <div className="text-2xl font-bold">
          <Link to="/" className="text-gray-800 ">
            Smiskis
          </Link>
        </div>
        <ul className="flex space-x-4">
          <li>
            <Link
              to="/series"
              className="text-lg text-gray-800 no-underline hover:underline">
              Products
            </Link>
          </li>
          <li>
            <Link
              to="/cart"
              className="flex items-center text-lg text-gray-800 no-underline hover:underline">
              Cart <FontAwesomeIcon icon={faShoppingCart} className="ml-2" />
            </Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </>
  );
}
