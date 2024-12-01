import { configureStore } from "@reduxjs/toolkit";
import authMiddleware from "./middleware/authMiddleware";
import authReducer from './features/Auth/reducer';
import productReducer from './features/Product/reducer';
import cartReducer from "./features/Carts/reducer";


const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authMiddleware),
});

export default store;
