export const align = {
  center: 'center',
  left: 'left',
  right: 'right',
} as const;

type AlignType = keyof typeof align;

type TitleProps = {
  label: string;
  align: AlignType;
};
export function Title({ label, align }: TitleProps) {
  function alignText() {
    switch (align) {
      case 'center':
        return 'text-center';
      case 'left':
        return 'text-start';
      case 'right':
        return 'text-end';
      default:
        return '';
    }
  }

  return (
    <h2
      className={`font-bold text-slate-600 text-xl sm:text-xl md:text-2xl ${alignText()}`}
    >
      {label}
    </h2>
  );
}
