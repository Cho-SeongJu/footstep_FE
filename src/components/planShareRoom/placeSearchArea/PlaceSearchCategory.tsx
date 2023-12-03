import { IPropsPlaceSearch } from "../../../type/planShareRoom";
import { useRecoilState } from "recoil";
import { selectedArea } from "../../../state/selectedArea";
import { ADMINISTRATIVE_DISTRICT } from "../../../constants/area";
import { useEffect } from "react";

const PlaceSearchCategory = ({ placeSearch }: IPropsPlaceSearch) => {
  const [selected, setSelected] = useRecoilState(selectedArea);

  const onClickHandler = (category: string) => {
    setSelected(category);

    if (category === "광주") {
      placeSearch("광주광역시");
    } else {
      placeSearch(category);
    }
  };

  useEffect(() => {
    setSelected("noSelected");
  }, []);

  return (
    <div className="grid grid-cols-8 mt-3">
      {ADMINISTRATIVE_DISTRICT.map((district) => (
        <p
          key={district}
          className={`flex justify-center items-center py-3 font-NanumGothic font-normal text-[0.8rem] cursor-pointer ${
            selected === district
              ? "text-white bg-platinum-001"
              : "bg-white text-black border-[0.5px] border-gray-004 hover:bg-platinum-002 hover:text-white"
          }`}
          onClick={() => onClickHandler(district)}
          role="presentation"
        >
          {district}
        </p>
      ))}
    </div>
  );
};

export default PlaceSearchCategory;
