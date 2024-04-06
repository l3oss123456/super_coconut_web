import styled from "styled-components";

export default {
  Container: styled.div`
    display: flex;
    flex-flow: column wrap;
    gap: 20px;
    justify-content: center;
    align-items: center;
  `,
  CardContainer: styled.div`
    display: flex;
    flex-flow: row wrap;
    gap: 20px;
    justify-content: center;
    overflow: scroll;
    height: 80vh;
  `,
  InfoContainer: styled.div`
    display: flex;
    flex-flow: column wrap;
    gap: 20px;
    font-size: ${(props) => props.theme.fontSize.subTitle};
  `,
  ProductNameText: styled.h2`
    font-size: ${(props) => props.theme.fontSize.title};
    font-weight: bold;
    margin: 0px;
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
  ProductAvailableStatusContainer: styled.div`
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    gap: 10px;
  `,
  AddCardBtn: styled.button`
    background: ${(props) => {
      if (props.isDisabled === true || props.available === false) {
        return props.theme.colors.lightGray;
      }

      return "white";
      // return props.available ? "transparent" : "blue";
    }};
    border-radius: 20px;
    border: 2px solid ${(props) => props.theme.colors.lightGray};
    padding: 5px 0px;
    cursor: ${(props) => (props.available ? "pointer" : "default")};

    &:hover {
      transition: 0.5s ease-out;
      opacity: ${(props) => (props.available ? 0.5 : 1)};
    }
  `,
};
