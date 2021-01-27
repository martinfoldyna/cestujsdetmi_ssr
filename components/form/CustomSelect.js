import React, { useEffect, useRef, useState } from "react";
import { BsFillTriangleFill } from "react-icons/bs";

const CustomSelect = ({
  options,
  onChange,
  placeholder,
  value = null,
  color = "blue",
}) => {
  const [selectState, setSelectState] = useState(false);
  const [selectedOption, setSelectedOption] = useState(value);
  const [selectOptions, setOptions] = useState(options);
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

    setOptions(() => {
      return options.filter((option) =>
        option.value.toLowerCase().includes(value.toLowerCase())
      );
    });
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

  useEffect(() => {}, [value]);

  return (
    <>
      <div className="custom-select-wrapper" ref={wrapperRef}>
        <div className={`custom-select  ${selectState ? "open" : ""}`}>
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
                  : `${placeholder ? placeholder : "Vyberte možnost"}`
              }
              value={
                selectedOption && selectedOption.value && selectedOption.key
                  ? selectedOption.value
                  : inputValue
              }
            />

            <div className="arrow">
              <BsFillTriangleFill className={"text-" + color} />
            </div>
          </div>
          <div className="custom-options">
            {selectOptions?.map((option, index) => (
              <span
                key={option.key}
                className={`custom-option ${
                  selectedOption && selectedOption.value === option.key
                    ? "selected bg-" + color
                    : ""
                }`}
                data-value={option.key}
                onClick={onSelectOption}
              >
                {option.value}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomSelect;
