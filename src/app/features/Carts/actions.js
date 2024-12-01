import {ADD_ITEM, REMOVE_ITEM, CLEAR_ITEM} from './constants';
// import { saveCart } from '../../api/cart';

export const addItem = (item) => ({
    type: ADD_ITEM,
    payload: {
        item: {
            ...item,
            product: item.product || item,
            qty: item.qty ? item.qty + 1 : 1,
        }
    }
});

export function removeItem(item){
    return{
        type: REMOVE_ITEM,
        payload: {
            item: item
        }
    }
    
};

export function clearItem(){
    return{
        type: CLEAR_ITEM
    }
}

