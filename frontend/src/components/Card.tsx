import React, { useContext, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { ICard } from "../models";
import { BoardContext } from "../context/BoardContext";

interface CardProps {
    card: ICard;
    index: number;
}

export function Card({ card, index }: CardProps) {
    const [update, setUpdate] = useState(false);
    const [cardText, setCardText] = useState(card.id);
    const { updateCard, removeCard } = useContext(BoardContext);

    const formattedDate = (inputDateString: string) => {
        const inputDate = new Date(inputDateString);
        return inputDate.toISOString().slice(0, 16).replace("T", " ");
    };

    const updateCardText = () => {
        if (update) {
            updateCard(card.id, cardText);
        }
        setUpdate((prevState) => !prevState);
    };

    return (
        <Draggable draggableId={card.id} index={index}>
            {(provided) => (
                <div className="card" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    {update ? <input value={cardText} onChange={(event) => setCardText(event.target.value)} /> : card.id}
                    <div className="date">{formattedDate(card.date)}</div>
                    <button onClick={() => removeCard(card.id)}>remove</button>
                    <button onClick={updateCardText}>{update ? "save text" : "update text"}</button>
                </div>
            )}
        </Draggable>
    );
}
