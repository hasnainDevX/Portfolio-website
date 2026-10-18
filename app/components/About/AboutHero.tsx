import Image from "next/image";
import Navbar from "../Navbar";
import logo from "../../assets/logo.png";
import CircularText from "../CircularText";

export default function AboutHero() {
  return (
    <main className="relative mb-12 text-charcoal md:mb-16">
      <Navbar />

      <section
        aria-labelledby="about-heading"
        className="flex min-h-[calc(100svh-24px)] flex-col items-center justify-center bg-transparent px-6 pb-16 pt-32 text-center md:px-12 md:pb-20 md:pt-36"
      >
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,1fr)_200px] lg:gap-20">


          <div className="min-w-0 lg:text-left">
          <h1
            id="about-heading"
            className="font-serif text-[clamp(3rem,9vw,5rem)] font-light leading-[1.05] tracking-[-0.035em] text-gold"
          >
            <span
              className="block text-transparent sm:inline"
              style={{ WebkitTextStroke: "1px #b5973a" }}
            >
              Hi, I&apos;m
            </span>{" "}
            <span className="block sm:inline">Hasnain</span>
          </h1>

          <div className="mt-8 w-full space-y-5 text-base leading-relaxed text-charcoal md:text-lg">
            <p>
              I started building websites in 2023 out of curiosity. It
              didn&apos;t stay a hobby for long: pretty soon I was building
              real sites for real businesses, and I haven&apos;t stopped
              since.
            </p>

            <p>
              I study software engineering, which is why the sites I build
              work properly underneath. They&apos;re fast, they&apos;re made
              to be found on Google, and they do exactly what your business
              needs, which is more than a drag-and-drop template can promise.
            </p>

            <p>
              Over the years, I&apos;ve built websites for virtual assistants,
              social media agencies, beauty professionals, coaches and other
              service businesses. Different industries, same goal: look as
              good as the work you do, and make it easy for the right clients
              to say yes.
            </p>
          </div>
          </div>
         <div className="relative ml-auto h-32 w-32 lg:ml-0 lg:h-[200px] lg:w-[200px]">
          <CircularText text="YOUR BUSINESS • YOUR NEXT CHAPTER • " spinDuration={45} onHover="speedUp" className="!h-32 !w-32 !font-bold !text-charcoal [&>span]:!text-[11px] lg:!h-[200px] lg:!w-[200px] lg:[&>span]:!text-base" />
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center"><Image src={logo} alt="" width={104} height={104} className="h-16 w-16 object-contain lg:h-24 lg:w-24" /></span>
        </div>
        </div>
      </section>
    </main>
  );
}
