import React from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import "./index.css";
import { useDispatch } from "react-redux";
import { performLogin } from "../../app/features/Auth/actions";

const LoginForm = ({setIsLoggedIn}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
        await dispatch(performLogin(data))
        setIsLoggedIn(true);
        navigate('/');
        } catch (error) {
        console.error("Login Failed", error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
            <h2 className="Login">Login</h2>
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

            <button className="login-button" type="submit">
                Login
            </button>

            <div className="form-group">
                <div className="link-container">
                <NavLink to="/register" className="linkRegister">
                    Don't have an account? Register
                </NavLink>
                </div>
            </div>
        </form>
    );
};

export default LoginForm;
