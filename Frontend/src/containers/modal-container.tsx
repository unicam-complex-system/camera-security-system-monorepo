"use client";
import { useModalSlice } from "@/hooks";
import { Modal, Spin } from "antd";
import { useEffect } from "react";;

export const ModalContainer = () => {
  const { isModalOpen, closeModal, modalContent, isLoading , title} = useModalSlice();
  /* onClose or cancel */
  const onCancel = () => {
    closeModal();
  }

  return (
    <>
      <Modal title={title} open={isModalOpen} onOk={onCancel} onCancel={onCancel} afterClose={onCancel}>
        {modalContent}
        {isLoading &&
          <Spin/>
        }
        {!isLoading &&
          <img src={modalContent} alt="Ima"/>
        }
      </Modal>
    </>
  );
};
