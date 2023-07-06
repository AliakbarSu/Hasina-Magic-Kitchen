import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface CartItem extends Menu {
    numOfPeople: number;
}
interface CartState {
    items: CartItem[];
}
const initialState: CartState = {
    items: [
    ],
};

import { Menu } from '@/types/application';

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
        removeItem: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(
                (item: CartItem) => item.id !== action.payload
            );
        },
        increaseNumOfPeople: (
            state,
            action: PayloadAction<{ id: string; numOfPeople: number }>
        ) => { 
           
            state.items = state.items.map((item)=> {
                if(item.id === action.payload.id) {
                    return {...item, numberOfPeople: item.numOfPeople + 1}
                } 
                return item
            })
         
        },
        decreaseNumOfPeople: (
            state,
            action: PayloadAction<{ id: string; numOfPeople: number }>
        ) => {},
        customizeItem: (state, action: PayloadAction<CartItem>) => {

        },
        getItemQuantity: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((item) => {
                if (item.id === action.payload) {
                    return item.numOfPeople;
                }
            });
        },
    },
});

export const { addItem, removeItem, getItemQuantity } = cartSlice.actions;
export default cartSlice.reducer;
