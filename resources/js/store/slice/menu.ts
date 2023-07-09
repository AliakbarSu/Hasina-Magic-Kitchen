import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface CartItem extends Menu {
    numOfPeople: number;
}
interface MenuState {
    menus: Menu[];
    originalMenu: Menu[];
    selectedMenu: Menu | null;
    dishes: Dish[];
}
const initialState: MenuState = {
    menus: [],
    originalMenu: [],
    selectedMenu: null,
    dishes: [],
};

import { Dish, Menu } from '@/types/application';

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        setMenus: (state, action: PayloadAction<Menu[]>) => {
            state.menus = action.payload;
            state.originalMenu = action.payload;
        },
        setDishes: (state, action: PayloadAction<Dish[]>) => {
            state.dishes = action.payload;
        },
        setSelectedMenu: (state, action: PayloadAction<Menu>) => {
            state.selectedMenu = action.payload;
        },
        updateMenuItem: (state, action: PayloadAction<Menu>) => {
            state.menus = state.menus.map((item) => {
                if (item.id === action.payload.id) {
                    return {
                        ...item,
                        ...action.payload,
                    };
                }
                return item;
            });
            state.selectedMenu = {
                ...state.selectedMenu,
                ...action.payload,
            };
        },
    },
});

export const { setMenus, updateMenuItem, setSelectedMenu, setDishes } =
    menuSlice.actions;

export const getSelectedMenu = (state: { menu: MenuState }) =>
    state.menu.selectedMenu;

export default menuSlice.reducer;
