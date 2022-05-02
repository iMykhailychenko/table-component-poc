import { Dispatch, SetStateAction, useEffect, useState, MouseEvent, useCallback } from 'react';

import { uniq } from 'lodash-es';

type KeyboardEventReturn = {
    selected: number[];
    selectAll: () => void;
    setSelected: Dispatch<SetStateAction<number[]>>;
    toggle: (index: number) => (event: MouseEvent<HTMLElement>) => void;
};

export const useKeyboardEvent = (data: unknown[]): KeyboardEventReturn => {
    const [selected, setSelected] = useState<number[]>([]);
    const [isMetaPressed, setIsMetaPressed] = useState(false);

    const toggle = (index: number) => (event: MouseEvent<HTMLElement>) => {
        if (event.shiftKey) {
            event.preventDefault();

            setSelected(prev => {
                const lastSelected = prev[prev.length - 1];

                const start = lastSelected > index ? index : lastSelected;
                const end = lastSelected > index ? lastSelected : index;

                const range = data.reduce<number[]>((acc, _, i) => {
                    if (i >= start && i <= end) {
                        acc.push(i);
                    }
                    return acc;
                }, []);

                return uniq([...prev, ...range]);
            });
            return;
        }

        setSelected(prev => {
            if (prev.includes(index)) {
                return prev.filter(i => i !== index);
            }

            return [...prev, index];
        });
    };

    const selectAll = useCallback((): void => {
        setSelected(data.map((_, index) => index));
    }, [data]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent): void => {
            if (event.key === 'Meta' || event.key === 'Control') {
                event.preventDefault();
                setIsMetaPressed(true);
            }

            if (event.key === 'Escape') {
                event.preventDefault();
                setSelected([]);
            }

            if (event.key === 'a' && isMetaPressed) {
                event.preventDefault();
                selectAll();
            }

            if ((event.key === 'z' && isMetaPressed) || event.key === 'Backspace' || event.key === 'Delete') {
                event.preventDefault();
                setSelected(prev => prev.slice(0, prev.length - 1));
            }

            if (event.key === 'ArrowUp') {
                event.preventDefault();

                setSelected(prev => {
                    const max = data.length - 1;

                    if (!prev.length) {
                        return [max];
                    }

                    const next = prev[prev.length - 1] - 1;
                    const newIndex = next < 0 ? max : next;

                    return [...prev.slice(0, prev.length - 1), newIndex];
                });
            }

            if (event.key === 'ArrowDown') {
                event.preventDefault();

                setSelected(prev => {
                    if (!prev.length) {
                        return [0];
                    }

                    const max = data.length - 1;
                    const next = prev[prev.length - 1] + 1;
                    const newIndex = next > max ? 0 : next;

                    return [...prev.slice(0, prev.length - 1), newIndex];
                });
            }

            if (event.key === 'Enter') {
                event.preventDefault();

                setSelected(prev => {
                    if (prev.length === data.length) {
                        return prev;
                    }

                    const max = data.length - 1;
                    const next = prev[prev.length - 1] + 1;
                    const newIndex = next > max ? 0 : next;

                    if (prev.includes(newIndex)) {
                        for (let index = newIndex; index < data.length - 1; index += 1) {
                            if (!prev.includes(index)) {
                                return [...prev, index];
                            }
                        }

                        for (let index = 0; index < newIndex; index += 1) {
                            if (!prev.includes(index)) {
                                return [...prev, index];
                            }
                        }
                    }

                    return [...prev, newIndex > max ? 0 : newIndex];
                });
            }
        };

        const handleKeyUp = (event: KeyboardEvent): void => {
            if (event.key === 'Meta' || event.key === 'Control') {
                event.preventDefault();
                setIsMetaPressed(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [selectAll, data.length, isMetaPressed]);

    return { selected, setSelected, toggle, selectAll };
};
