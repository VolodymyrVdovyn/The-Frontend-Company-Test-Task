import React, { useState, useEffect } from "react";
import Column from "./components/Column";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { styled } from "@stitches/react";
import { IColumn } from "./models";
import { useColumnsApi } from "./hooks/columns";

const StyledColumns = styled("div", {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    margin: "10vh auto",
    width: "80%",
    height: "80vh",
    gap: "8px",
});

function App() {
    const { columns, setColumns } = useColumnsApi();

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
            <StyledColumns>
                {columns.map((column) => (
                    <Column column={column} key={column.id} />
                ))}
            </StyledColumns>
        </DragDropContext>
    );
}

export default App;
