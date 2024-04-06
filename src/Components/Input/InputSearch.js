import React, { useState } from "react";
import { Input } from "antd";
import { Strings } from "../../Services/Utils/Locals";
const { Search } = Input;
const InputSearch = ({
  value = "",
  placeholder = Strings.getString("Input.InputSearch.placeholder"),
  addonBefore = null,
  onSearch = () => {},
}) => {
  const [searchValue, setSearchValue] = useState(value);

  const handleSearch = (value) => {
    onSearch(value);
  };

  return (
    <Search
      value={searchValue}
      addonBefore={addonBefore}
      placeholder={placeholder}
      allowClear
      onChange={(e) => {
        // handleChange(e.target.value);
        setSearchValue(e.target.value);
      }}
      //   onKeyDown={(e) => {
      //     if (e.key === "Enter") {
      //       e.preventDefault();
      //       handleSearch(e.target.value);
      //     }
      //   }}
      onSearch={(value) => {
        handleSearch(value);
      }}
    />
  );
};

export default InputSearch;
