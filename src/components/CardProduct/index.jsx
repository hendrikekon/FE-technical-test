import React from 'react';
import './index.css';
import imgBuy from '../../assets/img/buy.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ADD_ITEM } from '../../app/features/Carts/constants';

const CardProduct = ({ product, isLoggedIn }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleAddToCart = () => {
        if (isLoggedIn) {
            // Logic to add the product to the cart
            console.log(`Added ${product.pd_name} to the cart.`);
            dispatch ({
                type: ADD_ITEM,
                payload: {
                    item: {
                        _id: product._id,
                        name: product.pd_name,
                        price: product.pd_price,
                        category: product.pd_ct_id.ct_name,
                        code: product.pd_code,
                    },
                },
            })
        } else {
            navigate('/login');

        }
    };

    return (
        <div className="card-product">
            <h3 className="product-name">{product.pd_name}</h3>
            <p className="product-category">Category: {product.pd_ct_id.ct_name}</p>
            <p className="product-price">Price: Rp {product.pd_price.toLocaleString()}</p>
            <p className="product-code">Code: {product.pd_code}</p>
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
                <img src={imgBuy} alt='imgBuy' className='imgBuy'></img>
            </button>
        </div>
    );
};

export default CardProduct;
