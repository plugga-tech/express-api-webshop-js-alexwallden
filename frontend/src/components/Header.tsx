import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../context/UserContext';
import CartContext from '../context/CartContext';
import { Link } from 'react-router-dom';
import '../style/_header.scss';

interface IHeaderProps {
  placeOrder: () => void;
  emptyCart: () => void;
  showPlacedMessage: ()=> void;
}

const Header = ({ placeOrder, emptyCart, showPlacedMessage }: IHeaderProps) => {
  const { order } = useContext(CartContext);
  const { user, setUser } = useContext(UserContext);
  const [cartItemsCounter, setCartItemsCounter] = useState(0);

  const updateCartCount = ()=>{
    let count = 0;
    if (order?.products){
      for (let index = 0; index < order?.products.length; index++) {
        const product = order?.products[index];
        count += product.quantity
      }
    } 
    setCartItemsCounter(count)
  }

  useEffect(()=>{
    console.log(order);
    updateCartCount()
  }, [order?.products.length])
  

  if (user && user.loggedIn) {
    return (
      <header>
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
        <button className="logout-btn" onClick={() => setUser && setUser(null)}>
          Log out
        </button>
      </header>
    );
  } else {
    return <div></div>;
  }
};

export default Header;
