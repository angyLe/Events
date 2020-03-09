import { normalize } from "normalizr";
import { API_URL } from "../../constants";
import {
  getImagesStart,
  getImagesSuccess,
  getImagesFailure
} from "./ImagesHandlers";

import { apiHelper, getUrlParamsFromArray } from "../../Utils/apiHelper";
import { imageSchema, getEntityHelper } from "../../dataNormalization";

const fetchImagesFromServer = args => {
  return dispatch => {
    const { ids = null } = args || {};

    dispatch(getImagesStart());

    const urlParams = getUrlParamsFromArray({ ids, propertyName: "ids" });
    let urlStr = `api/image/get`;

    if (urlParams) urlStr += `?${urlParams}`;

    return apiHelper({ url: `${API_URL}/${urlStr}` })
      .then(items => {
        const itemsResult = Array.isArray(items) ? items : [];
        const normalizeData = normalize(itemsResult, [imageSchema]);
        const entities = getEntityHelper(normalizeData);
        dispatch(getImagesSuccess(entities.images));

        return {
          images: entities.images
        };
      })
      .catch(() => {
        dispatch(getImagesFailure());
        return Promise.reject();
      });
  };
};

// eslint-disable-next-line import/prefer-default-export
export const imageOperations = {
  fetchImagesFromServer
};
