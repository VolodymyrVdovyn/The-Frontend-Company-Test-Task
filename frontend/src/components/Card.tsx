import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { ICard } from "../models";

interface CardProps {
    card: ICard;
    index: number;
}

export function Card({ card, index }: CardProps) {
    const formattedDate = (inputDateString: string) => {
        const inputDate = new Date(inputDateString);
        return inputDate.toISOString().slice(0, 16).replace("T", " ");
    };

    return (
        <Draggable draggableId={card.id} index={index}>
            {(provided) => (
                <div className="card" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    {card.id}
                    <div className="date">{formattedDate(card.date)}</div>
                </div>
            )}
        </Draggable>
    );
}
