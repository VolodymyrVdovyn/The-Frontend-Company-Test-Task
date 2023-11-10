import React, { useState, useEffect } from "react";
import Column from "./components/Column";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { styled } from "@stitches/react";
import { IColumn } from "./models";

const StyledColumns = styled("div", {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    margin: "10vh auto",
    width: "80%",
    height: "80vh",
    gap: "8px",
});

const initialCols = [
    {
        id: "todo",
        cards: [
            {
                id: "item 1",
                date: "2023-07-31T21:00:00.000Z",
            },
            {
                id: "item 2",
                date: "2023-08-15T21:00:00.000Z",
            },
            {
                id: "item 3",
                date: "2023-08-16T21:00:00.000Z",
            },
        ],
    },
    {
        id: "doing",
        cards: [],
    },
    {
        id: "done",
        cards: [],
    },
];

function App() {
    const initialColumns = {
        todo: {
            id: "todo",
            list: ["item 1", "item 2", "item 3"],
        },
        doing: {
            id: "doing",
            list: [],
        },
        done: {
            id: "done",
            list: [],
        },
    };
    // const [columns, setColumns] = useState(initialColumns);
    const [columns, setColumns] = useState<IColumn[]>(initialCols);
    // const [columns, setColumns] = useState<IColumn[]>([]);

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

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("http://localhost:8080/api");
                const data = await response.json();
                console.log(data.message);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData().then();
    }, []);

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
