import React, { useContext } from 'react';
import UserContext from '../context/UserContext';

const Header = () => {
  const { user, setUser } = useContext(UserContext);

  if (user && user.loggedIn) {
    return (
      <div>
        <div className='cart-counter'>
          Items in cart: {}
        </div>
        <button onClick={() => setUser && setUser(null)}>Log out</button>
      </div>
    );
  } else {
    return <div></div>
  }
};

export default Header;
