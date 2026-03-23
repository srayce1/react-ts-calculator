interface CalculatorState {
  current: string;
  previous: string | null;
  operation: string | null;
  overwrite: boolean;
}

type CalculatorAction =
  | { type: "ADD_DIGIT"; payload: string }
  | { type: "CHOOSE_OPERATION"; payload: string }
  | { type: "CLEAR" }
  | { type: "EVALUATE" }
  ;

export const initialState: CalculatorState = {
  current: "0",
  previous: null,
  operation: null,
  overwrite: false,
};

/**
 * Reducer for the calculator application.
 * Handles four types of actions: ADD_DIGIT, CHOOSE_OPERATION, CLEAR, and EVALUATE.
 * The reducer takes the current state and an action, and returns a new state based on the action type and payload.
 * The action types and payloads are as follows:
 * - ADD_DIGIT: Add a digit to the current number.
 *   Payload: The digit to add.
 * - CHOOSE_OPERATION: Choose an operation to perform.
 *   Payload: The operation to perform.
 * - CLEAR: Clear the current state.
 *   Payload: None.
 * - EVALUATE: Evaluate the current expression.
 *   Payload: None.
 * The reducer returns a new state based on the action type and payload.
 * If the action type is not recognized, the reducer returns the current state unchanged.
 */
export function reducer(
  state: CalculatorState,
  action: CalculatorAction,
): CalculatorState {
  switch (action.type) {
    case "ADD_DIGIT":
      if (action.payload === "±") {
        if (state.current === "0" || state.current === "") return state;
        return {
          ...state,
          current: (parseFloat(state.current) * -1).toString(),
        };
      }
      if (state.overwrite)
        return { ...state, current: action.payload, overwrite: false };
      if (action.payload === "0" && state.current === "0") return state;
      if (action.payload === "." && state.current.includes(".")) return state;
      return {
        ...state,
        current:
          state.current === "0"
            ? action.payload
            : state.current + action.payload,
      };

    case "CHOOSE_OPERATION":
      if (state.current === "0" && state.previous === null) return state;
      if (state.previous === null) {
        return {
          ...state,
          operation: action.payload,
          previous: state.current,
          current: "",
        };
      }
      return {
        ...state,
        previous: evaluate(state),
        operation: action.payload,
        current: "",
      };

    case "CLEAR":
      return initialState;

    case "EVALUATE":
      if (state.operation === null || state.previous === null) return state;
      return {
        ...state,
        overwrite: true,
        previous: null,
        operation: null,
        current: evaluate(state),
      };

    default:
      return state;
  }
}

/**
 * Evaluates a mathematical expressione.
 * If the operation is not recognized or either previous or current is NaN, returns an empty string.
 * If the operation is "÷" and the current value is 0, returns 0.
 * Otherwise, it performs the operation and returns the result as a string.
 * @param {{ current: string, previous: string | null, operation: string | null }} state - The CalculatorState to evaluate.
 * @returns {string} The result of the evaluation as a string.
 */
function evaluate({ current, previous, operation }: CalculatorState): string {
  const prev = parseFloat(previous!);
  const curr = parseFloat(current);
  if (isNaN(prev)) return "";
  if (isNaN(curr)) return prev.toString();

  let res: number = 0;
  switch (operation) {
    case "+":
      res = prev + curr;
      break;
    case "-":
      res = prev - curr;
      break;
    case "X":
      res = prev * curr;
      break;
    case "÷":
      res = curr === 0 ? 0 : prev / curr;
      break;
    case "%":
      res = prev % curr;
      break;
    default:
      return current;
  }
  return parseFloat(res.toFixed(10)).toString();
}
