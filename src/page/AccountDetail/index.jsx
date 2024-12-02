import React, { useEffect, useState } from "react";
import { getProfile } from "../../app/api/auth";
import './index.css';

const AccountDetail = () => {
    const [userProfile, setUserProfile] = useState([]);

    useEffect(() => {
        const fetchMe = async() =>{
            try {
                const response = await getProfile();
                console.log(response.data);
                setUserProfile(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchMe();
    },[])
    if (!userProfile) {
        return <div className="loader">Loading...</div>;
      }
    
    return(
        <div className="account-detail-cotainer">
            <div className='account-detail-group'>
                <div className='account-detail-list'><strong>Name:</strong> {userProfile.us_name}</div>
                <div className='account-detail-list'><strong>Email:</strong> {userProfile.us_email}</div>
                <div className='account-detail-list'><strong>Phone Number:</strong> {userProfile.us_phone_number}</div>
                <div className='account-detail-list'><strong>Address:</strong> {userProfile.us_address}</div>
            </div>
        </div>
    );
}

export default AccountDetail;