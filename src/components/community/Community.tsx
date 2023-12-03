import { useEffect } from "react";
import Lists from "./Lists";
import SearchSection from "./SearchSection";
import { useCheckOpenToggle } from "../../hooks/useCheckOpenToggle";

const Community = () => {
  const { checkOpenToggle } = useCheckOpenToggle();

  useEffect(() => {
    checkOpenToggle();
  }, []);

  return (
    <>
      <SearchSection />
      <Lists />
    </>
  );
};

export default Community;
