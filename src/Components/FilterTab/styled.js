import styled from "styled-components";
import { Select } from "antd";
import responsive from "../../Services/Utils/responsive";

export default {
  FilterTabContainer: styled.div`
    align-items: center;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 4px 0 #8ca3ba33;
    display: flex;
    gap: 20px;
    margin-top: 5px;
    max-height: -webkit-max-content;
    max-height: max-content;
    min-height: 100px;
    padding: 0 10px;
    margin-bottom: 50px;
  `,

  InputSearchContainer: styled.div`
    width: 30%;

    @media (${responsive.md}) {
      width: 40%;
    }
    @media (${responsive.sm}) {
      width: 50%;
    }
  `,

  AntdSelect: styled(Select)`
    min-width: 100px;
  `,
};
