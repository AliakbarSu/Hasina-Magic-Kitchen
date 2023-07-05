export interface Media {
    id: string;
    url: string;
}

export interface Dish {
    id: string;
    name: string;
    price: string;
    description: string;
    media: Media[];
    created_at: string;
}

export interface Menu {
    id: string;
    name: string;
    price: string;
    media: Media[];
    description: string;
    dishes: Dish[];
    created_at: string;
}
