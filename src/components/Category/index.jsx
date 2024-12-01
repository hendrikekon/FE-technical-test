import React, { useEffect, useRef, useState } from "react";
import './index.css';
import { useDispatch, useSelector, } from "react-redux";
import { getCategories } from "../../app/api/products";
import { setCategory, setKeyword } from "../../app/features/Product/actions";

const Category = ({setSearchKeyword}) => {
    const dispatch = useDispatch();
    const [showPopup, setShowPopup] = useState(false);
    const accountRef = useRef();
    const [categories, setCategories] = useState([]);
    const keyword = useSelector((state) => state.product.keywords);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (accountRef.current && !accountRef.current.contains(event.target)) {
                setShowPopup(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getCategories();
                setCategories(response);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCategories();
    }, []);

    const handleCategoryChange = (category) => {
        dispatch(setKeyword(''));
        setSearchKeyword('');
        const selectedCategory = category;
        console.log(selectedCategory); 
        dispatch(setCategory(selectedCategory));
        setShowPopup(false);
    };


    return (
        <div ref={accountRef} className="dropdown linkMenu">
            <button onClick={() => setShowPopup(!showPopup)} className="dropdown-toggle">
                Category
            </button>
            {showPopup && (
                <ul className="dropdown-menu show">
                    {categories.map((category) => (
                        <li key={category._id}>
                            <button
                                onClick={() => handleCategoryChange(category.ct_name)}
                                className="link-category"
                            >
                                {category.ct_name}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Category;

