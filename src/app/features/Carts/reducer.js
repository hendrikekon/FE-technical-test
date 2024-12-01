import {ADD_ITEM, REMOVE_ITEM, CLEAR_ITEM} from './constants';

const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

export default function cartReducer(state = initialState, { type, payload }) {
    switch (type) {
        case ADD_ITEM:
            const existingItem = state.find(item => item._id === payload.item._id);
            if (existingItem) {
                return state.map(item => 
                    item._id === payload.item._id 
                        ? { ...item, qty: item.qty + 1 } // Increment qty
                        : item
                );
            } else {
                return [...state, { ...payload.item, qty: 1 }]; // Add new item with qty = 1
            }

        case REMOVE_ITEM:
            return state
                .map(item => 
                    item._id === payload.item._id 
                        ? { ...item, qty: item.qty - 1 } // Decrement qty
                        : item
                )
                .filter(item => item.qty > 0); // Remove item if qty is 0

        case CLEAR_ITEM:
            return [];

        default:
            return state;
    }
}
