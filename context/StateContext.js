import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(100);

    let foundProduct;
    let index;

    const onAdd = (product, quantity) => {
        let newCartItems = [...cartItems]
        const checkProductInCart = newCartItems.find(item => item._id === product._id)
        if(checkProductInCart) {
            newCartItems.map(cartProduct => {
                if(cartProduct._id === product._id) {
                    cartProduct.quantity = cartProduct.quantity + quantity
                }
            })
            setCartItems(newCartItems);
        } else {
            product.quantity = quantity;
            setCartItems([...newCartItems, { ...product }]);
        }
        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
        toast.success(`${qty} ${product.name} added to the cart.`);
        setQty(100);
    }

    const onRemove = (product) => {
        foundProduct = cartItems.find((item) => item._id === product._id);
        const newCartItems = cartItems.filter((item) => item._id !== product._id);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
        setCartItems(newCartItems);
    }

    const toggleCartItemQuantity = (id, value) => {
        foundProduct = cartItems.find((item) => item._id === id);
        index = cartItems.findIndex((product) => product._id === id);
        const newCartItems = cartItems.filter((item) => item._id !== id)
        if(value === 'inc') {
            setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 100 }])
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price * 100)
            setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 100)

        } else if(value === 'dec') {
            if (foundProduct.quantity > 100) {
                setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 100 }])
                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * 100)
                setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 100)
            }        
        }
    }

    const incQty = () => {
        setQty((prevQty) => prevQty + 100);
    }

    const decQty = () => {
        setQty((prevQty) => {
            if (prevQty - 100 < 100) return 100;
            return prevQty - 100;
        });
    }

    cartItems.sort((a, b) => {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    });

    return (
        <Context.Provider
            value={{
                showCart,
                setShowCart,
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
                incQty,
                decQty,
                onAdd,
                toggleCartItemQuantity,
                onRemove,
                setCartItems,
                setTotalPrice,
                setTotalQuantities
            }}
        >
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);