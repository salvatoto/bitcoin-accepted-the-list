import Link from "next/link";
import TitleAndLema from "./title-and-lema";

type Props = {
  showGetOnListLink?: boolean;
};

const Intro = ({ showGetOnListLink = false }: Props) => {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <div className="flex items-start md:flex-1">
        <TitleAndLema className="mr-4 md:mr-8" />
        {showGetOnListLink && (
          <Link href="/new-provider" legacyBehavior>
            <a className="flex items-center text-center text-xl py-4 px-8 lg:py-8 lg:px-8 my-6 lg:my-2 bg-white hover:bg-orange-600 hover:text-white border border-black text-black font-bold duration-200 transition-colors rounded-lg">
              Get on the List
            </a>
          </Link>
        )}
      </div>
    </section>
  );
};

export default Intro;
