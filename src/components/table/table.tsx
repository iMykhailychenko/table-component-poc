import React, { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

import classNames from 'classnames';

import { Size } from '../../types/size.type';

import css from './table.module.scss';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    children: ReactNode;
}

export const Table = ({ children, className, ...props }: Props): JSX.Element => {
    return (
        <div className={classNames(css.table, className)} {...props}>
            {children}
        </div>
    );
};

export const TBody = ({ children, className, ...props }: Props): JSX.Element => {
    return (
        <div className={classNames(css.tbody, className)} {...props}>
            {children}
        </div>
    );
};

export const THead = ({ children, className, ...props }: Props): JSX.Element => {
    return (
        <div className={classNames(css.thead, className)} {...props}>
            {children}
        </div>
    );
};

interface TrProps extends Props {
    active?: boolean;
}
export const Tr = ({ children, className, active, ...props }: TrProps): JSX.Element => {
    return (
        <div className={classNames(css.tr, className, active && css.active)} {...props}>
            {children}
        </div>
    );
};

interface TdProps extends Props {
    size?: Size;
}
export const Td = ({ children, size = 'md', className, ...props }: TdProps): JSX.Element => {
    return (
        <div className={classNames(css.td, css[size], className)} {...props}>
            {children}
        </div>
    );
};

interface ThProps extends Props {
    size?: Size;
}
export const Th = ({ children, size = 'md', className, ...props }: ThProps): JSX.Element => {
    return (
        <div className={classNames(css.th, css[size], className)} {...props}>
            {children}
        </div>
    );
};
