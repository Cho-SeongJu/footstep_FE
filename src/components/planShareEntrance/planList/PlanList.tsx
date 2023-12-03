import PlanListContent from "./PlanListContent";
import PlanListHeader from "./PlanListHeader";

const Plan = () => {
  return (
    <div className="flex flex-col justify-center items-center py-20 w-full">
      <PlanListHeader />
      <PlanListContent />
    </div>
  );
};

export default Plan;
