export interface Media {
    id: string;
    url: string;
}

export interface Category {
    id: string;
    name: string;
    description: string;
}

export interface Dish {
    id: string;
    name: string;
    price: number;
    description: string;
    media: Media[];
    category: Category;
    created_at: string;
}

export interface Menu {
    id: string;
    name: string;
    price: number;
    media: Media[];
    description: string;
    dishes: Dish[];
    options: Dish[];
    created_at: string;
}

export interface Order {
    customer_name: string;
    email: string;
    phone: number;
    address: string;
    date: string; // "12-06-2023"
    time: string; // "10:00"
    note: string;
    items: {
        menu_id: string;
        dishes: string[];
        quantity: number;
    }[];
    addons: { dish_id: string; quantity: number }[];
}

export type OrderResponse = {
    message: string;
    payment_link: string;
};

export interface Addon {
    name: string;
    dish_id: string;
    quantity: number;
}
