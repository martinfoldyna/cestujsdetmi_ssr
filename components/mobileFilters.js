import React, { useState, useEffect } from "react";
import { BsFilter } from "react-icons/bs";
import SideFilter from "./cards/SideFilter";

const MobileFilters = ({
  topic,
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
    topic,
    kategorie,
    color,
    kraje,
    mesta,
    oblasti,
  };

  const handleFilterOpen = () => {
    console.log("Filter opening");
    console.log(topic);
    setOpenFilter((prevState) => !prevState);
  };

  useEffect(() => {
    console.log(sideFilterProps);
  }, []);

  return (
    <div className='hide-desktop bg-white mb-05 border-radius filter-wrappper'>
      <div
        className={`d-flex bg-white border-radius filter-toggler ${
          openFilter ? "open justify-content-between" : "justify-content-start"
        }`}
      >
        <button
          className='btn btn-small-logo ghost m-0 w-100'
          onClick={handleFilterOpen}
        >
          <Icon className={`text-${color} btn-icon left`} /> {toggleText}
        </button>
      </div>
      {openFilter && topic && <SideFilter {...sideFilterProps} />}
    </div>
  );
};

export default MobileFilters;
