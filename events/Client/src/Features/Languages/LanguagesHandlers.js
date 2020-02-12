/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { FETCH_STATE } from "../../constants";
import { getObj } from "../../Utils/jsTypesHelper";

const initialState = {
  fetchState: null,
  languagesList: null
};

const languagesSlice = createSlice({
  name: "languages",
  initialState,
  reducers: {
    getLanguagesStart(state) {
      state.fetchState = FETCH_STATE.loading;
    },
    getLanguagesSuccess(state, action) {
      state.languagesList = action.payload;
      state.fetchState = FETCH_STATE.success;
    },
    getLanguagesFailure(state) {
      state.fetchState = FETCH_STATE.error;
    }
  }
});

export const {
  getLanguagesStart,
  getLanguagesSuccess,
  getLanguagesFailure
} = languagesSlice.actions;

export default languagesSlice.reducer;

/** SELECTORS */
export const languageSelectors = {
  selectSlice: state => getObj(state).languages || {},
  selectLanguages: state => {
    return languageSelectors.selectSlice(state).languagesList || {};
  },
  selectFetchState: state => languageSelectors.selectSlice(state).fetchState,
  selectLanguageById: (state, props) => {
    return languageSelectors.selectLanguages(state)[props.languageId] || {};
  },
  selectLanguageByIsoCode: (state, props) => {
    const languages = languageSelectors.selectLanguages(state);

    const language = Object.values(languages).find(
      el => el.isoCode === props.isoCode
    );

    return language || {};
  },
  selectLanguageByIsoCodeFromList: (languages, props) => {
    const langResult = getObj(languages);

    const language = Object.values(langResult).find(el => {
      return el.isoCode === props.isoCode;
    });

    return language || {};
  },
  selectLanguageIsoCode: language => {
    return (language && language.isoCode) || null;
  }
};
