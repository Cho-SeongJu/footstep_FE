import { useEffect } from "react";
import { useCheckOpenToggle } from "../../hooks/useCheckOpenToggle";
import Problem from "./Problem";
import Resolve from "./Resolve";
import Start from "./Start";
import Step from "./Step";

const Content = () => {
  const { checkOpenToggle } = useCheckOpenToggle();

  useEffect(() => {
    checkOpenToggle();
  }, []);

  return (
    <>
      <Start />
      <Problem />
      <Resolve />
      <Step />
    </>
  );
};

export default Content;
