import React from 'react';

import { Td } from '../../components/table/table';
import { sizeMap } from '../app.config';
import css from '../app.module.scss';
import { IProduct } from '../app.type';

interface Props {
    row: IProduct;
    cell: keyof IProduct | string;
}

export const TableCell = ({ row, cell }: Props): JSX.Element => {
    switch (cell) {
        case 'image': {
            return (
                <Td size={sizeMap.image}>
                    <img className={css.img} src={row[cell]} alt="" />
                </Td>
            );
        }

        case 'sale': {
            return (
                <Td size={sizeMap.sale}>
                    <span className={css.percentage}>{(row.sale?.percentage || '0') + '%'}</span>
                </Td>
            );
        }

        case 'sale_description': {
            return <Td size={sizeMap.sale_description}>{row.sale?.description || '-'}</Td>;
        }

        case 'description': {
            return <Td size={sizeMap.description}>{row.description}</Td>;
        }

        case 'category': {
            return <Td size={sizeMap.category}>{row.category}</Td>;
        }

        case 'price':
            return <Td size={sizeMap.category}>{row.price}</Td>;

        default:
            return <Td size={sizeMap[cell]}>{(row[cell as keyof IProduct] as string) || ' - '}</Td>;
    }
};
