import { Link } from "react-router-dom";

const menus = [
  {
    menu: "About",
    path: "/",
  },
  {
    menu: "여행일정",
    path: "/planShareEntrance",
  },
  {
    menu: "커뮤니티",
    path: "/community",
  },
];

const Menu = () => {
  return (
    <div className="flex">
      {menus.map((element) => (
        <Link
          to={element.path}
          key={element.menu}
          className="flex px-3 py-4 justify-center items-center 2xl:text-xl xl:text-xl lg:text-[1.5rem] md:text-[1.5rem] sm:text-[1.5rem] hover:text-white hover:bg-sky-005 rounded-sm font-semibold cursor-pointer transition-all duration-100"
        >
          {element.menu}
        </Link>
      ))}
    </div>
  );
};

export default Menu;
