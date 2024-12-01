import React, { useEffect, useRef, useState } from "react";
import './index.css';
import imgAccount from '../../assets/img/account.png';
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, performLogout } from "../../app/features/Auth/actions";
import { useNavigate } from "react-router-dom";


const Account = ({ setIsLoggedIn }) => {
    const [showPopup, setShowPopup] = useState(false);
    const accountRef = useRef();
    const dispatch = useDispatch();
    const profile = useSelector(state => state.auth.user);
    const navigate = useNavigate();
    // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const [showConfirm, setShowConfirm] = useState(false);

    // fetch profile
    useEffect(() =>{
        dispatch(fetchProfile())
    },[dispatch]);

    // handle popup menu
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    if(!profile) return <p>Loading...</p>;
    const handleAccountClick = () =>{
        setShowPopup(!showPopup)
    }
    const handleClickOutside = (event) => {
        if (accountRef.current && !accountRef.current.contains(event.target)) {
            setShowPopup(false);
        }
    };

    // handle Logout
    const handleLogout = async () => {
        try {
            await dispatch(performLogout());
            setIsLoggedIn(false);
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };
    const confirmLogout = () => setShowConfirm(true);
    const cancelLogout = () => setShowConfirm(false);

    // handle link
const handleOrderClick = () => {
    navigate('/order')
}




    return(
        <div className="account-container" ref={accountRef}>
            <div className="account-head">
                <button className="btn-account" onClick={handleAccountClick}>
                        <img src={imgAccount} alt="Account" className="img-account" />
                </button>
            </div>
            {showPopup && ( 
                <div className="account-list">
                    <ul>
                        <li>
                        <button className="account-profile">
                            <p className="account-name">{profile.us_name}</p>
                            <p className="account-email">{profile.us_email}</p>
                        </button>
                        </li>
                        <div className="horizontal-line"></div>
                        <li><button onClick={handleOrderClick} className="account-account">Account</button></li>
                        <li><button onClick={handleOrderClick} className="account-order">Order List</button></li>
                        <li><button className="account-feedback">Give feedback</button></li>
                        <li><button className="account-about">About</button></li>
                        <li><button className="account-logout" onClick={confirmLogout}>Sign out</button></li>
                        <li className="account-footer">
                            <a href="https://">Privacy</a>
                            <a href="https://">Terms</a>
                            <a href="https://">FAQ</a>
                        </li>
                    </ul>
                </div> )}
            {showConfirm && (
                <div className="modal-overlay">
                    <div className="modal">
                        <p>Are you sure you want to logout?</p>
                        <button onClick={handleLogout} className="confirm-button">Yes</button>
                        <button onClick={cancelLogout} className="cancel-button">No</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Account;
