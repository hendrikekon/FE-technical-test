import React, { useEffect, useState } from "react";
import { getOrders } from "../../app/api/order";
import './index.css';

const Orderlist = () => {
    const [orders, setOrders] = useState([]);
    
    useEffect(()=> {
        const fetchOrder = async() => {
            try {
                const response = await getOrders();
                console.log(response.data);
                setOrders(response.data.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchOrder();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-GB");
    };

   
    return (
        <div className="order-container">
            <div className="order-group">
                <p><strong>Orders</strong></p>
                <div className="order-list">
                    <table className='order-table'>
                        <thead>
                            <tr>
                                {/* <th className='order-header'></th> */}
                                <th className='order-header'>Date</th>
                                <th className='order-header'>Product</th>
                                <th className='order-header'>Price</th>
                                <th className='order-header'>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(orders => (
                                <tr key={orders._id}>    
                                    <td className='order-info'>{formatDate(orders.or_created_at)}</td>
                                    <td className='order-info'>{orders.or_pd_id.pd_name}</td>
                                    <td className='order-info'>{orders.or_pd_id.pd_price}</td>
                                    <td className='order-info'>{orders.or_amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Orderlist;
