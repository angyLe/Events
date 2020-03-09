/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { FETCH_STATE } from "../../constants";
import { getObj } from "../../Utils/jsTypesHelper";

const initialState = {
  fetchState: null,
  imagesList: null
};

const imagesSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    getImagesStart(state) {
      state.fetchState = FETCH_STATE.loading;
    },
    getImagesSuccess(state, action) {
      state.imagesList = action.payload;
      state.fetchState = FETCH_STATE.success;
    },
    getImagesFailure(state) {
      state.fetchState = FETCH_STATE.error;
    }
  }
});

export const {
  getImagesStart,
  getImagesSuccess,
  getImagesFailure
} = imagesSlice.actions;

export default imagesSlice.reducer;

/** SELECTORS */
export const imageSelectors = {
  selectSlice: state => getObj(state).images || null,
  selectImages: state => {
    return (imageSelectors.selectSlice(state) || {}).imagesList || null;
  },
  selectFetchState: state =>
    (imageSelectors.selectSlice(state) || {}).fetchState || null,
  selectImageById: (state, props) => {
    return (imageSelectors.selectImages(state) || {})[props.imageId] || null;
  }
};
