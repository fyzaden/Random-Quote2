export default function Button({ onClick, type, disabled, label = false }) {
  return (
    <button
      className='bg-amber-900 hover:bg-amber-600 text-white rounded-lg p-2  mt-8'
      onClick={onClick}
      type={type === 'submit' ? 'submit' : ''}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
