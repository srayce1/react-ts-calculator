
interface ButtonProps {
  key: number;
  label: string;
  onClick: () => void;
  variant: "number" | "operator" | "function" | "operator_equal";
  className?: string;
}

const Button = ({key, label, onClick, variant, className = "" } : ButtonProps) => {
  const variants = {
    number: "bg-gray-700 text-white hover:bg-gray-600",
    operator: "bg-orange-400 text-white hover:bg-orange-300",
    function: "bg-gray-500 text-white hover:bg-gray-400",
    operator_equal: "bg-orange-400 text-white hover:bg-orange-300 col-span-2",
  };

  return (
    <button
      key={key}
      onClick={onClick}
      className={`p-4 rounded-4xl text-3xl font-light transition-colors shadow-md ${variants[variant]} ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;