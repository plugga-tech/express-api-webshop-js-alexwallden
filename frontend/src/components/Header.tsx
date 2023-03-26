import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../context/UserContext';
import CartContext from '../context/CartContext';
import { Link } from 'react-router-dom';
import '../style/_header.scss';

interface IHeaderProps {
  placeOrder: () => void;
  emptyCart: () => void;
  showPlacedMessage: () => void;
}

const Header = ({ placeOrder, emptyCart, showPlacedMessage }: IHeaderProps) => {
  const { order } = useContext(CartContext);
  const { user, setUser } = useContext(UserContext);
  

  const updateCartCount = () => {
    let count = 0;
    if (order?.products) {
      for (let index = 0; index < order?.products.length; index++) {
        const product = order?.products[index];
        count += product.quantity;
      }
    }
    // setCartItemsCounter(count)
    return count;
  };

  const logOut = () => {
    setUser && setUser(null);
    localStorage.removeItem('user');
  };

  const [cartItemsCounter, setCartItemsCounter] = useState(updateCartCount());

  useEffect(() => {
    console.log(order);
    console.log(updateCartCount());
    setCartItemsCounter(updateCartCount());
  }, [order?.products.length]);

  // useEffect(()=>{
  //     updateCartCount()
  //     console.log(order);
  // }, [order])

  if (user && user.loggedIn) {
    return (
      <header>
        <h3>Välkommen {user?.name.substring(0, user.name.indexOf(' '))}</h3>
        <Link to="/orders">
          <button>Your orders</button>
        </Link>
        <div className="cart-counter">{cartItemsCounter > 0 && `Items in cart:  ${cartItemsCounter}`}</div>
        {order?.products && order?.products.length > 0 && (
          <div className="order-btns">
            <button
              onClick={() => {
                placeOrder();
                showPlacedMessage();
              }}
            >
              Place order
            </button>
            <button onClick={emptyCart}>Empty cart</button>
          </div>
        )}
        <button className="logout-btn" onClick={logOut}>
          Log out
        </button>
      </header>
    );
  } else {
    return <div></div>;
  }
};

export default Header;
