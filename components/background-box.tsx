type Props = {
  children?: React.ReactNode;
  className?: string;
};

export default function BackgroundBox({children, className}: Props) {
  return (
    <div className={className}>
        <div className="w-full md:w-4/5 flex flex-col items-center py-8 mx-auto min-h-screen">
        <div className="w-full bg-neutral-300 flex flex-col items-center py-8 mx-auto">
            {children}
        </div>
        </div>
    </div>
  );
}
