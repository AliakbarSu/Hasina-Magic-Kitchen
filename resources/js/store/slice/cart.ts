import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface CartItem extends Menu {
    numOfPeople: number;
}
export interface CartState {
    items: CartItem[];
    addons: Addon[];
    loaded: boolean;
}
const initialState: CartState = {
    items: [],
    addons: [],
    loaded: false,
};

import { Addon, Menu } from '@/types/application';
import { clearCart as emptyCart } from '../../utils/cart_localstorage';
import { RootState } from '..';

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (state, action: PayloadAction<CartState>) => {
            state.addons = action.payload.addons;
            state.items = action.payload.items;
            state.loaded = true;
        },
        addItem: (state, action: PayloadAction<CartItem>) => {
            state.loaded = true;
            const itemExist = state.items.find(
                (item) => item.id === action.payload.id
            );

            if (!itemExist) state.items = [...state.items, action.payload];
        },
        addOrUpdate: (state, action: PayloadAction<Addon>) => {
            const addonExist = state.addons.find(
                (addon) => addon.id === action.payload.id
            );
            if (!addonExist) {
                state.addons = [...state.addons, action.payload];
            } else {
                addonExist.quantity =
                    action.payload.quantity > 0 ? action.payload.quantity : 0;
                state.addons = state.addons.map((addon) => {
                    if (addon.id === action.payload.id) {
                        return addonExist;
                    }
                    return addon;
                });
            }
        },
        removeAddon: (state, action: PayloadAction<string>) => {
            state.addons = state.addons.filter(
                (addon) => addon.id !== action.payload
            );
        },
        removeItem: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(
                (item: CartItem) => item.id !== action.payload
            );
        },
        increaseNumOfPeople: (
            state,
            action: PayloadAction<{ id: string; numOfPeople: number }>
        ) => {
            state.items = state.items.map((item) => {
                if (item.id === action.payload.id) {
                    return { ...item, numberOfPeople: item.numOfPeople + 1 };
                }
                return item;
            });
        },
        decreaseNumOfPeople: () => {},
        updateQuantity: (
            state,
            {
                payload: { quantity, id },
            }: PayloadAction<{ id: string; quantity: number }>
        ) => {
            state.items = state.items.map((item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        numOfPeople: quantity,
                    };
                }
                return item;
            });
        },
        updateMenuItem: (state, action: PayloadAction<Menu>) => {
            state.items = state.items.map((item) => {
                if (item.id === action.payload.id) {
                    return { ...item, ...action.payload } as CartItem;
                }
                return item;
            });
        },
        customizeItem: () => {},
        getItemQuantity: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((item) => {
                if (item.id === action.payload) {
                    return item.numOfPeople;
                }
            });
        },
        clearCart: (state) => {
            emptyCart();
            state.items = [];
            state.addons = [];
        },
    },
});

export const {
    setCart,
    addItem,
    removeItem,
    getItemQuantity,
    updateQuantity,
    updateMenuItem,
    addOrUpdate,
    removeAddon,
    clearCart,
} = cartSlice.actions;

export const selectCartTotal = (state: RootState) => {
    const addonsTotal = state.cart.addons.reduce(
        (total, addon) => total + addon.price * addon.quantity,
        0
    );
    const itemsTotal = state.cart.items.reduce(
        (total, item) => total + item.price * item.numOfPeople,
        0
    );
    return addonsTotal + itemsTotal;
};

export const selectAddons = (state: { cart: { addons: Addon[] } }) => {
    return state.cart.addons;
};

export default cartSlice.reducer;
