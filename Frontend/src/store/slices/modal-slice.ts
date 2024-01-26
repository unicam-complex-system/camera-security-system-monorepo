"use client";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Modal Slice State type
type ModalStateType = {
  recentActivityModal: {
    title: string;
    isModalOpen: boolean;
    isLoading: boolean;
    modalContent: any;
  };
};

type OpenModalPayloadType = {
  title: string;
  modalContent: any;
  isLoading: boolean;
};

// Define the initial state using that type
const initialState = {
  recentActivityModal: {
    title: "",
    isModalOpen: false,
    isLoading: false,
    modalContent: "",
  },
} as ModalStateType;

export const modalSlice = createSlice({
  name: "modal",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    openModal: (
      state: ModalStateType,
      action: PayloadAction<OpenModalPayloadType>
    ) => {
      state.recentActivityModal = {
        ...state,
        ...action.payload,
        isModalOpen: true,
      };
    },
    closeModal: (state: ModalStateType) => {
      state.recentActivityModal = {
        ...state.recentActivityModal,
        title: "",
        isModalOpen: false,
        isLoading: false,
        modalContent: "",
      };
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectModalTitle = (state: RootState) =>
  state.modal.recentActivityModal.title;
export const selectIsLoading = (state: RootState) =>
  state.modal.recentActivityModal.isLoading;
export const selectModalContent = (state: RootState) =>
  state.modal.recentActivityModal.modalContent;
export const selectIsModalOpen = (state: RootState) =>
  state.modal.recentActivityModal.isModalOpen;

export default modalSlice.reducer;
