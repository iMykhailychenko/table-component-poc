import { IProduct } from '../app/app.type';

import { data } from './mock';

export const axios = (): Promise<IProduct[]> => {
    return new Promise<IProduct[]>((resolve, reject) => {
        setTimeout(() => {
            try {
                resolve(data);
            } catch (e) {
                reject(e);
            }
        }, 1500);
    });
};
