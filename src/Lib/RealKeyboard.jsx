import React, { useEffect } from "react";

export default function RealKeyboard(props) {
  const handleKeyPress = () => event => {
    const keyCode = event.keyCode;

    if (keyCode >= 48 && keyCode <= 57){
      props.onNumber(parseInt(event.key))
    } else if (keyCode === 13) {
      props.onSubmit()
    }
  }
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress())

    return () => {
      window.removeEventListener("keydown", handleKeyPress())
    };
  });

  return <></>;
}
