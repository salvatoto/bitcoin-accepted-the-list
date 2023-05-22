type Props = {
  children?: React.ReactNode;
  className?: string;
};

export default function BackgroundBox({ children, className }: Props) {
  return (
    <div className={className}>
      <div className="mx-auto flex min-h-screen w-full flex-col items-center py-8 md:w-4/5">
        <div className="mx-auto flex w-full flex-col items-center bg-neutral-300 py-8">
          {children}
        </div>
      </div>
    </div>
  );
}
