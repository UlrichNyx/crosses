import React from "react";
import Square from "./Square";
import "./Board.css";
import Colors from "../Colors";

const defaultValues = (size) => new Array(size).fill(null);
const defaultSymbol = "O";
const defaultWinner = "";

export default function Board(props) {
  const [values, setValues] = React.useState(defaultValues(props.size));
  const [symbol, setSymbol] = React.useState(defaultSymbol);
  const [winner, setWinner] = React.useState(defaultWinner);

  function isEmptyArray(array) {
    for (let i = 0; i < props.size; i++) {
      if (array[i] != null) {
        return false;
      }
    }
    return true;
  }

  function isFullArray(array) {
    for (let i = 0; i < props.size; i++) {
      if (array[i] === null) {
        return false;
      }
    }
    return true;
  }

  function resetBoard() {
    setValues(defaultValues(props.size));
    setSymbol(defaultSymbol);
    setWinner(defaultWinner);
  }

  // Generalized for any size of a board
  function checkForWinner(values, index) {
    // Check Column
    let iter = index;
    let flag = true;
    while (iter - Math.sqrt(props.size) >= 0) {
      iter = iter - Math.sqrt(props.size);
      if (values[iter] != values[index]) {
        flag = false;
      }
    }
    while (iter + Math.sqrt(props.size) < props.size) {
      iter = iter + Math.sqrt(props.size);
      if (values[iter] != values[index]) {
        flag = false;
      }
    }
    if (flag) {
      setWinner(values[index] === "O" ? "Noughts" : "Crosses");
      return;
    }
    iter = index;
    flag = true;
    // Check Row
    while (
      iter - 1 >=
      Math.floor(index / Math.sqrt(props.size)) * Math.sqrt(props.size)
    ) {
      iter = iter - 1;
      if (values[iter] != values[index]) {
        flag = false;
      }
    }
    iter = index;
    while (
      iter + 1 <
      Math.floor(index / Math.sqrt(props.size)) * Math.sqrt(props.size) +
        Math.sqrt(props.size)
    ) {
      iter = iter + 1;
      if (values[iter] != values[index]) {
        flag = false;
      }
    }
    if (flag) {
      setWinner(values[index] === "O" ? "Noughts" : "Crosses");
      return;
    }
    iter = 0;
    flag = true;
    // Check Diagonals
    while (iter + Math.sqrt(props.size) + 1 < props.size) {
      if (values[iter] != values[index] || values[iter] === undefined) {
        flag = false;
      }
      iter = iter + Math.sqrt(props.size) + 1;
      if (values[iter] != values[index] || values[iter] === undefined) {
        flag = false;
      }
    }
    if (flag) {
      setWinner(values[index] === "O" ? "Noughts" : "Crosses");
      return;
    }
    iter = Math.sqrt(props.size) - 1;
    flag = true;
    while (
      iter + Math.sqrt(props.size) - 1 <=
      props.size - Math.sqrt(props.size)
    ) {
      if (values[iter] != values[index] || values[iter] === undefined) {
        flag = false;
      }
      iter = iter + Math.sqrt(props.size) - 1;
      if (values[iter] != values[index] || values[iter] === undefined) {
        flag = false;
      }
    }
    if (flag) {
      setWinner(values[index] === "O" ? "Noughts" : "Crosses");
      return;
    } else if (isFullArray(values)) {
      setWinner("Draw!");
      return;
    }
  }

  function setSquare(index) {
    let tempList = [...values];
    tempList[index] = symbol;
    setValues(tempList);
    setSymbol(symbol == "X" ? "O" : "X");
    checkForWinner(tempList, index);
  }

  return (
    <div>
      <div
        className="Board"
        style={{ pointerEvents: winner === "" ? "all" : "none" }}
      >
        {values.map((value, i) => {
          return <Square key={i} symbol={value} onClick={() => setSquare(i)} />;
        })}
      </div>

      <button
        className="Reset-Button"
        onClick={resetBoard}
        disabled={isEmptyArray(values)}
      >
        <p style={{ color: "white", fontWeight: "bold" }}>RESET BOARD</p>
      </button>
      {winner === "" ? null : (
        <h1 style={{ marginTop: 10, color: Colors[winner] }}>
          {winner} {winner === "Draw!" ? "" : "win!"}
        </h1>
      )}
    </div>
  );
}
