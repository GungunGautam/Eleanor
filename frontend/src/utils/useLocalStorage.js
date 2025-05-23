import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  // Get the initial value from local storage or use the provided initialValue
  const storedValue = localStorage.getItem(key);
  const initial = storedValue ? JSON.parse(storedValue) : initialValue;

  // Create a state variable to track the value
  const [value, setValue] = useState(initial);

  // Update local storage whenever the value changes
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}