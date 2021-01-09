import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { FaRegCalendarAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import moment from "moment";

const CustomDateRangePicker = ({
  placeholder,
  color = "purple",
  onChange,
  value,
}) => {
  const [selectState, setSelectState] = useState(false);
  const [selectedOption, setSelectedOption] = useState(value);
  const [inputValue, setInputValue] = useState("");

  /**
   * Hook that alerts clicks outside of the passed ref
   */
  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      if (selectState) {
        function handleClickOutside(event) {
          if (ref.current && !ref.current.contains(event.target)) {
            console.log("close wrapper");
            setSelectState(false);
          }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          // Unbind the event listener on clean up
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }
    }, [ref && selectState]);
  };

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  const inputOnChange = (value) => {
    console.log(value);
    setInputValue(value);

    if (!selectState) {
      setSelectState(true);
    }
  };

  const onSelectOption = (e) => {
    const optionJSON = {
      value: e.target.textContent,
      key: e.target.dataset.value,
    };
    setSelectedOption(optionJSON);
    console.log(optionJSON);
    if (onChange) {
      onChange(optionJSON);
    }
    setSelectState((prevState) => !prevState);
  };

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const onDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <div className="custom-select-wrapper custom-date-picker" ref={wrapperRef}>
      <div
        className={`custom-select border-${color}  ${
          selectState ? "open" : ""
        }`}
      >
        <div
          className="custom-select__trigger "
          onClick={() => setSelectState((prevState) => !prevState)}
        >
          <input
            className={"search-input text-black"}
            onChange={(e) => inputOnChange(e.target.value)}
            placeholder={
              selectedOption && selectedOption.value && selectedOption.key
                ? selectedOption.value
                : `${placeholder ? placeholder : "Termín"}`
            }
            value={`${moment(startDate).format("DD.MM.YY")} - ${
              endDate ? moment(endDate).format("DD.MM.YY") : ""
            }`}
          />

          <div className="arrow">
            <FaRegCalendarAlt className={"text-" + color} />
          </div>
        </div>
        <div className="custom-options">
          <DatePicker
            selected={startDate}
            onChange={onDateChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
          />
        </div>
      </div>
    </div>
  );
};

CustomDateRangePicker.propTypes = {};

const mapStateToProps = (state) => ({});

export default CustomDateRangePicker;
