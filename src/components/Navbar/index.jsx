import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import './index.css';
import { useDispatch, useSelector } from "react-redux";
import imgCart from '../../assets/img/cart.png';
import imglogo from '../../assets/img/logo1.png';
import Account from "../../components/Account";
import { fetchProduct, setCategory, setKeyword } from "../../app/features/Product/actions";
import Category from "../Category";
import Searchbar from "../SearchBar";

const Navbar = ({isLoggedIn, setIsLoggedIn}) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart);
    const [searchKeyword, setSearchKeyword] = useState('');


    const handleMenu = () => {
        dispatch(setCategory(''));
        dispatch(setKeyword(''));
        dispatch(fetchProduct());
        setSearchKeyword('');
      };

    const getTotalCartItems = () => {
        return cartItems.reduce((total, item) => total + item.qty, 0);
    };

    return(
        <div className="navbar-container">
            {/* <p>navbar</p> */}
            <div className="navbar">
                <div className="navbar-list">
                    <h4 className="navbar-brand">
                        <img src={imglogo} alt="Logo" className="imgLogo" />
                        <NavLink to="/" onClick={() => handleMenu} className="linkMenu">                        
                            Eduwork-Store
                        </NavLink>
                    </h4>
                </div>
                <div className="navbar-list">
                    <Searchbar searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword}/>
                </div>
                <div className="navbar-list">
                    <ul className="link-wrapper">
                        <li className="link">
                            <NavLink to="/" onClick={handleMenu} className="linkMenu">Home</NavLink>
                        </li>
                        <li className="link">
                            <Category setSearchKeyword={setSearchKeyword}/>
                        </li>
                        <li className="link">
                            <NavLink to="/" className="linkMenu">Contact</NavLink>
                        </li>
                        <li className="link cart-link">
                        <NavLink to="/cart" className="linkMenu">
                            <img src={imgCart} alt='imgCart' className='imgCart'></img>
                            {getTotalCartItems() > 0 && (
                                    <span className="cart-badge">{getTotalCartItems()}</span>
                                )}
                            </NavLink>
                        </li>
                        {isLoggedIn ? (
                            <>
                                <li className="link">
                                    <Account isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
                                </li>
                            </>
                        ) : (
                            <li className="link">
                                <NavLink to="/login" className="linkMenu">Login</NavLink>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;