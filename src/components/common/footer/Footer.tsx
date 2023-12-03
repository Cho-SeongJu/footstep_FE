import FooterLink from "./FooterLink";

const Footer = () => {
  return (
    <footer className="flex justify-center items-center w-full h-60 bg-black-002">
      <section className="flex flex-col justify-center items-center w-[40rem] h-32">
        <FooterLink />
        <p className="font-bold sm:text-lg text-[0.5rem] text-white ">
          Copyright © Zerobase try-catch Team All Rights Reserved.{" "}
        </p>
      </section>
    </footer>
  );
};

export default Footer;
