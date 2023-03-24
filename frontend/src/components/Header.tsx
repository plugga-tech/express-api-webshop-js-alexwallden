import React, { useContext } from 'react';
import UserContext from '../context/UserContext';
import CartContext from '../context/CartContext';
import { Link } from 'react-router-dom';

const Header = () => {
  const { order } = useContext(CartContext);
  const { user, setUser } = useContext(UserContext);

  if (user && user.loggedIn) {
    return (
      <div>
        <div className="cart-counter">{order && order.products.length > 0 && `Items in cart:  ${order.products.length}`}</div>
        <button onClick={() => setUser && setUser(null)}>Log out</button>
        <Link to="/orders"><button>Your orders</button></Link>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Header;
