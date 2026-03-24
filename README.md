# React TypeScript Calculator


## Live Demo
**https://react-ts-calculator-khaki.vercel.app/**

## Technical Architecture
### 1. State Management (`useReducer`)
This project uses a centralized Reducer pattern to ensure scalability and predictability.

### 2. Keyboard Integration
Includes a `keydown` event listener with a cleanup function using `useEffect`. 
- Supports Numpad and standard keyboard input.
- Uses `e.preventDefault()` on keys like `/` and `Enter`.

### 3. Precision Math Engine
JavaScript floating-point binary issue handled using `toFixed` rounding and string-to-float parsing.

## Tech Stack
- **Framework**: React 19.2.4 (Vite)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel
