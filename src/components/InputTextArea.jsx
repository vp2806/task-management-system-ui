import React from "react";

export default function InputTextArea({
  className,
  placeholder,
  rows,
  cols,
  textAreaName,
  registerInput,
}) {
  return (
    <textarea
      rows={rows}
      cols={cols}
      className={className}
      name={textAreaName}
      placeholder={placeholder}
      {...registerInput(textAreaName)}
    ></textarea>
  );
}
