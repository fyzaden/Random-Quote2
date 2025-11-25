type ButtonProps = {
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  label?: string | false;
};
export default function Button({
  onClick,
  type = 'button',
  disabled = false,
  label = false,
}: ButtonProps) {
  return (
    <button
      className='bg-amber-900 hover:bg-amber-600 text-white rounded-lg p-2 mt-8'
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
