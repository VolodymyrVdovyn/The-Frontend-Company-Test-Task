import React, { useState } from "react";
import { Column } from "./Column";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useColumnsApi } from "../hooks/columns";

export function Board() {
    const { columns, setColumns, saveColumns } = useColumnsApi();
    const [cardText, setCardText] = useState("");

    const onDragEnd = ({ source, destination }: DropResult) => {
        if (!destination) return null;
        if (source.droppableId === destination.droppableId && destination.index === source.index) return null;

        const newColumns = [...columns];

        const sourceColumn = newColumns.find((column) => column.id === source.droppableId);
        const destinationColumn = newColumns.find((column) => column.id === destination.droppableId);

        if (sourceColumn && destinationColumn) {
            const movedCard = sourceColumn.cards.splice(source.index, 1)[0];
            destinationColumn.cards.splice(destination.index, 0, movedCard);
            setColumns(newColumns);
        }
    };

    const addCard = () => {
        const cardExists = columns.some((column) => column.cards.some((card) => card.id === cardText));
        if (!cardExists && cardText) {
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

    const removeCard = (cardId: string) => {
        const newColumns = [...columns];

        newColumns.forEach((column) => {
            column.cards = column.cards.filter((card) => card.id !== cardId);
        });

        setColumns(newColumns);
    };

    const updateCard = (cardId: string, cardText: string) => {
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
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <button className="button save" onClick={saveColumns}>
                Save
            </button>
            <div>
                <input
                    className="input"
                    type="text"
                    value={cardText}
                    onChange={(event) => setCardText(event.target.value)}
                    placeholder="Card text..."
                />
                <button className="button create" onClick={addCard}>
                    Create card
                </button>
            </div>
            <div className="board">
                {columns.map((column) => (
                    <Column column={column} key={column.id} onRemove={removeCard} onUpdate={updateCard} />
                ))}
            </div>
        </DragDropContext>
    );
}
