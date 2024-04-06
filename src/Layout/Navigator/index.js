import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Select, Button, Badge } from "antd";
import {
  MenuOutlined,
  CloseOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import Images from "../../Components/Images";
import { Strings } from "../../Services/Utils/Locals";
import { editLanguage } from "../../Services/Redux/Actions/language";
import { editTheme } from "../../Services/Redux/Actions/theme";
import { clearLoginInfo } from "../../Services/Redux/Actions/loginInfo";
import helper from "../../Services/Utils/helper";
import responsive from "../../Services/Utils/responsive";
import { colors, fontFamily, fontSize } from "../../Configs/theme";
import Styles from "./styles";

const { Option } = Select;

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.language);
  const theme = useSelector((state) => state.theme);
  const cart = useSelector((state) => state.cart);

  const { windowWidth } = helper.useWindowSize();

  const listMenu = [
    {
      name: Strings.getString(`menubar.home`),
      link: `/`,
    },
    {
      name: Strings.getString(`menubar.aboutus`),
      link: `/about-us`,
    },
    {
      name: Strings.getString(`menubar.contact`),
      link: `/contact`,
    },
    // {
    //   name: `AnimationOnScroll`,
    //   link: `/animationOnScroll`,
    // },
  ];

  const [displayHamburgerMenu, setDisplayHamburgerMenu] = useState(false);

  useEffect(() => {
    // window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (displayHamburgerMenu === true) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = ""; // Re-enable scrolling when loading is false
    }
    return () => {
      document.body.style.overflow = ""; // Re-enable scrolling when component unmounts
    };
  }, [displayHamburgerMenu]);

  useEffect(() => {
    if (windowWidth && windowWidth.toString() > responsive.xs) {
      setDisplayHamburgerMenu(false);
    }
  }, [windowWidth]);

  const sideNavRef = useRef(null);
  helper.useOutsideAlerter(sideNavRef, () => {
    setDisplayHamburgerMenu(false);
  });

  const renderLogo = () => {
    return (
      <Link to={`/`}>
        <Styles.LogoSection>
          <Images name={`icon.logo`} />
        </Styles.LogoSection>
      </Link>
    );
  };
  const renderMenu = () => {
    return (
      <Styles.MenuSection>
        {listMenu.map((menu, index) => {
          return (
            <Link
              to={menu.link}
              key={index}
              onClick={() => {
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
              }}
            >
              <Styles.Menu
                style={{
                  marginLeft:
                    index > 0 && index < listMenu.length ? `20px` : null,
                }}
                disabled
              >
                {menu.name}
              </Styles.Menu>
            </Link>
          );
        })}
      </Styles.MenuSection>
    );
  };
  const renderHamburgerMenu = () => {
    return (
      <>
        <Styles.HamburgerSection
          onClick={() => setDisplayHamburgerMenu(!displayHamburgerMenu)}
        >
          {shoppingCart({ marginLeft: 0 })}

          <MenuOutlined
            style={{
              cursor: `pointer`,
              fontSize: `1.2rem`,
              color: colors.white,
              marginLeft: 30,
            }}
          />
        </Styles.HamburgerSection>

        <Styles.SideNav
          ref={sideNavRef}
          style={{
            width: displayHamburgerMenu === true ? `80vw` : `0vw`,
          }}
        >
          <header-side-nav-container>
            <Link to={`/`}>
              <Images name={`icon.logo`} width={60} height={60} />
            </Link>

            <CloseOutlined
              onClick={() => setDisplayHamburgerMenu(false)}
              style={{
                cursor: `pointer`,
                fontSize: `1.2rem`,
                color: theme === `light` ? colors.white : colors.black,
              }}
            />
          </header-side-nav-container>

          <content-side-nav-container>
            {listMenu.map((menu, index) => {
              return (
                <Link
                  to={menu.link}
                  key={index}
                  onClick={() => {
                    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                    setDisplayHamburgerMenu(false);
                  }}
                >
                  <Styles.Menu hamburger>
                    {menu.name}
                    <div
                      style={{
                        border: `1px solid lightgray`,
                        marginTop: 5,
                      }}
                    />
                  </Styles.Menu>
                </Link>
              );
            })}
          </content-side-nav-container>

          <footer-side-nav-container>
            {languageDropdown({ marginLeft: 0 })}
            {themeDropdown({ marginLeft: 0 })}
            {/* {logoutBtn({ marginLeft: 0 })} */}
          </footer-side-nav-container>
        </Styles.SideNav>
      </>
    );
  };
  const renderShoppingCart = () => {
    return (
      <Styles.BtnSection
        onClick={() => {
          window.location.href = "/cart";
        }}
      >
        {shoppingCart()}
      </Styles.BtnSection>
    );
  };

  const renderLanguageDropdown = () => {
    return <Styles.BtnSection>{languageDropdown()}</Styles.BtnSection>;
  };
  const renderThemeDropdown = () => {
    return <Styles.BtnSection>{themeDropdown()}</Styles.BtnSection>;
  };
  const renderLogoutBtn = () => {
    return <Styles.BtnSection>{logoutBtn()}</Styles.BtnSection>;
  };

  const shoppingCart = (style = {}) => {
    const cartArray = cart.split(" ").filter((e) => e !== "");

    return (
      <Badge count={cartArray.length} overflowCount={99}>
        <ShoppingCartOutlined
          onClick={() => {
            window.location.href = "/cart";
          }}
          style={{
            fontSize: fontSize.title,
            // color: theme === "light" ? colors.black : colors.white,
            color: colors.white,
            cursor: "pointer",
            ...style,
          }}
        />
      </Badge>
    );
  };
  const languageDropdown = (style = {}) => {
    return (
      <Select
        value={language}
        onChange={(value) => dispatch(editLanguage(value))}
        style={{
          marginLeft: 20,
          ...style,
          fontFamily: fontFamily.primary,
          fontSize: fontSize.text,
        }}
      >
        <Option value="en">EN</Option>
        <Option value="th">TH</Option>
      </Select>
    );
  };
  const themeDropdown = (style = {}) => {
    return (
      <Select
        value={theme}
        onChange={(value) => dispatch(editTheme(value))}
        style={{
          marginLeft: 20,
          ...style,
          fontFamily: fontFamily.primary,
          fontSize: fontSize.text,
        }}
      >
        <Option value="light">Light</Option>
        <Option value="dark">Dark</Option>
      </Select>
    );
  };
  const logoutBtn = (style = {}) => {
    return (
      <Button
        icon={<LogoutOutlined />}
        onClick={() => {
          dispatch(clearLoginInfo());
          window.location.href = "/login";
        }}
        style={{
          marginLeft: 20,
          ...style,
          fontFamily: fontFamily.primary,
          fontSize: fontSize.text,
        }}
      >
        Logout
      </Button>
    );
  };

  return (
    <>
      <Styles.MenuContainer>
        {renderLogo()}

        <div style={{ display: `flex`, alignItems: "center" }}>
          {/* {renderMenu()} */}
          {renderHamburgerMenu()}
          {renderShoppingCart()}
          {renderLanguageDropdown()}
          {renderThemeDropdown()}
          {/* {renderLogoutBtn()} */}
        </div>
      </Styles.MenuContainer>

      <Styles.PageContainer>
        <div
          style={{
            opacity: displayHamburgerMenu === true ? 0.3 : 1,
          }}
        >
          {children}
        </div>
      </Styles.PageContainer>
    </>
  );
};
export default Layout;
