import { useEffect, useState } from "react";
import { IColumn } from "../models";

export function useColumnsApi() {
    const [columns, setColumns] = useState<IColumn[]>([]);

    // function addColumn(column: IColumn) {
    //     setColumns((prevState) => [...prevState, column]);
    // }

    async function fetchColumns() {
        try {
            // const response = await axios.get<IColumn[]>("http://localhost:8080/columns");
            const response = await fetch("http://localhost:8080/columns");
            const json = await response.json();
            setColumns(json.data);
        } catch (error) {
            console.error("Error fetching data:", error);

        }
    }

    useEffect(() => {
        fetchColumns().then();
    }, []);

    return { columns, setColumns };
}
