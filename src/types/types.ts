export type Place = {
    _id?: string;
    name: string;
    type: string;
    address?: Address;
    review?: Review;
}

export type Address = {
    lat: number;
    lng: number;
}

export type Review = {
    rating: number;
    comment: string;
}