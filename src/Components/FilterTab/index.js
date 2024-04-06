import React, { useState } from "react";
import { Select } from "antd";
import InputSearch from "../Input/InputSearch";
import Styled from "./styled";
import helper from "../../Services/Utils/helper";

const { Option } = Select;

const FilterTab = ({
  onSearchChange = () => {},
  //   onPerPageChange = () => {},
  searchFieldOption = {
    value: "",
    options: [{ value: "", label: "" }],
    onChange: () => {},
  },
}) => {
  const renderInputSearch = () => {
    return (
      <Styled.InputSearchContainer>
        <InputSearch
          onSearch={(value) => {
            onSearchChange(value);
          }}
        />
      </Styled.InputSearchContainer>
    );
  };
  const renderDropDown = () => {
    return (
      <div>
        {!helper.IsEmptyFunction(searchFieldOption.onChange) && (
          <Styled.AntdSelect
            value={searchFieldOption.value}
            onChange={(value) => {
              searchFieldOption.onChange(value);
            }}
          >
            {searchFieldOption.options?.map((item) => {
              return <Option value={item.value}>{item.label}</Option>;
            }) ?? null}
          </Styled.AntdSelect>
        )}
      </div>
    );
  };

  return (
    <Styled.FilterTabContainer>
      {renderInputSearch()}
      {renderDropDown()}
    </Styled.FilterTabContainer>
  );
};

export default FilterTab;
