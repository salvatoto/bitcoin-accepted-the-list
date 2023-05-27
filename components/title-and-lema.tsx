import Link from "next/link";

type Props = {
  className?: string;
};

const TitleAndLema: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <div className="flex items-center">
        <Link href="/" passHref>
          <h1 className="cursor-pointer text-6xl font-bold leading-tight tracking-tighter pr-4 md:pr-4 md:text-8xl">
            Hal's List
          </h1>
        </Link>
        <img
          src="/bitcoin_logo_00.png"
          alt="There is no second best"
          className="rounded-full bg-transparent"
          width={100}
          height={100}
        />
      </div>
      <h4 className="mt-0 text-2xl text-left md:text-4xl">
        Honest Work for Honest Pay.
      </h4>
    </div>
  );
};

export default TitleAndLema;
