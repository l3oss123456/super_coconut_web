import React from "react";
import { Input } from "antd";

const InputText = ({ placeholder = "", addonBefore = <div></div> }) => {
  return <Input addonBefore={addonBefore} placeholder={placeholder} />;
};

export default InputText;
