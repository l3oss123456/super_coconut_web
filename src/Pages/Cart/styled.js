import styled from "styled-components";
import helper from "../../Services/Utils/helper";

export default {
  Container: styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    gap: 20px;
  `,
  EmptyCartComponent: styled.div`
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;
  `,

  CardContainer: styled.div`
    display: flex;
    flex-flow: column wrap;
    gap: 20px;
  `,
  InfoContainer: styled.div`
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    gap: 20px;
  `,
  ProductInfoContainer: styled.div`
    display: flex;
    flex-flow: column wrap;
    justify-content: space-between;
    gap: 10px;
  `,
  ProductInfoText: styled.p`
    font-size: ${(props) => {
      if (props.type === "price") {
        return props.theme.fontSize.subTitle;
      }

      return props.theme.fontSize.text;
    }};
    color: ${(props) => props.color};
    font-weight: ${(props) => props.fontWeight};
    margin: 0px;
  `,

  BuyProductContainer: styled.div`
    min-width: 20vw;
    height: max-content;
    background: ${(props) => props.theme.colors.white};
    border: ${(props) => `2px solid ${props.theme.colors.lightGray}`};
    border-radius: 5px;
    padding: 20px;
  `,
  BuyProductSection: styled.div`
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    gap: 20px;
  `,
  BuyBtn: styled.button`
    background: black;
    color: white;
    cursor: pointer;
    width: 100%;
    text-align: center;
    font-size: ${(props) => props.theme.fontSize.subTitle};
    padding: 5px;
    border-radius: 10px;
  `,
};
