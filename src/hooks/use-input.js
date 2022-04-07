import { useState } from "react";

const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  const firstLetterInputHandler = () => {
    setEnteredValue(enteredValue.toLowerCase().replace(/(?:^|\s)\S/g, value => value.toUpperCase()))
  }

  return {
    value: enteredValue,
    isValid : valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    firstLetterInputHandler
  };
};

export default useInput;
