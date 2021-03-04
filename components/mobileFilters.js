import React, { useState } from "react";
import { BsFilter } from "react-icons/bs";
import SideFilter from "./cards/SideFilter";

const MobileFilters = ({
  filterTopic,
  kategorie,
  toggleText = "Upřesnit požadavky",
  color,
  Icon = BsFilter,
  kraje,
  mesta,
  oblasti,
}) => {
  const [openFilter, setOpenFilter] = useState(false);

  const sideFilterProps = {
    topic: filterTopic,
    kategorie,
    color,
    kraje,
    mesta,
    oblasti,
  };

  return (
    <div className='hide-desktop bg-white mb-05 border-radius filter-wrappper'>
      <div
        className={`d-flex bg-white border-radius filter-toggler ${
          openFilter ? "open justify-content-between" : "justify-content-start"
        }`}
      >
        <button
          className='btn btn-small-logo ghost m-0'
          onClick={() => setOpenFilter((prevState) => !prevState)}
        >
          <Icon className={`text-${color} btn-icon left`} /> {toggleText}
        </button>
      </div>
      {openFilter && filterTopic && <SideFilter {...sideFilterProps} />}
    </div>
  );
};

export default MobileFilters;
