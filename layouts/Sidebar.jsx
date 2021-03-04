import SideCards from "./SideCards";
import SideFilter from "../components/cards/SideFilter";
import StickyBox from "react-sticky-box";

const SideBar = (props) => (
  <div style={{ position: "sticky", top: "55px" }}>
    <SideFilter {...props} />
    <SideCards />
  </div>
);

SideBar.propTypes = {};

export default SideBar;
