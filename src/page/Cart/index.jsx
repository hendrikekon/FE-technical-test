import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, addItem } from '../../app/features/Carts/actions';
import './index.css'
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart);
    const userToken = useSelector((state) => state.auth.token);
    const navigate =useNavigate();


    const onUpdateQuantity = (item, newQuantity) => {
        if (newQuantity <= 0) {
            dispatch(removeItem(item)); 
        } else {
   
            if (newQuantity < item.qty) {
                dispatch(removeItem(item));
            } else {
                dispatch(addItem({ ...item, qty: newQuantity })); 
            }
        }
    };

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.qty), 0);
    };

    const onCheckout = async() => {
        if (cartItems.length === 0){
            alert('Your cart is empty');
            return;
        }else{
            try {
                console.log('Payload:', { userToken, cartItems });
                navigate('/order');
            } catch (error) {
                console.error('Failed to save cart', error);
            }
        }
    };

    return (
        <div className="cart-container">
            <div className="cart-group">
                <h3>Cart</h3>
            </div>
            <div className="cart-group">
                <div className="cart-list">
                    {cartItems.length > 0 ? cartItems.map((item) => {
                        return (
                            <div className="cart-item" key={`${item._id}-${item.sizeId}-${item.colorId}`}>

                                <div>
                                    <p><strong>{item.name}</strong></p>
                                    <p>Rp. {item.price}</p>
                                    <div className="cart-item-quantity">
                                        <button 
                                            onClick={() => onUpdateQuantity(item, item.qty - 1)} 
                                            disabled={item.qty < 1} className='btn-add-cart'>-</button>
                                        <span>{item.qty}</span>
                                        <button 
                                            onClick={() => onUpdateQuantity(item, item.qty + 1)}
                                            disabled={item.qty >= item.stock}
                                            className='btn-add-cart'>+</button>
                                    </div>
                                </div>
                            </div>
                        );
                    }) : <p>Your cart is empty.</p>}
                </div>
                <div className="cart-total">
                    <p>Total Price: Rp. {calculateTotalPrice()}</p>
                </div>
                <div className="cart-button">
                    <button className="cart-button-checkout" onClick={onCheckout}>Checkout</button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
