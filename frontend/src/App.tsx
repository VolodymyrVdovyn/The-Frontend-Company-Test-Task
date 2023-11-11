import React from "react";
import { Board } from "./components/Board";
import { BoardState } from "./context/BoardContext";

function App() {
    return (
        <BoardState>
            <Board />
        </BoardState>
    );
}

export default App;
