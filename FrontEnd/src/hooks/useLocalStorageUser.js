import { useState } from "react";

const useLocalStorageUser = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
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

  const deleteValue = () => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(null);
    } catch (error) {
      console.error(error);
    }
  };

  return { value: storedValue, setValue, getValue, deleteValue };
};

export default useLocalStorageUser;
