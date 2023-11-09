import React, { useState } from "react";
import Column from "./Column";

const initialData: Record<string, string[]> = {
    todo: ["Task 1", "Task 2"],
    inProgress: [],
    done: [],
};

function Board() {
    const [data, setData] = useState(initialData);

    return (
        <div className="flex">
            {Object.keys(data).map((column) => (
                <Column key={column} title={column} tasks={data[column]} />
            ))}
        </div>
    );
}

export default Board;
