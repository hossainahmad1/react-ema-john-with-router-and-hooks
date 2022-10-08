import { getStoredCart } from "../utilities/fakedb";

export const productsAndCartLoader = async () => {
    // get products
    const productsData = await fetch('products.json');
    const products = await productsData.json();


    // get cart
    const saveCart = getStoredCart();
    const initialCart = [];
    // console.log(products);
    // console.log('saveCart', saveCart);
    for (const id in saveCart) {
        // console.log(id);
        const addedProduct = products.find(product => product.id === id);
        if (addedProduct) {
            // console.log(addedProduct);
            const quantity = saveCart[id];
            // console.log(id, quantity);
            addedProduct.quantity = quantity;
            initialCart.push(addedProduct);
        }

    }
    return { products: products, initialCart: initialCart };
}