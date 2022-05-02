import { Size } from '../types/size.type';

export const headerTitleMap: Record<string, string> = {
    id: 'Id',
    title: 'Title',
    description: 'Description',
    price: 'Price',
    sale: 'Sale',
    image: 'Image',
    sale_description: 'Sale Description',
    category: 'Category',
};

export const headerOrder = ['id', 'title', 'image', 'description', 'price', 'sale', 'sale_description', 'category'];

export const sizeMap: { [key: string]: Size } = {
    id: 'sm',
    sale: 'sm-x',
    price: 'sm-x',
    image: 'sm-x',
    title: 'md',
    description: 'md-x',
    author_id: 'sm-x',
    category: 'sm-x',
};
