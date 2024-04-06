import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as R from "ramda";
import { Card } from "antd";
import {
  ShoppingCartOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { editCart, removeCartData } from "../../Services/Redux/Actions/cart";
import { Strings } from "../../Services/Utils/Locals";
import Pagination from "../Pagination";
import theme from "../../Configs/theme";
import Styled from "./styled";

const ProductCard = ({
  listProduct = [],
  pagination = {
    page: 1,
    per_page: 10,
    total: 100,
  },
  setPagination = () => {},
}) => {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.language);
  const cart = useSelector((state) => state.cart);

  const renderListCard = () => {
    return (
      <Styled.CardContainer>
        {listProduct.map((product, index) => {
          const disabledCartBtn =
            cart.split(" ").some((e) => e === product._id) ||
            product.amount <= 0;

          return (
            <Card
              key={index}
              hoverable
              onClick={() => {
                // console.log("product", product);
              }}
              style={{ cursor: "default" }}
            >
              <Styled.InfoContainer>
                <div>
                  <img
                    src={`http://${product.image}`}
                    alt={product.name_en}
                    style={{ width: 250, height: "auto" }}
                    draggable={false}
                  />
                </div>

                <Styled.ProductNameText>
                  {language ? product[`name_${language}`] : product.name_en}
                </Styled.ProductNameText>

                <Styled.ProductInfoText type={"price"}>
                  {product.price ? `฿ ${product.price}` : "null"}
                </Styled.ProductInfoText>

                <Styled.ProductInfoText
                  color={product.amount > 0 ? "green" : "red"}
                  fontWeight={"bold"}
                >
                  {product.amount > 0 ? (
                    <Styled.ProductAvailableStatusContainer>
                      <CheckCircleOutlined
                        style={{ fontSize: theme.fontSize.subTitle }}
                      />
                      {Strings.getString("productCard.available")}
                    </Styled.ProductAvailableStatusContainer>
                  ) : (
                    <Styled.ProductAvailableStatusContainer>
                      <CloseCircleOutlined
                        style={{ fontSize: theme.fontSize.subTitle }}
                      />
                      {Strings.getString("productCard.notAvailable")}
                    </Styled.ProductAvailableStatusContainer>
                  )}
                </Styled.ProductInfoText>

                {product.amount > 0 ? (
                  <Styled.AddCardBtn
                    isDisabled={disabledCartBtn}
                    disabled={product.amount > 0 ? false : true}
                    available={product.amount > 0 ? true : false}
                    onClick={() => {
                      if (product.amount > 0) {
                        if (disabledCartBtn === false) {
                          dispatch(editCart({ product_id: product._id }));
                        } else {
                          dispatch(removeCartData({ product_id: product._id }));
                        }
                      }
                    }}
                  >
                    <ShoppingCartOutlined
                      style={{
                        fontSize: theme.fontSize.title,
                        transition: "0.5s ease-out",
                        color: disabledCartBtn ? "red" : "black",
                      }}
                    />
                  </Styled.AddCardBtn>
                ) : null}
              </Styled.InfoContainer>
            </Card>
          );
        })}
      </Styled.CardContainer>
    );
  };

  const renderPagination = () => {
    return (
      <div style={{ margin: "30px 0px 20px" }}>
        <Pagination pagination={pagination} setPagination={setPagination} />
      </div>
    );
  };

  return !R.isEmpty(listProduct) ? (
    <Styled.Container>
      {renderListCard()}
      {renderPagination()}
    </Styled.Container>
  ) : null;
};

export default ProductCard;
