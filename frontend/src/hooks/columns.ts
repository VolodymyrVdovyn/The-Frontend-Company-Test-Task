import { useEffect, useState } from "react";
import { IColumn } from "../models";

export function useColumnsApi() {
    const [columns, setColumns] = useState<IColumn[]>([]);

    async function fetchColumns() {
        try {
            const response = await fetch("http://localhost:8000/get_data");
            const json = await response.json();
            setColumns(json.value);
        } catch (error) {
            console.error("Error fetching columns data:", error);
        }
    }

    async function saveColumns() {
        const postRequestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(columns),
        };

        try {
            console.log(JSON.stringify(columns));
            const response = await fetch("http://localhost:8000/set_data", postRequestOptions);
            console.log(response.json());
        } catch (error) {
            console.error("Error updating columns data:", error);
        }
    }

    useEffect(() => {
        fetchColumns().then();
    }, []);

    return { columns, setColumns, saveColumns };
}
