import {useEffect, useState} from "react";

export const useLikedProducts = () => {
    const [likedProducts, setLikedProducts] = useState([]);

    useEffect(() => {
        const storedLikedProducts = JSON.parse(localStorage.getItem('likedProducts')) || [];
        setLikedProducts(storedLikedProducts);
    }, []);

    const toggleLike = (productId) => {
        let updatedLikedProducts;
        if (likedProducts.includes(productId)) {
            updatedLikedProducts = likedProducts.filter(id => id !== productId);
        } else {
            updatedLikedProducts = [...likedProducts, productId];
        }
        setLikedProducts(updatedLikedProducts);
        localStorage.setItem('likedProducts', JSON.stringify(updatedLikedProducts));
    };

    return {likedProducts, toggleLike};
};