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
    price: string;
    description: string;
    media: Media[];
    category: Category;
    created_at: string;
}

export interface Menu {
    id: string;
    name: string;
    price: string;
    media: Media[];
    description: string;
    dishes: Dish[];
    options: Dish[];
    created_at: string;
}
