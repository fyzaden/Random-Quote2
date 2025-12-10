type ButtonProps = {
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  label?: string | false;
  className?: string;
};
export default function Button({
  onClick,
  type = 'button',
  disabled = false,
  label = false,
  className = '',
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`
        px-4 py-2 mt-6
        rounded-xl font-semibold
        text-white
        bg-[var(--accent)]
        hover:bg-[var(--accent-hover)]
        shadow-md
        transition-all duration-300
        disabled:opacity-60 disabled:cursor-not-allowed
        active:scale-[0.97]
        ${className}
      `}
    >
      {label}
    </button>
  );
}
