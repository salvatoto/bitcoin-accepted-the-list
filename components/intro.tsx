import Link from "next/link";
import TitleAndLema from "./title-and-lema";

type Props = {
  showGetOnListLink?: boolean;
};

const Intro = ({ showGetOnListLink = false }: Props) => {
  return (
    <section className="flex-col md:flex-row flex md:justify-between mt-16 mb-16 md:mb-12">
      {/* <div className="flex items-start md:flex-1"> */}
        <div className="flex items-start md:flex-1">
          <TitleAndLema className="ml-4 md:ml-6" />
        </div>
        {showGetOnListLink && (
          <Link href="/new-provider" legacyBehavior>
            <a className="flex items-center text-center text-2xl py-2 px-6 lg:py-4 lg:px-12 my-2 lg:my-2 bg-white hover:bg-orange-600 hover:text-white border border-black text-black font-bold duration-200 transition-colors rounded-lg">
              GET ON <br/>THE LIST
            </a>
          </Link>
        )}
      {/* </div> */}
    </section>
  );
};

export default Intro;
