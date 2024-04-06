import React, { useEffect } from "react";
import Images from "../Images";
// import { colors } from "../../cores/theme";
import Styles from "./styled";
import "./Loading.modules.css";

const Loading = ({ loading = false }) => {
  useEffect(() => {
    if (loading === true) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = ""; // Re-enable scrolling when loading is false
    }
    return () => {
      document.body.style.overflow = ""; // Re-enable scrolling when component unmounts
    };
  }, [loading]);

  return loading === true ? (
    <>
      <Styles.LoadingBackground />
      <Styles.Rotate>
        <Images name="icon.logo" width={150} height={150} />
      </Styles.Rotate>
    </>
  ) : null;
};

export default Loading;
