import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { createOrder } from '../../app/api/order';
import { CLEAR_ITEM } from '../../app/features/Carts/constants';
import './index.css';
// import { fetchAddresses } from '../../app/features/Address/actions';

const Order = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector((state) => state.cart);
    const [deliveryFee, setDeliveryFee] = useState(10000);
    const [selectedService, setSelectedService] = useState('rekomendasi');
    const addresses = useSelector(state => state.auth.user?.us_address || null);
    const userId = useSelector(state => state.auth.user?._id || null);
    // const addresses = user?.us_address || null; // Safely access us_address
    // const userId = user?._id || null; // Safely access _id



    const handlePlaceOrder = async () => {
        try {
            if (!cartItems.length) {
            console.warn('No items in the cart');
            return;
        }

        // Loop through cart items and create orders
        const promises = cartItems.map(async (item) => {
            const orderData = {
                or_pd_id: item._id,
                or_us_id: userId,
                or_amount: item.qty,
            };
            await createOrder(orderData);
        });

        // Wait for all orders to be processed
        await Promise.all(promises);
        dispatch({ type: CLEAR_ITEM });

        navigate('/Orderlist');
            
        } catch (error) {
            console.error('Error placing order', error);
        }
    };

    const handleDeliveryChange = (event) => {
        const service = event.target.value;
        setSelectedService(service);   
        const deliveryFees = {
            rekomendasi: 10000,
            jnt: 12000,
            jne: 13000,
            ninja: 15000,
            anteraja: 8000,
            sicepat: 9000,
        };
        setDeliveryFee(deliveryFees[service] || 10000);
    };

    return (
        <div className='order-container'>
            <div className='order-group'>
                <div className='order-select-address-list'>
                    <NavLink to={'/cart'}>Kembali</NavLink>
                </div>
            </div>
            <div className='order-group'>
                <h2 className='order-title'>Order Summary</h2>
                    <div className='order-list'>
                        {cartItems.map((item) => (
                            <div key={`${item._id}`}>
                                <p>{item.name} x {item.qty}</p>
                                <p>Price: Rp. {item.price*item.qty}</p>
                            </div>
                        ))}
                    </div>
                    <p className='order-list-price'>Total Price: Rp. {cartItems.reduce((total, item) => total + item.price * item.qty, 0)}</p>

                    <h3 className='order-delivery-tittle'>Delivery Information</h3>
                    <div className='order-list'>
                    {addresses ? (
                        <p className="order-address">{addresses}</p>
                    ) : (
                        <p>No address available. Please add one in your profile.</p>
                    )}
                    </div>
                    <h3 className='order-delivery-fee'>Delivery Fee: Rp. {deliveryFee}</h3>
                    <select onChange={handleDeliveryChange} value={selectedService} className='order-select-delivery'>
                        <option value="rekomendasi">Rekomendasi</option>
                        <option value="jnt">J&T</option>
                        <option value="jne">JNE</option>
                        <option value="ninja">Ninja Express</option>
                        <option value="anteraja">AnterAja</option>
                        <option value="sicepat">SiCepat</option>
                    </select>

                    <h3 className='order-total-Price'>
                        <strong>Total Order Price:</strong>
                        Rp. {cartItems.reduce((total, item) => total + item.price * item.qty, 0) + deliveryFee}
                    </h3>

                    <button onClick={handlePlaceOrder} className='btn-order'>Place Order</button>
                </div>
            </div>
            
    );
};

export default Order;
