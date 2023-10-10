import { useRecoilValue } from "recoil";
import Footer from "../components/common/footer/Footer";
import HeaderContainer from "../components/common/header/HeaderContainer";
import PlanShareEntrance from "../components/planShareEntrance/PlanShareEntrance";
import CreateShareRoomModal from "../components/planShareEntrance/createShareRoomModal/CreateShareRoomModal";
import { createModalOpenState } from "../state/createModalOpen";
import { useRequireAuth } from "../hooks/useRequireAuth";
import Toggle from "../components/common/header/toggle/Toggle";

const PlanShareEntrancePage = () => {
  const open = useRecoilValue(createModalOpenState);
  useRequireAuth();

  return (
    <>
      <Toggle />
      <HeaderContainer />
      <PlanShareEntrance />
      <Footer />
      {open && <CreateShareRoomModal />}
    </>
  );
};

export default PlanShareEntrancePage;
