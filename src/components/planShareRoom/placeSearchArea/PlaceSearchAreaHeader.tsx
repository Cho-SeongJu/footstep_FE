import { IPropsPlaceSearch } from "../../../type/planShareRoom";
import PlaceSearchBar from "./PlaceSearchBar";
import PlaceSearchCategory from "./PlaceSearchCategory";
import PlaceSearchTitle from "./PlaceSearchTitle";

const PlaceSearchAreaHeader = ({ placeSearch }: IPropsPlaceSearch) => {
  return (
    <div className="flex flex-col w-[23rem] h-[15rem] bg-gray-007">
      <PlaceSearchTitle />
      <PlaceSearchCategory placeSearch={placeSearch} />
      <PlaceSearchBar placeSearch={placeSearch} />
    </div>
  );
};

export default PlaceSearchAreaHeader;
