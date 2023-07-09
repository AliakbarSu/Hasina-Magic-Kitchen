import { CartState } from '@/store/slice/cart';

const LOCALSTORAGE_KEY = 'CUSTOMER_CART';

export const saveCart = (cart: CartState) => {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(cart));
};

export const getCart = () => {
    const cart = localStorage.getItem(LOCALSTORAGE_KEY);
    return cart ? JSON.parse(cart) : null;
};

export const clearCart = () => {
    localStorage.removeItem(LOCALSTORAGE_KEY);
};
