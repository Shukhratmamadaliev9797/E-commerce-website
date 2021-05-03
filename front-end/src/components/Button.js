import React from "react";

export default function Button(props) {
  return (
    <button
      onClick={props.onClick}
      className={`btn ${props.className}`}
      disabled={props.disabled}
      type={props.type}
    >
      {props.children}
    </button>
  );
}
