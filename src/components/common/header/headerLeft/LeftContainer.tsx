import Logo from "./Logo";
import Menu from "./Menu";

const LeftContainer = () => {
  return (
    <section className="flex 2xl:w-[38rem] lg:w-[50rem] md:w-[40rem] sm:w-[30rem] h-[4rem]">
      <Logo />
      <Menu />
    </section>
  );
};

export default LeftContainer;
