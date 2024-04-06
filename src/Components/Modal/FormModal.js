import React from "react";
import { Modal } from "antd";
import { Strings } from "../../Services/Utils/Locals";

const FormModal = ({
  isOpen = false,
  //   setIsOpen = () => {},
  title = "Basic Modal",
  content = <div></div>,
  handleOk = () => {},
  handleCancel = () => {},
  cancelText = Strings.getString("Modal.cancelBtn"),
  okText = Strings.getString("Modal.okBtn"),
}) => {
  return (
    <Modal
      title={title}
      visible={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      cancelText={cancelText}
      okText={okText}
    >
      {content}
    </Modal>
  );
};

export default FormModal;
