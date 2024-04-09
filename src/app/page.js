import Hero from "../components/layout/Hero";
import HomeMenu from "../components/layout/HomeMenu";
import SectionHeaders from "../components/layout/SectionHeaders";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="text-center my-16">
        <SectionHeaders subHeader={"Our story"} mainHeader={"About us"} />
        <div className="flex flex-col gap-4 max-w-md mx-auto mt-4 text-gray-500">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Exercitationem, beatae sit corporis incidunt quaerat culpa optio
            quis, eveniet odio perspiciatis, nostrum fugiat. Atque libero,
            incidunt accusamus sapiente eius possimus adipisci.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Exercitationem, beatae sit corporis incidunt quaerat culpa optio
            quis, eveniet odio perspiciatis, nostrum fugiat.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Exercitationem, beatae sit corporis incidunt quaerat culpa optio
            quis.
          </p>
        </div>
      </section>
      <section className="text-center my-8">
        <SectionHeaders
          subHeader={"Don't hesitate"}
          mainHeader={"Contact us"}
        />
        <div className="mt-8">
          <a href="tel:+380677381212" className="text-4xl text-gray-500">
            +38 067 738-12-12
          </a>
        </div>
      </section>
    </>
  );
}
