import { Link, Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useCart } from './useCart';

export function Navbar() {
  const { cartItems } = useCart();
  let totalItems = 0;
  if (cartItems) {
    for (let i = 0; i < cartItems.length; i++) {
      totalItems += cartItems[i].quantity;
    }
  }

  return (
    <>
      <div className="flex items-center justify-between p-4 bg-purple-200">
        <div className="text-2xl font-bold">
          <Link to="/" className="text-3xl text-gray-800">
            Smiskis
          </Link>
        </div>
        <ul className="flex items-center space-x-4">
          <li>
            <Link
              to="/series"
              className="text-xl text-gray-800 no-underline hover:underline">
              Products
            </Link>
          </li>
          <li>
            <Link
              to="/checkout"
              className="relative flex items-center text-2xl text-gray-800 no-underline hover:underline">
              <FontAwesomeIcon icon={faShoppingCart} className="ml-2" />
              <div className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full -top-2 -right-2">
                {totalItems}
              </div>
            </Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </>
  );
}
