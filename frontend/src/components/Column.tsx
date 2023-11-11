import React from "react";
import { Card } from "./Card";
import { Droppable } from "react-beautiful-dnd";
import { IColumn } from "../models";

interface ColumnProps {
    column: IColumn;
    onRemove: (cardId: string) => void;
    onUpdate: (cardId: string, textCard: string) => void;
}

export function Column({ column, onRemove, onUpdate }: ColumnProps) {
    return (
        <Droppable droppableId={column.id}>
            {(provided) => (
                <div className="column">
                    <h2>{column.id}</h2>
                    <div className="content" {...provided.droppableProps} ref={provided.innerRef}>
                        {column.cards.map((card, index) => (
                            <Card key={card.id} card={card} index={index} onRemove={onRemove} onUpdate={onUpdate} />
                        ))}
                        {provided.placeholder}
                    </div>
                </div>
            )}
        </Droppable>
    );
}
