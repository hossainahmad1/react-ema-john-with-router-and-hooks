import React, { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { addToDb, deleteShoppingCart, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
const Shop = () => {

    const products = useLoaderData();

    const [cart, setCart] = useState([]);

    const clearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }

    useEffect(() => {
        const storedCart = getStoredCart()
        // console.log(storedCart);
        let saveCart = [];
        for (const id in storedCart) {
            const addedProduct = products.find(product => product.id === id);
            if (addedProduct) {
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                saveCart.push(addedProduct)
            }
        }
        setCart(saveCart);
    }, [products]);



    const handleCart = (selectedProduct) => {
        // console.log(selectedProduct);
        let newCart = [];
        const exits = cart.find(product => product.id === selectedProduct.id);
        if (!exits) {
            selectedProduct.quantity = 1;
            newCart = [...cart, selectedProduct];
        }
        else {
            const rest = cart.filter(product => product.id !== selectedProduct.id);
            exits.quantity = exits.quantity + 1;
            newCart = [...rest, exits];
        }
        setCart(newCart);
        addToDb(selectedProduct.id)
    }

    return (
        <div className='shop-container'>
            <div className="product-container">
                {
                    products.map(product => <Product
                        product={product}
                        handleCart={handleCart}
                        key={product.id}
                    ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart clearCart={clearCart} cart={cart}>
                    <Link to="/orders">
                        <button>Review orders</button>
                    </Link>

                </Cart>
            </div>
        </div>
    );
};

export default Shop;