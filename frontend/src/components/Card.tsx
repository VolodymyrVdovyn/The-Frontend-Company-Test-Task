import React from "react";
import { Draggable } from "react-beautiful-dnd";

interface ItemProps {
    text: string;
    index: number;
}

export function Card({ text, index }: ItemProps) {
    return (
        <Draggable draggableId={text} index={index}>
            {(provided) => (
                <div className="card" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    {text}
                </div>
            )}
        </Draggable>
    );
}
