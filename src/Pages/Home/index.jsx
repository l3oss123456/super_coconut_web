import React, { useState, useEffect, useMemo } from "react";
// import { Strings } from "../../Services/Utils/Locals/index";
import { useSelector } from "react-redux";
import * as R from "ramda";
import { getAllProduct } from "../../Services/Axios/Api/product/product";
import ProductCard from "../../Components/ProductCard";
import Loading from "../../Components/Loading";
import FilterTab from "../../Components/FilterTab";
import helper from "../../Services/Utils/helper";
import Styled from "./styled";
import { Strings } from "../../Services/Utils/Locals";

const Home = (props) => {
  const language = useSelector((state) => state.language);
  const initialData = {
    listProduct: [],
    isLoading: false,
    pagination: {
      page: 1,
      per_page: 10,
      total: 0,
    },
    filter: {
      product_type: "all",
      sort_field: [`updated_at`],
      sort_order: [-1],
      search_field: language ? `name_${language}` : "name_en",
      search_val: ``,
    },
  };

  const [listProduct, setListProduct] = useState(initialData.listProduct);
  const [pagination, setPagination] = useState(initialData.pagination);
  const [filter, setFilter] = useState(initialData.filter);
  const [isLoading, setIsLoading] = useState(initialData.isLoading);

  useMemo(() => {
    handleGetAllProduct({ filter: null, pagination: initialData.pagination });
  }, []);

  useEffect(() => {
    if (!R.isEmpty(listProduct)) {
      handleConnectSockerIo();
    }
  }, [listProduct]);

  async function handleConnectSockerIo() {
    try {
      const socket = await helper.connectSocketioBuyProduct();

      socket.on("update_product", (data) => {
        if (data && data.update_product) {
          let _listProduct = [];

          listProduct.forEach((p, index) => {
            const update_product_id = data.update_product.map((e) => e._id);

            if (update_product_id.includes(p._id)) {
              _listProduct.push({
                ...p,
                amount: data.update_product[index].amount,
              });
            } else {
              _listProduct.push(p);
            }
          });

          setListProduct(_listProduct);
        }
      });
    } catch (error) {
      console.log("error handleConnectSockerIo:", error);
    }
  }

  async function handleGetAllProduct({
    filter = null,
    _pagination = { ...pagination },
  }) {
    setIsLoading(true);

    try {
      let params = {
        page: _pagination?.page ?? 1,
        per_page: _pagination?.per_page ?? 10,
      };
      if (!R.isNil(filter)) {
        params = {
          ...params,
          // start_date:
          //   !R.isNil(filter.start_date) && !R.isEmpty(filter.start_date)
          //     ? new Date(filter.start_date).toISOString()
          //     : null,
          // end_date:
          //   !R.isNil(filter.end_date) && !R.isEmpty(filter.end_date)
          //     ? new Date(filter.end_date).toISOString()
          //     : null,
          // [filter.search_field]: filter.search_val,
          sort_field: filter.sort_field,
          sort_order: filter.sort_order,
          product_type:
            filter.product_type !== "all" ? filter.product_type : null,
          [`name_${language}`]: filter.search_val,
        };
      }

      getAllProduct(params).then((resp) => {
        if (resp.data.code === 1000) {
          const data = resp.data.data;

          setListProduct(data.results);
          setPagination({
            page: _pagination?.page ?? 1,
            per_page: _pagination?.per_page ?? 10,
            total: data.total,
          });
        }
      });

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("error handleGetAllProduct: ", error);
    }
  }

  const renderFilterTab = () => {
    return (
      <FilterTab
        onSearchChange={(value) => {
          const _filter = helper.OnChangeFilter({
            current_filter: { ...filter },
            field_type: "search_val",
            val: value,
          });

          setFilter(_filter);
          handleGetAllProduct({
            filter: _filter,
            _pagination: { ...pagination },
          });
        }}
        searchFieldOption={{
          value: filter.product_type,
          options: [
            { value: "all", label: "-" },
            {
              value: "food",
              label: Strings.getString("homePage.select.productType1"),
            },
            {
              value: "used",
              label: Strings.getString("homePage.select.productType2"),
            },
          ],
          onChange: (value) => {
            const _filter = helper.OnChangeFilter({
              current_filter: { ...filter },
              field_type: "product_type",
              val: value,
            });

            setFilter(_filter);
            handleGetAllProduct({
              filter: _filter,
              _pagination: { ...pagination },
            });
          },
        }}
      />
    );
  };

  return (
    <div>
      <Loading loading={isLoading} />

      {renderFilterTab()}

      <ProductCard
        listProduct={listProduct}
        pagination={pagination}
        setPagination={(_pagination) => {
          setPagination(_pagination);
          handleGetAllProduct({ filter: filter, _pagination: _pagination });
        }}
      />
    </div>
  );
};
export default Home;
