import { useState, useEffect } from "react";

const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);

  const setValue = (value: T) => {
    if (typeof value === "string") {
      localStorage.setItem(key, value);
    } else {
      setStoredValue(value);
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
