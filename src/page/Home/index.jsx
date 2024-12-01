import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './index.css';
import { fetchProduct, nextPage, prevPage } from '../../app/features/Product/actions';
import CardProduct from '../../components/CardProduct';
import Pagination from '../../components/Paginate';

const Home = ({ isLoggedIn }) => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.product.data);
    const isLoading = useSelector(state => state.product.status) === 'process';
    const totalItems = useSelector((state) => state.product.totalItems);
    const currentPage = useSelector((state) => state.product.currentPage);
    const productsPerPage = useSelector((state) => state.product.perPage);
    const category = useSelector((state) => state.product.category);
    const brands = useSelector((state) => state.product.brands);
    const noProductsFound = useSelector(state => state.product.noProductsFound);

    useEffect(() => {
        dispatch(fetchProduct());
        
    }, [dispatch, currentPage, category, brands]);

    const handleNextPage = () => {
        dispatch(nextPage());
    };

    const handlePrevPage = () => {
        dispatch(prevPage());
    };

    const indexOfLastProduct = currentPage * productsPerPage;




    return (
        <div className='product-container'>
            <div className="hero-container">
                <div className="hero-text">
                    <h1 className='hero-title'>Welcome to Clothes-Store</h1>
                    <p className='hero-title'>Affordable and high quality clothes!</p>
                </div>
            </div>
            <div className='product-page'>
                <div className="product-list">
                    {isLoading ? (
                        <>
                            <div className="loader"></div>
                        </>
                    ) : noProductsFound ? (
                        <p className="no-products-message">No Products Found</p>
                    ): products.length > 0 ? (
                        products.map(product => (
                            <CardProduct key={product._id} product={product} isLoggedIn={isLoggedIn} />
                        ))
                    ) : (
                        <p>No Products Available</p>
                    )}
                </div>
            </div>
            <div className="pagination">
                    <Pagination 
                        handlePrevPage={handlePrevPage}
                        handleNextPage={handleNextPage}
                        currentPage={currentPage}
                        totalItems={totalItems}
                        productsPerPage={productsPerPage}
                        indexOfLastProduct={indexOfLastProduct}
                    />
            </div>
        </div>
    );
};

export default Home;
