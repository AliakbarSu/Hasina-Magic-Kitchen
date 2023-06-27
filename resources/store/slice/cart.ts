import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const product = [
    {
        id: '99801cca-8d04-47d7-a17d-957dbc924b6c',
        name: 'Prof. Ezequiel Cruickshank',
        description: 'Debitis minus ipsam labore sed placeat.',
        price: 113,
        created_at: '2023-06-26T04:52:59.000000Z',
        updated_at: '2023-06-26T04:52:59.000000Z',
        dishes: [
            {
                id: '99801cca-89d6-4aff-bdea-a1a0ef661bd4',
                name: 'Elza Schroeder',
                description: 'Corrupti qui ratione repellendus nemo.',
                price: 29.06,
                image: 'https://via.placeholder.com/640x480.png/0000ee?text=food+dicta',
                category_id: '99801cca-8853-4c59-b572-9fb99a12bc8d',
                created_at: '2023-06-26T04:52:58.000000Z',
                updated_at: '2023-06-26T04:52:58.000000Z',
                pivot: {
                    menu_id: '99801cca-8d04-47d7-a17d-957dbc924b6c',
                    dish_id: '99801cca-89d6-4aff-bdea-a1a0ef661bd4',
                },
            },
        ],
        options: [
            {
                id: '99801cca-8994-4faf-be99-ec5370bf730c',
                name: 'Mr. Leonardo Green',
                description: 'Ducimus et voluptas molestiae et.',
                price: 16.39,
                image: 'https://via.placeholder.com/640x480.png/00aa44?text=food+culpa',
                category_id: '99801cca-87ed-4837-9695-4ed3d98b66c3',
                created_at: '2023-06-26T04:52:58.000000Z',
                updated_at: '2023-06-26T04:52:58.000000Z',
                pivot: {
                    menu_id: '99801cca-8d04-47d7-a17d-957dbc924b6c',
                    dish_id: '99801cca-8994-4faf-be99-ec5370bf730c',
                },
            },
            {
                id: '99801cca-89b7-45e9-b9e0-ffad6d1f762d',
                name: 'Allan Langosh DDS',
                description: 'Maiores blanditiis nulla sapiente.',
                price: 48.19,
                image: 'https://via.placeholder.com/640x480.png/004400?text=food+officia',
                category_id: '99801cca-881b-441a-ae24-2cf8c7bdf437',
                created_at: '2023-06-26T04:52:58.000000Z',
                updated_at: '2023-06-26T04:52:58.000000Z',
                pivot: {
                    menu_id: '99801cca-8d04-47d7-a17d-957dbc924b6c',
                    dish_id: '99801cca-89b7-45e9-b9e0-ffad6d1f762d',
                },
            },
        ],
    },
];

interface Dish {
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

interface Menu {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: { name: string; id: string };
    created_at: string;
    updated_at: string;
    dishes: [Dish];
    options: [Dish];
}

type Products = [Menu];

export interface CartItem extends Menu {
    id: string;
    quantity: number;
}

interface CartState {
    isOpen: boolean;
    items: CartItem[];
}

const initialState: CartState = {
    isOpen: true,
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItems: (state, action: PayloadAction<CartItem>) => {
            const { id } = action.payload;
            const existingItem = state.items.find((item) => item.id === id);

            if (existingItem) {
                if (existingItem.quantity <= 0) existingItem.quantity = 0;
                if (existingItem.quantity >= 8) existingItem.quantity = 8;
                else existingItem.quantity += 1;
            } else {
                state.items = [...state.items, action.payload];
            }
        },
        addItem: (state, action: PayloadAction<CartItem>) => {
            state.items = [...state.items, action.payload];
        },
        // TODO: Make a functon that if item exists in cart, it should add to its quantity.
        changeItemQuantity: (state, action: PayloadAction<CartItem>) => {
            state.items.filter((item) => {
                if (item.id === action.payload.id) {
                    item.quantity = action.payload.quantity;
                } else return;
            });
        },
        removeItem: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(
                (item: Menu) => item.id !== action.payload
            );
        },
        openCart: (state) => {
            state.isOpen = true;
        },
        closeCart: (state) => {
            state.isOpen = false;
        },
    },
});

export const { addItem, removeItem, openCart, closeCart, addItems } =
    cartSlice.actions;
export default cartSlice.reducer;

// TODO: Use the addItem and removeItem functions
// TODO: Fix the nav and add cartIcon instead of the bell icon
// TODO: Fix product types
