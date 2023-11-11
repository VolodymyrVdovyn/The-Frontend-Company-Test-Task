import React from "react";
import { Column } from "./Column";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useColumnsApi } from "../hooks/columns";

export function Board() {
    const { columns, setColumns, saveColumns } = useColumnsApi();

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
            <button className="save-button" onClick={saveColumns}>
                Save
            </button>
            <div className="board">
                {columns.map((column) => (
                    <Column column={column} key={column.id} />
                ))}
            </div>
        </DragDropContext>
    );
}
