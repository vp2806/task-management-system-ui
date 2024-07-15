import { useEffect, useState } from "react";

export const useDebouncedValue = (inputValue, delay) => {
  const [debounceValue, setDebounceValue] = useState(inputValue);

  useEffect(() => {
    const handleDebounce = setTimeout(() => {
      setDebounceValue(inputValue);
    }, delay);

    return () => {
      clearTimeout(handleDebounce);
    };
  }, [inputValue, delay]);

  return debounceValue;
};
