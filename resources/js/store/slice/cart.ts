import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface CartItem extends Menu {
    numOfPeople: number;
}
interface CartState {
    items: CartItem[];
    addons: Addon[];
}
const initialState: CartState = {
    items: [],
    addons: [],
};

import { Addon, Menu } from '@/types/application';

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<CartItem>) => {
            const itemExist = state.items.find(
                (item) => item.id === action.payload.id
            );

            if (!itemExist) state.items = [...state.items, action.payload];
        },
        addOrUpdate: (state, action: PayloadAction<Addon>) => {
            const addonExist = state.addons.find(
                (addon) => addon.dish_id === action.payload.dish_id
            );
            if (!addonExist) {
                state.addons = [...state.addons, action.payload];
            } else {
                addonExist.quantity = action.payload.quantity;
                state.addons = state.addons.map((addon) => {
                    if (addon.dish_id === action.payload.dish_id) {
                        return addonExist;
                    }
                    return addon;
                });
            }
        },
        removeAddon: (state, action: PayloadAction<string>) => {
            state.addons = state.addons.filter(
                (addon) => addon.dish_id !== action.payload
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
        decreaseNumOfPeople: (
            state,
            action: PayloadAction<{ id: string; numOfPeople: number }>
        ) => {},
        updateQuantity: (
            state,
            action: PayloadAction<{ id: string; quantity: number }>
        ) => {
            state.items = state.items.map((item) => {
                if (item.id === action.payload.id) {
                    return {
                        ...item,
                        numOfPeople: action.payload.quantity,
                    };
                }
                return item;
            });
        },
        updateMenuItem: (state, action: PayloadAction<Menu>) => {
            state.items = state.items.map((item) => {
                if (item.id === action.payload.id) {
                    return action.payload as CartItem;
                }
                return item;
            });
        },
        customizeItem: (state, action: PayloadAction<CartItem>) => {},
        getItemQuantity: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((item) => {
                if (item.id === action.payload) {
                    return item.numOfPeople;
                }
            });
        },
    },
});

export const {
    addItem,
    removeItem,
    getItemQuantity,
    updateQuantity,
    updateMenuItem,
    addOrUpdate,
    removeAddon,
} = cartSlice.actions;

export const selectCartTotal = (state: { cart: { items: CartItem[] } }) => {
    return state.cart.items.reduce(
        (total, item) => total + item.price * item.numOfPeople,
        0
    );
};

export const selectAddons = (state: { cart: { addons: Addon[] } }) => {
    return state.cart.addons;
};

export default cartSlice.reducer;
