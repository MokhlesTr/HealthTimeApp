import { useState } from "react";

const useLocalStorageRdv = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : { ...initialValue };
    } catch (error) {
      console.error(error);
      return { ...initialValue };
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function
          ? { ...storedValue, ...value(storedValue) }
          : { ...storedValue, ...value };
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  const getValue = () => {
    try {
      return JSON.parse(window.localStorage.getItem(key));
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return { value: storedValue, setValue, getValue };
};

export default useLocalStorageRdv;
