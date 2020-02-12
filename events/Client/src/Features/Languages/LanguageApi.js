import { normalize } from "normalizr";
import { API_URL } from "../../constants";
import {
  getLanguagesStart,
  getLanguagesSuccess,
  getLanguagesFailure
} from "./LanguagesHandlers";

import { apiHelper } from "../../Utils/apiHelper";
import { languageSchema, getEntityHelper } from "../../dataNormalization";

const fetchLanguagesFromServer = () => {
  return dispatch => {
    dispatch(getLanguagesStart());

    return apiHelper({ url: `${API_URL}/api/language/Get` })
      .then(items => {
        const itemsResult = Array.isArray(items) ? items : [];
        const normalizeData = normalize(itemsResult, [languageSchema]);
        const entities = getEntityHelper(normalizeData);

        dispatch(getLanguagesSuccess(entities.languages));

        return {
          languages: entities.languages
        };
      })
      .catch(() => {
        dispatch(getLanguagesFailure());
        return Promise.reject();
      });
  };
};

// eslint-disable-next-line import/prefer-default-export
export const languageOperations = {
  fetchLanguagesFromServer
};
