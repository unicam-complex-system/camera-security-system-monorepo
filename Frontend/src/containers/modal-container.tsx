"use client";
import { useModalSlice } from "@/hooks";
import { Modal, Spin } from "antd";
import { useEffect } from "react";

export const ModalContainer = () => {
  const { isModalOpen, closeModal, modalContent, isLoading, title } =
    useModalSlice();
  /* onClose or cancel */
  const onCancel = () => {
    closeModal();
  };
  console;
  return (
    <>
      <Modal
        title={title}
        open={isModalOpen}
        onOk={onCancel}
        onCancel={onCancel}
        afterClose={onCancel}
        width={"80%"}
      >
        {isLoading && <Spin />}
        {!isLoading && <img src={modalContent} width={"100%"} alt="Image detection" />}
      </Modal>
    </>
  );
};
