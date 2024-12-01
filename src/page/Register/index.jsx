import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import './index.css'
import '../../utils/modal.css'
import { registerUser } from "../../app/api/auth";

const RegistrationForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();
    const [successMessage, setSuccesMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);

    const confirmError = () => setErrorMessage(false);
    const navLogin = () => {
        navigate('/login');
    }

    const onSubmit = async(data) => {
        try {
            console.log(data);
            const response = await registerUser(data);
            console.log('Registration Successful', response);
            setSuccesMessage(true);
        } catch (error) {
            setErrorMessage(true);
            console.error('Registration Failed', error);
        }
    };
    // const onSubmit = (data) => {
    //     console.log("Form Data:", data);
    // };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="register-form">
            <h2 className="Register">Register</h2>
            {successMessage && (
                <div className="modal-overlay">
                    <div className="modal">
                        <p>Registerasi berhasil. Silahkan login</p>
                        <button onClick={navLogin} className="confirm-button">Login</button>
                    </div>
                </div>
            )}
            {errorMessage && (
                <div className="modal-overlay">
                    <div className="modal">
                        <p>Registerasi gagal atau email sudah terdaftar. silahkan coba lagi</p>
                        <button onClick={confirmError} className="cancel-button">Coba Lagi</button>
                    </div>
                </div>
            )}
            <div className="form-group">
                <label htmlFor="us_name">Name:</label>
                <input
                    type="text"
                    id="us_name"
                    {...register("us_name", { required: "Name is required" })}
                />
                {errors.us_name && <p className="error-message">{errors.us_name.message}</p>}
            </div>

            <div className="form-group">
                <label htmlFor="us_email">Email:</label>
                <input
                    type="email"
                    id="us_email"
                    {...register("us_email", {
                    required: "Email is required",
                    pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Invalid email format",
                    },
                    })}
                />
                {errors.us_email && <p className="error-message">{errors.us_email.message}</p>}
            </div>

            <div className="form-group">
                <label htmlFor="us_password">Password:</label>
                <input
                    type="password"
                    id="us_password"
                    {...register("us_password", {
                    required: "Password is required",
                    minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters long",
                    },
                    })}
                />
                {errors.us_password && <p className="error-message">{errors.us_password.message}</p>}
            </div>

            <div className="form-group">
                <label htmlFor="us_phone_number">Phone Number:</label>
                <input
                    type="tel"
                    id="us_phone_number"
                    {...register("us_phone_number", {
                    required: "Phone number is required",
                    pattern: {
                        value: /^[0-9]{10,15}$/,
                        message: "Phone number must be between 10-15 digits",
                    },
                    })}
                />
                {errors.us_phone_number && <p className="error-message">{errors.us_phone_number.message}</p>}
            </div>

            <div className="form-group">
                <label htmlFor="us_address">Address:</label>
                <textarea
                    id="us_address"
                    {...register("us_address", { required: "Address is required" })}
                />
                {errors.us_address && <p className="error-message">{errors.us_address.message}</p>}
            </div>

            <button className="register-button" type="submit">Register</button>

            <div className="form-group">
                <div className="link-container">
                    <NavLink to="/login" className="linkLogin">Already have an account? Login</NavLink>
                </div>
            </div>
        </form>
    );
};

export default RegistrationForm;
