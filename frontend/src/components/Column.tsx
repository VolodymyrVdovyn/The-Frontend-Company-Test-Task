import React from "react";
import { Item } from "./Item";
import { Droppable } from "react-beautiful-dnd";
import { styled } from "@stitches/react";
import { IColumn } from "../models";

interface ColumnProps {
    column: IColumn;
}

const StyledColumn = styled("div", {
    padding: "24px 16px",
    display: "flex",
    flexDirection: "column",
    marginTop: 8,

    h2: {
        margin: 0,
        padding: "0 16px",
    },
});

const StyledList = styled("div", {
    backgroundColor: "#ddd",
    borderRadius: 8,
    padding: 16,
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    marginTop: 8,
});

export function Column({ column }: ColumnProps) {
    return (
        <Droppable droppableId={column.id}>
            {(provided) => (
                <StyledColumn>
                    <h2>{column.id}</h2>
                    <StyledList {...provided.droppableProps} ref={provided.innerRef}>
                        {column.cards.map((card, index) => (
                            <Item key={card.id} text={card.id} index={index} />
                        ))}
                        {provided.placeholder}
                    </StyledList>
                </StyledColumn>
            )}
        </Droppable>
    );
}
