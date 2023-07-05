import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Dish {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: { name: string; id: string };
    created_at: string;
    updated_at: string;
    pivot: {
        menu_id: string;
        dish_id: string;
    };
}

export interface Menu {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: { name: string; id: string };
    created_at: string;
    updated_at: string;
    dishes: Dish[];
    options: Dish[];
}

export interface CartItem extends Menu {
    numOfPeople: number;
}
interface CartState {
    items: CartItem[];
}
const initialState: CartState = {
    items: [
        // {
        //     numOfPeople: 15,
        //     id: '99801cca-8d04-47d7-a17d-957dbc924b6c',
        //     name: 'Prof. Ezequiel Cruickshank',
        //     description: 'Debitis minus ipsam labore sed placeat.',
        //     price: 113,
        //     image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80',
        //     category: { name: 'Premade', id: 'fa2lkjfdls23dlksd' },
        //     created_at: '2023-06-26T04:52:59.000000Z',
        //     updated_at: '2023-06-26T04:52:59.000000Z',
        //     dishes: [
        //         {
        //             id: '99801cca-89d6-4aff-bdea-a1a0ef661bd4',
        //             name: 'Elza Schroeder',
        //             description: 'Corrupti qui ratione repellendus nemo.',
        //             price: 29.06,
        //             image: 'https://via.placeholder.com/640x480.png/0000ee?text=food+dicta',
        //             category: {
        //                 name: 'food',
        //                 id: '99801cca-8853-4c59-b572-9fb99a12bc8d',
        //             },
        //             created_at: '2023-06-26T04:52:58.000000Z',
        //             updated_at: '2023-06-26T04:52:58.000000Z',
        //             pivot: {
        //                 menu_id: '99801cca-8d04-47d7-a17d-957dbc924b6c',
        //                 dish_id: '99801cca-89d6-4aff-bdea-a1a0ef661bd4',
        //             },
        //         },
        //     ],
        //     options: [
        //         {
        //             id: '99801cca-8994-4faf-be99-ec5370bf730c',
        //             name: 'Mr. Leonardo Green',
        //             description: 'Ducimus et voluptas molestiae et.',
        //             price: 16.39,
        //             image: 'https://via.placeholder.com/640x480.png/00aa44?text=food+culpa',
        //             category: {
        //                 name: 'food 2',
        //                 id: '99801cca-8853-4c59-b572-9fb99a12bc8d',
        //             },
        //             created_at: '2023-06-26T04:52:58.000000Z',
        //             updated_at: '2023-06-26T04:52:58.000000Z',
        //             pivot: {
        //                 menu_id: '99801cca-8d04-47d7-a17d-957dbc924b6c',
        //                 dish_id: '99801cca-8994-4faf-be99-ec5370bf730c',
        //             },
        //         },
        //         {
        //             id: '99801cca-89b7-45e9-b9e0-ffad6d1f762d',
        //             name: 'Allan Langosh DDS',
        //             description: 'Maiores blanditiis nulla sapiente.',
        //             price: 48.19,
        //             image: 'https://via.placeholder.com/640x480.png/004400?text=food+officia',
        //             category: {
        //                 name: 'food 3',
        //                 id: '99801cca-8853-4c59-b572-9fb99a12bc8d',
        //             },
        //             created_at: '2023-06-26T04:52:58.000000Z',
        //             updated_at: '2023-06-26T04:52:58.000000Z',
        //             pivot: {
        //                 menu_id: '99801cca-8d04-47d7-a17d-957dbc924b6c',
        //                 dish_id: '99801cca-89b7-45e9-b9e0-ffad6d1f762d',
        //             },
        //         },
        //     ],
        // },
    ],
};

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
        ) => {},
        decreaseNumOfPeople: (
            state,
            action: PayloadAction<{ id: string; numOfPeople: number }>
        ) => {},
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

export const { addItem, removeItem, getItemQuantity } = cartSlice.actions;
export default cartSlice.reducer;
