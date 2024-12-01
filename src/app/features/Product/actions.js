import {getProduct} from '../../api/products'
import {ERROR_FETCHING_PRODUCT, SET_CATEGORY, SET_KEYWORD, SET_PAGE, START_FETCHING_PRODUCT, SUCCESS_FETCHING_PRODUCT, NEXT_PAGE, PREV_PAGE} from './constants'
import debounce from 'debounce-promise';

const debouncedFetchProduct = debounce(getProduct, 1000);

export const startFetchingProduct = () => ({
    type: START_FETCHING_PRODUCT,
})

export const successFetchingProduct = (products) => ({
    type: SUCCESS_FETCHING_PRODUCT,
    payload: products,
})

export const errorFetchingProduct = (error) => ({
    type: ERROR_FETCHING_PRODUCT,
    payload: error.message,
})

// let debouncedFetchProduct = debounce(getProduct, 1000);

export const fetchProduct = (selectedCategories) => {
    return async (dispatch, getState) => {
        dispatch(startFetchingProduct())

        let { perPage, currentPage, categories, tags, keyword } = getState().product;

        categories = selectedCategories || categories;
        const params = {
            limit: perPage,
            skip: (currentPage - 1) * perPage,
            categories: categories || '',
            // tags: tags.join(','),
            tags,
            q: keyword,
        }
        try {

            const response = await debouncedFetchProduct(params);
            if (response.data && response.count !== undefined) {

                dispatch(successFetchingProduct({ data: response.data, count: response.count }));
            } else {
                throw new Error('Invalid response structure');
            }

        } catch (error) {
            console.error('Error fetching products:', error);
            dispatch(errorFetchingProduct(error));
        }
    }
}

export const setCategory = (categories) => {
    return (dispatch) => {
        dispatch({ type: SET_CATEGORY, payload: categories });
        dispatch(fetchProduct(categories));
    };
};


export const setKeyword = (keyword) => ({
    type: SET_KEYWORD,
    payload: keyword,
});

export const setPage = (page) => ({
    type: SET_PAGE,
    payload: page,
});

export const nextPage = () => {
    return (dispatch, getState) => {
        dispatch({ type: NEXT_PAGE });
        const { category } = getState().product; 
        dispatch(fetchProduct(category));
    };
};

export const prevPage = () => {
    return (dispatch, getState) => {
        dispatch({ type: PREV_PAGE });
        const { category } = getState().product;
        dispatch(fetchProduct(category));
    };
};