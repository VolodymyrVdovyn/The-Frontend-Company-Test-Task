import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { ICard } from "../models";

interface CardProps {
    card: ICard;
    index: number;
    onRemove: (cardId: string) => void;
    onUpdate: (cardId: string, textCard: string) => void;
}

export function Card({ card, index, onRemove, onUpdate }: CardProps) {
    const [update, setUpdate] = useState(false);
    const [cardText, setCardText] = useState(card.id);
    const formattedDate = (inputDateString: string) => {
        const inputDate = new Date(inputDateString);
        return inputDate.toISOString().slice(0, 16).replace("T", " ");
    };

    const updateCardText = () => {
        if (update) {
            onUpdate(card.id, cardText);
        }
        setUpdate((prevState) => !prevState);
    };

    return (
        <Draggable draggableId={card.id} index={index}>
            {(provided) => (
                <div className="card" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    {update ? <input value={cardText} onChange={(event) => setCardText(event.target.value)} /> : card.id}
                    <div className="date">{formattedDate(card.date)}</div>
                    <button onClick={() => onRemove(card.id)}>remove</button>
                    <button onClick={updateCardText}>{update ? "save text" : "update text"}</button>
                </div>
            )}
        </Draggable>
    );
}
