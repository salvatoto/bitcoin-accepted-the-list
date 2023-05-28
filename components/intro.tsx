import Link from "next/link";
import TitleAndLema from "./title-and-lema";

type Props = {
  showGetOnListLink?: boolean;
};

const Intro = ({ showGetOnListLink = false }: Props) => {
  return (
    <section className="mb-16 mb-4 mt-16 flex flex-col md:mb-12 md:flex-row md:justify-between">
      <div className="flex items-start md:flex-1">
        <TitleAndLema className="ml-4 md:ml-6" />
      </div>
      {showGetOnListLink && (
        <Link href="/new-provider" legacyBehavior>
          <a className="my-8 flex items-center justify-center rounded-lg border border-black bg-white px-6 py-8 text-center text-2xl font-bold text-black transition-colors duration-200 hover:bg-orange-600 hover:text-white md:my-2 md:py-2 lg:my-2 lg:px-12 lg:py-4">
            GET ON THE LIST
          </a>
        </Link>
      )}
    </section>
  );
};

export default Intro;
