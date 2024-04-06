import styled, { keyframes } from "styled-components";

const rotation = keyframes`
from {
    transform: rotate(0deg);
}
to {
    transform: rotate(360deg);
}
`;

export default {
  LoadingBackground: styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    // height: 100%;
    height: 10000vh;
    opacity: 0.2;
    z-index: 99999;
    background-color: ${(props) => props.theme.colors.black};
  `,
  Rotate: styled.div`
    animation: ${rotation} 2s infinite linear;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};
