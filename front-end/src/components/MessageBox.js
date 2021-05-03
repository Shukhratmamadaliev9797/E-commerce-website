import React from "react";

export default function MessageBox(props) {
  return (
    <div className={`alert alert__${props.className}`}>{props.children}</div>
  );
}
