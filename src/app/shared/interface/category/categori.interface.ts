export interface ICategoryRequst{
    name: string;
    path: string;
    imagePath: string;
}

export interface ICategoryResponse extends ICategoryRequst {
    id: number;
}