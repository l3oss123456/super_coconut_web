import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Button, notification } from "antd";
import { MinusOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import * as R from "ramda";
import { colors, fontSize } from "../../Configs/theme";
import { getAllProduct } from "../../Services/Axios/Api/product/product";
import { Strings } from "../../Services/Utils/Locals";
import Loading from "../../Components/Loading";
import {
  clearCartData,
  removeCartData,
} from "../../Services/Redux/Actions/cart";
import FormModal from "../../Components/Modal/FormModal";
import { buyProduct } from "../../Services/Axios/Api/product/buyProduct";
import helper from "../../Services/Utils/helper";
import Styled from "./styled";

const ButtonGroup = Button.Group;

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const language = useSelector((state) => state.language);

  const initialData = {
    listProduct: [],
    selectedProduct: [],
    isLoading: false,
    modal: {
      open: false,
      title: "",
      content: <div></div>,
      handleOk: () => {},
      handleCancel: () => {},
    },
  };

  const [listProduct, setListProduct] = useState(initialData.listProduct);
  const [selectedProduct, setSelectedProduct] = useState(
    initialData.selectedProduct
  );
  const [isLoading, setIsLoading] = useState(initialData.isLoading);
  const [modal, setModal] = useState(initialData.modal);

  useMemo(() => {
    if (!R.isNil(cart) && !R.isEmpty(cart)) {
      handleGetAllProduct();
    }
  }, []);

  async function handleGetAllProduct() {
    setIsLoading(true);

    try {
      const cartArr = cart.split(" ").filter((e) => e !== "");
      let params = { list_id: cartArr };

      getAllProduct(params).then((resp) => {
        if (resp.data.code === 1000) {
          const data = resp.data.data;

          setListProduct(data.results);
          setSelectedProduct(
            data.results.map((e) => {
              return { ...e, amount: 1 };
            })
          );
        }
      });

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("error handleGetAllProduct: ", error);
    }
  }

  const handleAmountChange = ({
    product = {},
    product_info = {},
    type = "minus",
  }) => {
    let _selectedProduct = [...selectedProduct];

    const index = _selectedProduct.findIndex((p) => p._id === product._id);
    let product_amount = _selectedProduct[index].amount;

    if (product_amount >= 0) {
      if (type === "minus") {
        product_amount -= 1;
      }

      if (product_amount < product_info.amount) {
        if (type === "plus") {
          product_amount += 1;
        }
      }
    }

    _selectedProduct[index] = {
      ..._selectedProduct[index],
      amount: product_amount,
      price: product_amount * product_info.price,
    };
    setSelectedProduct(_selectedProduct);
  };

  const handleDeleteSelectedProduct = ({ product = {} }) => {
    const _selectedProduct = selectedProduct.filter(
      (p) => p._id !== product._id
    );
    const _listProduct = listProduct.filter((p) => p._id !== product._id);

    setSelectedProduct(_selectedProduct);
    setListProduct(_listProduct);
    dispatch(removeCartData({ product_id: product._id }));
  };

  const renderEmptyCart = () => {
    return (
      <Styled.EmptyCartComponent>
        <div>
          <img
            src={`https://www.amway.co.th/_ui/responsive/theme-amwaythailand/images/Empty-cart.gif`}
            alt={"empty cart"}
            style={{ width: 250, height: "auto" }}
            draggable={false}
          />
        </div>

        <p
          style={{
            fontSize: fontSize.title,
            fontWeight: "bold",
            marginTop: 30,
          }}
        >
          {"รถเข็นว่าง"}
        </p>
        <p style={{ fontSize: fontSize.text }}>{"คุณยังไม่มีสินค้าในรถเข็น"}</p>
      </Styled.EmptyCartComponent>
    );
  };
  const renderProductInCart = () => {
    return !R.isEmpty(selectedProduct) ? (
      <Styled.CardContainer>
        {selectedProduct.map((product) => {
          const product_info = listProduct.find((p) => p._id === product._id);

          return (
            <Card key={product._id} hoverable style={{ cursor: "default" }}>
              <Styled.InfoContainer>
                <div>
                  <img
                    src={`http://${product.image}`}
                    alt={product.name_en}
                    style={{ width: 150, height: "auto" }}
                    draggable={false}
                  />
                </div>

                <Styled.ProductInfoContainer>
                  <Styled.ProductInfoText color={colors.lightGray}>
                    {Strings.getString("Cart.id")}
                    {product._id}
                  </Styled.ProductInfoText>

                  <Styled.ProductInfoText>
                    {product[`name_${language}`]}
                  </Styled.ProductInfoText>
                </Styled.ProductInfoContainer>

                <Styled.ProductInfoContainer>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <ButtonGroup>
                      <Button
                        onClick={() => {
                          handleAmountChange({
                            product: product,
                            product_info: product_info,
                            type: "minus",
                          });
                        }}
                        icon={<MinusOutlined />}
                      />
                      <div
                        style={{
                          minWidth: 60,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {product.amount > 0 ? product.amount : 0}
                      </div>
                      <Button
                        onClick={() => {
                          handleAmountChange({
                            product: product,
                            product_info: product_info,
                            type: "plus",
                          });
                        }}
                        icon={<PlusOutlined />}
                      />
                    </ButtonGroup>
                  </div>
                </Styled.ProductInfoContainer>

                <Styled.ProductInfoContainer>
                  <div>
                    <DeleteOutlined
                      onClick={() => {
                        setModal({
                          open: true,
                          title: Strings.getString(
                            "Cart.buyBtn.titleTextModal"
                          ),
                          content: Strings.getString(
                            "Cart.buyBtn.contentTextModal"
                          ),
                          handleOk: () => {
                            handleDeleteSelectedProduct({
                              product: product,
                            });
                          },
                          handleCancel: () => {},
                        });
                      }}
                      style={{
                        cursor: "pointer",
                        fontSize: fontSize.subTitle,
                      }}
                    />
                  </div>

                  <Styled.ProductInfoText color={colors.lightGray}>
                    {`${product.amount} x ฿${product_info.price}`}
                  </Styled.ProductInfoText>
                  <Styled.ProductInfoText fontWeight={"bold"}>
                    {`฿ ${product.price}`}
                  </Styled.ProductInfoText>
                </Styled.ProductInfoContainer>
              </Styled.InfoContainer>
            </Card>
          );
        })}
      </Styled.CardContainer>
    ) : null;
  };
  const renderBuyProduct = () => {
    let totalAmount = 0;
    let totalPrice = 0;

    selectedProduct.forEach((p) => {
      totalAmount += p.amount;
      totalPrice += p.price;
    });

    return (
      <Styled.BuyProductContainer>
        <p style={{ fontSize: fontSize.subTitle }}>
          {Strings.getString("Cart.totalPayment")}
        </p>

        <Styled.BuyProductSection>
          <p>
            {Strings.formatString(Strings.getString("Cart.totalAmount"), {
              number: totalAmount,
            })}
          </p>
          <p>{`฿ ${totalPrice}`}</p>
        </Styled.BuyProductSection>

        <Styled.BuyProductSection>
          <p>{Strings.getString("Cart.shippingFee")}</p>

          <p>{Strings.getString("Cart.freeText")}</p>
        </Styled.BuyProductSection>

        <Styled.BuyProductSection>
          <p style={{ fontWeight: "bold", fontSize: fontSize.subTitle }}>
            {Strings.getString("Cart.totalCost")}
          </p>

          <p
            style={{ fontWeight: "bold", fontSize: fontSize.subTitle }}
          >{`฿ ${totalPrice}`}</p>
        </Styled.BuyProductSection>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Styled.BuyBtn
            onClick={() => {
              setModal({
                open: true,
                title: Strings.getString("Cart.buyBtn.titleTextModal"),
                content: Strings.getString("Cart.buyBtn.contentTextModal"),
                handleOk: () => {
                  handleBuyProduct();
                },
              });
            }}
          >
            {Strings.getString("Cart.buyBtn")}
          </Styled.BuyBtn>
        </div>
      </Styled.BuyProductContainer>
    );
  };
  const renderModal = () => {
    if (modal.open === true) {
      return (
        <FormModal
          isOpen={modal.open}
          title={modal.title}
          content={modal.content}
          handleOk={() => {
            if (
              !R.isNil(modal.handleOk) &&
              !helper.IsEmptyFunction(modal.handleOk)
            ) {
              modal.handleOk();
            }

            setModal(initialData.modal);
          }}
          handleCancel={() => {
            if (
              !R.isNil(modal.handleCancel) &&
              !helper.IsEmptyFunction(modal.handleCancel)
            ) {
            }
            setModal(initialData.modal);
          }}
        />
      );
    }

    return null;
  };

  const handleBuyProduct = async () => {
    try {
      let body = {
        first_name: "test",
        last_name: "test",
        list_product_id: [],
        amount: [],
      };
      selectedProduct.forEach((p) => {
        body["list_product_id"].push(p._id);
        body["amount"].push(p.amount);
      });

      const resp = await buyProduct(body);

      if (resp.data.code === 1000) {
        setSelectedProduct(initialData.selectedProduct);
        setListProduct(initialData.listProduct);
        dispatch(clearCartData());

        notification.success({
          description: (
            <p style={{ color: "green" }}>
              {Strings.getString("Cart.buyBtn.buyProductSuccess")}
            </p>
          ),
          placement: "topRight",
        });
      }
    } catch (error) {
      console.log("error handleBuyProduct: ", error);
      notification.error({
        message: (
          <p
            style={{ color: "red" }}
          >{`error code: ${error.response.data.code}`}</p>
        ),
        description: (
          <p style={{ color: "red" }}>{error.response.data.description}</p>
        ),
        placement: "topRight",
      });
    }
  };

  return isLoading === true ? (
    <Loading loading={isLoading} />
  ) : !R.isNil(cart) && !R.isEmpty(cart) ? (
    <Styled.Container>
      {renderProductInCart()}
      {renderBuyProduct()}
      {renderModal()}
    </Styled.Container>
  ) : (
    <>{renderEmptyCart()}</>
  );
};

export default Cart;
