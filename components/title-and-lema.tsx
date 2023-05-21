import Link from "next/link";

type Props = {
  className?: string;
};

const TitleAndLema: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <div className="flex items-center">
        <Link href="/" passHref>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-4 cursor-pointer">
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
      <h4 className="text-center md:text-left text-2xl md:text-4xl mt-0">
        Honest Work for Honest Pay.
      </h4>
    </div>
  );
};

export default TitleAndLema;
