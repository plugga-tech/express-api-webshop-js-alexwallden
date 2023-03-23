import React, { useContext } from 'react';
import UserContext from '../context/UserContext';
import CartContext from '../context/CartContext';

const Header = () => {
  const { order } = useContext(CartContext);
  const { user, setUser } = useContext(UserContext);

  if (user && user.loggedIn) {
    return (
      <div>
        <div className="cart-counter">Items in cart: {order && order.products.length}</div>
        <button onClick={() => setUser && setUser(null)}>Log out</button>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Header;
