import { useState, useRef } from "react"

const useStateRef = initialValue => {
    const [value, _setValue] = useState(initialValue);
    const valueRef = useRef(value);
    const setValue = newValue => {
        _setValue(newValue);
        valueRef.current = newValue;
    }
    return [value, valueRef, setValue];
}

const useStateTrigger = initialValue => {
    const [value, _setValue] = useState(initialValue);
    const [trigger, setTrigger] = useState(false);
    const setValue = newValue => {
        _setValue(newValue);
        setTrigger(b => !b);
    }
    return [value, trigger, setValue];
}

const useLocalStorage = (key, initialValue) => {
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState(() => {
        try {
            // Get from local storage by key
            const item = window.localStorage.getItem(key);
            // Parse stored json or if none return initialValue
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            // If error also return initialValue
            console.log(error);
            return initialValue;
        }
    });
    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue = (value) => {
        try {
            // Allow value to be a function so we have same API as useState
            const valueToStore =
            value instanceof Function ? value(storedValue) : value;
            // Save state
            setStoredValue(valueToStore);
            // Save to local storage
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            // A more advanced implementation would handle the error case
            console.log(error);
        }
    };
    return [storedValue, setValue];
}

const useLocalStorageRef = (key, initialValue) => {
    const [value, _setValue] = useLocalStorage(key, initialValue);
    const valueRef = useRef(value);
    const setValue = newValue => {
        _setValue(newValue);
        valueRef.current = newValue;
    }
    return [value, valueRef, setValue];
}

export { useStateRef, useStateTrigger, useLocalStorageRef };