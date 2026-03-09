
'use client'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/producttahnk";

export default function ProductsClient() {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.products);

    console.log(products)

    useEffect(() => {
        // Restaurant ID localStorage से ले रहे हैं
        const userData = localStorage.getItem("user");
        console.log('data', userData)
        if (userData) {
            const restaurantId = JSON.parse(userData).userdata._id;
            dispatch(fetchProducts(restaurantId)); // ✅ यह thunk run होगा
        }
    }, [dispatch]);

    if (loading) return <h1>Loading...</h1>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            {products.map((p) => (
                <div key={p._id}>
                    {p.name} - ₹{p.price}
                </div>
            ))}
        </div>
    );
}
