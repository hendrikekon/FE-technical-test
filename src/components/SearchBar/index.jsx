import React, { useState } from "react";
import './index.css';
import { useDispatch, } from "react-redux";
import { fetchProduct, setCategory, setKeyword } from "../../app/features/Product/actions";

const Searchbar = ({searchKeyword, setSearchKeyword}) => {
    const dispatch = useDispatch();
    // const [searchKeyword, setSearchKeyword] = useState('');


    const handleSearch = (e) => {
        e.preventDefault();
        console.log(e)
        dispatch(setCategory(''));
        dispatch(setKeyword(searchKeyword));
        dispatch(fetchProduct());
        // setSearchKeyword('');
    };

    return(
        <div className="navbar-search">
            <form onSubmit={handleSearch} >
                <input 
                    type="text" 
                    placeholder="Search..." 
                    className="search-bar" 
                    value={searchKeyword} 
                    onChange={(e) => setSearchKeyword(e.target.value)}
                />
            </form>
        </div>
    );
};

export default Searchbar;