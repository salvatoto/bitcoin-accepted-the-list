import Link from "next/link";

const Intro = () => {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <div className="md:flex-1">
        <div className="flex items-left">
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
            Hal's List
          </h1>
          <Link href="/new-provider" legacyBehavior>
            <a className="flex items-center text-xl ml-4 md:ml-8 bg-white hover:bg-orange-600 hover:text-white border border-black text-black font-bold py-6 px-12 lg:px-8 duration-200 transition-colors rounded-lg my-6 lg:my-2">
              Get on the List!
            </a>
          </Link>
        </div>
        <h4 className="text-center md:text-left text-2xl mt-5 text-right">
          Honest Work for Honest Pay.
        </h4>
      </div>
    </section>
  );
};

export default Intro;
