import SideCards from "./SideCards";
import SideFilter from "../components/cards/SideFilter";

const SideBar = ({ color, topic, kategorie }) => {
  return (
    <div>
      <SideFilter color={color} topic={topic} kategorie={kategorie} />
      <SideCards />
    </div>
  );
};

SideBar.propTypes = {};

export default SideBar;
