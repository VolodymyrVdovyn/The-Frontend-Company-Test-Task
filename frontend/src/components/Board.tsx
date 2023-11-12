import React, { useContext, useState } from "react";
import { Column } from "./Column";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { BoardContext } from "../context/BoardContext";

export function Board() {
    const [cardText, setCardText] = useState("");
    const { columns, setColumns, saveColumns, addCard, isColumnsChanged, sortCardsByDate } = useContext(BoardContext);

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

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <button
                className="button"
                onClick={saveColumns}
                disabled={isColumnsChanged()}
                style={{ backgroundColor: isColumnsChanged() ? "grey" : "green" }}
            >
                Save
            </button>
            <button className="button" onClick={sortCardsByDate} style={{ backgroundColor: "darkgoldenrod" }}>
                Sort cards by date
            </button>
            <div>
                <input
                    className="input"
                    type="text"
                    value={cardText}
                    onChange={(event) => setCardText(event.target.value)}
                    placeholder="Card text..."
                />
                <button className="button create" onClick={() => addCard(cardText)}>
                    Create card
                </button>
            </div>
            <div className="board">
                {columns.map((column) => (
                    <Column column={column} key={column.id} />
                ))}
            </div>
        </DragDropContext>
    );
}
