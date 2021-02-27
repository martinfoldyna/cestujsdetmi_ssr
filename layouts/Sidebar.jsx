import SideCards from "./SideCards";
import SideFilter from "../components/cards/SideFilter";

const SideBar = ({ color, topic }) => {
  return (
    <div>
      <SideFilter color={color} topic={topic} />
      <SideCards />
    </div>
  );
};

SideBar.propTypes = {};

export default SideBar;
