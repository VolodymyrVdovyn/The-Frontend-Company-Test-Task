import React, { createContext } from "react";
import { IColumn } from "../models";
import { useColumnsApi } from "../hooks/columns";

interface IBoardContext {
    columns: IColumn[];
    setColumns: React.Dispatch<React.SetStateAction<IColumn[]>>;
    saveColumns: () => Promise<void>;
    addCard: (cardText: string) => void;
    removeCard: (cardId: string) => void;
    updateCard: (cardId: string, cardText: string) => void;
    isColumnsChanged: () => boolean;
    sortCardsByDate: () => void;
}

export const BoardContext = createContext<IBoardContext>({
    columns: [],
    setColumns: () => {},
    saveColumns: async () => {},
    addCard: () => {},
    removeCard: () => {},
    updateCard: () => {},
    isColumnsChanged: () => false,
    sortCardsByDate: () => {},
});

export const BoardState = ({ children }: { children: React.ReactNode }) => {
    const { columns, setColumns, saveColumns, defaultColumnsString } = useColumnsApi();

    const isValidCard = (cardText: string) => {
        const cardExists = columns.some((column) => column.cards.some((card) => card.id === cardText));
        return !cardExists && cardText;
    };

    const addCard = (cardText: string) => {
        if (isValidCard(cardText)) {
            const newColumns = [...columns];
            const todoColumn = newColumns.find((column) => column.id === "todo");
            const newCard = {
                id: cardText,
                date: new Date().toISOString(),
            };
            if (todoColumn) {
                todoColumn.cards.splice(0, 0, newCard);
                setColumns(newColumns);
            }
        }
    };

    const sortCardsByDate = () => {
        const newColumns = [...columns];

        for (const column of newColumns) {
            column.cards.sort((a, b) => {
                const dateA = new Date(a.date).getTime();
                const dateB = new Date(b.date).getTime();
                return dateB - dateA;
            });
        }

        setColumns(newColumns);
    };

    const removeCard = (cardId: string) => {
        const newColumns = [...columns];

        newColumns.forEach((column) => {
            column.cards = column.cards.filter((card) => card.id !== cardId);
        });

        setColumns(newColumns);
    };

    const updateCard = (cardId: string, cardText: string) => {
        if (isValidCard(cardText)) {
            const newColumns = [...columns];

            newColumns.forEach((column) => {
                column.cards = column.cards.map((card) => {
                    if (card.id === cardId) {
                        return { ...card, id: cardText };
                    } else {
                        return card;
                    }
                });
            });

            setColumns(newColumns);
        }
    };

    const isColumnsChanged = () => {
        return JSON.stringify(columns) === defaultColumnsString.current;
    };

    return (
        <BoardContext.Provider
            value={{
                columns,
                setColumns,
                saveColumns,
                addCard,
                removeCard,
                updateCard,
                isColumnsChanged,
                sortCardsByDate,
            }}
        >
            {children}
        </BoardContext.Provider>
    );
};
