import React, { useEffect, useState } from 'react';

import { Table, TBody, Th, THead, Tr } from '../components/table/table';
import { useKeyboardEvent } from '../hook/keyboard-events';
import { axios } from '../utils/axios';

import { headerOrder, headerTitleMap, sizeMap } from './app.config';
import css from './app.module.scss';
import { IProduct } from './app.type';
import { TableCell } from './components/table-cell';

export const App = (): JSX.Element => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<IProduct[]>([]);
    const { selected, toggle } = useKeyboardEvent(data);

    useEffect(() => {
        const getData = async (): Promise<void> => {
            const res = await axios();
            setData(res);
        };

        getData()
            .catch(console.log)
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <>
            <h1 className={css.heading}>Table</h1>

            <div className={css.container}>
                <div className={css.table}>
                    {loading ? (
                        <p>Loading ...</p>
                    ) : (
                        <Table>
                            <THead>
                                <Tr>
                                    {headerOrder.map(th => (
                                        <Th size={sizeMap[th]} key={th}>
                                            {headerTitleMap[th] || '-'}
                                        </Th>
                                    ))}
                                </Tr>
                            </THead>
                            <TBody>
                                {data.map((row, index) => (
                                    <Tr key={row.id + 'row'} active={selected.includes(index)} onClick={toggle(index)}>
                                        {headerOrder.map(cell => (
                                            <TableCell key={row.id + cell} row={row} cell={cell} />
                                        ))}
                                    </Tr>
                                ))}
                            </TBody>
                        </Table>
                    )}
                </div>
            </div>
        </>
    );
};
