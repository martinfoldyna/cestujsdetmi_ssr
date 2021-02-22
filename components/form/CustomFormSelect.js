import React, { useEffect, useRef, useState } from "react";
import { BsFillTriangleFill } from "react-icons/bs";
import Input from "./Input";

const CustomFormSelect = React.forwardRef(
  (
    {
      options,
      onChange,
      placeholder,
      selected,
      children,
      name,
      optionsFormat = "value",
      translate = (value) => value,
      defaultValue,
      disabled,
      ...rest
    },
    ref
  ) => {
    const [selectState, setSelectState] = useState(false);
    const [selectedOption, setSelectedOption] = useState({
      value: "",
      key: "",
    });
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
        return options?.filter((option) =>
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
      if (e.target.dataset.id) {
        optionJSON.id = e.target.dataset.id;
      }
      setSelectedOption(optionJSON);
      console.log(optionJSON);
      if (onChange) {
        onChange(optionJSON);
      }
      setSelectState((prevState) => !prevState);
    };

    useEffect(() => {
      if (selected) {
        let selectedItem = selected;

        // If selcted item is just string (passed value was key or value, not object) assign selected item to it's object item from options
        if (typeof selected === "string") {
          // Find if any key matches selected string
          let foundItemByKey = options.find((item) => item.key === selected);
          if (foundItemByKey) selectedItem = foundItemByKey;

          // If item was not found by key, value passed as selected was "value" item
          if (!foundItemByKey) {
            selectedItem = options.find((item) => item.value === selected);
          }
        }
        setSelectedOption(selectedItem);
      }
    }, [selected]);

    return (
      options && (
        <>
          <div
            className={`form-select custom-select-wrapper ${
              disabled ? "disabled" : ""
            }`}
            ref={wrapperRef}
          >
            <div className={`custom-select  ${selectState ? "open" : ""}`}>
              <div
                onClick={() =>
                  !disabled && setSelectState((prevState) => !prevState)
                }
              >
                <Input
                  onChange={(e) => inputOnChange(e.target.value)}
                  text={`${placeholder ? placeholder : "Vyberte možnost"}`}
                  name={name}
                  // defaultValue={
                  //   defaultValue
                  //     ? defaultValue
                  //     : selectedOption &&
                  //       selectedOption.value &&
                  //       selectedOption.key
                  //     ? selectedOption.value
                  //     : inputValue
                  // }
                  defaultValue={
                    defaultValue
                      ? defaultValue
                      : selectedOption && selectedOption.value
                      ? selectedOption.value
                      : inputValue
                  }
                  // placeholder={
                  //   selectedOption && selectedOption.value && selectedOption.key
                  //     ? selectedOption.value
                  //     : `${placeholder ? placeholder : "Vyberte možnost"}`
                  // }
                  value={
                    selectedOption && selectedOption.value && selectedOption.key
                      ? selectedOption.value
                      : inputValue
                  }
                  ref={ref}
                  {...rest}
                >
                  {children}
                </Input>
                {!disabled && (
                  <div className="arrow text-black">
                    <BsFillTriangleFill />
                  </div>
                )}
                <div className="custom-options">
                  {selectOptions?.map((option, index) => (
                    <span
                      key={option.key}
                      className={`custom-option ${
                        selectedOption && selectedOption.key === option.key
                          ? "selected"
                          : ""
                      }`}
                      data-value={option.key}
                      data-id={option.id}
                      onClick={onSelectOption}
                    >
                      {option.value}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )
    );
  }
);

CustomFormSelect.propTypes = {};

export default CustomFormSelect;
