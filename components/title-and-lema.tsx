import Link from 'next/link';

type Props = {
  className?: string;
};

const TitleAndLema: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <Link href="/" passHref>
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8 cursor-pointer">
          Hal's List
        </h1>
      </Link>
      <h4 className="text-center md:text-left text-lg mt-5">
        Honest Work for Honest Pay.
      </h4>
    </div>
  );
};

export default TitleAndLema;