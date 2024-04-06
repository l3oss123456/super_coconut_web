import React from "react";
import { Pagination as AntdPagination } from "antd";
import { Strings } from "../../Services/Utils/Locals";

const Pagination = ({
  pagination = {
    page: 1,
    per_page: 10,
    total: 100,
  },
  setPagination = () => {},
  //   loading = false,
}) => {
  const onChange = (page) => {
    setPagination({ ...pagination, page: page });
  };
  const onShowSizeChange = (per_page) => {
    setPagination({ ...pagination, per_page: per_page });
  };

  return (
    <AntdPagination
      showQuickJumper
      //   defaultCurrent={pagination.page}
      current={pagination.page}
      pageSize={pagination.per_page}
      total={pagination.total}
      onChange={onChange}
      showSizeChanger={true}
      pageSizeOptions={["10", "20", "30", "50", "100"]}
      onShowSizeChange={(_, size) => onShowSizeChange(size)}
      locale={{
        items_per_page: Strings.getString("Pagination.itemsPerPage"),
        jump_to: Strings.getString("Pagination.jumpTo"),
        page: Strings.getString("Pagination.page"),
      }}
      responsive={true}
    />
  );
};

export default Pagination;
