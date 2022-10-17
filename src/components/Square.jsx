import React from "react";
import "./Square.css";
import Colors from "../Colors";

export default function Square(props) {
  return (
    <button
      className="Square"
      onClick={props.onClick}
      disabled={props.symbol !== undefined && props.symbol !== null}
    >
      <p
        style={{
          fontSize: 32,
          color: props.symbol === "X" ? Colors.Crosses : Colors.Noughts,
        }}
      >
        {props.symbol}
      </p>
    </button>
  );
}
