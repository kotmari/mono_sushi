import { ICategoryResponse } from "../category/categori.interface";

export interface IProductRequest{
    category: ICategoryResponse;
    name: string;
    path: string;
    description: string;
    weight: string;
    price: number;
    imagePath:string;
}

export interface IProductResponse extends IProductRequest{
    id: number;
}