import { useAppDispatch, useAppSelector } from "./store-hooks";
import {
  selectIsModalOpen,
  selectModalContent,
  selectModalTitle,
  openModal,
  closeModal,
  selectIsLoading,
} from "@/store";

export const useModalSlice = () => {
  const dispatch = useAppDispatch();

  /* redux modal state properties */
  const isModalOpen = useAppSelector(selectIsModalOpen);
  const modalContent = useAppSelector(selectModalContent);
  const title = useAppSelector(selectModalTitle);
  const isLoading = useAppSelector(selectIsLoading);

  /* redux modal state updaters */
  const setOpenModalState = (modalConfig: {
    title: string;
    modalContent: string;
    isLoading: boolean;
  }) => {
    dispatch(openModal(modalConfig));
  };

  const setCloseModalState = () => {
    dispatch(closeModal());
  };

  return {
    isModalOpen: isModalOpen,
    modalContent: modalContent,
    title: title,
    isLoading: isLoading,
    openModal: setOpenModalState,
    closeModal: setCloseModalState,
  };
};
