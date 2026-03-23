import Button from "./Button";
import { useReducer, useEffect } from "react";
import { reducer, initialState } from "./reducer";

interface Button {
  label: string;
  type: "ADD_DIGIT" | "CHOOSE_OPERATION" | "CLEAR" | "EVALUATE";
  variant: "number" | "operator" | "function" | "operator_equal";
}

const BUTTONS: Button[] = [
  // Row 1
  { label: "C", type: "CLEAR", variant: "function" },
  { label: "±", type: "ADD_DIGIT", variant: "function" },
  { label: "%", type: "CHOOSE_OPERATION", variant: "function" },
  { label: "÷", type: "CHOOSE_OPERATION", variant: "operator" },

  // Row 2
  { label: "7", type: "ADD_DIGIT", variant: "number" },
  { label: "8", type: "ADD_DIGIT", variant: "number" },
  { label: "9", type: "ADD_DIGIT", variant: "number" },
  { label: "X", type: "CHOOSE_OPERATION", variant: "operator" },

  // Row 3
  { label: "4", type: "ADD_DIGIT", variant: "number" },
  { label: "5", type: "ADD_DIGIT", variant: "number" },
  { label: "6", type: "ADD_DIGIT", variant: "number" },
  { label: "-", type: "CHOOSE_OPERATION", variant: "operator" },

  // Row 4
  { label: "1", type: "ADD_DIGIT", variant: "number" },
  { label: "2", type: "ADD_DIGIT", variant: "number" },
  { label: "3", type: "ADD_DIGIT", variant: "number" },
  { label: "+", type: "CHOOSE_OPERATION", variant: "operator" },

  // Row 5
  { label: "0", type: "ADD_DIGIT", variant: "number" },
  { label: ".", type: "ADD_DIGIT", variant: "number" },
  { label: "=", type: "EVALUATE", variant: "operator_equal" },
];

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

/**
 * Handles key down events for the calculator.
 * Listens for the following keys:
 * - 0-9, . : ADD_DIGIT with the key as the payload
 * - +, -, *, / : CHOOSE_OPERATION with the key as the payload
 * - Escape : CLEAR
 * - Enter, = : EVALUATE
 */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (/[0-9.]/.test(e.key)) dispatch({ type: "ADD_DIGIT", payload: e.key });
      if (e.key === "+") dispatch({ type: "CHOOSE_OPERATION", payload: "+" });
      if (e.key === "-") dispatch({ type: "CHOOSE_OPERATION", payload: "-" });
      if (e.key === "*") dispatch({ type: "CHOOSE_OPERATION", payload: "X" });
      if (e.key === "/") dispatch({ type: "CHOOSE_OPERATION", payload: "÷" });
      if (e.key === "Escape") dispatch({ type: "CLEAR" });
      if (e.key === "Enter" || e.key === "=") {
        e.preventDefault();
        dispatch({ type: "EVALUATE" });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dispatch]); 
  return (
    <div className="base-container flex justify-center items-center h-screen bg-black">
      <div className="calculator-container bg-gray-900 p-6 rounded-xl shadow-lg w-full max-w-md">
        <div className="display bg-gray-800 text-white p-6 mb-4 rounded-lg text-right text-3xl font-mono">
          {state.previous} {state.operation} {state.current}
        </div>
        <div className="button-grid grid grid-cols-4 gap-4">
          {BUTTONS.map((btn, index) => (
            <Button
              key={index}
              label={btn.label}
              onClick={() => dispatch({ type: btn.type, payload: btn.label })}
              variant={btn.variant}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
