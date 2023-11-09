import React from "react";

interface ColumnProps {
    title: string;
    tasks: string[];
}

function Column({ title, tasks }: ColumnProps) {
    return (
        <div className="bg-white p-4 m-2 flex flex-col rounded-lg w-80">
            <h2 className="text-lg font-semibold">{title}</h2>
            <div className="mt-4 space-y-2">
                {tasks.map((task, index) => (
                    <div key={index} className="bg-gray-100 p-2 rounded">
                        {task}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Column;
