import React from "react";
import { Card } from "./Card";
import { Droppable } from "react-beautiful-dnd";
import { IColumn } from "../models";

interface ColumnProps {
    column: IColumn;
}

export function Column({ column }: ColumnProps) {
    return (
        <Droppable droppableId={column.id}>
            {(provided) => (
                <div className="column">
                    <h2>{column.id}</h2>
                    <div className="content" {...provided.droppableProps} ref={provided.innerRef}>
                        {column.cards.map((card, index) => (
                            <Card key={card.id} text={card.id} index={index} />
                        ))}
                        {provided.placeholder}
                    </div>
                </div>
            )}
        </Droppable>
    );
}
